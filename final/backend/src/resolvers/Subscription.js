const Subscription = {
  eventCreated: {
    subscribe: (parent, { hostname }, { pubsub }) => {
      return pubsub.subscribe(`EVENT_CREATED_${hostname}`)
    },
  },
  eventJoined: {
    subscribe: (parent, { username }, { pubsub }) => {
      return pubsub.subscribe(`EVENT_JOINED_${username}`)
    },
  },
  eventCanceled: {
    subscribe: (parent, { username }, { pubsub }) => {
      return pubsub.subscribe(`EVENT_CANCELED_${username}`)
    },
  },
  commented: {
    subscribe: (parent, { eventId }, { pubsub }) => {
      return pubsub.subscribe(`COMMENTED_${eventId}`)
    },
  },
}

export default Subscription
