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

//Click a cualquier cosa que no sea una celda
document.addEventListener("click", function (e) {
    if (e.target.localName != "td") {
        seleccionado.origen = "";
        pintarTablero();
        asignarClick();
    }
})

function asignarClick() {
    //Se crea celdas y se le asignan todas las celdas 
    let celdas = document.querySelectorAll("td");
    //Para cada una de ellas:
    celdas.forEach(element => {
        //Añade el event listener click
        element.addEventListener("click", function () {
            //Si no existe un origen se establece
            padre: if (!seleccionado.origen) {
                seleccionado.origen = element.id;
                let origen = seleccionado.origen.split("-");
                x1 = origen[0];
                y1 = origen[1];
    
                if (turno == "blanca" && matrizTablero[x1][y1].color == "negra" || turno == "negra" && matrizTablero[x1][y1].color == "blanca") {
                    swal(
                        'Error',
                        'No es tu turno',
                        'error'
                    ).then(this.initialize);
                    seleccionado.origen = "";
                    break padre;
                } else {
                    element.style.outline = "2px solid";
                    visualizar();
                }
            } else {//De lo contrario se establece la celda como destino
                seleccionado.destino = element.id;
                let destino = seleccionado.destino.split("-");
                x2 = destino[0];
                y2 = destino[1];
                if (matrizTablero[x1][y1].color == matrizTablero[x2][y2].color) {
                    seleccionado.origen = "";
                    pintarTablero();
                    asignarClick();
                    break padre;
                }
                //Llamada a la función mover fichas
                moverFicha(seleccionado);
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

function cambiarTurno() {
    if (turno == "blanca") {
        turno = "negra";
    } else {
        turno = "blanca";
    }
    //Encargado de hacer visible el turno actual en el 
    let textoTurno = document.getElementById("textoTurno");
    if (turno == "blanca") {
        textoTurno.innerHTML = "<span id='peonB'>&#9823</span>";
    } else {
        textoTurno.innerHTML = "<span id='peonN'>&#9823</span>";
    }
}

function comprobarJaque(x1, y1, x2, y2) {

    // Se comprueban si el movimiento elegido causa pone en peligro al rey(jaque) o no libera del jaque infligido por el enemigo
    let jaque = false
    let estadoAnterior = matrizTablero[x2][y2];
    matrizTablero[x2][y2] = matrizTablero[x1][y1];
    matrizTablero[x1][y1] = piezas.vacio;

    for (let xO = 0; xO < matrizTablero.length; xO++) { //posicion x-Origen 
        for (let yO = 0; yO < matrizTablero[xO].length; yO++) { //posicion y-Origen
            let nombre = matrizTablero[xO][yO].nombre;
            if (nombre != 'vacio') {
                for (let xD = 0; xD < matrizTablero.length; xD++) { //posicion x-Destino 
                    for (let yD = 0; yD < matrizTablero[xD].length; yD++) { //posicion x-Destino 
                        if (this[nombre](xO, yO, xD, yD) == true && matrizTablero[xD][yD].nombre == 'rey' && matrizTablero[xD][yD].color == turno) {
                            jaque = true;
                        }
                    }
                }
            }
        }

    }

    // si hay jaque la casilla del rey se colorea de rojo
    if (jaque) {
        let id = ''
        matrizTablero.forEach((a, x) => {
            a.find((b, y) => {
                if (b.nombre == 'rey' && b.color == turno) {
                    id = {x: x, y: y}
                    return 
                }
            })
        })
        document.getElementById(id.x + '-' + id.y).style.background = "#f009"
    }
    matrizTablero[x1][y1] = matrizTablero[x2][y2];
    matrizTablero[x2][y2] = estadoAnterior;

    return jaque

}
function comprobarMate(x1, y1, x2, y2) {
    // Se comprueban todos los movimientos posibles para verificar si aun no es mate
    let noMate = 0
    for (let x1 = 0; x1 < matrizTablero.length; x1++) { 
        for (let y1 = 0; y1 < matrizTablero[x1].length; y1++) {
            let ficha = matrizTablero[x1][y1];
            if (ficha.nombre != 'vacio') {
                for (let x2 = 0; x2 < matrizTablero.length; x2++) { 
                    for (let y2 = 0; y2 < matrizTablero[x2].length; y2++) {
                        if (ficha.color == turno && this[ficha.nombre](x1, y1, x2, y2) == true && comprobarJaque(x1, y1, x2, y2) == false) {

                            noMate++
                        }
                    }
                }
            }
        }

    }
    if (noMate == 0) {
        cambiarTurno()
        victoria()
    }
}

function recorrer(x1, y1, x2, y2) {
    //Comprueba si se interpone algo en horizontal y vertical
    if (x1 == x2) {
        if (y1 > y2) {//Si va hacia izquierda
            for (let i = (y1 - 1); i > y2; i--) {
                if (matrizTablero[x1][i].color != "nada") {
                    return false;
                }
            } return true;
        } else if (y2 > y1) {//Si va hacia derecha
            for (let i = (y2 - 1); i > y1; i--) {
                if (matrizTablero[x1][i].color != "nada") {
                    return false;
                }
            } return true;
        } else return false;
    } else if (y1 == y2) {
        if (x1 > x2) {//Si va hacia arriba
            for (let i = (x1 - 1); i > x2; i--) {
                if (matrizTablero[i][y1].color != "nada") {
                    return false;
                }
            } return true;
        } else if (x2 > x1) {//Si va hacia abajo
            for (let i = (x2 - 1); i > x1; i--) {
                if (matrizTablero[i][y1].color != "nada") {
                    return false;
                }
            } return true;
        } else return false;
    } else return false;
}

function recorrerDiagonal(x1, y1, x2, y2) {
    //Comprueba si se interpone algo en cualquier diagonal
    if (x1 > x2) {
        if (((x1 - x2) == (y1 - y2)) && (y1 > y2)) {//arriba izquierda
            while (x2 != x1 - 1) {
                x1--;
                y1--;
                if (matrizTablero[x1][y1].color != "nada") {
                    return false;
                }
            } return true;
        } else if ((x1 - x2) == (y2 - y1) && (y2 > y1)) {//arriba derecha
            while (x2 != x1 - 1) {
                x1--;
                y1++;
                if (matrizTablero[x1][y1].color != "nada") {
                    return false;
                }
            } return true;
        } else return false;
    } else if (x1 < x2) {
        if ((x2 - x1) == (y1 - y2) && y1 > y2) {//abajo izquierda
            while (x2 - 1 != x1) {
                x1++;
                y1--;
                if (matrizTablero[x1][y1].color != "nada") {
                    return false;
                }
            } return true;
        } else if ((x2 - x1) == (y2 - y1) && y2 > y1) {//abajo derecha
            while (x2 - 1 != x1) {
                x1++;
                y1++;
                if (matrizTablero[x1][y1].color != "nada") {
                    return false;
                }
            } return true;
        } else return false;
    } else return false;
}

function reyMovido() {
    //Para comprobar si se ha movido el rey
    if (matrizTablero[7][4].nombre != "rey") {
        blancas.rey.movida = true;
    } else if (matrizTablero[0][4].nombre != "rey") {
        negras.rey.movida = true;
    }
}

function torreMovida() {
    //Para comprobar si se ha movido la torre
    if (matrizTablero[7][0].nombre != "torre") {
        blancas.torreI.movida = true;
    } else if (matrizTablero[7][7].nombre != "torre") {
        blancas.torreD.movida = true;
    } if (matrizTablero[0][0].nombre != "torre") {
        negras.torreI.movida = true;
    } else if (matrizTablero[0][7].nombre != "torre") {
        negras.torreD.movida = true;
    }
}

function trasladarFicha(x1, y1, x2, y2) {
    // Se comprueba de que el rey no esta en jaque
    if (comprobarJaque(x1, y1, x2, y2) == true) {
        swal(
            'JAQUE!',
            'Ese movimiento pone al Rey en jaque o el Rey ya está en jaque... protegelo o muevelo!',
            'warning'
        ).then(this.initialize);
    }else {
    
        matrizTablero[x2][y2] = matrizTablero[x1][y1];
        matrizTablero[x1][y1] = piezas.vacio;

        cambiarTurno()
    }
    comprobarMate()

}

function victoria() {
    swal(
        'Enhorabuena',
        'Has ganado, jugador de piezas ' + turno + "s",
        'success'
    ).then(this.initialize);
    //Recargar automáticamente la página
    setTimeout(function () {
        window.location.reload();
    }, 3000)
}

function moverFicha(seleccion) {
    //La función split te permite separar un string en un array con dos posiciones  
    //Si le especificas por qué está dividido, en mi caso por (-)
    let origen = seleccion.origen.split("-");
    let destino = seleccion.destino.split("-");
    //Nombramos de manera más simple
    let x1 = origen[0];
    let y1 = origen[1];
    let x2 = destino[0];
    let y2 = destino[1];

    //Aquí es donde pongo en uso ambos arrays

    switch (matrizTablero[x1][y1].nombre) {
        case "peon":
            if (peon(x1, y1, x2, y2) == true) {
                trasladarFicha(x1, y1, x2, y2);
            } else {
                swal(
                    'Error',
                    'Movimiento de peon invalido',
                    'error'
                ).then(this.initialize);
            }
            break;
        case "torre":
            if (torre(x1, y1, x2, y2) == true) {
                trasladarFicha(x1, y1, x2, y2);
                torreMovida();
            } else {
                swal(
                    'Error',
                    'Movimiento de torre invalido',
                    'error'
                ).then(this.initialize);
            }
            break;
        case "reina":
            if (reina(x1, y1, x2, y2) == true) {
                trasladarFicha(x1, y1, x2, y2);
            } else {
                swal(
                    'Error',
                    'Movimiento de reina invalido',
                    'error'
                ).then(this.initialize);
            }
            break;
        case "rey":
            if (rey(x1, y1, x2, y2) == true) {
                enroque(x1, y1, x2, y2);
                trasladarFicha(x1, y1, x2, y2);
                reyMovido();
            } else {
                swal(
                    'Error',
                    'Movimiento de rey invalido',
                    'error'
                ).then(this.initialize);
            }
            break;
        case "alfil":
            if (alfil(x1, y1, x2, y2) == true) {
                trasladarFicha(x1, y1, x2, y2);
            } else {
                swal(
                    'Error',
                    'Movimiento de alfil invalido',
                    'error'
                ).then(this.initialize);
            }
            break;
        case "caballo":
            if (caballo(x1, y1, x2, y2) == true) {
                trasladarFicha(x1, y1, x2, y2);
            } else {
                swal(
                    'Error',
                    'Movimiento de caballo invalido',
                    'error'
                ).then(this.initialize);
            }
            break;
    }

    
}

function visualizar() {
    /* Se recorre la matriz y si devuelve true en esa celda
    se añade un + con la clase suma para cambiarle el color en css*/
    for (let x = 0; x < matrizTablero.length; x++) {
        for (let y = 0; y < matrizTablero[x].length; y++) {
            idCelda = x + "-" + y;
            let celda = document.getElementById(idCelda);
            let nombre = matrizTablero[x1][y1].nombre
            if (nombre != 'vacio' && this[nombre](x1, y1, x, y) == true && comprobarJaque(x1, y1, x, y) == false) {
                if (celda.innerHTML == '') {
                    celda.style.background = "#0a08"
                }else{
                    celda.style.background = "#5a08"
                }
                celda.innerHTML = "<span class='suma'>+</span>";
                celda.style.outline = "#0002 1px solid"
            }
        }
    }
}

function enroque(x1, y1, x2, y2) {
    //Funcion para mover la torre en caso de enroque
    if (x1 == 7 && y1 == 4 && turno == "blanca") {
        if (x2 == 7 && y2 == 2 && rey(x1, y1, x2, y2) == true) {
            matrizTablero[7][3] = matrizTablero[7][0];
            matrizTablero[7][0] = piezas.vacio;
        } else if (x2 == 7 && y2 == 6 && rey(x1, y1, x2, y2) == true) {
            matrizTablero[7][5] = matrizTablero[7][7];
            matrizTablero[7][7] = piezas.vacio;
        }
    } if (x1 == 0 && y1 == 4 && turno == "negra") {
        if (x2 == 0 && y2 == 2 && rey(x1, y1, x2, y2) == true) {
            matrizTablero[0][3] = matrizTablero[0][0];
            matrizTablero[0][0] = piezas.vacio;
        } else if (x2 == 0 && y2 == 6 && rey(x1, y1, x2, y2) == true) {
            matrizTablero[0][5] = matrizTablero[0][7];
            matrizTablero[0][7] = piezas.vacio;
        }
    }
}