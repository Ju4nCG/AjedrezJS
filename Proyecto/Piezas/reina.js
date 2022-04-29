function reina(x1, y1, x2, y2) {
    if (matrizTablero[x2][y2].color === matrizTablero[x1][y1].color) {
        return false;
    } else if (recorrer(x1, y1, x2, y2) == true) {
        return true;
    } else if (recorrerDiagonal(x1, y1, x2, y2) == true) {
        return true;
    } else return false;
}