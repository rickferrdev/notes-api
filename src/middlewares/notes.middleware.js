import NotesValidation from "../validations/notes.validation.js";

export default class NotesMiddleware {
  constructor() {
    this.validation = new NotesValidation();
  }

  obtain = (request, response, next) => {
    try {
      const validation = this.validation.obtain({ ...request.params, ...request.query });
      response.locals.validation = validation;
      return next();
    } catch (error) {
      return next(error);
    }
  };

  delete = (request, response, next) => {
    try {
      const validation = this.validation.delete({ ...request.params });
      response.locals.validation = validation;
      return next();
    } catch (error) {
      return next(error);
    }
  };

  create = (request, response, next) => {
    try {
      const validation = this.validation.create({ ...request.body });
      response.locals.validation = validation;
      return next();
    } catch (error) {
      return next(error);
    }
  };

  update = (request, response, next) => {
    try {
      const validation = this.validation.update({ ...request.params, ...request.body });
      response.locals.validation = validation;
      return next();
    } catch (error) {
      return next(error);
    }
  };

  partial = (request, response, next) => {
    try {
      const validation = this.validation.partial({ ...request.params, ...request.body });
      response.locals.validation = validation;
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
