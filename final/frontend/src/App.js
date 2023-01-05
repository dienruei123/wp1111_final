import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./containers/HomePage"
import Login from "./containers/Login"
// import Register from "./containers/Register"
// import Calendar from "./containers/Calendar"
import AppBar from "./components/AppBar"
// import Login from "./components/Login"
import Register from "./containers/Register"
import Calendar from "./components/Calendar"
import Participant from "./containers/ParticipantPage"
import Host from "./containers/HostPage"
import Loading from "./components/Loading"
import Event from "./containers/EventPage"
import { useRent } from "./containers/hooks/useRent"
import AllEvent from "./containers/AllEventPage"
import AllEventQuery from "./containers/AllEventQuery"

const App = () => {
  const useRentContext = useRent()
  const { username } = useRentContext
  const { signedIn } = useRentContext
  const { renderLoading } = useRentContext
  const host = { name: "2023", description: "new year" }
  // console.log(renderLoading)
  useEffect(() => {
    // document.title = signedIn ? `${username}'s Home` : "Home"
    // document.title += " | Event Registration Center"
    document.title = "Event Registration Center"
  }, [])
  return renderLoading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/participant" element={<Participant />} />
        <Route exact path="/host" element={<Host />} />
        <Route exact path="/event/:id" element={<Event Host={host} />} />
        <Route exact path="/allevents" element={<AllEvent />} />
        <Route exact path="/allEventQuery" element={<AllEventQuery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
