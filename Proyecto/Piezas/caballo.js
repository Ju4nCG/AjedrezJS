function caballo(x1, y1, x2, y2) {
    if (matrizTablero[x2][y2].color === matrizTablero[x1][y1].color) {
        return false;
    } else if (((x1 == x2 - 2) && (y1 == y2 - 1)) || ((x1 - 2 == x2) && (y1 - 1 == y2))) {
        return true;
    } else if (((x1 == x2 - 1) && (y1 == y2 - 2)) || ((x1 - 1 == x2) && (y1 - 2 == y2))) {
        return true;
    } else if (((x1 - 1 == x2) && (y1 == y2 - 2)) || ((x1 == x2 - 1) && (y1 - 2 == y2))) {
        return true;
    } else if (((x1 - 2 == x2) && (y1 == y2 - 1)) || ((x1 == x2 - 2) && (y1 - 1 == y2))) {
        return true;
    } else return false;
}