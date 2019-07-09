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

let vetObjNote = [],
    //vetor para atualizar a posicao das notas,
    //guarda os ids das notas...
    vetObjLine,
    //vetor para guardar as linhas de uniao entre as notas...
    id = 0;
//id das notas...

function PositionNote(_name, _amount = 1) {
    let button = document.getElementsByTagName('button');
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
                const obj = {};
                obj.y = y;
                obj.idDiv = idDiv;
                obj.e = e;

                if (_amount == 1) { //para criar uma nota...
                    obj.x = x;
                    createNote(_name, obj);
                } else if (_amount == 2) { //para criar duas notas...
                    obj.x = x - 20;
                    createNote(_name, obj);
                    obj.x = x + 20;
                    createNote(_name, obj);
                    createLineJoin();
                } else if (_amount == 3) {
                    obj.x = x - 40;
                    createNote(_name, obj);
                    obj.x = x;
                    createNote(_name, obj);
                    obj.x = x + 40;
                    createNote(_name, obj);
                } else if (_amount == 4) {
                    obj.x = x - 60;
                    createNote(_name, obj);
                    obj.x = x - 20;
                    createNote(_name, obj);
                    obj.x = x + 20;
                    createNote(_name, obj);
                    obj.x = x + 60;
                    createNote(_name, obj);
                }
                for (let i = 0; i < button.length; i++) {
                    button[i].removeAttribute('disabled', 'true');
                    //retirando a propriedade disabled...
                    //ativando os botoes...
                }
            } catch {
                // PositionNote(_name, _amount);
                //se acontecer algum erro, vai chamar a funcao novamente...
            }
        } else PositionNote(_name, _amount);
        //se o click nao for em cima da linha, vai chamar a funcao novamente...
    });
}

function createNote(_name, _obj) {

    const nota = document.createElementNS(svgNS, "path"),
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
    document.getElementById(_obj.idDiv.substring(_obj.idDiv.length - 6, _obj.idDiv.length))
        .appendChild(nota);
    vetObjNote.push('nota' + id);
    //armazenado id do obj...
    id++;

}

function join() {
    //funcao para juntar as notas, colocar uma linha em cima delas...
    let Notas = [];
    //vetor para guadar as notas selecionadas...
    let numeroDeNotas = 0;
    //variavel numeroDeNotas para garantir que duas notas sejam selecionadas...
    $('.svg').one('click', (e) => {
        //pegando a primeira nota...
        if (e.target && e.target.classList.contains('nota')) {
            //nota encontrada...
            if (Notas.indexOf(e.target.id) == -1) {
                //se a nota ainda nao tiver sido selecionada...
                Notas.push(e.target.id);
                //nota adicionada...
                numeroDeNotas++;
            }
            if (numeroDeNotas < 2) {
                $('.svg').one('click', (e) => {
                    //pegando a segunda nota...
                    if (e.target && e.target.classList.contains('nota')) {
                        //nota encontrada...
                        if (Notas.indexOf(e.target.id) == -1) {
                            //se a nota ainda nao tiver sido selecionada...
                            Notas.push(e.target.id);
                            //nota adicionada...
                            numeroDeNotas++;
                        }
                        if (numeroDeNotas == 2) {
                            let nota1 = document.getElementById(Notas[0]),
                                trans = nota1.getAttributeNS(null, 'transform', this.localName),
                                a = trans.split(' '),
                                x1 = returnPositionX_porcentagemSVG(apenasNumeros(a[0])),
                                y1 = returnPositionY(nota1.getAttributeNS(null, 'lineOrigin', this.localName)) - 13.5;

                            let nota2 = document.getElementById(Notas[1]);
                            trans = nota2.getAttributeNS(null, 'transform', this.localName);
                            let b = trans.split(' '),
                                x2 = returnPositionX_porcentagemSVG(apenasNumeros(b[0]));
                            y2 = returnPositionY(nota2.getAttributeNS(null, 'lineOrigin', this.localName)) - 13.5;
                            if (x2 < x1) {
                                //se a segunda nota for clicada primeiro...
                                let aux = x2;
                                x2 = x1;
                                x1 = aux;
                                aux = y2;
                                y2 = y1;
                                y1 = aux;
                            }
                            let obj = {
                                name: nota1.getAttributeNS(null, 'name', this.localName),
                                x1: x1,
                                y1: y1,
                                x2: x2,
                                y2: y2,
                                mom: nota1.getAttributeNS(null, 'lineOrigin', this.localName)
                            };
                            obj.mom = apenasNumeros(obj.mom.substring(obj.mom.length - 3, obj.mom.length));
                            if (changeNote(nota2) && changeNote(nota1)) createLineJoin(obj);
                            //se a troca das duas notas for bem suscedida, cria a linha de uniao entre elas...
                            else remove_id(nota2.id), remove_id(nota1.id);
                        }
                    }
                });
            }
        }
    });
}

function changeNote(_note) {
    //funcao para trocar as notas...
    try {
        let objSeminima = new getImagem('seminima');
        _note.removeAttributeNS(null, 'd', this.localName);
        _note.setAttributeNS(null, 'd', objSeminima.imagem);
        let trans = _note.getAttributeNS(null, 'transform', this.localName),
            a = trans.split(' '),
            x = apenasNumeros(a[0]),
            y = apenasNumeros(a[1]);
        if (_note.getAttributeNS(null, 'name', this.localName) === 'colcheia') {
            x -= 5;
            _note.removeAttributeNS(null, 'transform', this.localName);
            //removendo o atributo antigo...
            _note.setAttributeNS(null, 'transform', 'translate(' + x + ' ' + y + ')');
            //inserindo um novo atributo com a posicao atual
            return true;
        } else if (_note.getAttributeNS(null, 'name', this.localName) === 'semicolcheia') {
            x = x - 5;
            _note.removeAttributeNS(null, 'transform', this.localName);
            //removendo o atributo antigo...
            _note.setAttributeNS(null, 'transform', 'translate(' + x + ' ' + y + ')');
            //inserindo um novo atributo com a posicao atual
            return true;
        }
    } catch {
        //se acontecer algum erro...
        return false;
    }
}
let idLineJoin = 0;

function createLineJoin() {
    const objLine = {},
        fistNote = document.getElementById('nota' + (id - 2)),
        secondNote = document.getElementById('nota' + (id - 1)),
        transformFistNote = fistNote.getAttributeNS(null, 'transform', this.localName),
        transformSecondNote = secondNote.getAttributeNS(null, 'transform', this.localName),
        aux1 = transformFistNote.split(' '),
        aux2 = transformSecondNote.split(' '),
        lineOrigin = fistNote.getAttributeNS(null, 'lineOrigin', this.localName);
    objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(aux1[0]) + 37);
    objLine.n1 = 'nota' + (id - 2);
    objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(aux2[0]) + 40);
    objLine.n2 = 'nota' + (id - 1);
    objLine.y1 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin', this.localName)) - 13.6;
    objLine.y2 = returnPositionY(secondNote.getAttributeNS(null, 'lineOrigin', this.localName)) - 13.6;
    objLine.name = fistNote.getAttributeNS(null, 'name', this.localName);
    objLine.mom = apenasNumeros(lineOrigin.substring(lineOrigin.length - 3, lineOrigin.length));
    objLine.classe = 'linejoincolcheia';
    objLine.idName = 'join' + objLine.name + idLineJoin;
    objLine.idDiv = 'idSVG' + objLine.mom;
    new createLine(objLine);
    idLineJoin++;
}

function DeleteNote(tentativa = 0) {
    //funcao para apagar uma nota pelo click...
    //se o primeiro click der errado, a funcao é chamada outra vez...
    if (tentativa < 2) {
        $('.svg').one('click', (e) => {
            const click = e.target.id;
            const regex = /\b(nota[0-9]\d*)\b/;
            //expressao regular para pegar apenas as notas...
            if (!!click.match(regex)) remove_id(click);
            else DeleteNote(tentativa++);
        });
    }
}