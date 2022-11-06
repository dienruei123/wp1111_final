import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
  name: String,
  subject: String,
  score: Number,
});

const ScordCard = mongoose.model("ScoreCard", ScoreCardSchema);

export default ScordCard;
