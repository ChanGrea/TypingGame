/*
 * 라우팅 모듈
 */
import { resultTemplate } from "./result.js";
import { game } from "./game.js";

/* Routing Path
 * [path: component] 형태
 */
export const routes = {
  "/": game,
  "/result": resultTemplate
};

// Routing Root
export const rootDiv = document.getElementById("root");

// Routing Function
export const onNavigate = (pathname, data) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = routes[pathname](data);
};
