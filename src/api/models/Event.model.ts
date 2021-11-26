import mongoose, { Schema } from "mongoose";
import { IEvent } from "../interfaces";

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    dateTime: { type: Date, required: true },
    tags: [{ type: String, required: false }],
    link: { type: String, required: false },
    eventType: { type: String, enum: ["past", "upcoming"], required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const EventModel = mongoose.model<IEvent>("event", EventSchema);

export default EventModel;
