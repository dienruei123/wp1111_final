import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Button, Input, Tag, Tabs } from "antd"
import Title from "../components/Title"
import Message from "../components/Message"
import { useChat } from "./hooks/useChat"
import ChatModal from "../components/ChatModal"

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  // & div:last-child {
  //   overflow: auto;
  // }
  // overflow: auto;
`
const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  // height: 204px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`
const FootRef = styled.div`
  height: 20px;
`
const ChatRoom = () => {
  const {
    me,
    messages,
    sendMessage,
    displayStatus,
    clearLocalMessages,
    startChat,
  } = useChat()
  const [msg, setMsg] = useState("")
  const [msgSent, setMsgSent] = useState(false)
  const [chatBoxes, setChatBoxes] = useState([])
  // { label, children, key }
  const [activeKey, setActiveKey] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    updateChatBox(activeKey)
    // scrollToBottom()
    // setMsgSent(false)
    // console.log(messages)
  }, [messages])
  useEffect(() => {
    scrollToBottom()
    setMsgSent(false)
  }, [msgSent])

  // const bodyRef = useRef(null)
  // const msgRef = useRef(null)
  const msgFooter = useRef(null)

  // const displayMessages = () => {
  //   return messages.length === 0 ? (
  //     <p style={{ color: "#ccc" }}>No messages...</p>
  //   ) : (
  //     messages.map(({ name, body }, i) => (
  //       <Message name={name} isMe={name === me} message={body} key={i} />
  //     ))
  //   )
  // }

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const renderChat = (chat) => {
    // console.log(chat, chat.length)
    return chat.length === 0 ? (
      // [<p style={{ color: "#ccc" }}>No messages...</p>]
      []
    ) : (
      <ChatBoxWrapper>
        {chat.map(({ name, body }, i) => (
          <Message name={name} isMe={name === me} message={body} key={i} />
        ))}
        <FootRef ref={msgFooter} />
      </ChatBoxWrapper>
    )
  }
  const extractChat = () => {
    return renderChat(messages)
  }
  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.")
    }
    const chat = extractChat()
    // console.log(chat)
    // const messages = (
    //   <ChatBoxWrapper>
    //     {chat.map((message) => message)}
    //     <FootRef ref={msgFooter} />
    //   </ChatBoxWrapper>
    // )
    setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }])
    setMsgSent(true)
    return friend
  }
  const updateChatBox = (friend) => {
    if (friend === "") return
    const chat = extractChat()
    // const messages = (
    //   <div>
    //     {chat.map((message) => message)}
    //     <FootRef ref={msgFooter} />
    //   </div>
    // )
    // console.log(chat)
    let newChatBoxes = chatBoxes
    // console.log(newChatBoxes)
    newChatBoxes.filter((chatBox) => chatBox.key === friend)[0].children = chat
    setChatBoxes(newChatBoxes)
    // console.log(newChatBoxes)
    setMsgSent(true)
  }
  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey)
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey)
    setChatBoxes(newChatBoxes)
    // console.log(index, chatBoxes.length, newChatBoxes[index].key)
    return activeKey
      ? activeKey === targetKey
        ? newChatBoxes.length !== 0
          ? index !== newChatBoxes.length
            ? newChatBoxes[index].key
            : newChatBoxes[index - 1].key
          : ""
        : activeKey
      : ""
    // determine activeKey after deleting targetKey
  }

  return (
    <>
      {/* <Button type="primary" danger onClick={clearMessages}>
        Clear
      </Button> */}
      <Title name={me} />
      <>
        <ChatBoxesWrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key)
            // updateChatBox(key)
            clearLocalMessages()
            startChat(me, key)
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") setModalOpen(true)
            else if (action === "remove") {
              const key = removeChatBox(targetKey, activeKey)
              setActiveKey(removeChatBox(targetKey, activeKey))
              // console.log(activeKey)
              clearLocalMessages()
              displayStatus({
                type: "success",
                msg: "ChatBox deleted!",
              })
              startChat(me, key)
            }
          }}
          items={chatBoxes}
        />
        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name))
            // extractChat(name)
            startChat(me, name)
            setModalOpen(false)
          }}
          onCancel={() => {
            setModalOpen(false)
          }}
        />
      </>
      <Input.Search
        // ref={msgRef}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            })
            return
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            })
            setMsg("")
            return
          }
          // console.log(activeKey)
          sendMessage({ name: me, to: activeKey, body: msg })
          // updateChatBox(activeKey)
          setMsg("")
          // setMsgSent(true)
        }}
      />
    </>
  )
}
export default ChatRoom
