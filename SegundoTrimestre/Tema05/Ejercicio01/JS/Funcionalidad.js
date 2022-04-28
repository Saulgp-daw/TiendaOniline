function insertarFila(){
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

function eliminarFila(id){
    var fila = document.getElementById("fila_" + id);
    var inputs = fila.getElementsByTagName("input");
    enviarFormulario(inputs, "eliminar", true);
}

function cambiarFila(inputs, readOnly = false, bgColor = '#faed8e') {
    for (var input of inputs) {
        if (input.name != 'id') {
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
            alert("Datos "+mensaje+" correctamente");
            if(reload){ location.reload(true); }
        }else{
            alert("Hubo un error al "+operacion+" los datos");
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