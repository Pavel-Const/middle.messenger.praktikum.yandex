type RouteProps = {
  rootQuery: string;
};

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}

/* function render(query: string, block: any) {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = "";
    root.append(block.getContent());
  }
  return root;
} */

class Route {
  private _pathname: string;

  private _blockClass: any; // Replace 'any' with a more specific type if possible

  private _block: any | null; // Replace 'any' with a more specific type if possible

  private _props: RouteProps;

  constructor(pathname: string, view: any, props: RouteProps) { // Replace 'any' with the specific block class type
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    const root = document.querySelector(this._props.rootQuery);
    if (root) {
      root.innerHTML = "";
      this._block = new this._blockClass();
   /*   this._block.dispatchComponentDidMount();*/
      root.append(this._block.getContent());
    }
  }
}

export default Route;
