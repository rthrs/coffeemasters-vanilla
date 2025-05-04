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
        console.log('got to', route)

        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        
        let pageElement = null;
        
        switch (route) {
            case '/':
                pageElement = document.createElement('h1')
                pageElement.textContent = 'Menu';
                break;
            case '/order':
                pageElement = document.createElement('h1')
                pageElement.textContent = 'Your Order';
                break;
            default:
                if (route.startsWith('/product-')) {
                    pageElement = document.createElement('h1')
                    pageElement.textContent = 'Details';
                    const paramId = route.substring(route.lasIndexOf('-') + 1);
                    pageElement.dataset.id = paramId;
                }
        }

        if (pageElement) {
            const cache = document.querySelector('main');
            cache.innerHTML = "" // quick and dirty way to remove elements
            // cache.children[0].remove() // or we can remove elements like that
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        }
        
    }
}

export default Router;
