function alfil(x1, y1, x2, y2) {
    if (matrizTablero[x2][y2].color === matrizTablero[x1][y1].color) {
        return false;
    } if (recorrerDiagonal(x1, y1, x2, y2)) {
        return true;
    } else return false;
}