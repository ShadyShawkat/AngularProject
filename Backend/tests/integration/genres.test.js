const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("/api/genres", () => {
  beforeEach(() => (server = require("../../index")));
  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    afterEach(async () => {
      await server.close();
      await Genre.remove({});
    });

    it("should return all genres", async () => {
      Genre.collection.insertMany([{ name: "genre1" }, { name: "genre2" }]);
      const res = await request(server).get("/api/genres");

      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });

    it("should return the added genre", async () => {
      const genre = new Genre({ name: "testgenre" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      //   expect(res.body).toHaveProperty("name", genre.name);
      expect(res.status).toBe(200);
    });

    it("should return 404", async () => {
      const res = await request(server).get("/api/genres/" + 1);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    afterEach(async () => {
      await server.close();
      await Genre.remove({});
    });
    // it("should return 401 error if the user is not logged in", async () => {
    //   const res = await request(server)
    //     .post("/api/genres")
    //     .send({ name: "testGenre" });
    //   expect(res.status).toBe(401);
    // });

    it("should return 400 error if the genre is less than 5 charactera", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "test" });
      expect(res.status).toBe(400);
    });

    it("should return 400 error if the genre is more than 20 charactera", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "testtesttesttesttesttesttesttesttesttesttesttesttest" });
      expect(res.status).toBe(400);
    });

    it("should the genre if the genre is valid", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "testgenre" });

      const genre = await Genre.find({ name: "testgenre" });
      expect(genre).not.toBe(null);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "testgenre");
    });
  });
});
