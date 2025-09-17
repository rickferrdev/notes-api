import NotesError from "../errors/notes.error.js";
import NotesDatabase from "../databases/notes.database.js";
import { FAILED_CREATE_NOTE, NO_FOUND } from "../errors/constants.js";

export default class NotesService {
  constructor() {
    this.database = new NotesDatabase();
  }

  obtain(data) {
    if (!data.id && data.limit) {
      return this.database.all(data);
    }

    const note = this.database.find(data)

    if (!note) {
      throw new NotesError(NO_FOUND("Database returned nothing"))
    }

    return note;
  }

  delete(data) {
    const note = this.database.delete(data);

    if (!note) {
      throw new NotesError(NO_FOUND("ID does not exist"))
    }

    return note;
  }

  create(data) {
    const note = this.database.create(data);

    if (!note) {
      throw new NotesError(FAILED_CREATE_NOTE("Database returned nothing"))
    }

    return note;
  }

  update(data) {
    const note = this.database.update(data);

    if (!note) {
      throw new NotesError(NO_FOUND("ID does not exist"))
    }

    return note;
  }

  partial(data) {
    const note = this.database.partial(data);

    if (!note) {
      throw new NotesError(NO_FOUND("ID does not exist"))
    }

    return note;
  }
}
