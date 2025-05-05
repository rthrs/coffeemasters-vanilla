export default class ProductItem extends HTMLElement {
    constructor() {
        super();    
    }   

    connectedCallback() {
        const template = document.getElementById("product-item-template");
        const content = template.content.cloneNode(true);

        const product = JSON.parse(this.dataset.product);
        content.querySelector("h4").textContent = product.name;
        content.querySelector("p.price").textContent = `$${product.price.toFixed(2)}`;
        content.querySelector("img").src = `data/images/${product.image}`;
        content.querySelector("a").addEventListener("click", event => {
            console.log(event.target.tagName);
            if (event.target.tagName.toLowerCase() === "button") {
                //TODO
            } else {
                app.router.go(`/product-${product.id}`);
            }
            event.preventDefault();
        })

        this.appendChild(content);    
      }
}

customElements.define("product-item", ProductItem);
