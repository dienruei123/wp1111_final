import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Button, Input, message, Tag } from "antd"
import Title from "../components/Title"
import Message from "../components/Message"
import { useChat } from "./hooks/useChat"

const ChatBoxesWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`
const FootRef = styled.div`
  height: 20px;
`

const ChatRoom = () => {
  const { me, messages, sendMessage, displayStatus, clearMessages } = useChat()
  const [username, setUsername] = useState("")
  const [msg, setMsg] = useState("")
  const [msgSent, setMsgSent] = useState(false)

  useEffect(() => {
    scrollToBottom()
    setMsgSent(false)
  }, [msgSent])

  // const bodyRef = useRef(null)
  const msgRef = useRef(null)
  const msgFooter = useRef(null)

  const displayMessages = () => {
    return messages.length === 0 ? (
      <p style={{ color: "#ccc" }}>No messages...</p>
    ) : (
      messages.map(({ name, body }, i) => (
        <Message name={name} isMe={name === me} message={body} key={i} />
      ))
    )
  }

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <>
      <div className="App-title">
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
        {/* {messages.map(({ name, body }, i) => (
          <Message name={name} isMe={name === me} message={body} key={i} />
        ))} */}
      </div>
      <Title name={me} />
      <ChatBoxesWrapper>
        {displayMessages()}
        <FootRef ref={msgFooter} />
      </ChatBoxesWrapper>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            msgRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        ref={msgRef}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            })
            return
          }
          sendMessage({ name: username, body: msg })
          setMsg("")
          setMsgSent(true)
        }}
      />
    </>
  )
}
export default ChatRoom
