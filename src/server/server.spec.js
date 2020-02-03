const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);

test("Return a list of countries from the countries REST API", () => {
  request.get("/getCountries").expect(response => {
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    done();
  });
});
