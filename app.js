import { loadData } from "./services/Menu.js";
import Store from "./services/Store.js";
import Router from "./services/Router.js";

import "./components/MenuPage.js";
import "./components/ProductItem.js";
import "./components/DetailsPage.js";
import "./components/OrderPage.js";

window.app = {}
app.store = Store;
app.router = Router;

// const $ = function(args){ return document.querySelector(args);}
// const $$ = function(args){ return document.querySelectorAll(args);}

// HTMLElement.prototype.on = function(a, b, c){ return this.addEventListener(a, b, c); }
// HTMLElement.prototype.off = function(a, b){ return this.removeEventListener(a, b); }
// HTMLElement.prototype.$ = function(s){ return this.querySelector(s); }
// HTMLElement.prototype.$$ = function(s){ return this.querySelectorAll(s); }


window.addEventListener('DOMContentLoaded', async () => {
    loadData()
    app.router.init();
});
