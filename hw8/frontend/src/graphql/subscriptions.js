import { gql } from "@apollo/client"

export const MESSAGE_SUBSCRIPTION = gql`
  subscription message($to: String!, $from: String!) {
    message(to: $to, from: $from) {
      body
      sender
    }
  }
`
