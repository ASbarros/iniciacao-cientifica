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
    const note = ($(`#${event.target.id}`))[0];
    note.addEventListener('mousemove', mousemove);
}

function retiraMovimentacao() {
    const note = ($(`#${event.target.id}`))[0];
    note.removeEventListener('mousemove', mousemove);
}

function mousemove() {
    const note = ($(`#${event.target.id}`))[0],
        transform = note.getAttributeNS(null, 'transform');
    let propriXY = transform.split(' '),
        y = apenasNumeros(propriXY[1]);
    note.removeAttributeNS(null, 'transform', this.localName);
    //removendo o atributo antigo...
    note.setAttributeNS(null, 'transform',
        `translate(${event.pageX - 0} ${y})`);
}