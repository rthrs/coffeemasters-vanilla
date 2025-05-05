export class MenuPage extends HTMLElement {
    constructor() {
        super();

        // Create ShadowDOM!
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch('/components/MenuPage.css');
            const css = await request.text();
            styles.textContent = css;
        }

        loadCSS();
    }

    connectedCallback() {
        const template = document.getElementById('menu-page-template');
        
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener('app-menu-change', () => {
            this.render();
        });

        // Don't forget about the initial render, otherwise, the page will not render on
        // navigation back, since event listener will not trigger again...
        this.render();
    }

    render() {
        const ulMenu = this.root.querySelector('#menu');

        if (app.store.menu) {
            ulMenu.innerHTML = '';

            for (let category of app.store.menu) {
                const liCategory = document.createElement("li");

                liCategory.innerHTML = `
                    <h3>${category.name}<h3/>
                    <ul class="category">
                    </ul>
                `;

                ulMenu.appendChild(liCategory);

                category.products.forEach(product => {
                    const item = document.createElement('product-item');

                    // instead using dataset you can also pass custom property
                    // but dataset properties have to be always strings!
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector('ul').appendChild(item);
                })
            }
        } else {
            ulMenu.innerHTML = 'Loading...';
        }
    }
}

customElements.define('menu-page', MenuPage);
