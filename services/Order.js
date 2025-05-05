import { getProductById } from "./Menu.js";

export async function addToCart(id) {
    const product = await getProductById(id)

    const item = app.store.cart.find(item => item.product.id == id);

    // Same problem as in case of redux or react because of our Proxy!
    // If we push directly to an array, we don't assign a new value, so
    // set trap will not trigger. Because of that we have to create a 
    // a copy of array with changed item inside. It just the way
    // we approach the problem...

    if (item) {
        app.store.cart = app.store.cart.map(item => {
            if (item.product.id == id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item;
        });

    } else {
        app.store.cart = [...app.store.cart, { product, quantity: 1}]
    }
}

export async function removeFromCart(id) {
    app.store.cart = app.store.cart.filter(({ product }) => product.id != id);
}
