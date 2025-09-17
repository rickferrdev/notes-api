import express from "express";
import NotesRouter from "./routers/notes.router.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import env from "./utils/env.utils.js";

const server = express();

server.use(express.json());

const router = new NotesRouter().handler();
const error = new ErrorMiddleware().handler;

server.use(router);

server.use(error);

server.listen(env.port, (error) => {
  if (error) throw new Error(error)
});

export default server;
