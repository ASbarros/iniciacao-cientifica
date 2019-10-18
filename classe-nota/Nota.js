/**
 * classe onde vai ter todas as funcionalidades das notas
 * @author anderson dos santos de barros
 */
function createCompassFormula(_obj) {
    const CF = document.createElementNS(svgNS, "path"),
        NumDiv = _obj.idDiv.substring(5, 6);
    CF.setAttributeNS(null, "id", _obj.name + NumDiv);
    CF.setAttributeNS(null, "stroke", "#000");
    CF.setAttributeNS(null, 'transform', 'translate(' + _obj.x + ' ' + _obj.y + ')');
    CF.setAttributeNS(null, "d", getImagem(_obj.name));
    document.getElementById(_obj.idDiv).appendChild(CF);
    //apendando o elemento no corpo do svg...
}

const vetObjNote = [];
//vetor para atualizar a posicao das notas,
//guarda os ids das notas...
let id = 0;
//id das notas...

function PositionNote(_name, _amount = 1) {
    const button = document.getElementsByTagName('button');
    for (let i = 0; i < button.length; i++) {
        //inabilitando os botoes...
        button[i].setAttribute('disabled', 'true');
    }
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
                    y
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
            } catch {}
        } else PositionNote(_name, _amount);
        //se o click nao for em cima da linha, vai chamar a funcao novamente...
    });
}

function createNote(_name, _obj) {

    const compass = returnCompass(_obj.e.pageX),
        // pegando o compasso que foi clicado...
        nota = document.createElementNS(svgNS, "path"),
        dad = _obj.idDiv.substring(_obj.idDiv.length - 6, _obj.idDiv.length);
    // pegando a pauta que foi clicada...
    if (fullCompass(compass, apenasNumeros(dad))) {

        objNota = new getImagem(_name);
        nota.setAttributeNS(null, "id", "nota" + id);
        nota.setAttributeNS(null, 'name', _name);
        nota.setAttributeNS(null, 'onmousedown', 'ativarMovimentacao()');
        nota.setAttributeNS(null, 'onmouseleave', 'retiraMovimentacao()');
        nota.setAttributeNS(null, 'onmouseup', 'retiraMovimentacao()');
        nota.setAttributeNS(null, "stroke", "#000");
        nota.setAttributeNS(null, "class", "nota");
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
        nota.setAttributeNS(null, 'move', objNota.move);
        nota.setAttributeNS(null, 'compass', compass)
        document.getElementById(dad).appendChild(nota);

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

let idLineJoin = 0;
//id para as linhas de juncao das notas...

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
            objLine.idName = 'join' + objLine.name + idLineJoin;
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            idLineJoin++;
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
            objLine.idName = 'join' + objLine.name + idLineJoin;
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            idLineJoin++;
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
            objLine.idName = 'join' + objLine.name + idLineJoin;
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            idLineJoin++;
            fistNote.setAttributeNS(null, 'x1y1Line', objLine.idName + '-' + objLine.idDiv);
            secondNote.setAttributeNS(null, 'x2y2Line', objLine.idName + '-' + objLine.idDiv);
            //colocando o id da linha nas notas, para saber qual a parte da linha que ira se
            //mover juntamente com a linha...
            objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37);
            objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40);
            objLine.y1 = returnPositionY(fistNote.getAttributeNS(null, 'lineOrigin')) - 12.1;
            objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin')) - 12.1;
            objLine.idName = 'join' + objLine.name + idLineJoin;
            //setando os atributos da linha...
            new createLine(objLine);
            //criando uma nova linha, que ira ligar as notas...
            idLineJoin++;
            fistNote.setAttributeNS(null, 'x1y1Line2', objLine.idName + '-' + objLine.idDiv);
            secondNote.setAttributeNS(null, 'x2y2Line2', objLine.idName + '-' + objLine.idDiv);
            //colocando o id da linha nas notas, para saber qual a parte da linha que ira se
            //mover juntamente com a linha...
        }
    }
}

function DeleteNote(tentativa = 0) {
    //funcao para apagar uma nota pelo click...
    //se o primeiro click der errado, a funcao é chamada outra vez...
    if (tentativa < 2) {
        $('.svg').one('click', (e) => {
            const click = e.target.id,
                regex = /\b(nota[0-9]\d*)\b/;
            //expressao regular para pegar apenas as notas...
            if (click.match(regex)) {
                const objLine = document.getElementById(click);
                // se tiver alguma linha associada com a nota, vai excluir tambem...
                const x1y1Line = objLine.getAttributeNS(null, 'x1y1Line'),
                    x2y2Line = objLine.getAttributeNS(null, 'x2y2Line');

                try {
                    const indeceDaPauta = apenasNumeros(objLine.getAttributeNS(null, 'svg'));
                    vetObjNote[indeceDaPauta].notas.splice(apenasNumeros(click), 1);
                    // remove um elemento a partir da nota excluída do vetor de notas...
                    sortVector(vetObjNote);
                    // reordena o vetor...
                    remove_id(click);
                    // remove a nota...
                    x1y1Line ? removeLinha(x1y1Line) : '';
                    x2y2Line ? removeLinha(x2y2Line) : '';
                    // remove as linhas associadas a nota removida...

                } catch (error) {
                    // 
                }
            } else DeleteNote(tentativa++);
        });
    }
}