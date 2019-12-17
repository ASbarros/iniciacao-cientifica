/**
 * classe linha
 * @author anderson dos santos de barros
 */

import {
    setNumDiv
} from '../classe-auxiliar/VariaveisGlobais.js';
import {remove_id}from '../classe-auxiliar/Auxiliar.js'


const svgNS = "http://www.w3.org/2000/svg";
//definindo o namespace de svg...

const vetLinhaExcluidas = [];
// vetor para guardar as linhas excluídas
// as linhas associadas as notas...

function createSVG(_id, _dad) {
    const canvasSVG = document.createElementNS(svgNS, "svg");
    //desenhando a tela a ser pintada...
    canvasSVG.setAttributeNS(null, "id", "idSVG" + _id);
    canvasSVG.setAttributeNS(null, "width", "100%");
    canvasSVG.setAttributeNS(null, "height", "100%");
    canvasSVG.setAttributeNS(null, "class", "svg");
    canvasSVG.setAttributeNS(null, "version", "1.1");
    canvasSVG.setAttributeNS(null, "viewBox", '0 0 ' + $('#' + _dad).width() + ' 376');

    document.getElementById(_dad).appendChild(canvasSVG);
    //apendando o elemento no corpo do svg...
}

function createLine(_obj) {
    //funcao cria linha...
    setNumDiv(_obj.idDiv.substring(5, 6));
    //pegando o valor numerico da div...
    let myLine = document.createElementNS(svgNS, "line");
    //desenhando um linha...
    myLine.setAttributeNS(null, "id", _obj.idName + "-" + _obj.idDiv);
    myLine.setAttributeNS(null, "x1", _obj.x1 + "%");
    myLine.setAttributeNS(null, "y1", _obj.y1 + "%");
    myLine.setAttributeNS(null, "x2", _obj.x2 + "%");
    myLine.setAttributeNS(null, "y2", _obj.y2 + "%");
    myLine.setAttributeNS(null, "class", _obj.classe);

    //apendando o elemento no canvas criado...
    document.getElementById(_obj.idDiv).appendChild(myLine);

}

//funcao para criar a linha que fecha a pauta...
function createLastLine(_idDiv) {
    let x1 = 98.2,
        x2 = 98.8,
        y = 40,
        objLine;
    for (let i = 2; i <= 6; i++, y += 5) {
        objLine = {
            x1,
            x2,
            y1: y,
            y2: y,
            idName: 'lastLine' + i,
            idDiv: _idDiv,
            classe: ''
        }
        new createLine(objLine);
    }
    objLine.y1 = 40;
    objLine.y2 = 60;
    objLine.x1 = x2;
    objLine.idName = 'lastLine1';
    objLine.classe = 'lastLine';
    objLine.idDiv = _idDiv;
    new createLine(objLine);
}

function createMiniLine(idLineAdditional) {
    // função booleana retorna verdadeiro se será preciso criar a mini linha que fica a nota quando
    // ela é criada fora das cinco linhas principais...
    const numLinha = apenasNumeros(idLineAdditional.substring(10, 15));
    if (numLinha >= 11 && numLinha <= 19) return false;
    else return true;
}

export function lastLine(_id) {
    for (let index = 1; index <= 6; index++) {
        remove_id('lastLine' + index + '-idSVG' + (_id - 1));
        //remove a linha anterior...
    }
    new createLastLine("idSVG" + _id);
}

function removeLinha(id) {
    // função reponsavel por armazenar a linha no vetor de linhas excluídas e apaga-lá da tela...
    vetLinhaExcluidas.push(id);
    remove_id(id);
}

export {
    createSVG,
    createLine,
    svgNS
}