import { expect } from "chai";
import sinon from "sinon";
import { JSDOM } from "jsdom";
import Route from "./Route.ts";

class TestBlock {
  getContent() {
    const div = document.createElement("div");
    div.textContent = "Тестовое содержание";
    return div;
  }

  dispatchComponentDidMount() {
    // Симуляция метода componentDidMount
  }

  hide() {
    // Симуляция метода hide
  }
}
describe("Route", () => {
  let route: Route;
  let renderSpy: sinon.SinonSpy;
  let window: any;
  beforeEach(() => {
    const props = { rootQuery: "#app" };
    window = new JSDOM("<!DOCTYPE html><div id=\"app\"></div>").window;
    // eslint-disable-next-line no-global-assign
    document = window.document;
    route = new Route("/test", TestBlock, props);
    renderSpy = sinon.spy(route, "render");
  });
  afterEach(() => {
    renderSpy.restore();
  });
  it("должен сравнивать pathname правильно", () => {
    // eslint-disable-next-line no-unused-expressions
    expect(route.match("/test")).to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(route.match("/other")).to.be.false;
  });
  it("должен рендерить блок правильно", () => {
    route.render();
    const root = window.document.querySelector("#app");
    // eslint-disable-next-line no-unused-expressions
    expect(renderSpy.calledOnce).to.be.true;
    expect(root?.textContent?.trim()).to.equal("Тестовое содержание");
  });
});
