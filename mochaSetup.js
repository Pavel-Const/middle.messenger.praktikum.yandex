import { JSDOM } from "jsdom";
import * as Components from "./src/components";
import { registerComponent } from "./src/core/registerComponent.js";

Object.entries(Components).forEach(
  ([componentName, component]) => registerComponent(componentName, component)
);

// jsdom
const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://example.com"
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;