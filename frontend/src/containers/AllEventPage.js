import React, { useEffect, useState } from "react"
import ButtonAppBar from "../components/AppBar"
import styled from "styled-components"
import ComplexGrid from "../components/Grid"
import { useRent } from "./hooks/useRent"
import { useQuery } from "@apollo/client"
import { ALLEVENTS_QUERY } from "../graphql"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import MultilineTextFields from "../components/SearchBox"
import Selectfilter from "../components/Form"
import MultipleSelectChip from "../components/TagsFilter"
import { IconButton } from "@mui/material"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  margin-top: 70px;
  height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: scroll;
`

const SearchBoxWrapper = styled.div`
  width: 100%;
  height: 20%;
  ${'' /* border: 1px solid black; */}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${'' /* background: rgb(136, 169, 230) */}
`

const AllEventsWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 2em;
  justify-content: space-around;
  align-items: space-between;
  overflow: scroll;
  background: #ADD8E6
`

const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const AllEvent = () => {
    const toDateString = (date) => {
        const newDate = new Date(parseInt(date))
        return weekDay[newDate.getDay()] + ' ' + newDate.toLocaleDateString("en-US", {
            // year: "numeric",
            month: "numeric",
            day: "numeric",
        })
    }
    const [open, setOpen] = useState(false)
    const { searchEvent, username } = useRent()
    const { data, loading, error } = useQuery(ALLEVENTS_QUERY, { pollInterval: 1, })
    const [sortedData, setSortedData] = useState(data);
    const [isJoined, setIsJoined] = useState(false);

    const filterLatest = () => {
        setOpen(false)
        const ToNewDate = (date) => {
            let newDate = new Date(parseInt(date))
            return newDate
        }
        const sortedEvents = data.allEvents.slice().sort((a, b) => ToNewDate(a.eventdatefrom) - ToNewDate(b.eventdatefrom))
        console.log(sortedEvents)
        setSortedData({ allEvents: sortedEvents });
        console.log(sortedData)
    }
    const filterNewEvent = () => {
        setOpen(false)
        console.log(username, data.allEvents[2]);
        // const newEvents = data.allEvents.filter((event) => (event.participants))
        // setSortedData({ allEvents: newEvents });
    }
    const filterTags = () => {
        setOpen(true)
    }
    const filterByTypes = (value) => {
        const sortedEvents = data.allEvents.filter((event) => (value.includes(event.tags[0]) || value.includes(event.tags[1])))
        console.log(sortedEvents)
        setSortedData({ allEvents: sortedEvents });
    }
    const onSearch = (name) => {
            const findEvent = data.allEvents.filter((event) => event.eventname.includes(name));
            if (findEvent.length) {
                setSortedData({ allEvents: findEvent })
            }
            else {
                setSortedData(data)
            }
    }
    
    useEffect(() => {
        if (data) {
            setSortedData(data)
            console.log("data")
        }
    }, [data])

    return (
        <Wrapper>
            <ButtonAppBar />
            <BodyWrapper>
                <SearchBoxWrapper>
                    {/* <IconButton> */}
                    <ManageSearchIcon />
                    {/* </IconButton> */}
                    <MultilineTextFields onSearch={onSearch} />
                    <Selectfilter
                        none={() => setOpen(false)}
                        filterLatest={filterLatest}
                        filterNewEvent={filterNewEvent}
                        filterTags={filterTags}
                    />
                    {(open) ? <MultipleSelectChip filterByTypes={filterByTypes} /> : <></>}
                </SearchBoxWrapper>
                <AllEventsWrapper>
                    {!sortedData ? <></> : sortedData.allEvents.map((event) => (
                        <ComplexGrid
                            key={event.id}
                            name={event.eventname}
                            id={event.id}
                            description={event.description}
                            host={event.hostname}
                            date={toDateString(event.eventdatefrom)}
                            photo={event.imageURL}
                            isJoined={isJoined}
                        />
                    ))}
                </AllEventsWrapper>
            </BodyWrapper>
        </Wrapper>
    )
  }

export default AllEvent
