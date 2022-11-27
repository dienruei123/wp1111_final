import { MessageModel, UserModel, ChatBoxModel } from "./models/message"

const chatBoxes = {}

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data))
}
const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws)
}
const broadcastMessage = (wss, wsName, data, status) => {
  wss.clients.forEach((client) => {
    if (chatBoxes[wsName].has(client)) {
      sendData(data, client)
      sendStatus(status, client)
    }
  })
}
const makeName = (name, to) => {
  return [name, to].sort().join("_")
}
const validateUser = async (name) => {
  let existing = await UserModel.findOne({ name })
  if (!existing) {
    existing = await new UserModel({ name }).save()
  }
  return existing.populate(["chatboxes"])
}
const validateChatBox = async (name, participants) => {
  let box = await ChatBoxModel.findOne({ name })
  if (!box) {
    box = await new ChatBoxModel({ name, users: participants }).save()
  }
  return box.populate(["users", { path: "messages", populate: "sender" }])
}

export default {
  onMessage: (wss, ws) => async (byteString) => {
    const { data } = byteString
    const { type, payload } = JSON.parse(data)

    switch (type) {
      case "CHAT":
        const { name, to } = payload
        const chatBoxName = makeName(name, to)
        if (ws.box != "" && chatBoxes[ws.box]) chatBoxes[ws.box].delete(ws)
        ws.box = chatBoxName

        if (!chatBoxes[chatBoxName]) {
          chatBoxes[chatBoxName] = new Set()
        }
        chatBoxes[chatBoxName].add(ws)

        // console.log(payload)
        try {
          const UserMe = await validateUser(name)
          const UserFriend = await validateUser(to)
          const ChatBox = await validateChatBox(chatBoxName, [
            UserMe,
            UserFriend,
          ])
          if (!UserMe.chatboxes.includes({ name: chatBoxName }))
            UserMe.chatboxes.push(ChatBox)
          if (!UserFriend.chatboxes.includes({ name: chatBoxName }))
            UserFriend.chatboxes.push(ChatBox)

          await UserMe.save()
          await UserFriend.save()
          // console.log(UserMe, UserFriend, ChatBox)
          const payload = ChatBox.messages.map((message) =>
            // console.log(message.body)
            ({ name: message.sender.name, body: message.body })
          )
          // console.log(payload)

          // broadcastMessage(wss, ["create", payload], {
          //   type: "info",
          //   msg: "Message Updated.",
          // })
          sendStatus(
            {
              type: "info",
              msg: "Message Updated.",
            },
            ws
          )
          sendData(["create", payload], ws)
        } catch (e) {
          throw new Error(e)
        }

        // const chatBox = new ChatBoxModel({ name: makeName(name, to) })

        break
      case "MESSAGE": {
        const { name, to, body } = payload
        // save payload to DB
        try {
          const UserMe = await validateUser(name)
          const UserFriend = await validateUser(to)
          const ChatBox = await validateChatBox(makeName(name, to), [
            UserMe,
            UserFriend,
          ])
          let message = new MessageModel({
            chatBox: ChatBox,
            sender: UserMe,
            body: body,
          })
          // console.log(payload, message)

          message = await message.populate([
            { path: "sender", populate: "name" },
            { path: "chatBox", populate: "name" },
          ])
          await message.save()
          ChatBox.messages.push(message)
          await ChatBox.save()
          // console.log(message)
        } catch (e) {
          throw new Error(e)
        }

        // Respond to client
        // sendData(["output", [payload]], ws)
        // sendStatus(
        //   {
        //     type: "success",
        //     msg: "Message sent.",
        //   },
        //   ws
        // )
        console.log({ name, body })
        broadcastMessage(
          wss,
          makeName(name, to),
          ["output", [{ name, body }]],
          {
            type: "success",
            msg: `Message sent [by ${name}].`,
          }
        )
        break
      }
      // case "CLEAR": {
      //   Message.deleteMany({}, () => {
      //     // sendData(["cleared"], ws)
      //     // sendStatus({ type: "info", msg: "Message cache cleared." }, ws)
      //     broadcastMessage(ws, ["cleared"], {
      //       type: "info",
      //       msg: "Message cache cleared.",
      //     })
      //   })
      // }
      default:
        break
    }
  },
  initData: (ws) => {
    MessageModel.find()
      .populate([
        { path: "sender", populate: "name" },
        { path: "chatBox", populate: "name" },
      ])
      .sort({ created_at: -1 })
      .limit(100)
      .exec((err, res) => {
        if (err) throw err

        const _res = []
        res.forEach((message) => {
          // console.log(message.chatBox)
          const nameto = message.chatBox.name.split("_")
          const to = nameto[0] === message.sender.name ? nameto[1] : nameto[0]
          _res.push({ name: message.sender.name, to: to, body: message.body })
        })

        // console.log(_res)
        sendData(["init", _res], ws)
      })
  },
}
