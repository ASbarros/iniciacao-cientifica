/**
 * classe onde vai ter todas as funcionalidades das notas
 * @author anderson dos santos de barros
 */

import { 
    getSvgNS, vetLinhaExcluidas, vetObjNote, getIdLineJoin, setIdLineJoin, getCreateNoteShadow, setCreateNoteShadow
} from '../classe-auxiliar/VariaveisGlobais.js';
import { getImagem } from '../classe-imagem/imagens.js';
import { 
    returnPositionY_px, returnPositionX_porcentagem, returnPositionX_porcentagemSVG, returnPorcentageYLine
} from '../classe-auxiliar/Posicoes.js';
import { returnCompass, fullCompass } from '../classe-compasso/Compasso.js';
import { apenasNumeros, returnPositionY, remove_id } from '../classe-auxiliar/Auxiliar.js';
import { sortVector } from '../classe-auxiliar/Ordenacao.js';
import { createLine, createMiniLine } from '../classe-linha/Linha.js';
 
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

let id = 0;
//id das notas...

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
        createNote(state._name, obj, 2);
        setCreateNoteShadow(true);
    } else {
        const noteShadow = document.getElementsByClassName('shadowNote')[0];
        if(noteShadow) {
            noteShadow.setAttributeNS(null, 'clickY', e.pageY);
            noteShadow.setAttributeNS(null, 'clickX', e.pageX);
            let lineOrigin = noteShadow.getAttributeNS(null, 'lineOrigin'),
            numLine = apenasNumeros(lineOrigin.substring(10, lineOrigin.length - 7));
            
            const obj_y = noteShadow.getAttributeNS(null, 'obj_y'),
            obj_x = noteShadow.getAttributeNS(null, 'obj_x'),
            clickY = noteShadow.getAttributeNS(null, 'clickY'),
            clickX = noteShadow.getAttributeNS(null, 'clickX'),
            transformX = apenasNumeros(noteShadow.getAttributeNS(null, 'transform').split(' ')[0]),
            //pegando os atributos da nota...
            primeiraParte = lineOrigin.substring(0, 10),
            segundaParte = lineOrigin.substring(lineOrigin.length - 7, lineOrigin.length),
            y = returnPositionY_px(lineOrigin) - obj_y;
            // console.log(clickY)
            if (e.pageY + 10 > clickY ) {
                //se o movimento for para baixo...
                if (numLine > 1) numLine--;
                 lineOrigin = primeiraParte + numLine + segundaParte;
                noteShadow.removeAttributeNS(null, 'lineOrigin', this.localName);
                noteShadow.setAttributeNS(null, 'lineOrigin', lineOrigin); 
                //atualizando o atributo da nota...
            }
            else if (e.pageY - 10 < clickY) {
               //se o movimento for para cima...
               if (numLine < 29) numLine++;
               lineOrigin = primeiraParte + numLine + segundaParte;
               noteShadow.removeAttributeNS(null, 'lineOrigin', this.localName);
               noteShadow.setAttributeNS(null, 'lineOrigin', lineOrigin);
               //atualizando o atributo da nota...
            }
               const newTransformX = (e.pageX);
               console.log(returnPositionY_px(lineOrigin)- obj_y)
            // atualizando o valor X da propriedade transform

            noteShadow.setAttributeNS(null, 'compass', returnCompass(clickX));
            // atualizando o compasso da nota...

            noteShadow.removeAttributeNS(null, 'transform', this.localName);
            //removendo o atributo antigo...
            noteShadow.setAttributeNS(null, 'transform',
                'translate(' + newTransformX + ' ' + y + ')');
            //colocando a nova posicao...
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
            } catch {}
        } else PositionNote(_name, _amount);
        //se o click nao for em cima da linha, vai chamar a funcao novamente...
    });
}

function createNote(_name, _obj) {
    const compass = returnCompass(_obj.e.pageX),
    // pegando o compasso que foi clicado...
    nota = document.createElementNS(getSvgNS(), "path"),
    dad = _obj.idDiv.substring(_obj.idDiv.length - 6, _obj.idDiv.length);
    // pegando a pauta que foi clicada...
    let objNota;
    if (fullCompass(compass, apenasNumeros(dad))) {
        objNota = getImagem(_name);
        nota.setAttributeNS(null, "id", "nota" + id);
        nota.setAttributeNS(null, 'name', _name);
        // nota.setAttributeNS(null, 'onmousedown', 'ativarMovimentacao()');
        // nota.setAttributeNS(null, 'onmouseleave', 'retiraMovimentacao()');
        // nota.setAttributeNS(null, 'onmouseup', 'retiraMovimentacao()');
        nota.setAttributeNS(null, "stroke", "#000");
        nota.setAttributeNS(null, "class", _obj.class);
        nota.setAttributeNS(null, "d", objNota.imagem);
        nota.setAttributeNS(null, "lineOrigin", _obj.e.target.id);
        nota.setAttributeNS(null, 'transform', 'translate(' + (_obj.x - objNota.x) +
        ' ' + (_obj.y - objNota.y) + ')');
        nota.setAttributeNS(null, 'x', returnPositionX_porcentagem(_obj.x - objNota.x));
        nota.setAttributeNS(null, 'y', (_obj.y - objNota.y));
        nota.setAttributeNS(null, 'pageX', _obj.e.pageX);
        nota.setAttributeNS(null, 'pageY', _obj.e.pageY);
        nota.setAttributeNS(null, 'obj_x', objNota.x);
        nota.setAttributeNS(null, 'obj_y', objNota.y);
        nota.setAttributeNS(null, 'svg', dad);
        // nota.setAttributeNS(null, 'move', objNota.move);
        nota.setAttributeNS(null, 'compass', compass);
        document.getElementById(dad).appendChild(nota);
        
        // uma funcao para implentar depois 
        if (createMiniLine(_obj.e.target.id)) {
        // se for preciso criar uma linha pequena na linha em que a nota foi inserida ...
            createLine({
                idDiv: dad,
                classe: 'miniLine',
                idName: 'miniLina-Note' + id,
                x1: returnPositionX_porcentagemSVG(_obj.e.pageX) - 3,
                x2: returnPositionX_porcentagemSVG(_obj.e.pageX) - 1,
                y1: returnPorcentageYLine(apenasNumeros(_obj.e.target.id.substring(10, 15))),
                y2: returnPorcentageYLine(apenasNumeros(_obj.e.target.id.substring(10, 15)))
            })
        }
        

        vetObjNote[apenasNumeros(dad)].notas.push({
            id: 'nota' + id,
            x: (_obj.x - objNota.x),
            compass
        });
        // adicionando a nota e suas propriedades no vetor...
        sortVector(vetObjNote);
        // ordenando o vetor...
        id++;
    }
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