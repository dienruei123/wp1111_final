import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ButtonAppBar from "../components/AppBar.js"
import Comment from "./comment"
import newyearpic from "../eventPictures/2023_NEW-YORK.jpg"
import { useRent } from "./hooks/useRent"
import { useParams } from "react-router-dom"
import Stars from "../components/stars"
import { IconButton } from "@mui/material"
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded"
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd"
import DateRangeIcon from "@mui/icons-material/DateRange"
import PlaceIcon from "@mui/icons-material/Place"
import StyleIcon from "@mui/icons-material/Style"
import FestivalIcon from "@mui/icons-material/Festival"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import { useQuery } from "@apollo/client"
import { EVENT_QUERY } from "../graphql/queries.js"
import { weekdays } from "moment"
import "./css/eventPage.css"
import { COMMENTED_SUBSCRIPTION } from "../graphql/subscriptions.js"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  margin-top: 65px;
  height: 90%;

  display: flex;
  flex-direction: row;
  align-items: space-around;
  justify-content: space-around;
  overflow: auto;
`

const EventWrapper = styled.div`
  height: 100%;
  width: 70%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: auto;
`
const CommentWrapper = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`
const HostWrapper = styled.div`
  margin: 50px auto;
  display: flex;
  min-width: 320px;
  max-width: fit-content;
  font-family: Roboto;
  flex-direction: row;
`
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const Event = () => {
    const { id } = useParams()
    console.log(id)
    const useRentContext = useRent()
    const { toDateString } = useRent()
    const { username, addtoEventlist } = useRentContext
    const { identity } = useRentContext
    const { userEvents , addComment} = useRentContext
    const { data, error, subscribeToMore} = useQuery(EVENT_QUERY, {
        variables: {
            id: id,
        },
        pollInterval: 1,
    })
    // console.log(data.event, error)
    // const { event } = data
    //   console.log(event)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [isjoined, setIsjoined] = useState(false)

    useEffect(() => {
        console.log(userEvents)
        if (userEvents.some((event) => event.eventId === id)) setIsjoined(true)
        else setIsjoined(false)
    }, [])

    useEffect(() => {
        if (data && !error) {
            setComments(data.event.comments)
        }
    }, [data])

    useEffect(()=> {
        try{
            subscribeToMore({
                document: COMMENTED_SUBSCRIPTION,
                variables:{
                    eventId: id,
                },
                updateQuery: (prev, {subscriptionData}) => {
                    if(!subscriptionData.data) return prev
                    const comment = subscriptionData.data.commented
                    console.log(prev)
                    
                    return {
                        event: {
                            ...prev.event, 
                            rating: (prev.event.rating * prev.event.comments.length + comment.stars) / (prev.event.comments.length + 1),
                            comments: [...prev.event.comments, comment]
                        }
                    }
                }
            })
        }
        catch(e) {
            console.log(e)
        }
    }, [subscribeToMore])


    //   let rating = 0
    //   for (let i = 0; i < comments.length; i++) {
    //     rating += comments[i].rating
    //   }
    //   rating = rating / comments.length

    const AddToEventlist = async () => {
        try {
            const { data } = await addtoEventlist({
                variables: {
                    username: username,
                    eventId: id,
                },
            })
            //   console.log(data)
            if (data) {
                if (data.addtoEventlist === "EVENT_CANCELLED") setIsjoined(false)
                else if (data.addtoEventlist === "EVENT_JOINED") setIsjoined(true)
                else throw new Error("ADDEVENTSTATUS_INVALID_ERROR")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Wrapper>
            <ButtonAppBar />
            {!data ? (
                <></>
            ) : (
                <BodyWrapper>
                    <EventWrapper>
                        <div className="mainpictureContainer">
                            <div className="mainpicture">
                                <img
                                    className="photo"
                                    src={data.event.imageURL}
                                    alt="new year"
                                />
                            </div>
                            <div className="infoContainer">
                                <div className="list">
                                    <FestivalIcon style={{ padding: "0.5em" }} />
                                    <p className="info">{data.event.eventname}</p>
                                </div>
                                <div className="list">
                                    <DateRangeIcon style={{ padding: "0.5em" }} />
                                    <p className="info">
                                        {toDateString(data.event.eventdatefrom)}
                                    </p>
                                </div>
                                <div className="list">
                                    <PlaceIcon style={{ padding: "0.5em" }} />
                                    <p className="info">New York City </p>
                                </div>
                                <div className="list">
                                    <StyleIcon style={{ padding: "0.5em" }} />
                                    <div className="info">
                                        <Stack direction="row" spacing={1}>
                                            {data.event.tags.map((tagName) => (
                                                <Chip key={tagName} label={tagName} color="primary" />
                                            ))}
                                        </Stack>
                                    </div>
                                </div>
                                {identity === "Participant" ? (
                                    <div className="list">
                                        <IconButton
                                            onClick={AddToEventlist}
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {isjoined ? (
                                                <BookmarkAddedIcon style={{ padding: "0.5em" }} />
                                            ) : (
                                                <BookmarkAddIcon style={{ padding: "0.5em" }} />
                                            )}
                                        </IconButton>
                                        <p className="info">
                                            {isjoined ? "Joined" : "Add to My Event"}
                                        </p>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <h2 className="description">Description</h2>
                        <hr className="line"></hr>
                        <div className="paragraph">
                            <p>{data.event.description}</p>
                        </div>
                        <HostWrapper>
                            <div style={{ padding: "0px 25px 0px 0px" }}>
                                <div className="hostIcon">{data.event.hostname[0]}</div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <strong className="hostedby">HOSTED BY</strong>
                                <p className="hostName">{data.event.hostname}</p>
                                {/* <h1></h1> */}
                                {/* <button className="buttonstyle" type="button">
                  <span>Contact</span>
                </button> */}
                            </div>
                        </HostWrapper>
                    </EventWrapper>
                    <CommentWrapper>
                        {comments.length === 0 ? (
                            <div className="centerparagraph">
                                <p>No Rating yet ...</p>
                            </div>
                        ) : (
                            <div className="centerparagraph">
                                <Stars rating={data.event.rating} displayScore={true} />
                            </div>
                        )}
                        <div className="commentsContainer">
                            <Comment
                                username={username}
                                eventId={id}
                                comments={comments}
                                setComments={setComments}
                                addComment={addComment}
                            />
                        </div>
                    </CommentWrapper>
                </BodyWrapper>
            )}
        </Wrapper>
    )
}

export default Event
