import NotesResponse from "../responses/notes.response.js";
import NotesService from "../services/notes.service.js";

export default class NotesController {
  constructor() {
    this.response = new NotesResponse();
    this.service = new NotesService();
  }

  obtain = (request, response, next) => {
    try {
      const validation = response.locals.validation;

      const data = this.service.obtain(validation);
      return this.response.send(data, response);
    } catch (error) {
      return next(error);
    }
  };

  create = (request, response, next) => {
    const validation = response.locals.validation;

    try {
      const data = this.service.create(validation);

      return this.response.send(data, response);
    } catch (error) {
      return next(error);
    }
  };

  update = (request, response, next) => {
    const validation = response.locals.validation;

    try {
      const data = this.service.update(validation);

      return this.response.send(data, response);
    } catch (error) {
      return next(error);
    }
  };

  partial = (request, response, next) => {
    const validation = response.locals.validation;

    try {
      const data = this.service.partial(validation);

      return this.response.send(data, response);
    } catch (error) {
      return next(error);
    }
  };

  delete = (request, response, next) => {
    const validation = response.locals.validation;

    try {
      const data = this.service.delete(validation);

      return this.response.send(data, response);
    } catch (error) {
      return next(error);
    }
  };
}
