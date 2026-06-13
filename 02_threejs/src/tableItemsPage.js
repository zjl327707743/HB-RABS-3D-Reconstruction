import { createRabsSceneApp } from "./app/rabsSceneApp.js";
import "./styles.css";

window.__HB_RABS_APP__ = createRabsSceneApp({
  page: "tableItems",
  versionTitle: "HB-RABS 桌面物品版",
  initialDisplayMode: "static"
});
