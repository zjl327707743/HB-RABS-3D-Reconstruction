import { createRabsSceneApp } from "./app/rabsSceneApp.js";
import "./styles.css";

window.__HB_RABS_APP__ = createRabsSceneApp({
  page: "newModel",
  versionTitle: "HB-RABS v0.7 新增生产场景",
  initialDisplayMode: "static"
});
