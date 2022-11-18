import { message } from "antd"
import { createContext, useState, useEffect, useContext } from "react"

const client = new WebSocket("ws://localhost:4000")
const LOCALSTORAGE_KEY = "save-me"
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  sendMessage: () => {},
  clearMessages: () => {},
})
const ChatProvider = (props) => {
  const [status, setStatus] = useState({})
  const [me, setMe] = useState(savedMe || "")
  const [signedIn, setSignedIn] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn])

  client.onmessage = (byteString) => {
    const { data } = byteString
    const [task, payload] = JSON.parse(data)
    switch (task) {
      case "init": {
        setMessages(payload)
        break
      }
      case "output": {
        setMessages(() => [...messages, ...payload])
        break
      }
      case "status": {
        setStatus(payload)
        break
      }
      case "cleared": {
        setMessages([])
        break
      }
      case "info": {
        setStatus(payload)
        break
      }
      default:
        break
    }
  }
  const sendData = async (data) => {
    await client.send(JSON.stringify(data))
  }
  const sendMessage = (payload) => {
    sendData(["input", payload])
    // setMessages([...messages, payload]);
    // setStatus({
    //   type: "success",
    //   msg: "Message sent.",
    // });
    // console.log(payload);
  }
  const clearMessages = () => {
    sendData(["clear"])
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
        signedIn,
        messages,
        setMe,
        setSignedIn,
        sendMessage,
        clearMessages,
        displayStatus,
      }}
      {...props}
    />
  )
}

const useChat = () => useContext(ChatContext)
export { ChatProvider, useChat }
// export { useChat }
