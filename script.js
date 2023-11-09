document.addEventListener("DOMContentLoaded", function () {
    // REGISTRARSE
    const form = document.querySelector(".Formulario_registro");
  
    if (form) {
        form.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const DNI = document.getElementById("DNI").value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;
    
        fetch("http://localhost:3000/registrar", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            DNI,
            nombre,
            apellido,
            telefono,
            email,
            contraseña,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.success) {
                alert("Registro exitoso");
                form.reset();
                window.location.href = "../index.html";
            } else {
                alert("Error en el registro");
            }
            })
            .catch((error) => {
            console.error("Error: ", error);
            });
        });
    }
    // INICIAR SESIÓN
    const loginForm = document.querySelector(".loginForm");
  
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email,
            password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.success) {
                alert("Inicio de sesión exitoso");

                window.location.href = "../index.html";

                localStorage.setItem('usuarioLogueado', 'true');
                
            } else {
                alert("Error en el inicio de sesión. Verifica tus credenciales.");
            }
            })
            .catch((error) => {
            console.error("Error: ", error);
            });
        });
    }

    const ingresarBtn = document.getElementById("BtnIngresar");
    const registrarseBtn = document.getElementById("BtnRegistrarme");
    const cerrarSesionBtn = document.getElementById("BtnCerrarSesion");

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    if (usuarioLogueado === 'true') {

        cerrarSesionBtn.style.display = "block";
        ingresarBtn.style.display = "none";
        registrarseBtn.style.display = "none";
    } else {

        cerrarSesionBtn.style.display = "none";
        ingresarBtn.style.display = "block";
        registrarseBtn.style.display = "block";
    }

    cerrarSesionBtn.addEventListener("click", function () {
        
        localStorage.removeItem('usuarioLogueado');

        window.location.href = "index.html";
    });
  });
  