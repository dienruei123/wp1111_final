import { GraphQLError } from "graphql"
import jwt from "jsonwebtoken"
import dotenv from "dotenv-defaults"

dotenv.config()
const Query = {
  users: async (parent, { token }, { UserModel }) => {
    // const user = await UserModel.findOne({ username })
    // if (!user) throw new GraphQLError(`User '${username}' not found!!`)
    // console.log(user)
    if (!token) throw new GraphQLError("TOKEN_NOTFOUND_ERROR")
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    let jwtSecretKey = process.env.JWT_SECRET_KEY

    const data = jwt.verify(token, jwtSecretKey)
    if (!data) throw new GraphQLError("QUERY_JWTSECRETKEY_ERROR")

    const user = await UserModel.findOne({ id: data.id })
    if (!user) throw new GraphQLError(`User '${data.username}' not found!!`)

    // console.log(user, data)
    if (!user.isLoggedIn || user.loggedInAt.getTime() !== data.loggedInAt)
      throw new GraphQLError("TOKEN_EXPIRED_ERROR")
    if (user.events.length) return user.populate(["events"])
    return user
  },
  allEvents: async (parent, args, { EventModel }) => {
    let events = await EventModel.find({})
    return events
  },
  event: async (parent, { id }, { EventModel }) => {
    // console.log(id)
    let event = await EventModel.findOne({ id })
    return event
  },
}

export default Query
