import { ZodError } from "zod";
import NotesError from "../errors/notes.error.js";

export default class ErrorMiddleware {
  handler(error, request, response, next) {
    if (error instanceof ZodError) {
      response.status(400).json({
        title: "Invalid or missing data",
        detail: "Data submitted is allegedly incorrect",
        status: 400,
        errors: error.issues.map((issue) => ({
          path: issue.path,
          expected: issue.expected,
          message: issue.message,
        })),
      });

      return next();
    }

    if (error instanceof NotesError) {
      response.status(error.status || 400).send({
        title: error.title,
        code: error.code,
        detail: error.detail,
        ... (process.env["NODE_ENV"] !== "dev" ? null : {
          errors: error.errors
        })
      })

      return next();
    }

    if (error instanceof Error) {
      response.status(500).send({
        title: "Internal Error Server"
      })

      console.error(error);

      return next();
    }
  };
}
