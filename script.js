let nombre
class usuario{
   
      constructor(nombre, apellido, DNI,Telefono, Password){
            this.nombre = nombre;
            this.apellido= apellido;
            this.DNI= DNI;
            this.Telefono= Telefono;
            this.Password= Password;            
            }
    
}
const usuarios = [];
let nom,us,dni
let salida = false;

do{
    nom = prompt("ingrese usuario");
    usuarios.push(new usuario(nom));
    alert(usuarios)
}while(salida==false);
