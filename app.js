import { loadData } from "./services/Menu.js";
import Store from "./services/Store.js";
import Router from "./services/Router.js";

// Instead of importing the components you can declare web-components directly in app.js
import "./components/MenuPage.js";
import "./components/ProductItem.js";
import "./components/CartItem.js";
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

window.addEventListener('app-cart-change', event => {
    const badge = document.getElementById('badge');
    const qty = app.store.cart.reduce((acc, { quantity }) => acc + quantity, 0);
    
    badge.textContent = qty;
    badge.hidden = qty === 0;
});
