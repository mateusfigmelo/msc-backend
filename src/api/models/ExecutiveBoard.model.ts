import mongoose, { Schema } from "mongoose";
import { IExecutiveBoard } from "../interfaces/IExecutiveBoard";

const ExecutiveBoardSchema = new Schema<IExecutiveBoard>({
  year: { type: String, required: true },
  board: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'boardmember'}
  ],
});

const ExecutiveBoardModel = mongoose.model<IExecutiveBoard>(
  "ececutiveboard",
  ExecutiveBoardSchema
);

export default ExecutiveBoardModel;
