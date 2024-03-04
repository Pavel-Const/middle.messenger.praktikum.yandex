import { JSDOM } from "jsdom";
import * as Components from "./src/components";
import { registerComponent } from "./src/core/registerComponent.js";

Object.entries(Components)
  .forEach(
    ([componentName, component]) => registerComponent(componentName, component)
  );

const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/"
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.navigator = {
  userAgent: "node.js"
};
