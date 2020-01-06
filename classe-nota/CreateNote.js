/**
 * classe responsavel por criar as notas...
 * @author anderson dos santos de barros
 */

import {
    getSvgNS, vetObjNote,
    getIdNote, addIdNote
} from '../classe-auxiliar/VariaveisGlobais.js';
import { getImagem } from '../classe-imagem/imagens.js';
import {
    returnPositionX_porcentagem, returnPositionX_porcentagemSVG, returnPorcentageYLine
} from '../classe-auxiliar/Posicoes.js';
import { returnCompass, fullCompass } from '../classe-compasso/Compasso.js';
import { apenasNumeros } from '../classe-auxiliar/Auxiliar.js';
import { sortVector } from '../classe-auxiliar/Ordenacao.js';
import { createLine, createMiniLine } from '../classe-linha/Linha.js';

export function createNote(_name, _obj, miniLine = true) {
    const compass = returnCompass(_obj.e.pageX),
        // pegando o compasso que foi clicado...
        nota = document.createElementNS(getSvgNS(), "path"),
        dad = _obj.idDiv.substring(_obj.idDiv.length - 6, _obj.idDiv.length);
    // pegando a pauta que foi clicada...
    if (fullCompass(compass, apenasNumeros(dad))) {
        const objNota = getImagem(_name);
        nota.setAttributeNS(null, 'name', _name);
        nota.setAttributeNS(null, "stroke", "#000");
        nota.setAttributeNS(null, "lineOrigin", _obj.e.target.id);
        nota.setAttributeNS(null, 'transform', 'translate(' + (_obj.x - objNota.x) +
            ' ' + (_obj.y - objNota.y) + ')');
        nota.setAttributeNS(null, 'x', returnPositionX_porcentagem(_obj.x - objNota.x));
        nota.setAttributeNS(null, 'y', (_obj.y - objNota.y));

        for (const key in _obj) {
            if (_obj.hasOwnProperty(key)) {
                nota.setAttributeNS(null, key, _obj[key]);
            }
        }
        nota.setAttributeNS(null, 'compass', compass);
        nota.setAttributeNS(null, 'svg', dad);
        nota.setAttributeNS(null, "d", objNota.imagem);
        nota.setAttributeNS(null, 'obj_x', objNota.x);
        nota.setAttributeNS(null, 'obj_y', objNota.y);
        document.getElementById(dad).appendChild(nota);

        if (_obj.class != 'nota shadowNote') {

            // uma funcao para implentar depois 
            if (miniLine && createMiniLine(_obj.e.target.id)) {
                // se for preciso criar uma linha pequena na linha em que a nota foi inserida ...
                createLine({
                    idDiv: dad,
                    classe: 'miniLine',
                    idName: 'miniLina-Note' + getIdNote(),
                    x1: returnPositionX_porcentagemSVG(_obj.e.pageX) - 3 + '%',
                    x2: returnPositionX_porcentagemSVG(_obj.e.pageX) - 1 + '%',
                    y1: returnPorcentageYLine(apenasNumeros(_obj.e.target.id.substring(10, 15))) + '%',
                    y2: returnPorcentageYLine(apenasNumeros(_obj.e.target.id.substring(10, 15))) + '%'
                })
            }

            vetObjNote[apenasNumeros(dad)].notas.push({
                id: 'nota' + getIdNote(),
                x: (_obj.x - objNota.x),
                compass
            });
            // adicionando a nota e suas propriedades no vetor...
            sortVector(vetObjNote);
            // ordenando o vetor...
        }
    }
}