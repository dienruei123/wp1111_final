import mongoose from "mongoose"

const { Schema } = mongoose

/******  Counter Schema  ******/
const CounterSchema = new Schema({
  userId: Number,
  eventId: Number,
  commentId: Number,
})
const CounterModel = mongoose.model("Counter", CounterSchema)
export default CounterModel
