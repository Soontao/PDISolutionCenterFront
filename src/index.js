import { createApp } from "./pages/Entry";
import { ApplicationStore } from "./store/Store";
import Core from "sap/ui/core/Core";

Core.attachInit(() => {

  // init finished

  const start = createApp(ApplicationStore);

  start("content");

});


