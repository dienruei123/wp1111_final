import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import Events from "./events"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useRent } from "../containers/hooks/useRent"
import { useState, useEffect } from "react"

const localizer = momentLocalizer(moment)

const MyCalendar = (props) => {
  const  { data } = useRent()
  const [eventsList, setEventsList] = useState([])

  useEffect(()=>{
    const { users } = data
    let newEventsList = []
    if (users.events.length) {
      users.events.map((e)=>{
        let timefrom = new Date(parseInt(e.eventdatefrom)) 
        let timeto = new Date(parseInt(e.eventdateto))
        newEventsList.push({title: e.eventname, allDay: false, start: timefrom, end: timeto})
      })
      setEventsList(newEventsList)
    }
  },[data])

  return(
    <div>
    <Calendar
      localizer={localizer}
      events={eventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, minWidth: 650 }}
    />
  </div>
  ) 
}
export default MyCalendar
