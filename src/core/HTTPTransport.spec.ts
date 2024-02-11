import sinon from "sinon";
import { HTTPTransport, METHODS } from "./HTTPTransport.ts";
import { expect } from "chai";
import constants from "../constants";

describe("HttpTransport", () => {
  let http: HTTPTransport;

  beforeEach(() => {
    http = new HTTPTransport("/test");
  });
  afterEach(() => {
    sinon.restore();
  });
  it("Метод GET", async () => {
    const requestStub = sinon.stub(http, "request").resolves();
    await http.get("", { data: { a: "1", b: "2 2" } });

    const expectedUrl = `${constants.HOST}/test?a=1&b=2%202`;

    // eslint-disable-next-line no-unused-expressions
    expect(requestStub.calledWithMatch(expectedUrl, { method: METHODS.GET })).to.be.true;
  });
  it("Метод POST", async () => {
    const requestStub = sinon.stub(http, "request").resolves();
    const testData = { a: "1", b: "2 2" };

    await http.post("", { data: testData });

    const expectedUrl = `${constants.HOST}/test`;

    // eslint-disable-next-line no-unused-expressions
    expect(requestStub.calledWithMatch(expectedUrl, {
      method: METHODS.POST,
      data: testData
    })).to.be.true;
  });

  it("Метод PUT", async () => {
    const requestStub = sinon.stub(http, "request").resolves();
    const testData = { c: "3", d: "4 4" };

    await http.put("", { data: testData });

    const expectedUrl = `${constants.HOST}/test`;

    // eslint-disable-next-line no-unused-expressions
    expect(requestStub.calledWithMatch(expectedUrl, {
      method: METHODS.PUT,
      data: testData
    })).to.be.true;
  });

  it("Метод DELETE", async () => {
    const requestStub = sinon.stub(http, "request").resolves();
    const testData = { e: "5", f: "6 6" };

    await http.delete("", { data: testData });

    const expectedUrl = `${constants.HOST}/test`;

    // eslint-disable-next-line no-unused-expressions
    expect(requestStub.calledWithMatch(expectedUrl, {
      method: METHODS.DELETE,
      data: testData
    })).to.be.true;
  });
});
