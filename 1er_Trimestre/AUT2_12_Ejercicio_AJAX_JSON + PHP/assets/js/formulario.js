/*---------------------------------------------------------
						VARIABLES
-----------------------------------------------------------
*/

const formulario = document.getElementById('formulario'); // Coge el formulario
var inputs = document.querySelectorAll('#formulario input'); // Coge todos los inputs del formulario
var comprobar = false; // Va a comprobar si creo tanto el select como el input de matricula
var comprobarRedes = false; // Va a comprobar si el usuario tiene redes
var cualIptiene = ""; // Variable que va a saber que ip tiene el usuario
var quitarEspaciosIncialFinal = ""; // Variable que va a contar cuantos caracteres hay en el motivo del desplazamiento
var quitarEspaciosMas = ""; // Variable que va a contar cuantos caracteres hay en el motivo del desplazamiento
var contar=""; // Variable que va a contar cuantos caracteres hay en el motivo del desplazamiento


/*---------------------------------------------------------
					EXPRESIONES REGULARES
-----------------------------------------------------------
*/

const expresiones = {
	nombre: /([A-Z]){1}[a-z]*$/, // Empezar en mayuscula y despues solo letras y espacios 
	apellido: /([A-Z]){1}[a-z]*\s/, // Empezar en mayuscula y despues solo letras y espacios 
	dni: /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, // Empezar por sus 8 números  y despues solo letras correspondiente
	codpos: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/, // Empezar por sus 8 números  y despues solo letras correspondiente
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // coge todos los caracteres el @ y despues letras y numeros 
	persona: /^[1-9]$/i, // Un número de 1 al 9 
	fecha: /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/,
	instagram: /^[a-z0-9_\\_\ü]+$/, // Acepta _ - números y letras
	twitter:/(^|[^@\w])@(\w{1,15})\b/, // Empieza por @ y después acepta _ - números y letras
	fijo: /^[9|8][1-8][0-9][0-9]{2}[0-9]{2}[0-9]{2}$/, // Empieza con 9 o 8 despues de 1 a 8 (Depende de la comunidad autonoma) y despues el resto de números
	movilcaracter:/^[[+][0-9][0-9][0-9]{9}$/ , // Empieza con caracter + y los 2 numeros correspondientes y despues el resto de números
	movilsincaracter:/^[6-7][0-9]{8}/ , // Empieza con 6 o 7 y  despues el resto de números
	matricula: /^[0-9]{4}[-][A-Z]{3}$/, // 4 primeros números y después son 3 letras en mayuscula
	ipv6: /([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/, // 7 veces pone de 1 a 4 de 0 al 9 y minuscula y mayusculas y con :  y despues lo hace 1 vez mas y listo
	ipv4: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,// coge tres números . otros tres números . y otros tres 
	motivo:/([A-Z]){1}[a-z]*/ // Empieza por mayuscula  y despues acepta letras y numeros
}
/*---------------------------------------------------------
						OBJETOS
-----------------------------------------------------------
*/

/**
 * 
 * @param {string} nombre 
 * @param {string} apellido 
 * @param {string} dni 
 * @param {string} codpos 
 * @param {number} fijo 
 * @param {number} movil 
 * @param {string} fecha 
 * @param {string} correo 
 * @param {string} matricula 
 * @param {string} motivo 
 */

 function viajero(nombre,apellido,dni,codpos,fijo,movil,fecha,correo,matricula,motivo) {
	this.nombre = nombre;
	this.apellido = apellido;
	this.dni = dni;
	this.codpos = codpos;
	this.fijo = fijo;
	this.movil = movil;
	this.fecha = fecha;
	this.correo = correo;
	this.matricula = matricula;
	this.motivo = motivo;
}

/**
 * 
 * @param {boolean} nombre 
 * @param {boolean} apellido 
 * @param {boolean} dni 
 * @param {boolean} correo 
 * @param {boolean} fijo 
 * @param {boolean} movil 
 * @param {boolean} persona 
 * @param {boolean} fecha 
 * @param {boolean} instagram
 * @param {boolean} twitter
 * @param {boolean} matricula
 * @param {boolean} codpos 
 * @param {boolean} ip
 * @param {boolean} residente
 * @param {boolean} opvehiculo 
 * @param {boolean} opredes 
 * @param {boolean} motivo 
 */

const campos = {
	nombre: false,
	apellido: false,
	dni: false,
	correo: false,
	fijo: false,
	movil: false,
	persona: false,
	fecha: false,
	instagram: false,
	twitter: false,
	matricula: false,
	codpos: true,
	ip: false,
	residente: false,
	opvehiculo: false,
	opredes: false, 
	motivo: false,
}
/*---------------------------------------------------------
					FUNCIONES FLECHA
-----------------------------------------------------------
*/

const validarFormulario = (e) => { // Hago el validar formulario y la e el es todos los inputs del formulario
	switch (e.target.name) { // Hago un switch para diferenciarlos cual es cual por el target name
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');  // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "dni":
			dni(expresiones.dni, e.target, 'dni'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "codpos":
			validarCampo(expresiones.codpos, e.target, 'codpos'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "fijo":
			validarCampo(expresiones.fijo, e.target, 'fijo'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "movil":
			comprobarMovil(expresiones.movilcaracter,expresiones.movilsincaracter,e.target,'movil'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "persona":
			validarCampo(expresiones.persona, e.target, 'persona'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "fecha":
			validarCampo(expresiones.fecha, e.target, 'fecha'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "instagram":
			validarCampo(expresiones.instagram, e.target, 'instagram'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "twitter":
			validarCampo(expresiones.twitter, e.target, 'twitter'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "matricula":
			validarCampo(expresiones.matricula, e.target, 'matricula'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "ip":
			saberIp(expresiones.ipv4,expresiones.ipv6, e.target, 'ip'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
		case "motivo":
			motivo(expresiones.motivo, e.target, 'motivo'); // El ultimo valor es para el campos(booleanos) para ponerlos a true
		break;
	}
}

const validarCampo = (expresion, input, campo) => { // Pongo la expresion que quiero el input y el campo (booleano)
	if(expresion.test(input.value)){ // Si la expresion con el input es true
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // quito la claselist incorrecto
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto'); // añado la claselist correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');  // quito la claselist error-activo
		campos[campo] = true; // Campo en true
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); // poner la claselist incorrecto
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); // quito la claselist correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');  // añado la claselist error-activo
		campos[campo] = false;  // Campo en false
	}
}

inputs.forEach((input) => { // Funcion de inputs los recorro con un foreach y hago en cada uno un event donde si pulsas la tecla valida el formulario y si la suelta tambien
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault(); // Para que no se envie a otro lado
	if (campos.nombre && campos.apellido && campos.dni && campos.codpos && campos.correo && campos.fijo && campos.movil && campos.persona  && campos.fecha && campos.instagram && campos.twitter && campos.matricula && campos.ip && campos.opvehiculo && campos.residente && campos.motivo) { // Compruebo si todos los campos están en true
		if (document.getElementById("noCoche").checked == true) { // Si el usuario no tiene coche
			if (document.getElementById("option_codpos").value != "nuevo") { // Si el usuario ha elegido algún codigo postal por el select
				var nuevoFor = new viajero(document.getElementById("nombre").value ,document.getElementById("apellido").value,document.getElementById("dni").value,document.getElementById("option_codpos").value,document.getElementById("fijo").value,document.getElementById("movil").value,document.getElementById("fecha").value,document.getElementById("correo").value,"NO TIENE COCHE",quitarEspaciosMas);
				console.log(nuevoFor); // Muestro el objeto por consola
				console.log("Su ip es "+cualIptiene); // Muestro la ip que tiene
				console.log("Su motivo tiene "+contar+" caracteres"); // Muestro cuantos caracteres tiene
				formulario.reset(); // Reinicio el formulario 
				campos.nombre,campos.apellido,campos.dni,campos.correo,campos.fijo,campos.movil,campos.persona,campos.fecha,campos.instagram,campos.twitter,campos.matricula,campos.ip,campos.opvehiculo,campos.residente,campos.motivo = false; // Pongo todos en falso los campos 
				alert("Se ha enviado correctamente los datos"); // Le notifico al usuario que se envio todo correctamente
			}else{  // Si el usuario pone su codigo postal
				var nuevoFor = new viajero(document.getElementById("nombre").value ,document.getElementById("apellido").value,document.getElementById("dni").value,document.getElementById("codpos").value,document.getElementById("fijo").value,document.getElementById("movil").value,document.getElementById("fecha").value,document.getElementById("correo").value,"NO TIENE COCHE",document.getElementById("motivo").value);
				console.log(nuevoFor); // Muestro el objeto por consola
				console.log("Su ip es "+cualIptiene); // Muestro la ip que tiene
				console.log("Su motivo tiene "+contar+" caracteres"); // Muestro cuantos caracteres tiene
				formulario.reset(); // Reinicio el formulario 
				campos.nombre,campos.apellido,campos.dni,campos.correo,campos.fijo,campos.movil,campos.persona,campos.fecha,campos.instagram,campos.twitter,campos.matricula,campos.ip,campos.opvehiculo,campos.residente,campos.motivo = false; // Pongo todos en falso los campos 
				alert("Se ha enviado correctamente los datos"); // Le notifico al usuario que se envio todo correctamente
			}	
		}else { 
			if (document.getElementById("option_codpos").value != "nuevo") { // Si el usuario ha elegido algún codigo postal por el select
				var nuevoFor = new viajero(document.getElementById("nombre").value ,document.getElementById("apellido").value,document.getElementById("dni").value,document.getElementById("option_codpos").value,document.getElementById("fijo").value,document.getElementById("movil").value,document.getElementById("fecha").value,document.getElementById("correo").value,document.getElementById("matricula").value,document.getElementById("motivo").value);
				console.log(nuevoFor); // Muestro el objeto por consola
				console.log("Su ip es "+cualIptiene); // Muestro la ip que tiene
				console.log("Su motivo tiene "+contar+" caracteres"); // Muestro cuantos caracteres tiene
				formulario.reset(); // Reinicio el formulario 
				campos.nombre,campos.apellido,campos.dni,campos.correo,campos.fijo,campos.movil,campos.persona,campos.fecha,campos.instagram,campos.twitter,campos.matricula,campos.ip,campos.opvehiculo,campos.residente,campos.motivo = false; // Pongo todos en falso los campos 
				alert("Se ha enviado correctamente los datos"); // Le notifico al usuario que se envio todo correctamente
			}else{ 
				var nuevoFor = new viajero(document.getElementById("nombre").value ,document.getElementById("apellido").value,document.getElementById("dni").value,document.getElementById("codpos").value,document.getElementById("fijo").value,document.getElementById("movil").value,document.getElementById("fecha").value,document.getElementById("correo").value,document.getElementById("matricula").value,document.getElementById("motivo").value);
				console.log(nuevoFor); // Muestro el objeto por consola
				console.log("Su ip es "+cualIptiene); // Muestro la ip que tiene
				console.log("Su motivo tiene "+contar+" caracteres"); // Muestro cuantos caracteres tiene
				formulario.reset(); // Reinicio el formulario 
				campos.nombre,campos.apellido,campos.dni,campos.correo,campos.fijo,campos.movil,campos.persona,campos.fecha,campos.instagram,campos.twitter,campos.matricula,campos.ip,campos.opvehiculo,campos.residente,campos.motivo = false; // Pongo todos en falso los campos 
				alert("Se ha enviado correctamente los datos"); // Le notifico al usuario que se envio todo correctamente
			}
		}
	}else{
		alert("No se han enviado correctamente los datos"); // Le notifico al usuario que no se envio todo correctamente
	}
	
});

/*---------------------------------------------------------
						FUNCIONES
-----------------------------------------------------------
*/

function motivo(motivo ,input,campo) {
	if(motivo.test(input.value)){ // Si la expresion regular motivo con la primera en mayuscula  es true 
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // quito la claselist incorrecto
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto'); // añado la claselist correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); // quito la claselist error-activo
		campos[campo] = true; // Campo en true
		quitarEspaciosIncialFinal = input.value.trim(); // Quito los espacios del principio y del final
		quitarEspaciosMas = quitarEspaciosIncialFinal.replace(/\s/g, ' '); // Quito los espacios de mas
		contar = quitarEspaciosMas.length; // Asi sé cuantos caracteres hay
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); // poner la claselist incorrecto
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); // quito la claselist correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); // añade la claselist error-activo
		campos[campo] = false; // campo false
	}
}
function calcularLetraDNI(dni) {
    var cadena = "TRWAGMYFPDXBNJZSQVHLCKE";
    var numLetra = dni % 23;
    return cadena.charAt(numLetra);
}

function dni(dni ,input,campo) {
	if(dni.test(input.value)){ // Si la expresion regular motivo con la primera en mayuscula  es true 
		var num = parseInt(input.value); // Parseo a entero para calcular su Letra correcta del dni
		var comprobarDni = calcularLetraDNI(num); // Coloco la letra
		var letraDni = input.value.charAt(input.value.length-1) // Obtengo la ultimo valor de input es decir la letra
		if (comprobarDni == letraDni) { // Si son  iguales 
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // quito la claselist incorrecto
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto'); // añado la claselist correcto
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); // quito la claselist error-activo
			campos[campo] = true; // Campo en true
		}else{
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); // poner la claselist incorrecto
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); // quito la claselist correcto
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); // añade la claselist error-activo
			campos[campo] = false; // campo false
		}
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); // poner la claselist incorrecto
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); // quito la claselist correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); // añade la claselist error-activo
		campos[campo] = false; // campo false
	}
}

function saberIp(ipv4,ipv6,input,campo) {
	if (ipv4.test(input.value)) { // Si la expresion regular ipv4 es true 
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // quito la claselist incorrecto
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto'); // añado la claselist correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); // quito la claselist error-activo
		cualIptiene = "IPV4"; // Pongo la ipv4
		campos[campo] = true; // Y pongo el campo en true
	}else{
		if (ipv6.test(input.value)) { // Si la expresion regular ipv6 es true 
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // quito la claselist incorrecto
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto'); // añado la claselist correcto
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); // quito la claselist error-activo
			cualIptiene = "IPV6"; // Pongo la ipv6
			campos[campo] = true; // Y pongo el campo en true
		}else{
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); // poner la claselist incorrecto
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); // quito la claselist correcto
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); // añade la claselist error-activo
			campos[campo] = false; // Y pongo el campo en false
		}
	} 
	
}

function comprobarMovil(concaracter,sincaracter,input,campo) {
	if (concaracter.test(input.value)) { // Si la expresion regular con caracter es true 
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // quito la claselist incorrecto
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');  // quito la claselist correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); // quito la claselist error-activo
		campos[campo] = true; // Y pongo el campo en true
	}else{
		if (sincaracter.test(input.value)) {// Si la expresion regular sin caracter es true 
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // quito la claselist incorrecto
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');  // quito la claselist correcto
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); // quito la claselist error-activo
			campos[campo] = true; // Y pongo el campo en true
		}else{
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto'); // añado la claselist incorrecto
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto'); // quito  la claselist correcto
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); // añado la claselist error-activo
			campos[campo] = false; // Y pongo el campo en false
		}
	} 
	
}

function nuevoCod(){
	var select = document.getElementById("option_codpos").value; // Cogo el valor de la opcion
	if (select == "nuevo" ) { // Si es nuevo 
			document.getElementById("select_codpos").style.display = "none"; // Oculto el select
			document.getElementById("grupo__codpos").style.display = "block"; // Muestro el input
			var padrecodpos = document.getElementById("inputcodpos"); // Le pongo la id
			var inputcodpos = document.createElement("input"); // Le creo el input 
			inputcodpos.type = "text";  // Le pongo tipo text
			inputcodpos.className = "formulario__input"; // Le class nombre formulario__input
			inputcodpos.name = "codpos"; // Le pongo name codpos
			inputcodpos.id = "codpos"; // Le pongo id codpos
			inputcodpos.placeholder = "38459"; // Le pongo tipo text
			padrecodpos.appendChild(inputcodpos); // Pone placeholder  para que usuario se haga una idea de como es
			inputs = document.querySelectorAll('#formulario input'); // Vuelvo a poner todos los inputs para que coga el nuevo input creado
			inputs.forEach((input) => { // Y los recorro otra vez todos los inputs  
				input.addEventListener('keyup', validarFormulario);
				input.addEventListener('blur', validarFormulario);
			});
	}else{
		campos.codpos = true; // pongo el codpos en true
	}
}


function nuevoVehiculo(){
	campos.opredes = true; // Pone la opcion en true
	campos.matricula = false; // La opcion de matricula en false
	if (comprobar == true) { // Si ya está creada la matricula solo muestralo
		document.getElementById("grupo__matricula").style.display = "block";
		document.getElementById("ocultar").style.display = "block";
	}else{ // Si no va a crear el select con todas las marcas mas conocidas del mundo 
		var padre = document.getElementById("select_marca");
		// Array de marcas de coches
		var array = ["Alfa Romeo","Aston Martin","Audi","Autovaz","Bentley","BMW","Cadillac","Caterham","Chevrolet","Chrysler","Citroen","Daihatsu","Dodge","Ferrari","Fiat","Ford","Honda","Hummer","Hyundai","Isuzu","Jaguar","Jeep","Kia","Lamborghini","Lancia","Land Rover","Lexus","Lotus","Maserati","Mazda","Mercedes Benz","MG","Mini","Mitsubishi","Morgan","Nissan","Opel","Peugeot","Porsche","Renault","Rolls Royce","Rover","Saab","Seat","Skoda","Smart","Ssangyong","Subaru","Suzuki","Tata","Toyota","Volkswagen","Volvo"];

		// Crear y agregar una lista de selección
		var selectList = document.createElement("select");
		selectList.id = "marcacoches";
		padre.appendChild(selectList); // Lo añado a select_marca

		//Crea y agrega las opciones 
		for (var i = 0; i < array.length; i++) { // Recorre el array de marcas de coches
			var option = document.createElement("option"); // creo la opcion
			option.value = array[i]; // Le pongo aun valor 
			option.text = array[i]; // Le pongo el texto 
			selectList.appendChild(option); // lo añado al select
		}
		document.getElementById("grupo__matricula").style.display = "block";
		document.getElementById("ocultar").style.display = "block";
		var padrematricula = document.getElementById("inputmatricula");
			var inputmatricula = document.createElement("input");
			inputmatricula.type = "text";  // Pone tipo texto
			inputmatricula.className = "formulario__input"; // Pone class nombre  formulario__input
			inputmatricula.name = "matricula" // Pone nombre  matricula
			inputmatricula.id = "matricula"; // Pone id  matricula
			inputmatricula.placeholder = "0000-XXX" // Pone placeholder  para que usuario se haga una idea de como es
			padrematricula.appendChild(inputmatricula); // Meto el input en la id inputmatricula 
			inputs = document.querySelectorAll('#formulario input'); // Vuelvo a poner todos los inputs para que coga el nuevo input creado
			inputs.forEach((input) => { // Y los recorro otra vez todos los inputs 
				input.addEventListener('keyup', validarFormulario);
				input.addEventListener('blur', validarFormulario);
			});
		comprobar = true; // Y lo pongo en true para que no lo vuelva a crear
	}
	
}


function noVehiculo(){  // Esta funcion lo unico que hace es cuando pulse el usuario si no tiene vehiculo poner el grupo matricula en none y pone matricula y opcion en vehiculo en true
	document.getElementById("ocultar").style.display = "none";
	document.getElementById("grupo__matricula").style.display = "none";
	campos.opvehiculo = true;
	campos.matricula = true;
}
function comprobarResidente(){ // Esta funcion lo unico que hace es cuando pulse el usuario si es residente o no ponerlo a true
	campos.residente = true;
}
function notieneRedes(){
	campos.opredes = true; // Pone la opcion en true
	campos.instagram = true; // Pone la opcion en true
	campos.twitter = true; // Pone la opcion en true
	document.getElementById("grupo__instagram").style.display = "none"; // Y no muestra el grupo instagram
	document.getElementById("grupo__twitter").style.display = "none"; // Y no muestra el grupo twitter
}
function Redes(){
	campos.opredes = true; // Pone la opcion en true
	campos.instagram = false; // Pone la opcion en false
	campos.twitter = false;  // Pone la opcion en false
	document.getElementById("grupo__instagram").style.display = "block"; // Y muestra el grupo instagram
	document.getElementById("grupo__twitter").style.display = "block"; // Y muestra el grupo twitter
}

/**
 * @author Alejo Padron Reyes
 */