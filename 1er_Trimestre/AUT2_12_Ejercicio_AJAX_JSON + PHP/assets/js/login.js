let form = document.querySelector("#login");  // Obtengo todos los atributos que hay en el login

login.addEventListener('submit', (e) => { // Hago el listener 
	e.preventDefault(); // Para que no se envie lo que obtengo a ningun lado

    const xhr = new XMLHttpRequest(); // Tengo los atributos de AJAX

    xhr.open('post', 'assets/php/login.php', true); // Abro el AJAX por metodo post el login.php
    
    xhr.onreadystatechange = function () { 
		console.log(this.readyState + " "+this.status);
        if (this.readyState == 4 && this.status == 200) { // Si el servidor funciona y el estado del cliente es 4 
			let respuesta = JSON.parse(xhr.responseText); // La respuesta la parseo a JSON
			if(respuesta.validacion == true){ // Si la validación es true
				alert("Haz Iniciado bien el usuario")
				document.getElementById("myModal").style.display = "none"; // Quito el modal 
				console.log(respuesta); // Y muestro por consola la ID del usuario que es su usuario y la validación en objeto
			}else{
				alert("El usuario o la contraseña son incorrectos")
				document.getElementById("myModal").style.display = "block"; // Dejo el modal
				console.log(respuesta); // Y muestro por consola la ID del usuario que es su usuario y la validación en objeto
			}
        } 
    }

	data = new FormData(form);   // Envio el usuario y la contraseña por clave valor 
    
    xhr.send(data); // Y la envio
});

