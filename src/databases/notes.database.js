import Database from "better-sqlite3";
import path from "node:path";
import env from "../utils/env.utils.js";
import fs from "node:fs";

export default class NotesDatabase {
  constructor(mode) {
    this.mode = mode || env.node_env

    const file = path.resolve(`database/database-${this.mode}.sqlite3`);

    if (!fs.existsSync(path.dirname(file))) {
      fs.mkdirSync(path.dirname(file), { recursive: true });

      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "", "utf-8");
      }
    }

    this.sqlite3 = new Database(file);

    this.initialize();
  }

  initialize() {
    this.sqlite3
      .prepare(
        `
          create table if not exists notes (
            id integer primary key autoincrement,
            title text,
            content text
          ) 
        `,
      )
      .run();
  }

  all(data) {
    return this.sqlite3
      .prepare(
        `
          select * from notes
          limit ?
        `,
      )
      .all(data.limit);
  }

  find(data) {
    return this.sqlite3
      .prepare(
        `
          select * from notes
          where id = ?
        `,
      )
      .get(data.id);
  }

  delete(data) {
    return this.sqlite3
      .prepare(
        `
          delete from notes
          where id = ?
          returning *;
        `,
      )
      .get(data.id);
  }

  create(data) {
    return this.sqlite3
      .prepare(
        `
          insert into notes
            (title, content)
          values
            (?, ?)
          returning *;
        `,
      )
      .get(data.title, data.content);
  }

  update(data) {
    const stmt = this.sqlite3.prepare(`
          update notes set
            title = ?,
            content = ?
          where
            id = ?
          returning *;
        `);
    return stmt.get(data.title, data.content, data.id);
  }

  partial(data) {
    return this.sqlite3.prepare(`
          update notes set
            title = coalesce(?, title),
            content = coalesce(?, content)
          where
            id = ?
          returning *;
        `).get(data.title, data.content, data.id);
  }
}
