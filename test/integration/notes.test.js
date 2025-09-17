import server from "../../src/index.js";
import supertest from "supertest";
import assert from "assert";
import NotesDatabase from "../../src/databases/notes.database.js";
import { before, describe, it } from "mocha";

const database = new NotesDatabase("test");
const request = supertest(server);

describe("Notes API - Successful responses", () => {
  before("Database - Setup", () => {
    database.sqlite3.prepare("delete from notes").run();
    database.sqlite3.prepare("delete from sqlite_sequence where name = 'notes'").run();
    database.create({ title: "npmjs", content: "https://npmjs.com" })
  });

  it("should return OK when creating a new note", (done) => {
    request.post("/notes")
      .send({ title: "github", content: "https://github.com" })
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        assert.equal(res.body.success, true);
        assert.equal(res.body.data.items.length, 1);
        assert.equal(res.body.metadata.count, 1);

        return done(error);
      })
  });

  it("should return OK when getting a note by ID", (done) => {
    request.get("/notes/1")
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        assert.equal(res.body.success, true);
        assert.equal(res.body.data.items.length, 1);
        assert.equal(res.body.metadata.count, 1);

        return done(error);
      })
  });

  it("should return OK when getting all notes", (done) => {
    request.get("/notes")
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        assert.equal(res.body.success, true);
        assert.equal(res.body.data.items.length, 2);
        assert.equal(res.body.metadata.count, 2);

        return done(error);
      })
  });

  it("should return OK when updating a notes by ID", (done) => {
    request.put("/notes/2")
      .expect(200)
      .send({ title: "aws", content: "https://aws.amazon.com" })
      .end((error, res) => {
        if (error) return done(error);

        assert.equal(res.body.success, true);
        assert.equal(res.body.data.items.length, 1);
        assert.equal(res.body.metadata.count, 1);

        return done(error);
      })
  });

  it("should return OK when partially updating a note by ID", (done) => {
    request.patch("/notes/2")
      .send({ title: "fast" })
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        assert.equal(res.body.success, true);
        assert.equal(res.body.data.items.length, 1);
        assert.equal(res.body.metadata.count, 1);

        return done(error);
      })
  });

  it("should return OK when deleting a note by ID", (done) => {
    request.delete("/notes/1")
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        assert.equal(res.body.success, true);
        assert.equal(res.body.data.items.length, 1);
        assert.equal(res.body.metadata.count, 1);

        return done(error);
      })
  });
});

describe("Notes API - Error responses", () => {
  before("Database - Setup", () => {
    database.sqlite3.prepare("delete from notes").run();
    database.sqlite3.prepare("delete from sqlite_sequence where name = 'notes'").run();
  });

  it('should an error when creating a note without the title', (done) => {
    request
      .post("/notes")
      .send({ content: "node.js" })
      .expect(400, done)
  })

  it('should return an error getting a note that does dot exist', (done) => {
    request
      .get("/notes/4")
      .expect(404, done)
  })

  it('should return an error when updating a note with invalid ID', (done) => {
    request
      .put("/notes/1n")
      .send({ title: "node", content: "js" })
      .expect(400, done)
  })

  it('should return an error when deleting a note with invalid ID', (done) => {
    request
      .delete("/notes/1n")
      .expect(400, done)
  })
})
