function rey(x1, y1, x2, y2) {
    if (matrizTablero[x2][y2].color == matrizTablero[x1][y1].color) {
        return false;
        //Cruz
    } else if (((x1 == x2 - 1 || x1 - 1 == x2) && (y1 == y2)) || ((y1 == y2 - 1 || y1 - 1 == y2) && (x1 == x2))) {
        return true;
        //Diagonal
    } else if (((x1 - 1 == x2) && (y1 - 1 == y2)) || ((x1 - 1 == x2) && (y1 == y2 - 1))) {//diagonales superiores izq
        return true;
    } else if (((x1 == x2 - 1) && (y1 == y2 - 1)) || ((x1 == x2 - 1) && (y1 - 1 == y2))) {//diagonales inferiores der
        return true;
        //Enroque
    } else if (recorrer(x1, y1, x2, y2) == true) {
        if (turno == "blanca") {
            if (x2 == 7) {
                if (y2 == 6 && blancas.rey.movida == false && blancas.torreD.movida == false) {
                    return true;
                } else if (y2 == 2 && blancas.rey.movida == false && blancas.torreI.movida == false && matrizTablero[7][1].color == "nada") {
                    return true;
                } return false;
            } return false;
        } else if (turno == "negra") {
            if (x2 == 0) {
                if (y2 == 6 && negras.rey.movida == false && negras.torreD.movida == false) {
                    return true;
                } else if (y2 == 2 && negras.rey.movida == false && negras.torreI.movida == false && matrizTablero[0][1].color == "nada") {
                    return true;
                } return false;
            } return false;
        } else return false;
    } else return false;
}