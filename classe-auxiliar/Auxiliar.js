/**
 * classe auxiliar
 * para metodos que nao estao em uma classe especifica
 * @author anderson dos santos de barros
 */

function returnPositionY(id) {
    const resposta = apenasNumeros(id.substring(id.length - 10, id.length - 5));
    return 85 - (2.5 * (resposta - 1));
}

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

//funcao que remove...
function remove_id(id) {
    //usando jquery...
    $('#' + id).remove();
}

function apenasNumeros(string) {
    const numsStr = string.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
}

function ativarMovimentacao() {
    //adiciona o evento de movimentacao...
    const note = document.getElementById(event.target.id);
    note.addEventListener('mousemove', movimentacao);
    note.setAttributeNS(null, 'clickY', event.pageY);
    note.setAttributeNS(null, 'clickX', event.pageX);
    //adiciona o atributo para saber qual foi a posicao do click inicial...
}

function retiraMovimentacao() {
    //retira o evento de movimentacao...
    const note = document.getElementById(event.target.id);
    note.removeEventListener('mousemove', movimentacao);
    note.removeAttributeNS(null, 'clickY', this.localName);
    note.removeAttributeNS(null, 'clickX', this.localName);
}

function movimentacao() {
    const note = document.getElementById(event.target.id);
    let lineOrigin = note.getAttributeNS(null, 'lineOrigin'),
        numLine = apenasNumeros(lineOrigin.substring(10, lineOrigin.length - 7));
    const obj_y = note.getAttributeNS(null, 'obj_y'),
        obj_x = note.getAttributeNS(null, 'obj_x'),
        clickY = note.getAttributeNS(null, 'clickY'),
        clickX = note.getAttributeNS(null, 'clickX'),
        primeiraParte = lineOrigin.substring(0, 10),
        segundaParte = lineOrigin.substring(lineOrigin.length - 7, lineOrigin.length);
    if (event.pageY + 5 > clickY) {
        if (numLine > 1) numLine--;
        lineOrigin = primeiraParte + numLine + segundaParte;
        note.removeAttributeNS(null, 'lineOrigin', this.localName);
        note.setAttributeNS(null, 'lineOrigin', lineOrigin);
    }
    if (event.pageY - 5 < clickY) {
        if (numLine < 29) numLine++;
        lineOrigin = primeiraParte + numLine + segundaParte;
        note.removeAttributeNS(null, 'lineOrigin', this.localName);
        note.setAttributeNS(null, 'lineOrigin', lineOrigin);
    }

    let y = returnPositionY_px(lineOrigin) - obj_y,
        x = note.getAttributeNS(null, 'pageX');
    note.removeAttributeNS(null, 'transform', this.localName);
    //removendo o atributo antigo...
    note.setAttributeNS(null, 'transform',
        'translate(' + (event.pageX - obj_x) + ' ' + y + ')');
}