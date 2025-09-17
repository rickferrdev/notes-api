import z from "zod";

export default class NotesValidation {
  constructor() {
    this.id = z.coerce.number().positive();
    this.title = z.string();
    this.content = z.string();

    this.limit = z.coerce.number().positive();
  }

  obtain(data) {
    if (!data.id) {
      return z.object({ limit: this.limit.default(10) }).parse(data);
    }

    return z.object({ id: this.id }).parse(data);
  }

  delete(data) {
    return z.object({ id: this.id }).parse(data);
  }

  create(data) {
    return z
      .object({
        title: this.title,
        content: this.content.optional(),
      })
      .parse(data);
  }

  update(data) {
    return z
      .object({
        id: this.id,
        title: this.title,
        content: this.content,
      })
      .parse(data);
  }

  partial(data) {
    return z
      .object({
        id: this.id,
        title: this.title.optional(),
        content: this.content.optional(),
      })
      .parse(data);
  }
}
