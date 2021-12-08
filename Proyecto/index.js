/*Declaración de objetos:*/

//Objeto piezas blancas con sus datos
const blancas = {
    torre: {nombre: "torre", codigo: "&#9820;", color: "blanca"},
    caballo: {nombre: "caballo", codigo: "&#9822;", color: "blanca"},
    alfil: {nombre: "alfil", codigo: "&#9821;", color: "blanca"},
    rey: {nombre: "rey", codigo: "&#9819;", color: "blanca"},
    dama: {nombre: "dama", codigo: "&#9818;", color: "blanca"},
    peon: {nombre: "peon", codigo: "&#9823;", color: "blanca"},
}

//Objeto piezas negras con sus datos
const negras = {
    torre: {nombre: "torre", codigo: "&#9820;", color: "negra"},
    caballo: {nombre: "caballo", codigo: "&#9822;", color: "negra"},
    alfil: {nombre: "alfil", codigo: "&#9821;", color: "negra"},
    rey: {nombre: "rey", codigo: "&#9819;", color: "negra"},
    dama: {nombre: "dama", codigo: "&#9818;", color: "negra"},
    peon: {nombre: "peon", codigo: "&#9823;", color: "negra"}
}

//Objeto piezas vacías
const piezas = {
    vacio: {nombre: "vacio", codigo: "", color: "nada"}
}


/*Declaración de matriz:*/

//Tablero mencionando a sus objetos correspondientes:
var matrizTablero = [
    [negras.torre, negras.caballo, negras.alfil, negras.rey, negras.dama, negras.alfil, negras.caballo, negras.torre],
    [negras.peon, negras.peon, negras.peon, negras.peon, negras.peon, negras.peon, negras.peon, negras.peon],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon],
    [blancas.torre, blancas.caballo, blancas.alfil, blancas.rey, blancas.dama, blancas.alfil, blancas.caballo, blancas.torre]
];

//Declaración de variable seleccionado vacía
var seleccionado = {
    origen: "",
    destino: ""
}

/*Declaración de funciones:*/

//Función pintar tablero que va generando la tabla (y vinculando sus celdas a un id), añadiendo sus correspondientes fichas y luego uniendo al html
function pintarTablero() {
    //Con esto se consigue que a la variable tablero se le asigne la tabla de html con Id tablero
    let tablero = document.getElementById("tablero");
    //Se declara la variable html sobre la que se hará el tablero
    let html = ""
    for (let i = 0; i < matrizTablero.length; i++) {
        html += "<tr>"
        for (let o = 0; o < matrizTablero[i].length; o++) {
            html += "<td id='" + i + "-" + o + "' class='" + matrizTablero[i][o].color + "'>" + matrizTablero[i][o].codigo + "</td>"
        }
        html += "</tr>"
    }
    //Al tablero de html se le introduce la tabla html
    tablero.innerHTML = html;
}

//Función mover ficha
function moverFicha(seleccion) {
    //La función split te permite separar un string en un array con dos posiciones  
    //Si le especificas por qué está dividido, en mi caso por (-)
    let origen = seleccion.origen.split("-");
    let destino = seleccion.destino.split("-");
    /*Aquí es donde pongo en uso ambos arrays
    Si coinciden el origen y el color del turno se empieza*/
    if (matrizTablero[origen[0]][origen[1]].color == turno) {
        //Si el color de origen y el color de destino coinciden que indique un error
        if (matrizTablero[destino[0]][destino[1]].color === matrizTablero[origen[0]][origen[1]].color) {
            /*Swal forma parte de una librería (sweetalert2) que se encarga de hacer más
            agradable a la vista las alertas*/
            swal(
                'Error',
                'No puedes mover sobre tu propia ficha',
                'error'
            ).then(this.initialize);
        //Si no coinciden:
        } else {
            //Si la ficha de destino es el rey (Se acaba la partida):
            if (matrizTablero[destino[0]][destino[1]].nombre == "rey") {
                swal(
                    'Enhorabuena',
                    'Has ganado, jugador de piezas ' + turno + "s",
                    'success'
                ).then(this.initialize);
                //Recargar automáticamente la página
                setTimeout(function () {
                    window.location.reload();
                }, 3000)
            //Si no es el rey que se haga el movimiento normal y se cambie de turno
            } else {
                matrizTablero[destino[0]][destino[1]] = matrizTablero[origen[0]][origen[1]];
                matrizTablero[origen[0]][origen[1]] = piezas.vacio;
                //Se llama a la función cambiar turno
                cambiarTurno();
            }
        }
    //Si se selecciona una celda vacía para mover se dará un error
    } else if (matrizTablero[origen[0]][origen[1]].color === "nada") {
        swal(
            'Error',
            'No puedes mover una ficha vacía',
            'error'
        ).then(this.initialize);
    //Por descarte la última opción es que no sea tu turno
    } else {
        swal(
            'Error',
            'No es tu turno',
            'error'
        ).then(this.initialize);
    }
}

//Función encargada de cambiar el turno
function cambiarTurno() {
    if (turno == "blanca") {
        turno = "negra";
    } else {
        turno = "blanca";
    }
    //Encargado de hacer visible el turno actual en el 
    let textoTurno = document.getElementById("textoTurno");
    textoTurno.innerText = turno + "s";
}

//Función encargada de asignar la capacidad de click a cada celda:
function asignarClick() {
    //Se crea celdas y se le asignan todas las celdas 
    let celdas = document.querySelectorAll("td");
    //Para cada una de ellas:
    celdas.forEach(element => {
        //Añade el event listener click
        element.addEventListener("click", function () {
            //Si no existe un origen se establece
            if (!seleccionado.origen) {
                seleccionado.origen = element.id;
                element.style.outline = "2px solid"
            //De lo contrario se establece la celda como destino
            } else {
                seleccionado.destino = element.id;
                //Llamada a la función mover fichas
                moverFicha(seleccionado)
                //Reseteo de los valores de selección
                seleccionado.origen = ""  
                seleccionado.destino = ""
                //Llamada a la función pintar tablero para que se represente los cambios
                pintarTablero();
                /*Autollamada de la función asignarClicl para que todas las celdas vuelvan a tener
                la capacidad de ser clickadas*/
                asignarClick();
            }
        });
    });
}

//Establecimiento del turno principal
var turno = "blanca";
//Llamada a pintar tablero
pintarTablero();
//Llamada a asignar click
asignarClick();


