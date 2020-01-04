/**
 * classe onde vai ter todas as funcionalidades das notas
 * @author anderson dos santos de barros
 */

import {
    getSvgNS, vetLinhaExcluidas,
    getIdLineJoin, setIdLineJoin, getCreateNoteShadow,
    setCreateNoteShadow, getNumLineAtualy, setNumLineAtuaty
} from '../classe-auxiliar/VariaveisGlobais.js';
import { getImagem } from '../classe-imagem/imagens.js';
import {
    returnPositionY_px, returnPositionX_porcentagemSVG
} from '../classe-auxiliar/Posicoes.js';
import { returnCompass } from '../classe-compasso/Compasso.js';
import { apenasNumeros, returnPositionY, remove_id } from '../classe-auxiliar/Auxiliar.js';
import { createLine } from '../classe-linha/Linha.js';
import { createNote } from './CreateNote.js';

function createCompassFormula(_obj) {
    const CF = document.createElementNS(getSvgNS(), "path"),
        NumDiv = _obj.idDiv.substring(5, 6);
    CF.setAttributeNS(null, "id", _obj.name + NumDiv);
    CF.setAttributeNS(null, "stroke", "#000");
    CF.setAttributeNS(null, 'transform', 'translate(' + _obj.x + ' ' + _obj.y + ')');
    CF.setAttributeNS(null, "d", getImagem(_obj.name));
    document.getElementById(_obj.idDiv).appendChild(CF);
    //apendando o elemento no corpo do svg...
}

const state = {
    _name: ''
}

function shadowNote(e) {
    let x = e.clientX,
        idDiv = e.target.id,
        y = returnPositionY_px(idDiv);
    const obj = {
        e,
        idDiv,
        y,
        class: 'nota shadowNote',
        x
    };
    if (obj.idDiv !== 'idSVG0' && !getCreateNoteShadow()) {
        createNote(state._name, obj);
        setCreateNoteShadow(true);
    } else {
        const noteShadow = document.getElementsByClassName('shadowNote')[0];
        if (noteShadow) {
            // se a nota sombra existir...
            if (getNumLineAtualy()) {
                // se a linha atual da nota de sombra estiver setada...
                if ($(e.target)[0].getAttributeNS(null, 'type') == 'line') {
                    // se o movimento esta em uma linha...
                    noteShadow.setAttributeNS(null, 'clickY', e.pageY);
                    noteShadow.setAttributeNS(null, 'clickX', e.pageX);
                    let lineOrigin = noteShadow.getAttributeNS(null, 'lineOrigin'),
                        numLine = apenasNumeros(lineOrigin.substring(10, lineOrigin.length - 7));

                    const obj_y = noteShadow.getAttributeNS(null, 'obj_y'),
                        clickX = noteShadow.getAttributeNS(null, 'clickX'),
                        //pegando os atributos da nota...
                        primeiraParte = lineOrigin.substring(0, 10),
                        segundaParte = lineOrigin.substring(lineOrigin.length - 7, lineOrigin.length),
                        y = returnPositionY_px(lineOrigin) - obj_y;
                    // console.log(clickY)
                    if (apenasNumeros($(e.target)[0].getAttributeNS(null, 'id').substring(10, $(e.target)[0].getAttributeNS(null, 'id').length - 7)) < getNumLineAtualy()) {
                        //se o movimento for para baixo...
                        if (numLine > 1) numLine--;
                        lineOrigin = primeiraParte + numLine + segundaParte;
                        noteShadow.removeAttributeNS(null, 'lineOrigin', this.localName);
                        noteShadow.setAttributeNS(null, 'lineOrigin', lineOrigin);
                        //atualizando o atributo da nota...
                        setNumLineAtuaty(numLine);
                    }
                    else if (apenasNumeros($(e.target)[0].getAttributeNS(null, 'id').substring(10, $(e.target)[0].getAttributeNS(null, 'id').length - 7)) > getNumLineAtualy()) {
                        //se o movimento for para cima...
                        if (numLine < 29) numLine++;
                        lineOrigin = primeiraParte + numLine + segundaParte;
                        noteShadow.removeAttributeNS(null, 'lineOrigin', this.localName);
                        noteShadow.setAttributeNS(null, 'lineOrigin', lineOrigin);
                        //atualizando o atributo da nota...
                        setNumLineAtuaty(numLine);
                    }
                    const newTransformX = (e.pageX);
                    // atualizando o valor X da propriedade transform

                    noteShadow.setAttributeNS(null, 'compass', returnCompass(clickX));
                    // atualizando o compasso da nota...

                    noteShadow.removeAttributeNS(null, 'transform', this.localName);
                    //removendo o atributo antigo...
                    noteShadow.setAttributeNS(null, 'transform',
                        'translate(' + newTransformX + ' ' + y + ')');
                    //colocando a nova posicao...
                }
            } else {
                $(e.target)[0].getAttributeNS(null, 'type') == 'line' ?
                    setNumLineAtuaty(
                        apenasNumeros(
                            $(e.target)[0].getAttributeNS(null, 'id').substring(10, $(e.target)[0].getAttributeNS(null, 'id').length - 7)))
                    : '';
            }
        }
    }
}

function activeShadow(svgs, _name) {
    for (const svg of svgs) {
        svg.addEventListener('mousemove', shadowNote, false);
    }
}

function desableShadow(svgs) {
    for (const svg of svgs) {
        svg.removeEventListener('mousemove', shadowNote, false);
    }
    $('.shadowNote').remove()
}

export function PositionNote(_name, _amount = 1) {
    const button = document.getElementsByTagName('button');
    const svgs = $('.svg');

    for (let i = 0; i < button.length; i++) {
        //desabilitando os botoes...
        button[i].setAttribute('disabled', 'true');
    }

    state._name = _name;
    activeShadow(svgs, _name);

    $(document.body).one('click', e => {
        if (e.target && e.target.classList.contains('suplementar')) {
            //elemento encontrado...
            try {
                let x = e.clientX,
                    idDiv = e.target.id,
                    y = returnPositionY_px(idDiv);
                const obj = {
                    e,
                    idDiv,
                    y,
                    class: 'nota'
                };
                if (_amount == 1) { //para criar uma nota...
                    obj.x = x;
                    createNote(_name, obj);
                } else if (_amount == 2) { //para criar duas notas...
                    obj.x = x - 20;
                    createNote(_name, obj);
                    obj.x = x + 20;
                    createNote(_name, obj);
                    createLineJoin();
                } else if (_amount == 3) { //para criar tres notas...
                    obj.x = x - 40;
                    createNote(_name, obj);
                    obj.x = x;
                    createNote(_name, obj);
                    createLineJoin();
                    obj.x = x + 40;
                    createNote(_name, obj);
                    createLineJoin();
                } else if (_amount == 4) { //para criar quatro notas...
                    obj.x = x - 60;
                    createNote(_name, obj);
                    obj.x = x - 20;
                    createNote(_name, obj);
                    createLineJoin();
                    obj.x = x + 20;
                    createNote(_name, obj);
                    createLineJoin();
                    obj.x = x + 60;
                    createNote(_name, obj);
                    createLineJoin();
                }
                for (let i = 0; i < button.length; i++) {
                    button[i].removeAttribute('disabled', 'true');
                    //retirando a propriedade disabled...
                    //ativando os botoes...
                }
                desableShadow(svgs);
            } catch { }
        } else PositionNote(_name, _amount);
        //se o click nao for em cima da linha, vai chamar a funcao novamente...
    });
}



function createLineJoin(idNote1 = id, idNote2 = id) {
    const fistNote = document.getElementById('nota' + (idNote1 - 2)),
        secondNote = document.getElementById('nota' + (idNote2 - 1)),
        //pegando as notas, da esqueda para a direita...
        line1 = fistNote.getAttributeNS(null, 'x1y1Line'),
        line2 = secondNote.getAttributeNS(null, 'x2y2Line');

    if (!line1 || !line2 || vetLinhaExcluidas.indexOf(line1) > -1 || vetLinhaExcluidas.indexOf(line2) > -1) {
        //se existir uma linha que liga as notas, nao sera criada uma nova...
        const objLine = {},
            //instanciando o objeto...
            transformFistNote = fistNote.getAttributeNS(null, 'transform'),
            transformSecondNote = secondNote.getAttributeNS(null, 'transform'),
            aux1 = transformFistNote.split(' '),
            aux2 = transformSecondNote.split(' '),
            lineOrigin = fistNote.getAttributeNS(null, 'lineOrigin'),
            name = fistNote.getAttributeNS(null, 'name');
        objLine.name = name;
        objLine.mom = apenasNumeros(lineOrigin.substring(lineOrigin.length - 3, lineOrigin.length));
        objLine.idDiv = 'idSVG' + objLine.mom;
        if (name === 'colcheia') {
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37);
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40);
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 13.6;
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 13.6;
            objLine.classe = 'linejoincolcheia';
            objLine.idName = 'join' + objLine.name + getIdLineJoin();
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            setIdLineJoin('+');
            fistNote.setAttributeNS(null, 'x1y1Line', objLine.idName + '-' + objLine.idDiv);
            secondNote.setAttributeNS(null, 'x2y2Line', objLine.idName + '-' + objLine.idDiv);
            //colocando o id da linha nas notas, para saber qual a parte da linha que ira se
            //mover juntamente com a linha...
        } else if (name === 'seminima') {
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37);
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40);
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 13.6;
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 13.6;
            objLine.classe = 'linejoincolcheia';
            objLine.idName = 'join' + objLine.name + getIdLineJoin();
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            setIdLineJoin('+');
            fistNote.setAttributeNS(null, 'x1y1Line', objLine.idName + '-' + objLine.idDiv);
            secondNote.setAttributeNS(null, 'x2y2Line', objLine.idName + '-' + objLine.idDiv);
            //colocando o id da linha nas notas, para saber qual a parte da linha que ira se
            //mover juntamente com a linha...
        } else if (name === 'semicolcheia') {
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37);
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40);
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 13.6;
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 13.6;
            objLine.classe = 'linejoinsemicolcheia';
            objLine.idName = 'join' + objLine.name + getIdLineJoin();
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            setIdLineJoin('+');
            fistNote.setAttributeNS(null, 'x1y1Line', objLine.idName + '-' + objLine.idDiv);
            secondNote.setAttributeNS(null, 'x2y2Line', objLine.idName + '-' + objLine.idDiv);
            //colocando o id da linha nas notas, para saber qual a parte da linha que ira se
            //mover juntamente com a linha...
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37);
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40);
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 12.1;
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 12.1;
            objLine.idName = 'join' + objLine.name + getIdLineJoin();
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            setIdLineJoin('+');
            fistNote.setAttributeNS(null, 'x1y1Line2', objLine.idName + '-' + objLine.idDiv);
            secondNote.setAttributeNS(null, 'x2y2Line2', objLine.idName + '-' + objLine.idDiv);
            //colocando o id da linha nas notas, para saber qual a parte da linha que ira se
            //mover juntamente com a linha...
        }
    }
}

export {
    createCompassFormula
}