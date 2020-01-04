import {
    vetLinhaExcluidas, getIdLineJoin,
    setIdLineJoin, getIdNote
} from '../classe-auxiliar/VariaveisGlobais.js';
import { returnPositionX_porcentagemSVG } from '../classe-auxiliar/Posicoes.js';
import { apenasNumeros, returnPositionY } from '../classe-auxiliar/Auxiliar.js';
import { createLine } from '../classe-linha/Linha.js';

export function createLineJoin(idNote1 = getIdNote(), idNote2 = getIdNote()) {
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
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37) + '%';
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40) + '%';
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 13.6 + '%';
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 13.6 + '%';
            objLine.classe = 'linejoincolcheia';
            objLine.idName = 'join' + objLine.name + getIdLineJoin();
            objLine.id = objLine.idName + "-" + objLine.idDiv;
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            setIdLineJoin('+');
            fistNote.setAttributeNS(null, 'x1y1Line', objLine.idName + '-' + objLine.idDiv);
            secondNote.setAttributeNS(null, 'x2y2Line', objLine.idName + '-' + objLine.idDiv);
            //colocando o id da linha nas notas, para saber qual a parte da linha que ira se
            //mover juntamente com a linha...
        } else if (name === 'seminima') {
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37) + '%';
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40) + '%';
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 13.6 + '%';
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 13.6 + '%';
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
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37) + '%';
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40) + '%';
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 13.6 + '%';
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 13.6 + '%';
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
