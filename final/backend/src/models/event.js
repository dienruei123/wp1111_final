import mongoose from "mongoose"

const { Schema } = mongoose

/******  Event Schema  ******/
const EventSchema = new Schema({
  // Event Info
  id: Number,
  eventname: { type: String, required: [true, "EventName field is required."] },
  hostname: { type: String, required: [true, "HostName field is required."] },
  eventdatefrom: {
    type: String,
    required: [true, "EventDate field is required."],
  },
  eventdateto: {
    type: String,
    required: [true, "EventDate field is required."],
  },
  imageURL: { type: String },
  tags: [{ type: String }],
  // subtitle: { type: String },
  description: { type: String },
  maxparticipants: Number,

  // Event subs
  participants: [{ type: String }],
  rating: Number,
  comments: [
    {
      id: Number,
      sender: String,
      stars: Number,
      body: String,
      createdAt: String,
    },
  ],
  onclicks: Number,

  // For admin
  verified: Boolean,
  trending: Boolean,
})

const EventModel = mongoose.model("Event", EventSchema)

export default EventModel
