class registro {
    constructor(DNI,Nombre,Apellido,Telefono) {
      this.DNI = DNI;
      this.Nombre = Nombre;
      this.Apellido = Apellido;
      this.Telefono = Telefono;
    }
  }
const baseRegistro = [];
function llamarBaseDeDatos() {
    fetch("../dataBase/register.php")
      .then(response => response.json())
      .then(data => {
        baseRegistro.push(data); return
      })
      .catch(error => {
        console.error('Error al llamar a la base de datos:', error);
      });
  }
  llamarBaseDeDatos();
  console.log(baseRegistro);
const form = document.querySelector(".Formulario_registro");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("funciona")
    const dni = e.target.querySelector("#DNI").value 
    const errordni = document.querySelector("#errordni")
    if (isNaN(dni)) {
        errordni.textContent = "Ingrese un valor valido";
        errordni.style.display = "block";  
        setTimeout (() => {
        errordni.style.display = "none";
        },2000)

        return;
      } else {
        errordni.style.display = "none";
      }
    const nombre = e.target.querySelector("#nombre").value;
    const apellido = e.target.querySelector("#apellido").value;
    const tel = e.target.querySelector("#Telefono").value;
    const nuevoRegistro = new registro(
        dni, nombre, apellido,tel
       
      );
    baseRegistro.push(nuevoRegistro);
    console.log(baseRegistro)
    })

