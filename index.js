function mostrarResultados(results) {
    const contenedor = document.querySelector(".results");
    const template = document.querySelector("#results-item-template");

    contenedor.innerHTML = ''; // Limpiar resultados previos

    for (const r of results) {
        const clone = document.importNode(template.content, true);

        const titleEL = clone.querySelector(".results-item-title");
        titleEL.textContent = r.title;

        const conditionEL = clone.querySelector(".results-item-condition");
        conditionEL.textContent = r.condition;

        const sellCountEL = clone.querySelector(".results-item-sell-count-num");
        sellCountEL.textContent = r.sold_quantity;

        const priceEL = clone.querySelector(".results-item-price");
        priceEL.textContent = `$${r.price}`;

        const imgEL = clone.querySelector(".result-item-img");
        imgEL.src = r.thumbnail;

        const resultsItem = clone.querySelector(".results-item");
        resultsItem.addEventListener('mouseover', () => {
            const hoverSound = document.getElementById('hover-sound');
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        contenedor.appendChild(clone);
    }
}

function main() {
    const formEl = document.querySelector(".search-form");
    formEl.addEventListener("submit", function(e) {
        e.preventDefault();
        const palabraABuscar = e.target.buscar.value;
        console.log(palabraABuscar);
        fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar)
            .then((response) => response.json())
            .then(data => mostrarResultados(data.results));
    });

    // Opcional: Inicialización con resultados de ejemplo
    // mostrarResultados([{title: "Ejemplo", condition: "Nuevo", sold_quantity: 10, price: 1000, thumbnail: "https://via.placeholder.com/150"}]);
}

main();