/*Declaración de objetos:*/

//Objeto piezas blancas con sus datos
const blancas = {
    torreI: { nombre: "torre", codigo: "&#9820;", color: "blanca", movida: false },
    torreD: { nombre: "torre", codigo: "&#9820;", color: "blanca", movida: false },
    caballo: { nombre: "caballo", codigo: "&#9822;", color: "blanca" },
    alfil: { nombre: "alfil", codigo: "&#9821;", color: "blanca" },
    reina: { nombre: "reina", codigo: "&#9819;", color: "blanca" },
    rey: { nombre: "rey", codigo: "&#9818;", color: "blanca", movida: false },
    peon: { nombre: "peon", codigo: "&#9823;", color: "blanca" },
}

//Objeto piezas negras con sus datos
const negras = {
    torreI: { nombre: "torre", codigo: "&#9820;", color: "negra", movida: false },
    torreD: { nombre: "torre", codigo: "&#9820;", color: "negra", movida: false },
    caballo: { nombre: "caballo", codigo: "&#9822;", color: "negra" },
    alfil: { nombre: "alfil", codigo: "&#9821;", color: "negra" },
    reina: { nombre: "reina", codigo: "&#9819;", color: "negra" },
    rey: { nombre: "rey", codigo: "&#9818;", color: "negra", movida: false },
    peon: { nombre: "peon", codigo: "&#9823;", color: "negra" },
}

//Objeto piezas vacías
const piezas = {
    vacio: { nombre: "vacio", codigo: "", color: "nada" }
}

/*Declaración de matriz:*/
//Tablero mencionando a sus objetos correspondientes:
var matrizTablero = [
    [negras.torreI, negras.caballo, negras.alfil, negras.reina, negras.rey, negras.alfil, negras.caballo, negras.torreD],
    [negras.peon, negras.peon, negras.peon, negras.peon, negras.peon, negras.peon, negras.peon, negras.peon],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio, piezas.vacio],
    [blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon, blancas.peon],
    [blancas.torreI, blancas.caballo, blancas.alfil, blancas.reina, blancas.rey, blancas.alfil, blancas.caballo, blancas.torreD]
];

//Declaración de variable seleccionado vacía
var seleccionado = {
    origen: "",
    destino: ""
}