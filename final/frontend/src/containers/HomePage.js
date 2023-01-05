import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useRent } from "./hooks/useRent"
import Participant from "./ParticipantPage"
import Host from "./HostPage"
import Admin from "./AdminPage"
import ComplexGrid from "../components/Grid"
import { useQuery } from "@apollo/client"
import { ALLEVENTS_QUERY } from "../graphql"
import { Typography } from "@mui/material"
import './css/homePage.css'
import CardWrapper from "../components/RecommendedBox"
import { useNavigate } from "react-router-dom"

const Wrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const HomeWrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #fce373;
`

const Title = styled.div`
  ${'' /* margin-top: 30px; */}
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  ${'' /* border: 1px solid rgb(136, 169, 230); */}
`
const Intro = styled.div`
  ${'' /* margin-top: 100px; */}
  width: 100%;
  height: 70%;
  display: flex;
  ${'' /* border: 1px solid black; */}
`
const Homepage = () => {
  const useRentContext = useRent()
  const { identity } = useRentContext
  const { signedIn } = useRentContext
  const { data, loading, error } = useQuery(ALLEVENTS_QUERY, { pollInterval: 1, })
  const [briefData, setBriefData] = useState(data)
  const filterLatest = () => {
    const ToNewDate = (date) => {
      let newDate = new Date(parseInt(date))
      return newDate
    }
    const sortedEvents = data.allEvents.slice().sort((a, b) => ToNewDate(a.eventdatefrom) - ToNewDate(b.eventdatefrom))
    console.log(sortedEvents)
    setBriefData({ allEvents: sortedEvents.slice(0, 6) });
    console.log(briefData)
  }

  useEffect(() => {
    if (data) {
      setBriefData(data)
      filterLatest()
      console.log("data")
    }
  }, [data])

  const Welcome = () => {
    return (
      <HomeWrapper>
        <Title>
          <div className="home-hero__title">
            create your event
          </div>
        </Title>
        <Intro>
          <div className="home-exhibition__inner">
            <div className="explore-area__header">
              <div className="explore-area__title">
                What's on
              </div>
            </div>
            <div className="work-wrapper">
              <div className="work-wrapper-viewport">
                <div className="filckity-slider">
                  {briefData && briefData.allEvents.map((info) => (
                    <CardWrapper
                      photo={info.imageURL}
                      name={info.eventname}
                      id={info.id}
                      index={briefData.allEvents.indexOf(info)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Intro>
      </HomeWrapper>
      // <Typography
      //   sx={{
      //     mt: 12,
      //     ml: 5,
      //   }}
      // >
      //   Welcome to Event Registration Center! Please first create an account and
      //   login to activate your own service.
      // </Typography>
    )
  }
  const renderPage = () => {
    if (!signedIn) return <Welcome />
    switch (identity) {
      case "Participant": {
        return <Participant />
      }
      case "Host": {
        return <Host />
      }
      case "Admin": {
        return <Admin />
      }
      default: {
        throw new Error("INVALID_IDENTITY_ERROR")
      }
    }
  }
  return <Wrapper>{renderPage()}</Wrapper>
}

export default Homepage
