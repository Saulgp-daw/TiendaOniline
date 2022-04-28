"use strict";

import {
    Carta, Mazo
} from "./Carta.js";

window.onload = () => {
    //nos aseguramos que esté nuestro item "miDeck", llamamos a nuestro carta template 
    //que es similar al de home y le mandamos nuestra colleción
    //finalmente llamamos a filtrarCartas
    if (localStorage.getItem("miDeck") && localStorage.getItem("usuario")) {
        var miDeck = new Mazo(JSON.parse(localStorage.getItem("miDeck")));
        cartaTemplate(miDeck.coleccion);
        filtrarCartas();
        filtrarRareza();

        //tendrá un event listener para a la que haya un cambio mandará el valor del select
        function filtrarCartas() {
            var select = document.getElementsByClassName("form-select")[0];
            select.addEventListener("change", function () {
                switch (select.value) {
                    case "blanca":
                        cartaTemplate(devolverColorFiltrado(miDeck.coleccion, "W"));
                        break;
                    case "azul":
                        cartaTemplate(devolverColorFiltrado(miDeck.coleccion, "U"));
                        break;
                    case "negra":
                        cartaTemplate(devolverColorFiltrado(miDeck.coleccion, "B"));
                        break;
                    case "roja":
                        cartaTemplate(devolverColorFiltrado(miDeck.coleccion, "R"));
                        break;
                    case "verde":
                        cartaTemplate(devolverColorFiltrado(miDeck.coleccion, "G"));
                        break;
                    case "incolora":
                        cartaTemplate(devolverColorFiltrado(miDeck.coleccion, undefined));
                        break;
                    default:
                        cartaTemplate(miDeck.coleccion);
                }
            });
        }

         //tendrá un event listener para a la que haya un cambio mandará el valor del segundo select
        function filtrarRareza(){
            var select = document.getElementsByClassName("form-select")[1];
            select.addEventListener("change", function () {
                switch (select.value) {
                    case "mythic":
                        cartaTemplate(devolverRarezaFiltrada(miDeck.coleccion, "mythic"));
                        break;
                    case "rare":
                        cartaTemplate(devolverRarezaFiltrada(miDeck.coleccion, "rare"));
                        break;
                    case "uncommon":
                        cartaTemplate(devolverRarezaFiltrada(miDeck.coleccion, "uncommon"));
                        break;
                    case "common":
                        cartaTemplate(devolverRarezaFiltrada(miDeck.coleccion, "common"));
                        break;
                    default:
                        cartaTemplate(miDeck.coleccion);
                }
            });
        }

        //cearemos un array temporal que al recorrer nuestra colección solo añada aquellas cartas que tengan 
        //en su atributo rareza el mismo que hemos pasado como parámentro, una vez hecho devolveremos el array
        //que será enviado a carta template
        function devolverRarezaFiltrada(coleccion, rareza){
            var cartasFiltradas = [];
            coleccion.forEach(carta => {
                if (carta.rareza == rareza) {
                    cartasFiltradas.push(carta);
                }
            });
            return cartasFiltradas;
        }

        //cearemos un array temporal que al recorrer nuestra colección solo añada aquellas cartas que tengan 
        //en su atributo color el mismo que hemos pasado como parámentro, una vez hecho devolveremos el array
        //que será enviado a carta template
        function devolverColorFiltrado(coleccion, colorFiltrado) {
            var cartasFiltradas = [];
            coleccion.forEach(carta => {
                if (carta.color[0] == colorFiltrado) {
                    cartasFiltradas.push(carta);
                }
            });
            return cartasFiltradas;
        }

        //misma finalidad que el cartaTemplate d ehome solo que esta vez hemos añadido unos parámetros de más
        function cartaTemplate(coleccion) {
            var divCartas = document.getElementById("cards");
            divCartas.innerHTML = "";
            const fragment = document.createDocumentFragment();
            const plantilla = document.querySelector("#plantilla-carta").content;

            coleccion.forEach(carta => {
                plantilla.querySelectorAll(".info")[0].href = carta.link;
                plantilla.querySelectorAll("img.misCartas")[0].src = carta.img;
                plantilla.querySelectorAll(".card-title")[0].textContent = carta.nombre;
                plantilla.querySelectorAll(".card-price")[0].textContent = carta.precio + "€";
                plantilla.querySelectorAll("#cantidad")[0].textContent = "Nº de cartas: " + carta.cantidad;
                plantilla.querySelectorAll(".card-rarity")[0].textContent = "Rareza: "+carta.rareza;
                switch (carta.color[0]) {
                    case "W":
                        plantilla.querySelectorAll(".card-body")[0].style.color = "black";
                        plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#ffefbf";
                        plantilla.querySelectorAll("table")[0].style.backgroundColor = "#ffefbf";
                        break;
                    case "U":
                        plantilla.querySelectorAll(".card-body")[0].style.color = "white";
                        plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#4184d1";
                        plantilla.querySelectorAll("table")[0].style.backgroundColor = "#4184d1";
                        break;
                    case "B":
                        plantilla.querySelectorAll(".card-body")[0].style.color = "white";
                        plantilla.querySelectorAll(".card")[0].style.backgroundColor = "black";
                        plantilla.querySelectorAll("table")[0].style.backgroundColor = "black";
                        break;
                    case "R":
                        plantilla.querySelectorAll(".card-body")[0].style.color = "white";
                        plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#c7676f";
                        plantilla.querySelectorAll("table")[0].style.backgroundColor = "#c7676f";
                        break;
                    case "G":
                        plantilla.querySelectorAll(".card-body")[0].style.color = "black";
                        plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#8adb8d";
                        plantilla.querySelectorAll("table")[0].style.backgroundColor = "#8adb8d";
                        break;
                    default:
                        plantilla.querySelectorAll(".card-body")[0].style.color = "black";
                        plantilla.querySelectorAll(".card")[0].style.backgroundColor = "#a6a5a2";
                        plantilla.querySelectorAll("table")[0].style.backgroundColor = "#a6a5a2";
                        break;
                }
                const clon = plantilla.cloneNode(true);
                fragment.appendChild(clon);
            });
            divCartas.appendChild(fragment);
        }
    }
}