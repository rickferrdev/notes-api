import { Router } from "express";
import NotesController from "../controllers/notes.controller.js";
import NotesMiddleware from "../middlewares/notes.middleware.js";

export default class NotesRouter {
  constructor() {
    this.controller = new NotesController();
    this.middleware = new NotesMiddleware();

    this.handler();
  }

  handler = () => {
    const router = Router();

    for (const item of this.mapper()) {
      router[item.method](item.path, item.middleware, item.controller);
    }

    return router;
  };


  mapper() {
    return [
      {
        path: "/notes",
        method: "get",
        middleware: this.middleware.obtain,
        controller: this.controller.obtain,
      },
      {
        path: "/notes/:id",
        method: "get",
        middleware: this.middleware.obtain,
        controller: this.controller.obtain,
      },
      {
        path: "/notes",
        method: "post",
        middleware: this.middleware.create,
        controller: this.controller.create,
      },
      {
        path: "/notes/:id",
        method: "put",
        middleware: this.middleware.update,
        controller: this.controller.update,
      },
      {
        path: "/notes/:id",
        method: "patch",
        middleware: this.middleware.partial,
        controller: this.controller.partial,
      },
      {
        path: "/notes/:id",
        method: "delete",
        middleware: this.middleware.delete,
        controller: this.controller.delete,
      },
    ];
  }
}
