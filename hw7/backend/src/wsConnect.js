import Message from "./models/message"

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data))
}
const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws)
}
const broadcastMessage = (wss, data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client)
    sendStatus(status, client)
  })
}

export default {
  onMessage: (ws) => async (byteString) => {
    const { data } = byteString
    const [task, payload] = JSON.parse(data)
    switch (task) {
      case "input": {
        const { name, body } = payload
        // save payload to DB
        const message = new Message({ name, body })
        try {
          await message.save()
        } catch (e) {
          throw new Error("Message DB save error: " + e)
        }
        // Respond to client
        sendData(["output", [payload]], ws)
        sendStatus(
          {
            type: "success",
            msg: "Message sent.",
          },
          ws
        )
        break
      }
      case "clear": {
        Message.deleteMany({}, () => {
          sendData(["cleared"], ws)
          sendStatus({ type: "info", msg: "Message cache cleared." }, ws)
        })
      }
      default:
        break
    }
  },
  initData: (ws) => {
    Message.find()
      .sort({ created_at: -1 })
      .limit(100)
      .exec((err, res) => {
        if (err) throw err
        sendData(["init", res], ws)
      })
  },
}
