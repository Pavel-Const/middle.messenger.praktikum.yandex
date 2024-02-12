import { expect } from "chai";
import Router from "./Router.ts";
import Route from "./Route.ts";
import sinon from "sinon";
import Block from "./Block.ts";

describe("Router", () => {
  let router: Router;
  let pushStateStub: sinon.SinonStub;
  beforeEach(() => {
    router = new Router("#app");
    pushStateStub = sinon.stub(router.history, "pushState");
  });
  afterEach(() => {
    pushStateStub.restore();
  });

  it("должен добавлять маршрут с использованием метода use", () => {
    router.use("/test", Block);
    const route = router.getRoute("/test");
    expect(route)
      .to
      .be
      .instanceOf(Route);
  });
  it("должен начинать маршрутизацию с использованием метода start", () => {
    const spy = sinon.spy(router as any, "_onRoute");
    router.start();
    // eslint-disable-next-line no-unused-expressions
    expect(spy.called).to.be.true;
  });
  it("должен перейти на новый маршрут с использованием метода go", () => {
    router.go("/new-route");
    // eslint-disable-next-line no-unused-expressions
    expect(pushStateStub.calledOnce).to.be.true;
    expect(pushStateStub.firstCall.args)
      .to
      .deep
      .equal([{}, "", "/new-route"]);
  });
  it("должен вернуться на предыдущий маршрут с использованием метода back", () => {
    const spy = sinon.spy(router.history, "back");
    router.back();
    // eslint-disable-next-line no-unused-expressions
    expect(spy.called).to.be.true;
  });
  it("должен перейти на следующий маршрут с использованием метода forward", () => {
    const spy = sinon.spy(router.history, "forward");
    router.forward();
    // eslint-disable-next-line no-unused-expressions
    expect(spy.called).to.be.true;
  });
  it("должен получить маршрут по пути с использованием метода getRoute", () => {
    router.use("/test", Block);
    const route = router.getRoute("/test");
    expect(route)
      .to
      .be
      .instanceOf(Route);
  });
});
