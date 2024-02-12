import { expect } from "chai";
import sinon from "sinon";
import { JSDOM } from "jsdom";
import Router from "./Router.ts";
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
class MockHistory {
  constructor() {
    this.entries = [];
    this.index = -1;
  }
  
  pushState(state, title, url) {
    this.entries.push({ state, title, url });
    this.index++;
  }
  
  back() {
    if (this.index > 0) {
      this.index--;
      const { url } = this.entries[this.index];
      // Выполните ваше действие при нажатии кнопки "назад"
    }
  }
  
  forward() {
    if (this.index < this.entries.length - 1) {
      this.index++;
      const { url } = this.entries[this.index];
      // Выполните ваше действие при нажатии кнопки "вперед"
    }
  }
}


describe("Router", () => {
  let router;
  let historyPushStateSpy;
  let historyBackSpy;
  let historyForwardSpy;
  beforeEach(() => {
    const { window } = new JSDOM("<!DOCTYPE html><div id=\"app\"></div>");
    global.window = window;
    global.document = window.document;
    historyPushStateSpy = sinon.spy(window.history, "pushState");
    historyBackSpy = sinon.spy(window.history, "back");
    historyForwardSpy = sinon.spy(window.history, "forward");
    global.window.history = new MockHistory();
    router = new Router("#app");
  });
  afterEach(() => {
    historyPushStateSpy.restore();
    historyBackSpy.restore();
    historyForwardSpy.restore();
    delete global.window;
    delete global.document;
  });
  it("должен инициализироваться с правильным rootQuery", () => {
    expect(router._rootQuery)
      .to
      .equal("#app");
  });
  it("должен добавлять маршрут корректно", () => {
    router.use("/test", TestBlock);
    expect(router.routes)
      .to
      .have
      .lengthOf(1);
  });
  it("должен обрабатывать маршруты правильно", () => {
    router.use("/test", TestBlock);
    router.start();
    if (router._currentRoute) {
      expect(router._currentRoute._pathname)
        .to
        .equal("/test");
    } else {
      throw new Error("Текущий маршрут не был установлен");
    }
  });
  it("должен переходить на новый маршрут", () => {
    router.use("/test", TestBlock);
    router.start();
    router.go("/new");
    expect(historyPushStateSpy.calledOnce).to.be.true;
  });
  it("должен возвращаться на предыдущий маршрут", () => {
    router.use("/test", TestBlock);
    router.start();
    router.go("/new");
    router.back();
    expect(router._currentRoute._pathname)
      .to
      .equal("/test");
  });
  it("должен перемещаться на следующий маршрут", () => {
    router.use("/test", TestBlock);
    router.use("/new", TestBlock);
    router.start();
    router.go("/test");
    router.forward();
    expect(router._currentRoute._pathname)
      .to
      .equal("/new");
  });
  // Вы можете написать больше тестов для покрытия других функций класса Router
});
describe("Route", () => {
  let route;
  let renderSpy;
  beforeEach(() => {
    const props = { rootQuery: "#app" };
    route = new Route("/test", TestBlock, props);
    renderSpy = sinon.spy(route, "render");
  });
  afterEach(() => {
    renderSpy.restore();
  });
  it("должен инициализироваться с правильным pathname", () => {
    expect(route._pathname)
      .to
      .equal("/test");
  });
  it("должен инициализироваться с правильным blockClass", () => {
    expect(route._blockClass)
      .to
      .equal(TestBlock);
  });
  it("должен инициализироваться с правильными props", () => {
    expect(route._props)
      .to
      .deep
      .equal({ rootQuery: "#app" });
  });
  it("должен сравнивать pathname правильно", () => {
    expect(route.match("/test")).to.be.true;
    expect(route.match("/other")).to.be.false;
  });
  it("должен рендерить блок правильно", () => {
    const { window } = new JSDOM("<!DOCTYPE html><div id=\"app\"></div>");
    global.window = window;
    global.document = window.document;
    route.render();
    expect(renderSpy.calledOnce).to.be.true;
    const root = document.querySelector("#app");
    expect(root.textContent.trim())
      .to
      .equal("Тестовое содержание");
  });
});
/* describe("Router", () => {
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
    router.use('/test', TestBlock);
    router.start();
    router.go('/new');
    expect(router._currentRoute._pathname).to.equal('/new');
  });
  it("back() should navigate one page back in history", () => {
    router.back();
    // eslint-disable-next-line no-unused-expressions
    expect(window.history.back.calledOnce).to.be.true;
  });
  it("forward() should navigate one page forward in history", () => {
    router.forward();
    // eslint-disable-next-line no-unused-expressions
    expect(window.history.forward.calledOnce).to.be.true;
  });
  it("getRoute() should return the correct route for a given path", () => {
    class TestBlock {
    }
    router.use("/test", TestBlock);
    router.use("/another", TestBlock);
    const testRoute = router.getRoute("/test");
    const anotherRoute = router.getRoute("/another");
    // eslint-disable-next-line no-unused-expressions
    expect(testRoute).to.not.be.undefined;
    // eslint-disable-next-line no-unused-expressions
    expect(anotherRoute).to.not.be.undefined;
  });
}); */
