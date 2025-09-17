export default class NotesError extends Error {
  constructor(error) {
    super(error.message);

    this.name = this.constructor.name;

    this.title = error.title;
    this.code = error.code;
    this.status = error.status;
    this.detail = error.detail;
    this.errors = error.errors;


    Error.captureStackTrace(this, this.constructor);
  }
}
