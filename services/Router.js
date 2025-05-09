const Router = {
    init: () => {
        document.querySelectorAll('a.navlink').forEach(a => {
            a.addEventListener('click', event => {
                event.preventDefault();
                const url = event.target.getAttribute("href")
                Router.go(url);
            })
        })

        window.addEventListener('popstate', event => {
            Router.go(event.state.route, false);
        })

        // Check the initial URL
        Router.go(location.pathname)
    },
    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        
        let pageElement = null;
        
        switch (route) {
            case '/':
                pageElement = document.createElement('menu-page');
                break;
            case '/order':
                pageElement = document.createElement('order-page');
                break;
            default:
                if (route.startsWith('/product-')) {
                    pageElement = document.createElement('details-page')
                    const paramId = route.substring(route.lastIndexOf('-') + 1);
                    pageElement.dataset.productId = paramId;
                }
        }

        const cache = document.querySelector('main');
        
        if (pageElement) {    
            cache.innerHTML = ""; // quick and dirty way to remove elements
            // cache.children[0].remove() // or we can remove elements like that
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            cache.innerHTML = "404"
        }
        
    }
}

export default Router;
