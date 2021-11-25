import { DocumentDefinition, FilterQuery } from "mongoose";
import { IEvent } from "../interfaces";
import EventModel from "../models/Event.model";

/**
 * @todo create @function insertEvent to save an event in the database
 */
export const insertEvent = async (eventData: DocumentDefinition<IEvent>) => {
  return await EventModel.create(eventData)
    .then(async (event) => {
      return event;
    })
    .catch((error) => {
      return error.message;
    });
};

/**
 * @todo create @function getEvent to fetch an event in the system
 * @param eventId @type string
 */
export const getEvent = async (eventId: string) => {
  return await EventModel.findById(eventId)
    .then(async (event) => {
      return event;
    })
    .catch((error) => {
      return error.message;
    });
};

/**
 * @todo create @function getEvents to fetch all the events in the system
 */
export const getEvents = async () => {
  return await EventModel.find()
    .then(async (events) => {
      return events;
    })
    .catch((error) => {
      return error.message;
    });
};

/**
 * @todo create @function getPastEvents to fetch an past events in the system
 */
export const getPastEvents = async () => {
  return await EventModel.find({ eventType: "PAST" })
    .then(async (events) => {
      return events;
    })
    .catch((error) => {
      return error.message;
    });
};

/**
 * @todo create @function getUpcomingEvent to fetch an upcoming event in the system
 */
export const getUpcomingEvent = async () => {
  return await EventModel.findOne({ eventType: "UPCOMING" })
    .limit(1)
    .sort({ $natural: -1 })
    .then(async (event) => {
      return event;
    })
    .catch((error) => {
      return error.message;
    });
};

/**
 * @todo create @function updateEvent to update an event in the system
 * @param eventId @type string
 * @param updateData @type DocumentDefinition<IEvent>
 */
export const updateEvent = async (
  eventId: string,
  eventData: DocumentDefinition<IEvent>
) => {
  return await EventModel.findByIdAndUpdate(eventId, eventData)
    .then(async (event) => {
      return await event;
    })
    .catch((error) => {
      return error.message;
    });
};

/**
 * @todo create @function deleteEvent to delete an event
 * @param eventId @type string
 */
export const deleteEvent = async (eventId: string) => {
  return await EventModel.findByIdAndDelete(eventId)
    .then(async (event) => {
      return event;
    })
    .catch((error) => {
      return error.message;
    });
};
