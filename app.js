import { initView } from "../view/view.js";

class App {
  constructor() {

  }

  start() {
    initView();
  }
};

const app = new App();
app.start();