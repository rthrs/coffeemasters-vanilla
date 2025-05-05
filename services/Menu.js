import API from "./API.js";

export async function loadData() {
    app.store.menu = await API.fetchMenu();
}

export async function getProductById(id) {
    if (app.store.menu === null) {
        await loadData();
    }

    for (let { products } of app.store.menu) {
        for (let product of products) {
            // Watch out - id can be string here... That's why we use ==
            if (product.id == id) {
                return product;
            }
        }
    }

    return null;
}
