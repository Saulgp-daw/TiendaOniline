let btnLogin = document.getElementById("btnLogin");
let btnLogout = document.getElementById("btnLogout");

if (localStorage.getItem("usuario")) {
	btnLogin.style.display = "none";
	btnLogout.style.display = "block";
} else {
	btnLogin.style.display = "block";
	btnLogout.style.display = "none";
}
btnLogout.addEventListener("click", cerrarSesion);

function cerrarSesion(){
	localStorage.removeItem("usuario");
	localStorage.removeItem("miDeck");
	location.reload();
}

let form = document.querySelector(".login");  // Obtengo todos los atributos que hay en el login
form.addEventListener('submit', (e) => { // Hago el listener 
	e.preventDefault(); // Para que no se envie lo que obtengo a ningun lado

	const xhr = new XMLHttpRequest(); // Tengo los atributos de AJAX
	var usuario = document.getElementById("in_username");
	var contrasenia = document.getElementById("in_password");

	xhr.open('GET', 'assets/PHP/login.php?usuario=' + usuario.value + "&contrasenia=" + contrasenia.value, true); // Abro el AJAX por metodo post el login.php

	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) { // Si el servidor funciona y el estado del cliente es 4 
			let respuesta = JSON.parse(xhr.responseText); // La respuesta la parseo a JSON
			if (respuesta.validacion == true) { // Si la validación es true
				document.getElementById("id01").style.display = "none"; // Quito el modal 
				localStorage.setItem("usuario", true);
				console.log(respuesta); // Y muestro por consola la ID del usuario que es su usuario y la validación en objeto
				location.reload();
			} else {
				alert("El usuario o la contraseña son incorrectos")
				document.getElementById("id01").style.display = "block"; // Dejo el modal
				console.log(respuesta); // Y muestro por consola la ID del usuario que es su usuario y la validación en objeto
			}
		}
	}

	data = new FormData(form);   // Envio el usuario y la contraseña por clave valor 
	xhr.send(null); // Y la envio
});

