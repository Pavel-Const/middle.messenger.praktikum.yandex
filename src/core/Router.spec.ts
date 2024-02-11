// eslint-disable-next-line max-classes-per-file
import { expect } from "chai";
import sinon from "sinon";
import Router from "./Router";

describe("Router", () => {
  let router: Router;
  beforeEach(() => {
    global.window.history.pushState = sinon.stub();
    global.window.history.replaceState = sinon.stub();
    sinon.stub(window.history, "back");
    sinon.stub(window.history, "forward");
    router = new Router("#app");
    window.location.pathname = "/initial-path";
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create an instance of Router", () => {
    expect(router)
      .to
      .be
      .an
      .instanceof(Router);
  });

  it("use() should register a new route", () => {
    const path = "/test";

    class BlockFake {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty-function
      constructor() {
      }
    }

    router.use(path, BlockFake);

    // Проверяем, что в массиве routes теперь есть один элемент
    expect((router as any).routes)
      .to
      .have
      .lengthOf(1);
  });

  it("start()", () => {
    const spy = sinon.spy((router as any), "_onRoute");
    router.start();
    // Имитация изменения маршрута, если это часть теста
    window.history.pushState({}, "", "/test");
    window.dispatchEvent(new PopStateEvent("popstate"));
    // eslint-disable-next-line no-unused-expressions
    expect(spy.called).to.be.true;
  });

  it("go() should change the route", () => {
    const newPath = "/test-path";
    const onRouteSpy = sinon.spy(router, "_onRoute");
    
    router.go(newPath);
    
    // Проверяем, был ли вызван window.history.pushState с правильными аргументами
    expect(window.history.pushState).to.have.been.calledWith({}, "", newPath);
    // Проверяем, что _onRoute был вызван после изменения пути
    expect(onRouteSpy).to.have.been.calledWith(newPath);
  });

  it("back() should navigate one page back in history", () => {
    const backSpy = sinon.spy(window.history, "back");
    router.back();

    // eslint-disable-next-line no-unused-expressions
    expect(backSpy.calledOnce).to.be.true;
    backSpy.restore();
  });
  it("forward() should navigate one page forward in history", () => {
    const forwardSpy = sinon.spy(window.history, "forward");
    router.forward();

    // eslint-disable-next-line no-unused-expressions
    expect(forwardSpy.calledOnce).to.be.true;
    forwardSpy.restore();
  });
  it("getRoute() should return the correct route for a given path", () => {
    class TestBlock {}
    router.use("/test", TestBlock);
    router.use("/another", TestBlock);

    const testRoute = router.getRoute("/test");
    const anotherRoute = router.getRoute("/another");

    // eslint-disable-next-line no-unused-expressions
    expect(testRoute).to.not.be.undefined;
    // eslint-disable-next-line no-unused-expressions
    expect(anotherRoute).to.not.be.undefined;
  });
});
