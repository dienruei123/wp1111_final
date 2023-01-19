import { useMutation, useQuery } from "@apollo/client"
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REGISTER_MUTATION,
  EVENT_MUTATION,
  ADDTOEVENTLIST_MUTATION,
  EVENT_CREATED_SUBSCRIPTION,
  EVENT_JOINED_SUBSCRIPTION,
  EVENT_CANCELED_SUBSCRIPTION,
  ADDCOMMENT_MUTATION,
} from "../../graphql"
import { createContext, useContext, useEffect, useState } from "react"
import { USERS_QUERY } from "../../graphql/queries"

const LOCALSTORAGE_REMEMBER = "rememberUser"
const rememberUser = localStorage.getItem(LOCALSTORAGE_REMEMBER)
const LOCALSTORAGE_TOKEN = "authenticationToken"
const localToken = localStorage.getItem(LOCALSTORAGE_TOKEN)

const RentContext = createContext({
  username: "",
  passwd: "",
  identity: "",
  signedIn: false,
  remUser: false,
  userEvents: [],
  token: "",
  renderLoading: false,
})
const RentProvider = (props) => {
  const [username, setUsername] = useState("")
  const [passwd, setPasswd] = useState("")
  const [identity, setIdentity] = useState("")
  const [signedIn, setSignedIn] = useState(false)
  const [remUser, setRemUser] = useState(rememberUser || true)
  const [token, setToken] = useState(localToken || "")
  const [isLoading, setIsLoading] = useState(false)
  const [userEvents, setUserEvents] = useState([])
  const [renderLoading, setRenderLoading] = useState(true)
  const [searchEvent, setSearchEvent] = useState("")

  const { data, loading, error, subscribeToMore } = useQuery(USERS_QUERY, {
    variables: {
      token: token,
    },
    pollInterval: 1,
  })

  const [login] = useMutation(LOGIN_MUTATION)
  const [register] = useMutation(REGISTER_MUTATION)
  const [logout] = useMutation(LOGOUT_MUTATION)
  const [eventcreate] = useMutation(EVENT_MUTATION)
  const [addComment] = useMutation(ADDCOMMENT_MUTATION)

  const [addtoEventlist] = useMutation(ADDTOEVENTLIST_MUTATION)
  //   useEffect(() => {
  //     if (signedIn) {
  //       localStorage.setItem(LOCALSTORAGE_KEY, username)
  //     }
  //   }, [signedIn])

  const toDateString = (date) => {
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const newDate = new Date(parseInt(date))
    return weekDay[newDate.getDay()] + ', ' + newDate.toLocaleDateString("en-US", {
      // year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_REMEMBER, remUser)
  }, [remUser])

  useEffect(() => {
    if (isLoading) setRenderLoading(true)
    else {
      setTimeout(() => {
        setRenderLoading(false)
      }, 300)
    }
  }, [isLoading])

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, token)
    // console.log(loading)
    // console.log(data)
    setIsLoading(loading)
    if (token && !error && data) {
      const { users } = data
      // console.log(users.events)
      setSignedIn(true)
      setUsername(users.username)
      setIdentity(users.identity)
      // console.log(users.events)
      setUserEvents(users.events)
      console.log(12345)
    } else {
      // console.log(error)
      setSignedIn(false)
    }
  })

  useEffect(() => {
    try {
      subscribeToMore({
        document: EVENT_CREATED_SUBSCRIPTION,
        variables: {
          hostname: username,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const event = subscriptionData.data.eventCreated
          return {
            users: {
              id: prev.users.id,
              username: prev.users.username,
              identity: prev.users.identity,
              events: [...prev.users.events, event],
              isLoggedIn: prev.users.isLoggedIn,
            },
          }
        },
      })
    } catch (e) {
      console.log(e)
    }
  }, [subscribeToMore])

  useEffect(() => {
    try {
      subscribeToMore({
        document: EVENT_JOINED_SUBSCRIPTION,
        variables: {
          username: username,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const event = subscriptionData.data.eventJoined
          console.log(prev)
          return {
            users: {
              id: prev.users.id,
              username: prev.users.username,
              identity: prev.users.identity,
              events: [...prev.users.events, event],
              isLoggedIn: prev.users.isLoggedIn,
            },
          }
        },
      })
    } catch (e) {
      console.log(e)
    }
  }, [subscribeToMore])

  useEffect(() => {
    try {
      subscribeToMore({
        document: EVENT_CANCELED_SUBSCRIPTION,
        variables: {
          username: username,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const event = subscriptionData.data.eventCanceled
          console.log(prev)
          return {
            users: {
              id: prev.users.id,
              username: prev.users.username,
              identity: prev.users.identity,
              events: prev.users.events.filter((e) => e.id !== event.id),
              isLoggedIn: prev.users.isLoggedIn,
            },
          }
        },
      })
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <RentContext.Provider
      value={{
        username,
        passwd,
        identity,
        signedIn,
        remUser,
        userEvents,
        token,
        renderLoading,
        searchEvent,
        data,
        loading,

        setUsername,
        setPasswd,
        setIdentity,
        setSignedIn,
        setRemUser,
        setUserEvents,
        setToken,
        setRenderLoading,
        setSearchEvent,
        login,
        register,
        logout,
        eventcreate,
        addComment,
        addtoEventlist,
        subscribeToMore,
        toDateString,
      }}
      {...props}
    />
  )
}

const useRent = () => useContext(RentContext)
export { RentProvider, useRent }
