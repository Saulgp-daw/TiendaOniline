miCarrito = [];

/*Como hemos hecho en el resto del código (insertar, modificar, borrar)
* Recogemos la fila y de ahí los valores que queremos, hacemos un objeto genérico y lo añadimos a nuestro carrito
* de ahí preguntamos si hay algún código repetido, si lo hya aumentamos el atributo de cantidad, si no lo añadimos como un objeto nuevo
* llamamos a dibujar carrito que se encargará de poner los datos en la página
*/
function agregarCarrito(id){
    var fila = document.getElementById("fila_" + id);
    var inputs = fila.getElementsByTagName("input");
    var descripcion = fila.querySelector("input[name='descripcion']").value;
    var precio = fila.querySelector("input[name='pventa']").value;
    var stock = parseInt(fila.querySelector("input[name='stock']").value);
    let productoEncontrado = miCarrito.find(prodBuscar => prodBuscar.codigo == id);
    
    if(productoEncontrado != undefined){
        if(productoEncontrado.cantidad < stock){
            let indiceProducto = miCarrito.indexOf(productoEncontrado);
            miCarrito[indiceProducto] = {"codigo": id, "descripcion": descripcion, "precio": precio, "cantidad":productoEncontrado.cantidad+1};
        }
        
    }else{
        if(stock > 0){
            miCarrito.push({"codigo": id, "descripcion": descripcion, "precio": precio, "cantidad":1});
        }
    }
    dibujarCarrito();
}

/**
 * Para cada producto del carrito, lo añadimos a nuestro div del html y además calculamos el IVA de cada producto y lo añadimos al precio total
 * Por último creamos el botón que llamará a confirmar compra
 */
function dibujarCarrito(){
    var listaCarrito = document.getElementById("miCarrito");
    listaCarrito.innerText = "";
    let precioTotal = 0;
    miCarrito.forEach(prod => {
        listaCarrito.innerHTML += "Código: "+prod.codigo+" | Descripción: "+prod.descripcion+" | Precio: "+prod.precio+"€ | Cantidad: "+prod.cantidad+" uds. <br>";
        precioTotal += parseFloat(prod.precio) * parseFloat(prod.cantidad) * 1.21;
    });

    if(miCarrito.length > 0){
        listaCarrito.innerHTML += "<h5>Total de su compra: "+precioTotal.toFixed(2)+" € (21% IVA incluido)</h5>"
        listaCarrito.innerHTML += "<button class='btn btn-success' id='botonConfirmar' onClick='confirmarCompra()'>Confirmar Compra</button>";
    }
}

/**
 * Para cada producto en mi carrito, busco la fila en mi html, modifico los valores por los de nuestro carrito y llamamos a la función que
 * enviaba el formulario con nuestros inputs.
 * El único problema de esto es que la compra se debe hacer en la misma página, porque si no buscará el id de una fila que no existe y dará error.
 * Por último vaciamos el carrito.
 */
function confirmarCompra(){
    miCarrito.forEach(prod => {
        var fila = document.getElementById("fila_" + prod.codigo);
        var inputs = fila.getElementsByTagName("input");
        var stock = parseInt(fila.querySelector("input[name='stock']").value) - prod.cantidad;
        if(stock > 0){
            fila.querySelector("input[name='stock']").value = stock;
        }else{
            fila.querySelector("input[name='stock']").value = 0;
        }
       
        enviarFormulario(inputs, "modificar");
    });
    miCarrito = [];
    dibujarCarrito();
}
/**
 * 
 * @param {*} id nuestro código del producto (que será el mismo que el de la fila_)
 * @param {*} estado dependiendo del estado preguntaremos por la cantidad que aumentar o disminuir y eso lo añadiremos al valor de la tabla,
 * luego enviamos el formulario
 */
function editarStock(id, estado = "aumentar") {
    var fila = document.getElementById("fila_" + id);
    var inputs = fila.getElementsByTagName("input");
    var stock = fila.querySelector("input[name='stock']").value;
    var nuevoStock;
    if (estado == "aumentar") {
        do {
            nuevoStock = parseInt(prompt(`Introduzca la cantidad que desea agregar al stock:`));
        } while (!Number.isInteger(nuevoStock) || nuevoStock < 0);
    } else {
        do {
            nuevoStock = parseInt(prompt(`Introduzca la cantidad que desea retirar, la cantidad no puede superar el stock actual (${stock}) `));
        } while (!Number.isInteger(nuevoStock) || nuevoStock > stock);
        nuevoStock = Math.abs(nuevoStock) * -1;
    }

    fila.querySelector("input[name='stock']").value = parseInt(fila.querySelector("input[name='stock']").value) + nuevoStock;
    enviarFormulario(inputs, "modificar");
}

function insertarFila() {
    var fila = document.getElementById("insertar");
    var inputs = fila.getElementsByTagName("input");
    enviarFormulario(inputs, "insertar", true);
}

function ModificarFila(id) {
    var fila = document.getElementById("fila_" + id);
    var inputs = fila.getElementsByTagName("input");
    var boton = document.getElementById("modificar_" + id);
    if (boton.innerText === "Modificar") {
        boton.innerText = "Guardar";
        cambiarFila(inputs);
    } else if (boton.innerText === "Guardar") {
        boton.innerText = "Modificar";
        enviarFormulario(inputs, "modificar");
        cambiarFila(inputs, true, "white");
    }
}

function eliminarFila(id) {
    var fila = document.getElementById("fila_" + id);
    var inputs = fila.getElementsByTagName("input");
    enviarFormulario(inputs, "eliminar", true);
}

function cambiarFila(inputs, readOnly = false, bgColor = '#faed8e') {
    for (var input of inputs) {
        if (input.name != 'codigo' && input.name != 'margen') {
            input.readOnly = readOnly;
            input.style.backgroundColor = bgColor;
        }
    }
}

function enviarFormulario(inputs, operacion, reload = false) {
    form = crearFormulario(inputs, operacion);
    //document.getElementsByTagName("body")[0].appendChild(form);
    //form.submit();
    enviarDatos(form, reload);
}

function enviarDatos(form, reload = false) {
    var url = form.getAttribute("action");
    var f = fetch(url, {
        body: new FormData(form),
        method: "post"
    });

    f2 = f.then(respuesta => respuesta.text());

    f2.then(respText => {
        try {
            var resultado = JSON.parse(respText).resultado;
        } catch (e) {
            console.log("Error en la cadena JSON: " + respText);
        }
        const operacion = form.elements['Operacion'].value;
        if (resultado === true) {
            switch (operacion) {
                case "insertar":
                    mensaje = "insertados";
                    break;
                case "modificar":
                    mensaje = "modificados";
                    break;
                case "eliminar":
                    mensaje = "borrados";
                    break;
            }
            alert("Datos " + mensaje + " correctamente");
            if (reload) { location.reload(true); }
        } else {
            alert("Hubo un error al " + operacion + " los datos");
        }
    })
}

function crearFormulario(inputs, operacion) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "../Controlador/mantenimientoProducto.php");
    form.setAttribute("enctype", "multipart/form-data");
    for (var input of inputs) {
        let name = input.name;
        let value = input.value;
        form.appendChild(crearInput(name, value));
    }
    form.appendChild(crearInput('Operacion', operacion));
    return form;
}

function crearInput(nombre, valor) {
    let input = document.createElement("input");
    input.name = nombre;
    input.value = valor;
    return input;
}