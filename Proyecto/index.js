//Click a cualquier cosa que no sea una celda
document.addEventListener("click", function (e) {
    if (e.target.localName != "td") {
        seleccionado.origen = "";
        pintarTablero();
        asignarClick();
    }
})
//Establecimiento del turno principal
var turno = "blanca";
//Llamada a pintar tablero
pintarTablero();
//Llamada a asignar click
asignarClick();