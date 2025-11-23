const request = require("supertest");
const app = require("../src/app");

describe("COURSES API - Unit Tests", () => {
  it("GET /api/courses should return list of courses", async () => {
    const res = await request(app).get("/api/courses");

    require("chai").expect(res.status).to.equal(200);
    require("chai").expect(res.body.success).to.equal(true);
    require("chai").expect(res.body.data).to.be.an("array");
  });
});
