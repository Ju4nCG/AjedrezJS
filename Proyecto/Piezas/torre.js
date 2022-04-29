function torre(x1, y1, x2, y2) {
    if (matrizTablero[x2][y2].color == matrizTablero[x1][y1].color) {
        if (matrizTablero[x2][y2].nombre == "rey") {
            return false
        } else return false;
    } else if (recorrer(x1, y1, x2, y2) == true) {
        return true;
    } else return false;
}