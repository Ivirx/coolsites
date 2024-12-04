window.onload = () => {
    const routes = document.querySelectorAll("[route]");
    const loading = document.querySelector("[loading]");

    routes.forEach(route => {
        route.onclick = () => {
            loading.classList.add("show");
            console.log(`Route : ${route.getAttribute("url")}`);

            const addresses = (route.getAttribute("url")).split("/");
            const crumbs = document.querySelectorAll(".breadcrumbs>span");

            let isAddressChanged = false;
            let addressCount = 0;
            let crumbsCount = 0;

            for (; crumbsCount < crumbs.length; crumbsCount++) {
                const crumb = crumbs[crumbsCount];

                if (!crumb.hasAttribute("address")) continue;

                if (crumb.getAttribute("address") !== addresses[addressCount]) isAddressChanged = true;

                if (isAddressChanged) {
                    crumb.classList.remove("show");
                    crumb.classList.add("hide");
                }

                addressCount++;
                if (addressCount > addresses.length) {
                    while (crumbsCount < crumbs.length) {
                        const crumb = crumbs[crumbsCount];
                        crumbsCount++;
                        if (!crumb.hasAttribute("address")) continue;

                        crumb.classList.remove("show");
                        crumb.classList.add("hide");
                    }

                    break;
                }
            }

            setTimeout(() => {
                addressCount = 0;
                crumbsCount = 0;
                for (; crumbsCount < crumbs.length; crumbsCount++) {
                    const crumb = crumbs[crumbsCount];

                    if (!crumb.hasAttribute("address")) continue;

                    crumb.setAttribute("address", addresses[addressCount]);
                    crumb.textContent = addresses[addressCount];

                    addressCount++;
                    if (addressCount > addresses.length) {
                        while (crumbsCount < crumbs.length) {
                            const crumb = crumbs[crumbsCount];
                            crumbsCount++;
                            if (!crumb.hasAttribute("address")) continue;

                            crumb.setAttribute("address", "null");
                            crumb.textContent = "null";
                        }

                        break;
                    }
                }

                loading.classList.remove("show");

                for (crumbsCount = 0; crumbsCount < (addresses.length + addresses.length - 1); crumbsCount = crumbsCount + 2) {
                    const crumb = crumbs[crumbsCount];
                    crumb.classList.remove("hide");
                    crumb.classList.add("show");
                }
            }, 600);

            console.log("Route is handled!");

        }
    });
}