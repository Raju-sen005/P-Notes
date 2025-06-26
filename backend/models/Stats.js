import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  views: Number,
  subscribers: Number,
  videos: Number,
  questions: Number,
  notes: Number,
});

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;