"use strict";
import {
    Carta, Mazo
} from "./Carta.js";

let cartas = [];
window.onload = () => {
    var miDeck = new Mazo();
    var packs = document.querySelectorAll("#packs li");
    //recogeremos los enlaces de los links clickados para llamar al fetch
    const recogerLink = (e) => {
        e.preventDefault();
        devolverMazo(e.target.href);
    }
    packs.forEach(pack => {
        pack.addEventListener("click", recogerLink);
    });
    //el fetch se ocupará de enviarle los datos del pack seleccionado a carta template
    function devolverMazo(enlaceApi) {
        fetch(enlaceApi)
            .then(response => response.json())
            .then(datos => {
                cartaTemplate(datos.data);
            });
        //seleccionadosTemplate();
    }

    seleccionadosTemplate();
    eventosBotonesMasMenos();

    //conprobar limite mazo recorrerá nuestra colección de cartas y sumará sus cantidades
    //en caso de haberse excedido saltará un alert y mandará un booleano para impedir que 
    //se entre en la condición que añadiría dicha carta
    function comprobarLimiteMazo() {
        if (localStorage.getItem("miDeck")) {
            var miDeck = new Mazo(JSON.parse(localStorage.getItem("miDeck")));
            const limiteCartas = 60;
            var cantidadCartas = 0;
            var excedido = false;
            miDeck.coleccion.forEach(carta => {
                cantidadCartas += carta.cantidad;
                if (cantidadCartas > limiteCartas) {
                    alert("Ha excedido el número de cartas");
                    excedido = true;
                }
            });
            return excedido;
        }
    }

    //Cartatemplate es la que se encargará de modificar la plantilla de cartas y mostrarla en pantalla
    //el switch es para que se vea el fondo de la carta del color al que representa y así hacerlo más visual
    function cartaTemplate(pack) {
        var divCartas = document.getElementById("cards");
        divCartas.innerHTML = "";
        var miPack = new Mazo();
        const fragment = document.createDocumentFragment();
        const plantilla = document.querySelector("#plantilla-carta").content;

        pack.forEach((carta) => {
            plantilla.querySelectorAll("button.btn")[0].id = carta.id;
            plantilla.querySelectorAll("img.card-img-top")[0].src = carta.image_uris.normal;
            plantilla.querySelectorAll(".card-title")[0].textContent = carta.name;
            plantilla.querySelectorAll(".card-text")[0].textContent = carta.prices.eur + "€";
            switch (carta.colors[0]) {
                case "W":
                    plantilla.querySelectorAll(".card-body")[0].style.color = "black";
                    plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#ffefbf";
                    break;
                case "U":
                    plantilla.querySelectorAll(".card-body")[0].style.color = "white";
                    plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#4184d1";
                    break;
                case "B":
                    plantilla.querySelectorAll(".card-body")[0].style.color = "white";
                    plantilla.querySelectorAll(".card")[0].style.backgroundColor = "black";
                    break;
                case "R":
                    plantilla.querySelectorAll(".card-body")[0].style.color = "white";
                    plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#c7676f";
                    break;
                case "G":
                    plantilla.querySelectorAll(".card-body")[0].style.color = "black";
                    plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#8adb8d";
                    break;
                default:
                    plantilla.querySelectorAll(".card-body")[0].style.color = "black";
                    plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#a6a5a2";
                    break;
            }
            const clon = plantilla.cloneNode(true);
            fragment.appendChild(clon);
            miPack.agregarCarta(new Carta(carta.id, carta.name, carta.prices.eur, carta.set_name, carta.colors, carta.type_line, carta.cmc, carta.power, carta.toughness, 1, carta.image_uris.normal, carta.scryfall_uri, carta.rarity));
        });
        divCartas.appendChild(fragment);
        darEventoABotonesAgregar(divCartas, miPack);
    }

    function darEventoABotonesAgregar(divCartas, miPack) {
        var listaBotones = divCartas.querySelectorAll("button.btn");
        if (localStorage.getItem("miDeck")) {
            miDeck = new Mazo(JSON.parse(localStorage.getItem("miDeck")));
        }
        habilitarDeshabilitarBotonesAgregar();

        if(localStorage.getItem("usuario")){
            console.log("Hay deck");
            listaBotones.forEach(boton => {
                //al darle click a nuestro botón, al tener el mismo id que nuestras cartas
                //usamos la función buscarCarta para, al pasarle dicho id lo busque en la colección del pack y devolveremos el objeto entero para trabajar con él
                boton.addEventListener("click", function () {
                    var miCarta = buscarCarta(this.id, miPack.coleccion);
                    //hacemos uso de si se supera el límite de cantidad, si no, preguntamos de nuevo si
                    //dicha carta ya existe, si ya existe modificamos la cantidad, borramos y volvemos a añadir, si no, simplemente la agregamos
                    if (!comprobarLimiteMazo()) {
                        this.disabled = "true";
                        if (!buscarCarta(this.id, miDeck.coleccion)) {
                            miDeck.agregarCarta(miCarta);
                        } else {
                            miDeck.quitarCarta(miCarta);
                            miCarta.cantidad += 1;
                            miDeck.agregarCarta(miCarta);
                        }
                        localStorage.setItem("miDeck", JSON.stringify(miDeck.coleccion));
                        seleccionadosTemplate();
                        eventosBotonesMasMenos();
                    }
    
                });
            });
        }
        
    }
    //seleccionados template es la que se encargará de mostrar las cartas seleccionadas
    //en la tabla de la derecha, nos aseguramos que hay un item de nombre "miDeck" para proceder
    //esto solo recogerá nuestras cartas, llamará a calculartotal y prevenirCantidadOverflow y volverá a guardar el item "miDeck"
    function seleccionadosTemplate() {
        if (localStorage.getItem("usuario") && localStorage.getItem("miDeck")) {
            var miDeck = new Mazo(JSON.parse(localStorage.getItem("miDeck")));
            var tBody = document.getElementById("items");
            tBody.innerHTML = "";
            const fragment = document.createDocumentFragment();
            const plantilla = document.querySelector("#plantilla-seleccionados").content;
            var precioTotal = 0;

            miDeck.coleccion.forEach(carta => {
                precioTotal = parseFloat(carta.precio * carta.cantidad);
                plantilla.querySelectorAll("th")[0].id = carta.id;
                plantilla.querySelectorAll("th")[0].textContent = carta.nombre;
                plantilla.querySelectorAll("td")[0].textContent = carta.precio;
                plantilla.querySelectorAll("td")[1].textContent = carta.cantidad;
                plantilla.querySelectorAll("span")[0].textContent = precioTotal.toFixed(2);
                const clon = plantilla.cloneNode(true);
                fragment.appendChild(clon);
            });
            tBody.appendChild(fragment);
            calcularTotal();
            prevenirCantidadOverflow();
            localStorage.setItem("miDeck", JSON.stringify(miDeck.coleccion));
        }
    }
    //calcular total solo recorrerá nuevamente nuestra colección para hacer la 
    //multiplicación entre precio y cantidad de cada carta y sumarla a un total
    function calcularTotal() {
        if (localStorage.getItem("miDeck")) {
            var miDeck = new Mazo(JSON.parse(localStorage.getItem("miDeck")));
            var total = 0;
            miDeck.coleccion.forEach(carta => {
                total += carta.precio * carta.cantidad;
            });
        }
        if (total == 0) {
            document.getElementById("info").innerText = "Empty list - Start selecting cards!";
        } else {
            document.getElementById("info").innerText = 'Total: ' + total.toFixed(2) + "€";
        }
    }

    //procurará deshabilitar los botones "+" cuyas cartas superen la cantidad de 4
    function prevenirCantidadOverflow() {
        var tBody = document.getElementById("items");
        var botonesMas = tBody.querySelectorAll("button.sumar");
        botonesMas.forEach(btnMas => {
            var cantidad = parseFloat(btnMas.parentElement.previousElementSibling.innerText);
            if (cantidad >= 4) {
                btnMas.disabled = true;
            }
        });
    }

    //Esta es la función que para cada "+" y "-" se encargará de recoger a sus hermanos de precio y cantidad, hacer la suma o la resta y mostrarlo en
    //otro de ss hermanos, procurando además que no se supere el límite del mazo
    function eventosBotonesMasMenos() {
        if (localStorage.getItem("miDeck")) {
            miDeck = new Mazo(JSON.parse(localStorage.getItem("miDeck")));
        }
        var tBody = document.getElementById("items");
        var botonesMas = tBody.querySelectorAll("button.sumar");
        var botonesMenos = tBody.querySelectorAll("button.restar");
        var precioTotal = 0;

        botonesMas.forEach(btnMas => {
            btnMas.addEventListener("click", function () {
                if (!comprobarLimiteMazo()) {
                    var cantidad = parseFloat(btnMas.parentElement.previousElementSibling.innerText);
                    var precio = parseFloat(btnMas.parentElement.previousElementSibling.previousElementSibling.innerText);
                    precioTotal = (cantidad + 1) * precio;
                    btnMas.parentElement.nextElementSibling.children[0].innerText = precioTotal.toFixed(2);
                    btnMas.parentElement.previousElementSibling.innerText = parseInt(btnMas.parentElement.previousElementSibling.innerText) + 1;
                    var idCarta = btnMas.parentElement.parentElement.firstElementChild.id;
                    var carta = buscarCarta(idCarta, miDeck.coleccion);
                    miDeck.quitarCarta(carta);
                    carta.cantidad += 1;
                    if (cantidad >= 3) {
                        btnMas.disabled = true;
                    }
                    miDeck.agregarCarta(carta);
                    localStorage.setItem("miDeck", JSON.stringify(miDeck.coleccion));
                    calcularTotal();
                }

            });
        });

        botonesMenos.forEach(btnMenos => {
            btnMenos.addEventListener("click", function () {
                var cantidad = parseFloat(btnMenos.parentElement.previousElementSibling.innerText);

                var precio = parseFloat(btnMenos.parentElement.previousElementSibling.previousElementSibling.innerText);
                precioTotal = (cantidad - 1) * precio;
                btnMenos.parentElement.nextElementSibling.children[0].innerText = precioTotal.toFixed(2);
                btnMenos.parentElement.previousElementSibling.innerText = parseInt(btnMenos.parentElement.previousElementSibling.innerText) - 1;
                var idCarta = btnMenos.parentElement.parentElement.firstElementChild.id;
                var carta = buscarCarta(idCarta, miDeck.coleccion);
                miDeck.quitarCarta(carta);
                carta.cantidad -= 1;
                if (cantidad < 5) {
                    btnMenos.previousElementSibling.disabled = false;
                }
                if (carta.cantidad > 0) {
                    miDeck.agregarCarta(carta);
                }
                if (carta.cantidad == 0) {
                    btnMenos.parentElement.parentElement.innerHTML = "";
                }
                localStorage.setItem("miDeck", JSON.stringify(miDeck.coleccion));
                calcularTotal();
                habilitarDeshabilitarBotonesAgregar();
            });
        });
    }
    //Esta función servirá para cuando quitemos ua carta de nuestro template, habilitaremos el boton nuevamente
    //de la forma que, si no la encuentra en la colección lo ponemos a falso el deshabilitado y viceversa
    function habilitarDeshabilitarBotonesAgregar() {
        var divCartas = document.getElementById("cards");
        var listaBotones = divCartas.querySelectorAll("button.btn");
        if (localStorage.getItem("miDeck")) {
            miDeck = new Mazo(JSON.parse(localStorage.getItem("miDeck")));
            listaBotones.forEach(boton => {
                if (!buscarCarta(boton.id, miDeck.coleccion)) {
                    boton.disabled = false;
                } else {
                    boton.disabled = true;
                }
            });
        }
    }


    //buscar carta recibirá el id de una carta en concreto en dicho pack, si existe en ese la devuelve
    function buscarCarta(idCartaBuscar, pack) {
        var cartaEncontrada = null;
        pack.forEach(carta => {
            if (carta.id == idCartaBuscar) {
                cartaEncontrada = carta;
            }
        });
        return cartaEncontrada;
    }


}
