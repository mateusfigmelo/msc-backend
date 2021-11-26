import { Express } from "express";
import controller from "../controllers";
import middleware from "../middleware";
import multer from 'multer';
const upload = multer();

export default function (app: Express) {
  /**
   * @todo implement the @routes for UserController
   */
  app.post("/user/", upload.single('profileImage'), controller.createUser);
  app.post('/contact/', controller.createContact);

  /**
   * @todo implement the @routes for EventController
   */
  app.post("/event/", controller.insertEvent);
  app.get("/event/", controller.getEvents);
  app.get("/event/:eventId/", controller.getEvent);
  app.get("/pastevent/", controller.getPastEvents);
  app.get("/upcomingevent/", controller.getUpcomingEvent);
  app.put("/event/:eventId", controller.updateEvent);
  app.put("/event/delete/:eventId", controller.deleteEvent);
  /**
   * @todo  implement the @routes for WebinarController
   */
  /**
   * @todo  implement the @routes for TopSpeakerController
   */
  /**
   * @todo  implement the @routes for ApplicationController
   */
}
