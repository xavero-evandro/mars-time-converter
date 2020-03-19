/* eslint-disable no-undef */
import httpMocks from "node-mocks-http";
import controller from "../src/api/controller";

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("GET /:timeUTC", () => {
  test("Should return 200", async done => {
    req.params = {
      timeUTC: "2020-03-18T19:56:55Z"
    };
    const result = {
      MarsSolDate: "51,976.43194",
      MartianCoordinatedTime: "10:21:60"
    };
    await controller.getMarsTime(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(result);
    expect(res._isEndCalled()).toBeTruthy();
    done();
  });

  test("Should return 400", async done => {
    req.params = {
      timeUTC: "20200-03-18T19:56:55Z"
    };
    await controller.getMarsTime(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
    done();
  });
});

describe("GET / with query", () => {
  test("Should return 200", async done => {
    req.query = {
      timeUTC: "2020-03-18T19:56:55Z"
    };
    const result = {
      MarsSolDate: "51,976.43194",
      MartianCoordinatedTime: "10:21:60"
    };
    await controller.getMarsTime(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(result);
    expect(res._isEndCalled()).toBeTruthy();
    done();
  });

  test("Should return 400", async done => {
    req.query = {
      timeUTC: "20200-03-18T19:56:55Z"
    };
    await controller.getMarsTime(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
    done();
  });
});
