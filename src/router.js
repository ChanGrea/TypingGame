/*
 * 라우팅 모듈
 */
import { result } from "./page/result.js";
import { game } from "./page/game.js";

/* Routing Path
 * [path: component] 형태
 */
export const routes = {
  "/public/index.html": game, // for Build
  "/": game,
  "/result": result
};

// Routing Root
export const rootDiv = document.getElementById("root");

// Routing Function
export const onNavigate = (pathname, data) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = routes[pathname](data);
};
