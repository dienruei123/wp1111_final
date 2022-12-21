import { message } from "antd"
import { createContext, useState, useEffect, useContext } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {
  CHATBOX_QUERY,
  CREATE_CHATBOX_MUTATION,
  CREATE_MESSAGE_MUTATION,
  MESSAGE_SUBSCRIPTION,
} from "../../graphql"
// const client = new WebSocket("ws://localhost:4000")
// console.log(client)
const LOCALSTORAGE_KEY = "save-me"
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)

const ChatContext = createContext({
  status: {},
  me: "",
  friend: "",
  signedIn: false,
  messages: [],
  sendMessage: async () => {},
  clearMessages: () => {},
  startChat: async () => {},
  clearLocalMessages: () => {},
})
const ChatProvider = (props) => {
  const [status, setStatus] = useState({})
  const [me, setMe] = useState(savedMe || "")
  const [friend, setFriend] = useState("")
  const [signedIn, setSignedIn] = useState(false)
  const [messages, setMessages] = useState([])

  const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      name1: me,
      name2: friend,
    },
    pollInterval: 1,
  })

  console.log(friend)
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION)
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  // const [ddd, { data: sdf }] = useMutation(CREATE_CHATBOX_MUTATION, {
  //   variables: {
  //     name1: "ers",
  //     name2: "sdf",
  //   },
  // })
  // useEffect(() => {
  //   console.log(sdf, data)
  //   console.log(ddd, startChat)
  // }, [sdf, data])
  // startChat({
  //   variables: {
  //     name1: "ers",
  //     name2: "sdf",
  //   },
  // })
  // sendMessage({
  //   variables: {
  //     name: "dff",
  //     to: "sdff",
  //     body: "sdf",
  //   },
  // })

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn])

  useEffect(() => {
    setMessages(data ? data.chatbox.messages : [])
  }, [data])

  useEffect(() => {
    try {
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        variables: {
          from: me,
          to: friend,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newMessage = subscriptionData.data.message
          return {
            chatbox: {
              messages: [...prev.chatbox.messages, newMessage],
              name: prev.chatbox.name,
            },
          }
        },
      })
    } catch (e) {
      console.log(e)
    }
  }, [subscribeToMore])
  // startChat()
  // console.log(
  //   startChat({
  //     variables: {
  //       name1: "dsf",
  //     },
  //   })
  // )
  // console.log(data ? data.chatbox.messages : [])

  // client.onmessage = (byteString) => {
  //   console.log(byteString)
  //   const { data } = byteString
  //   const [task, payload] = JSON.parse(data)
  //   switch (task) {
  //     case "create": {
  //       setMessages(payload)
  //       // console.log(payload)
  //       break
  //     }
  //     case "init": {
  //       setMessages(payload)
  //       break
  //     }
  //     case "output": {
  //       setMessages((messages) => [...messages, ...payload])
  //       // console.log(messages)
  //       break
  //     }
  //     case "status": {
  //       setStatus(payload)
  //       break
  //     }
  //     case "cleared": {
  //       setMessages([])
  //       break
  //     }
  //     case "info": {
  //       setStatus(payload)
  //       break
  //     }
  //     default:
  //       break
  //   }
  // }

  // const startChat = (name, to) => {
  //   if (!name || !to) throw new Error("Name or to required.")

  //   sendData({
  //     type: "CHAT",
  //     payload: { name, to },
  //   })
  // }
  // const sendData = (data) => {
  //   client.send(JSON.stringify(data))
  // }
  // const sendMessage = ({ name, to, body }) => {
  //   if (!name || !to || !body) {
  //     throw new Error("Name or to or body required.")
  //   }
  //   sendData({
  //     type: "MESSAGE",
  //     payload: { name, to, body },
  //   })
  // }
  // const clearMessages = () => {
  //   sendData({
  //     type: "CLEAR",
  //   })
  // }
  const clearLocalMessages = () => {
    setMessages([])
  }
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = { content: msg, duration: 0.5 }
      switch (type) {
        case "success":
          message.success(content)
          break
        case "info":
          message.info(content)
          break
        case "error":
        default:
          message.error(content)
          break
      }
    }
  }
  return (
    <ChatContext.Provider
      value={{
        status,
        me,
        friend,
        signedIn,
        messages,
        data,
        setMe,
        setFriend,
        setSignedIn,
        sendMessage,
        startChat,
        // clearMessages,
        displayStatus,
        clearLocalMessages,
      }}
      {...props}
    />
  )
}

const useChat = () => useContext(ChatContext)
export { ChatProvider, useChat }
// export { useChat }
