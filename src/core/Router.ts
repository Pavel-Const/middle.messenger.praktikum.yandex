import Route from "./Route.ts";

type RouteBlockConstructor = new (props?: any) => any; // Замените 'any' на более конкретный тип, соответствующий конструктору блока
class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;
  private routes: Route[] = []; // Инициализация при объявлении
  public history: History = window.history; // Можно также инициализировать здесь
  private _currentRoute: Route | null = null;
  private _rootQuery: string = "";
  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }
  use(pathname: string, block: RouteBlockConstructor): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }
  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const currentTarget = event.currentTarget as Window;
      this._onRoute(currentTarget.location.pathname);
    };
    this._onRoute(window.location.pathname); // Вызываем _onRoute для установки текущего маршрута
  }
  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route; // Устанавливаем текущий маршрут
    route.render();
  }
  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }
  back(): void {
    this.history.back();
  }
  forward(): void {
    this.history.forward();
  }
  getRoute(pathname: string): Route | undefined {
    const route = this.routes.find(route => route.match(pathname));
    return route;
  }
}
export default Router;
