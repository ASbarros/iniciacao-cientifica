/**
* classe onde vai ter todas as funcionalidades das notas
* @author anderson dos santos de barros
*/

import {
    getSvgNS, getCreateNoteShadow,
    setCreateNoteShadow, getNumLineAtualy,
    setNumLineAtuaty, getIdNote, addIdNote
} from '../classe-auxiliar/VariaveisGlobais.js';
import { getImagem } from '../classe-imagem/imagens.js';
import { returnPositionY_px } from '../classe-auxiliar/Posicoes.js';
import { returnCompass } from '../classe-compasso/Compasso.js';
import { apenasNumeros } from '../classe-auxiliar/Auxiliar.js';
import { createNote } from './CreateNote.js';
import { createLineJoin } from '../classe-linha/CreateLineJoin.js';

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
        x,
        id: 'nota-shadow',
        name: state._name,
        stroke: '#000',
        lineOrigin: idDiv,
        pageX: e.pageX,
        pageY: e.pageY
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
                        'translate(' + (newTransformX - 60) + ' ' + y + ')');
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
                    class: 'nota',
                    pageX: e.pageX,
                    pageY: e.pageY
                };
                if (_amount == 1) { //para criar uma nota...
                    obj.x = x;
                    obj.id = addIdNote();
                    createNote(_name, obj);
                } else if (_amount == 2) { //para criar duas notas...
                    obj.x = x - 20;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    obj.x = x + 20;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    createLineJoin();
                } else if (_amount == 3) { //para criar tres notas...
                    obj.x = x - 40;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    obj.x = x;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    createLineJoin();
                    obj.x = x + 40;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    createLineJoin();
                } else if (_amount == 4) { //para criar quatro notas...
                    obj.x = x - 60;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    obj.x = x - 20;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    createLineJoin();
                    obj.x = x + 20;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    createLineJoin();
                    obj.x = x + 60;
                    obj.id = addIdNote();
                    createNote(_name, obj, false);
                    createLineJoin();
                }
                desableShadow(svgs);
                setCreateNoteShadow(false);
            } catch { }
            finally {
                for (let i = 0; i < button.length; i++) {
                    button[i].removeAttribute('disabled', 'true');
                    // retirando a propriedade disabled...
                    // ativando os botoes...
                }
            }
        } else PositionNote(_name, _amount);
        //se o click nao for em cima da linha, vai chamar a funcao novamente...
    });
}

export {
    createCompassFormula
}