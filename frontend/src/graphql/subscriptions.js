import { gql } from "@apollo/client"

export const EVENT_CREATED_SUBSCRIPTION = gql`
  subscription EventCreated($hostname: String!) {
    eventCreated(hostname: $hostname) {
      id
      eventname
      hostname
      eventdatefrom
      eventdateto
      imageURL
      tags
      description
      rating
    }
  }
`
export const EVENT_JOINED_SUBSCRIPTION = gql`
  subscription EventJoined($username: String!) {
    eventJoined(username: $username) {
      id
      eventname
      hostname
      eventdatefrom
      eventdateto
      imageURL
      tags
      description
      rating
      comments {
        id
        sender
        stars
        body
        createdAt
      }
    }
  }
`
export const EVENT_CANCELED_SUBSCRIPTION = gql`
  subscription EventCanceled($username: String!) {
    eventCanceled(username: $username) {
      id
      eventname
      hostname
      eventdatefrom
      eventdateto
      imageURL
      tags
      description
      rating
      comments {
        id
        sender
        stars
        body
        createdAt
      }
    }
  }
`

export const COMMENTED_SUBSCRIPTION = gql`
  subscription commented($eventId: ID!) {
    commented(eventId: $eventId) {
      id
      sender
      stars
      body
      createdAt
    }
  }
`
