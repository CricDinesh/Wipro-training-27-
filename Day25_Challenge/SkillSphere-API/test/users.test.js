const request = require("supertest");
const app = require("../src/app");
const expect = require("chai").expect;

describe("USER API - Integration Tests", () => {
  it("POST /api/users/register - success", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        username: "ganesh",
        email: "ganesh@example.com"
      });

    expect(res.status).to.equal(201);
    expect(res.body.success).to.equal(true);
  });

  it("POST /api/users/register - missing fields", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({});

    expect(res.status).to.equal(400);
    expect(res.body.success).to.equal(false);
  });
});
