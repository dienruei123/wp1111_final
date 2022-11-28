# Web Programming HW#7

###### Author: B10901038 吳典叡

### Run

```bash
cd frontend
yarn
yarn start (for frontend)

At another terminal:
cd backend
yarn
yarn server (for backend)
```

### Basic features

1. SignIn page: Enter name(required, otherwise alert user with error message) to hop into chatroom, no need to enter password; the name of the title will be the user's name.
2. Refresh or create new tab in browser will return to SignIn page, and the input box will show the latest signin name by local storage.
3. MongoDB: store all users' messages
4. Chat room Tabs: antd module
5. Entering chat room will observe empty room; pressing '+' and a Modal will appear. Enter a name you want to chat with, then a new chatbox is created (If there exist previous messages between you in mongoDB, then get them and show them in the chat box).
6. Your friend's messages will align to the left, while your messages will align to the right. Messages are shown by chronological order.
7. Enter message in the input box to the bottom of chat box; after successfully passing the message to backend, the message will be shown at the bottom of the chat box.
8. Other users are able to use the app and chat with you. If the chatbox between you and the user is active in your app, then the user's new messages will show up on the chatbox immediately; otherwise store in DB until you open the chatbox.
9. Open identical chatroom name (or same chat box) at different windows will open the same messages synchronously and will not cause errors.
10. The latest messages will always appear at the bottom of the chatbox; overflow part will be automatically scrolled up.
11. Users can switch different chatboxes. When clicked on any 'x' on the tabs, the corresponding chatbox will be closed. ActiveKey will also be updated by specific logic.
12. You can chat with yourself, while all messages will align to the right of the chatbox.
13. No additional limits on the number of chatrooms or chatboxes.
14. When any of the above functions are triggered, there is a "display function" which can inform appropriate messages to users by popping out a block at the top.

### Advanced features

### Other featurers
