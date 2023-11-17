let usuarioLogueado = localStorage.getItem("usuarioLogueado");

if (usuarioLogueado === null) {
  localStorage.setItem("usuarioLogueado", "false");
}
console.log(usuarioLogueado);
// Función para verificar si el correo electrónico está repetido
function verificarCorreoRepetido(correo) {
  return fetch("http://localhost:3000/verificarCorreo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo,
    }),
  })
    .then((response) => {
      return response.text().then((text) => {
        console.log(text);
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return JSON.parse(text);
      });
    })
    .then((data) => {
      return data.correoRepetido;
    })
    .catch((error) => {
      console.error(
        "Error al verificar el correo electrónico: ",
        error.message
      );
      return false;
    });
}

// INICIAR SESIÓN ADMIN
async function verificarUsuario() {
  const loginForm = document.querySelector("#loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = e.target.querySelector("#username").value;
      const pass = e.target.querySelector("#password").value;

      try {
        const response = await fetch("../admin.json");
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();

        if (data.usuario === user && data.contraseña === pass) {
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
                window.location.href = "../pages/controlPanel.html";
              }
            });
          }, 3000);
        } else {
          Toastify({
            text: "Contraseña incorrecta",
            gravity: "bottom",
            position: "right",
            duration: 3000,
            style: {
              background: "red",
            },
          }).showToast();
        }
      } catch (error) {
        console.log("Error:", error);
      }
    });
  }
}
verificarUsuario();

obtenerUsuarios();

async function obtenerUsuarios() {
  try {
    const response = await fetch("http://localhost:3000/usuarios");
    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const data = await response.json();

    if (data.success && data.usuarios) {
      mostrarUsuariosEnTabla(data.usuarios);
    } else {
      console.log("No se pudieron obtener usuarios. Error:", data.error);
    }
  } catch (error) {
    console.error("Error en la solicitud de obtener usuarios:", error);
  }
}

function mostrarUsuariosEnTabla(usuarios) {
  const tablaBody = document.querySelector(".table tbody");

  // Limpiar el contenido existente de la tabla
  tablaBody.innerHTML = "";

  // Itera sobre cada usuario y crea una fila en la tabla
  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");

    // Agregar celdas con los datos del usuario
    const columnas = ["nombre", "apellido", "DNI", "telefono", "email", "carrera", "inscripto"];
    columnas.forEach((columna) => {
      const celda = document.createElement("td");
    
      if (columna === "inscripto") {
        // Crea un elemento checkbox y establece su estado según el valor en el objeto de usuario
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = usuario[columna]; // Establece el estado según el valor en el objeto de usuario
        // Agregar la checkbox a la celda
        celda.appendChild(checkbox);
      } else {
        // Para otras columnas, simplemente asigna el contenido de texto
        celda.textContent = usuario[columna];
      }
    
      // Agregar la celda a la fila
      fila.appendChild(celda);
    });

    // Agregar la fila a la tabla
    tablaBody.appendChild(fila);
  });
}

function descargarInformacion() {
  // Crear un nuevo HTML formateado para Excel
  var excelHtml = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
  excelHtml += '<head><meta charset="utf-8"><meta http-equiv="content-type" content="application/vnd.ms-excel">';
  excelHtml += '<style>table { border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; }</style>';
  excelHtml += '</head><body>';
  excelHtml += '<table>';

  // Obtiene el contenido de la tabla
  var table = document.querySelector('.table');
  var rows = table.rows;

  // Iterar sobre las filas y columnas de la tabla
  for (var i = 0; i < rows.length; i++) {
      excelHtml += '<tr>';
      var cells = rows[i].cells;

      // Iterar sobre las celdas
      for (var j = 0; j < cells.length; j++) {
          // Si la celda es la que contiene "Inscripto", simplemente obtiene el texto
          if (cells[j].innerText.trim() === 'Inscripto') {
              excelHtml += '<td>' + cells[j].innerText + '</td>';
          } else {
              // Si es la última columna, obtiene el valor del checkbox asociado
              if (j === cells.length - 1) {
                  var checkbox = cells[j].querySelector('input[type="checkbox"]');
                  var checkboxValue = checkbox ? checkbox.checked : false;
                  excelHtml += '<td>' + checkboxValue + '</td>';
              } else {
                  // Para otras columnas, simplemente obtiene el texto
                  var cellData = cells[j].innerText || cells[j].textContent;
                  excelHtml += '<td>' + cellData + '</td>';
              }
          }
      }

      excelHtml += '</tr>';
  }

  excelHtml += '</table></body></html>';

  // Crea un Blob y descarga el archivo
  var blob = new Blob([excelHtml], { type: 'application/vnd.ms-excel' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'informacion_inscriptos.xls';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Llama a la función cuando sea necesario obtener los usuarios
obtenerUsuarios();

document.addEventListener("DOMContentLoaded", function () {
  // REGISTRARSE
  const botonRegistro = document.querySelector(".botonregistro");

  if (botonRegistro) {
    botonRegistro.addEventListener("click", function () {
      // Obtiene los valores de los campos del formulario
      const DNI = document.getElementById("DNI").value;
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const contraseña = document.getElementById("contraseña").value;
      const carreraSelect = document.getElementById("carrera");
      const carrera = carreraSelect.options[carreraSelect.selectedIndex].value;

      // Validaciones
      if (
        /^\d{1,8}$/.test(DNI) &&
        /^[A-Za-z]+$/.test(nombre) &&
        /^[A-Za-z]+$/.test(apellido) &&
        /^\d{1,12}$/.test(telefono) &&
        /\b(?:hotmail\.com|gmail\.com)\b/.test(email) &&
        contraseña.length >= 8 &&
        carrera
      ) {
        // Verifica si el correo electrónico ya está registrado
        verificarCorreoRepetido(email)
          .then((correoRepetido) => {
            if (!correoRepetido) {
              Swal.fire({
                title: "¿Los datos ingresados son correctos?",
                html: `<p><strong>DNI:</strong> ${DNI}</p>
         <p><strong>Nombre:</strong> ${nombre}</p>
         <p><strong>Apellido:</strong> ${apellido}</p>
         <p><strong>Teléfono:</strong> ${telefono}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Carrera:</strong> ${carrera}</p> <!-- Añadido el campo carrera -->
         <p><strong>Contraseña:</strong> ${contraseña}</p>`,
                showDenyButton: true,
                confirmButtonText: "Registrarme",
                denyButtonText: `Cancelar`,
              }).then((result) => {
                if (result.isConfirmed) {
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
                      carrera,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Respuesta del servidor:", data);

                      if (data.success) {
                        console.log("Registro exitoso");

                        window.location.href = "../index.html";
                      } else {
                        console.log("Error en el registro");

                        // Muestra mensaje de error en el registro
                        Swal.fire("Error en el registro", "", "error");
                      }
                    })
                    .catch((error) => {
                      console.error(
                        "Error al realizar la solicitud de registro:",
                        error
                      );
                    });
                } else if (result.isDenied) {
                  // Cambié el mensaje para que sea similar al de "Registro cancelado"
                  Swal.fire("Registro cancelado", "", "info");
                }
              });
            } else {
              console.log(
                "Error en el registro. El correo electrónico ya está registrado."
              );

              // Muestra mensaje de error si el correo electrónico ya está registrado
              Swal.fire(
                "Error en el registro. El correo electrónico ya está registrado.",
                "",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Error al verificar el correo electrónico: ", error);
          });
      } else {
        Swal.fire("Error en el registro. Verifica tus datos.", "", "error");
      }
    });
  }

  // INICIAR SESIÓN
  const loginForm = document.querySelector(".loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validaciones
      if (
        /\b(?:hotmail\.com|gmail\.com)\b/.test(email) &&
        password.length >= 8
      ) {
        // Realiza la solicitud de inicio de sesión si las validaciones son exitosas
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
      } else {
        Swal.fire(
          "Error en el inicio de sesión. Verifica tus datos.",
          "",
          "error"
        );
      }
    });
  }
});

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
cerrarSesionBtn?.addEventListener("click", function () {
  localStorage.removeItem("usuarioLogueado");
  localStorage.setItem("usuarioLogueado", "false");

  window.location.href = "index.html";
});

botonformulario = document.getElementById("btnDescargarFormulario");

botonformulario?.addEventListener("click", function () {
  if (usuarioLogueado == "false") {
    console.log(usuarioLogueado);
    Swal.fire({
      icon: "error",
      title: "Aguarde un segundo",
      text: "Debe registrarse primero",
    });
  } else {
    window.open(
      "https://drive.google.com/drive/folders/1wuJWBCJ82B_rsxTeQOKdmks9-rj0D3cA",
      "_blank"
    );
  }
});



