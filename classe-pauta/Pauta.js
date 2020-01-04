/**
 * classe pauta
 * @author anderson dos santos de barros
 */

import {
    createSVG,
    createLine,
    lastLine
} from '../classe-linha/Linha.js'
import {
    createCompassFormula
} from '../classe-nota/Nota.js'
import {
    createCompass
} from '../classe-compasso/Compasso.js'
import {
    getNumDiv,
    vetObjNote
} from '../classe-auxiliar/VariaveisGlobais.js'

function createPauta(_idDiv) {
    //funcao para criar a pauta...
    const espacamento = 5,
        //espacamento entre as linhas...
        linha = 0;
    //numero de linhas..
    let primeiraLinha = 40,
        //onde sera a primeira linha...
        x2 = 98.2,
        x1 = 0.7,
        objLine,
        objcompass;
    for (let i = 5, y1 = primeiraLinha, y2 = y1; linha < i; i--, y1 = y1 + espacamento, y2 = y1) {
        //criando as linhas da pauta, cada uma com seu identificador...
        objLine = {
            x1: x1 + '%',
            x2: x2 + '%',
            y1: y1 + '%',
            y2: y2 + '%',
            idName: 'line' + i,
            idDiv: _idDiv,
            id:'line' + i + '-'+ _idDiv,
            class: 'linha'
        }
        new createLine(objLine);
    }
    objcompass = {
        idDiv: _idDiv,
        name: 'claveSol',
        x: 0,
        y: 0
    }
    new createCompassFormula(objcompass);
    objcompass.name = 'quatro';
    objcompass.x = 50;
    objcompass.y = 105;
    new createCompassFormula(objcompass);
    objcompass.x = 45;
    objcompass.y = 150;
    new createCompassFormula(objcompass);
    new createCompass(4, _idDiv);
    for (let i = 29, y1 = 15, y2 = y1; linha < i; i--, y1 = y1 + (espacamento / 2), y2 = y1) {
        objLine.x1 = 7 + '%';
        objLine.y1 = y1 + '%';
        objLine.y2 = y2 + '%';
        objLine.idName = 'additional' + i;
        objLine.idDiv = 'idSVG' + getNumDiv();
        objLine.id = 'additional' + i + '-idSVG' + getNumDiv();
        objLine.class = 'suplementar';
        objLine.type = 'line';
        createLine(objLine);
        //criando as linhas adicionais ...
    }
    vetObjNote.push({
        idSVG: getNumDiv(),
        notas: []
    });
}
let i = 0;

function createDiv() {
    //funcao para criar mais pautas...
    const div = document.createElement('div');
    //cria um elemento "div"...
    div.setAttribute('id', 'div' + i);
    div.setAttribute('class', 'corpo');
    div.setAttribute("width", "100vw");
    div.setAttribute("height", "50vh");

    document.body.appendChild(div);
    //anexa a "div" criada com o novo conteúdo 

    new createSVG(i, "div" + i);
    new createPauta("idSVG" + i);
    new lastLine(i);
    i++;
}

export {
    createDiv
}