let usuarioLogueado = localStorage.getItem("usuarioLogueado");

if (usuarioLogueado === null) {
  localStorage.setItem("usuarioLogueado", "false");
}
console.log(usuarioLogueado);


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
            Swal.fire({
              title: "Procesando...",
              showConfirmButton: false,
              allowOutsideClick: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });
            setTimeout(() => {
              Swal.fire({
                title: "Inicio de sesión exitoso",
                icon: "success",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "index.html";
                }
              });
            }, data.success);
          } else {
            Swal.fire("Error en el registro", "", "error");
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
            Swal.fire({
              title: "Procesando...",
              showConfirmButton: false,
              allowOutsideClick: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });
            setTimeout(() => {
              Swal.fire({
                title: "Inicio de sesión exitoso",
                icon: "success",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "../index.html";
                  localStorage.setItem("usuarioLogueado", "true");
                }
              });
            }, data.success);
          } else {
            Swal.fire(
              "Error en el inicio de sesión. Verifica tus credenciales.",
              "",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    });
  }

  if (usuarioLogueado === "true") {
    var divElement = document.createElement("div");
    divElement.className = "d-flex col-12 justify-content-end";
    divElement.innerHTML =
      '<button type="button" class="btn btn-secondary" id="BtnCerrarSesion"><a href="" style="text-decoration: none; color: white;">Cerrar Sesión</a></button>';
    var botton = document.querySelector(".botton");
    if (botton) {
      botton.appendChild(divElement);
    } else {
      console.error("No se encontró ningún elemento con la clase 'botton'.");
    }
    var divElement3 = document.createElement("div");
    divElement3.className = "d-flex col-12 justify-content-end";
    divElement3.innerHTML =
      '<button type="button" class="btn btn-secondary" id="BtnCerrarSesion"><a href="" style="text-decoration: none; color: white;">Cerrar Sesión</a></button>';
    var botton2 = document.querySelector(".botton2");
    if (botton2) {
      botton2.appendChild(divElement);
    } else {
      console.error("No se encontró ningún elemento con la clase 'botton2'.");
    }
  } else {
    var divElement1 = document.createElement("div");
    divElement1.className = "col-4 justify-content-end py-1 px-1 px-xxl-3";
    divElement1.innerHTML =
      '<button type="button" class="btn btn-secondary" id="BtnIngresar"><a href="./LoginyRegistro/login.html" style="text-decoration: none; color: white;">Ingreso</a></button>';

    var divElement2 = document.createElement("div");
    divElement2.className = "col-4 justify-content-end py-1 px-1 px-xxl-3";
    divElement2.innerHTML =
      '<button type="button" class="btn btn-secondary" id="BtnRegistrarme"><a href="./LoginyRegistro/register.html" style="text-decoration: none; color: white;">Inscripción</a></button>';
    var botton = document.querySelector(".botton");
    if (botton) {
      botton.appendChild(divElement1);
      botton.appendChild(divElement2);
    } else {
      console.error("No se encontró ningún elemento con la clase 'botton'.");
    }
    var divElement4 = document.createElement("div");
    divElement4.className = "col-lg-6 justify-content-end py-1 px-2 ";
    divElement4.innerHTML =
      '<button type="button" class="btn btn-secondary" id="BtnIngresar"><a href="../../LoginyRegistro/login.html" style="text-decoration: none; color: white;">Ingreso</a></button>';

    var divElement5 = document.createElement("div");
    divElement5.className = "col-lg-6 justify-content-end py-1 px-2 ";
    divElement5.innerHTML =
      '<button type="button" class="btn btn-secondary" id="BtnRegistrarme"><a href="../../LoginyRegistro/register.html" style="text-decoration: none; color: white;">Inscripción</a></button>';
    var botton2 = document.querySelector(".botton2");
    if (botton2) {
      botton2.appendChild(divElement4);
      botton2.appendChild(divElement5);
    } else {
      console.error("No se encontró ningún elemento con la clase 'botton2'.");
    }
  }

  const cerrarSesionBtn = document.getElementById("BtnCerrarSesion");
  cerrarSesionBtn.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogueado");
    localStorage.setItem("usuarioLogueado","false")

    window.location.href = "index.html";
  });
 
});


document.getElementById("btnDescargarFormulario").addEventListener("click", function () {
    if (usuarioLogueado === "false") {
      Swal.fire({
        icon: "error",
        title: "Alto ahi maquina",
        text: "Debes registrarte primero",
      });
    } else {
      // Aquí va la lógica para descargar el formulario
      // Por ejemplo, podrías redirigir al usuario a una URL donde se encuentra el formulario para descargarlo
      window.location.href = "ruta_al_formulario";
    }
  });
