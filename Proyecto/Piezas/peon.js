function peon(x1, y1, x2, y2) {
    if (((x1 - 1 == x2 && matrizTablero[x1][y1].color == "blanca") || (x1 == x2 - 1 && matrizTablero[x1][y1].color == "negra")) && y1 == y2) {//Movimiento normal
        if (matrizTablero[x2][y2].color != "nada") {//Si hay algo
            return false;
        } else return true;
    } else if (((x1 - 1 == x2 && matrizTablero[x1][y1].color == "blanca") || (x1 == x2 - 1 && matrizTablero[x1][y1].color == "negra")) && (y1 == y2 - 1 || y1 - 1 == y2)) {//Matar
        if (matrizTablero[x2][y2].color == "nada" || matrizTablero[x2][y2].color == turno) {//Si en la diagonal no hay nada o es del mismo color
            return false;
        } else return true;
    } else if ((x1 == 6 && x2 == 4 && y1 == y2 && matrizTablero[x1][y1].color == "blanca") || (x1 == 1 && x2 == 3 && y1 == y2 && matrizTablero[x1][y1].color == "negra")) {//Movimiento inicio
        if (matrizTablero[x2][y2].color == "nada") {//Si no hay nada
            if (recorrer(x1, y1, x2, y2) == true) {
                return true;
            } else return false;
        } else return false;
    }
}