export class Carta {
    constructor(id, nombre, precio, deck, color, tipo, mana, fuerza, resistencia, cantidad, img, link, rareza) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.deck = deck;
        this.color = color;
        this.tipo = tipo;
        this.mana = mana;
        this.fuerza = fuerza;
        this.resistencia = resistencia;
        this.cantidad = cantidad;
        this.img = img;
        this.link = link;
        this.rareza = rareza;
    }
}


 export class Mazo {
    constructor(coleccion = []) {
        this.coleccion = coleccion;
    }

    agregarCarta(objetoCarta) {
        this.coleccion.push(objetoCarta);
    }

    quitarCarta(objetoCarta) {
        const index = this.coleccion.indexOf(objetoCarta);
        if (index > -1) {
            this.coleccion.splice(index, 1);
        }
    }

}