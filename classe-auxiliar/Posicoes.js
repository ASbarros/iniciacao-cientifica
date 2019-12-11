/**
 * arquivo para as posicoes
 * para metodos que retornam as posicoes na tela
 * @author anderson dos santos de barros
 */
function returnPositionY_px(id) {
    if (id.substring(10, 12) == 29) {
        return -34;
    } else if (id.substring(10, 12) == 28) {
        return -22;
    } else if (id.substring(10, 12) == 27) {
        return -14;
    } else if (id.substring(10, 12) == 26) {
        return -4;
    } else if (id.substring(10, 12) == 25) {
        return 6;
    } else if (id.substring(10, 12) == 24) {
        return 16;
    } else if (id.substring(10, 12) == 23) {
        return 26;
    } else if (id.substring(10, 12) == 22) {
        return 36;
    } else if (id.substring(10, 12) == 21) {
        return 46;
    } else if (id.substring(10, 12) == 20) {
        return 56;
    } else if (id.substring(10, 12) == 19) {
        return 63;
    } else if (id.substring(10, 12) == 18) {
        return 72;
    } else if (id.substring(10, 12) == 17) {
        return 81;
    } else if (id.substring(10, 12) == 16) {
        return 90;
    } else if (id.substring(10, 12) == 15) {
        return 100;
    } else if (id.substring(10, 12) == 14) {
        return 110;
    } else if (id.substring(10, 12) == 13) {
        return 118;
    } else if (id.substring(10, 12) == 12) {
        return 127;
    } else if (id.substring(10, 12) == 11) {
        return 136;
    } else if (id.substring(10, 12) == 10) {
        return 146;
    } else if (id.substring(10, 11) == 9) {
        return 156;
    } else if (id.substring(10, 11) == 8) {
        return 166;
    } else if (id.substring(10, 11) == 7) {
        return 175;
    } else if (id.substring(10, 11) == 6) {
        return 184;
    } else if (id.substring(10, 11) == 5) {
        return 194;
    } else if (id.substring(10, 11) == 4) {
        return 203;
    } else if (id.substring(10, 11) == 3) {
        return 213;
    } else if (id.substring(10, 11) == 2) {
        return 222;
    } else if (id.substring(10, 11) == 1) {
        return 230;
    }
}

function returnPositionX_porcentagem(valor) {
    //retorna a posicao do click em porcentagem para qualquer tela...
    const x = (valor * 100) / $(window).width();
    return x;
}

function returnPositionX_porcentagemSVG(valor) {
    //retorna a posicao do click em porcentagem para qualquer tela...
    const x = (valor * 100) / $('.svg').width();
    return x;
}

function returnPositionX_px(porcentagem) {
    //recebe como parametro a porcentagem da tela e retorna a posicao em pixes...
    const px = (porcentagem * $(window).width()) / 100;
    return px;
}

function returnPorcentageYLine(id) {
    if (id == 29) return 15;
    else if (id == 28) return 17.5;
    else if (id == 27) return 20;
    else if (id == 26) return 22.5;
    else if (id == 25) return 25;
    else if (id == 24) return 27.5;
    else if (id == 23) return 30;
    else if (id == 22) return 32.5;
    else if (id == 21) return 35;
    else if (id == 20) return 37.5;
    else if (id == 10) return 62.5;
    else if (id == 9) return 65;
    else if (id == 8) return 67.5;
    else if (id == 7) return 70;
    else if (id == 6) return 72.5;
    else if (id == 5) return 75;
    else if (id == 4) return 77.5;
    else if (id == 3) return 80;
    else if (id == 2) return 82.5;
    else if (id == 1) return 85.5;
    else if (id == 0) return 87.5;
}