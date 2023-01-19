import mongoose from "mongoose"

const { Schema } = mongoose
const IDENTITY_TYPES = ["ordinary", "host", "admin"]

/******  User Schema  ******/
const UserSchema = new Schema({
  id: Number,
  username: { type: String, required: [true, "Name field is required."] },
  passwd: { type: String, required: [true, "Password field is required."] },
  identity: { type: String, required: [true, "Identity field is required."] },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  // events: [{ type: String }],
  isLoggedIn: Boolean,
  loggedInAt: Date,
})
const UserModel = mongoose.model("User", UserSchema)

// /******  Host Schema  ******/
// const HostSchema = new Schema({
//   hostname: { type: String, required: [true, "Name field is required."] },
//   passwd: { type: String, required: [true, "Password field is required."] },
//   //   identity: { type: String, required: [true, "Identity field is required."] },
//   //   events: [{ type: Schema.Types.ObjectId, ref: "Events" }],
//   events: [{ type: String }],
// })
// const HostModel = mongoose.model("Host", HostSchema)

// /******  Admin Schema  ******/
// const AdminSchema = new Schema({
//   adminname: { type: String, required: [true, "Name field is required."] },
//   passwd: { type: String, required: [true, "Password field is required."] },
//   //   identity: { type: String, required: [true, "Identity field is required."] },
//   //   events: [{ type: Schema.Types.ObjectId, ref: "Events" }],
//   //   events: [{ type: String }],
// })
// const AdminModel = mongoose.model("Admin", AdminSchema)

// export { UserModel, HostModel, AdminModel }
export default UserModel
