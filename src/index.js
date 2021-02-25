import "./index.css";
import { rootDiv, routes } from "./router.js";

rootDiv.innerHTML = routes[window.location.pathname]();
