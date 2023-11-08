document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".Formulario_registro");

  form.addEventListener("submit", function (e) {
      e.preventDefault();

      const DNI = document.getElementById("DNI").value;
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const contraseña = document.getElementById("contraseña").value;

      fetch("http://localhost:5000/registrar", {
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
              contraseña
          }),
      })
          .then((response) => response.json())
          .then((data) => {
              if (data.success) {
                  alert("Registro exitoso");
                  form.reset();
              } else {
                  alert("Error en el registro");
              }
          })
          .catch((error) => {
              console.error("Error: ", error);
          });
  });
});
