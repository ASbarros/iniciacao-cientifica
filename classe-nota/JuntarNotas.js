/**
 * arquivo juntarNotas.js
 * para metodos que ligam as notas
 * @author anderson dos santos de barros
 */
function joinNotes(_l1, _l2) {
    const objLine = createLineJoinNotes(_l1, _l2),
        nota1 = document.getElementById(_l1.idNote),
        nota2 = document.getElementById(_l2.idNote);
    if (changeNote(nota2) && changeNote(nota1)) {
        new createLine(objLine);
        //criando uma nova linha, que ira ligar as notas...
        idLineJoin++;
        nota1.setAttributeNS(null, 'x1y1Line', objLine.idName + '-' + objLine.idDiv);
        nota2.setAttributeNS(null, 'x2y2Line', objLine.idName + '-' + objLine.idDiv);
        //se a troca das duas notas for bem suscedida, cria a linha de uniao entre elas...
    } else remove_id(nota2.id), remove_id(nota1.id);
}

function join() {
    //funcao para juntar as notas, colocar uma linha em cima delas...
    const Notas = [];
    //vetor para guadar as notas selecionadas...
    let numeroDeNotas = 0;
    //variavel numeroDeNotas para garantir que duas notas sejam selecionadas...
    $('.svg').one('click', (e) => {
        //pegando a primeira nota...
        if (e.target && e.target.classList.contains('nota')) {
            //nota encontrada...
            const idNote1 = e.target.id;
            if (Notas.indexOf(idNote1) == -1) {
                //se a nota ainda nao tiver sido selecionada...
                Notas.push(idNote1);
                //nota adicionada...
                numeroDeNotas++;
            }
            if (numeroDeNotas < 2) {
                $('.svg').one('click', (e) => {
                    //pegando a segunda nota...
                    if (e.target && e.target.classList.contains('nota')) {
                        //nota encontrada...
                        const idNote2 = e.target.id;
                        if (Notas.indexOf(idNote2) == -1) {
                            //se a nota ainda nao tiver sido selecionada...
                            Notas.push(idNote2);
                            //nota adicionada...
                            numeroDeNotas++;
                        }
                        if (numeroDeNotas == 2) {
                            let nota1 = document.getElementById(Notas[0]),
                                //pegando a primeira nota...
                                nota2 = document.getElementById(Notas[1]);
                            //pegando a segunda nota...
                            if (vetObjNote[apenasNumeros(nota1.getAttributeNS(null, 'svg'))].idSVG ==
                                vetObjNote[apenasNumeros(nota2.getAttributeNS(null, 'svg'))].idSVG) {
                                //se as notas estiiverem na mesma pauta...
                                if (nota1.getAttributeNS(null, 'name') == nota2.getAttributeNS(null, 'name')) {
                                    //se as duas notas forem iguais...
                                    const indexVector = apenasNumeros(nota1.getAttributeNS(null, 'svg')),
                                        vectorNote = vetObjNote[indexVector];
                                    //pegando o vetor de notas da pauta...
                                    let trans1 = nota1.getAttributeNS(null, 'transform', this.localName),
                                        a = trans1.split(' '),
                                        x1 = returnPositionX_porcentagemSVG(apenasNumeros(a[0])) + 2.5,
                                        y1 = returnPositionY(nota1.getAttributeNS(null, 'lineOrigin')) - 13.5,
                                        trans2 = nota2.getAttributeNS(null, 'transform'),
                                        b = trans2.split(' '),
                                        x2 = returnPositionX_porcentagemSVG(apenasNumeros(b[0])) + 2.5,
                                        y2 = returnPositionY(nota2.getAttributeNS(null, 'lineOrigin')) - 13.5,
                                        fistId, secondId;
                                    if (x2 < x1) {
                                        //se a segunda nota for clicada primeiro...
                                        let aux = x2;
                                        x2 = x1;
                                        x1 = aux;
                                        aux = y2;
                                        y2 = y1;
                                        y1 = aux;
                                        aux = nota1;
                                        nota1 = nota2;
                                        nota2 = aux;
                                    }
                                    for (const i in vectorNote.notas) {
                                        if (vectorNote.notas[i].id == idNote1) {
                                            //pegando a posicao da primeira nota no vetor...
                                            fistId = apenasNumeros(vectorNote.notas[i].id);
                                            continue;
                                        } else if (vectorNote.notas[i].id == idNote2) {
                                            //pegando a posicao da segunda nota no vetor...
                                            secondId = apenasNumeros(vectorNote.notas[i].id);
                                            continue;
                                        }
                                    }
                                    if (!isNaN(fistId) && !isNaN(secondId)) {
                                        const numLines = secondId - fistId;
                                        //numLines sera usada na iteracao para criar as linhas entre as notas clicadas...
                                        if (numLines == 1) {
                                            //juntando duas notas...
                                            const nota1 = document.getElementById('nota' + fistId),
                                                nota2 = document.getElementById('nota' + secondId);
                                            if (changeNote(nota2) && changeNote(nota1)) {
                                                //se a troca das duas notas for bem suscedida, cria a linha de uniao entre elas...
                                                createLineJoin((parseInt(fistId) + 2), (parseInt(secondId) + 1));
                                                //criando uma nova linha, que ira ligar as notas...
                                            } else remove_id(nota2.id), remove_id(nota1.id);
                                        } else if (numLines == 2) {
                                            //juntando tres notas...
                                            const nota1 = document.getElementById('nota' + fistId),
                                                nota2 = document.getElementById('nota' + (parseInt(fistId) + 1)),
                                                nota3 = document.getElementById('nota' + secondId);
                                            if (changeNote(nota1) && changeNote(nota2) && changeNote(nota3)) {
                                                //se a troca das duas notas for bem suscedida, cria a linha de uniao entre elas...
                                                createLineJoin((parseInt(fistId) + 2), (parseInt(fistId) + 2));
                                                createLineJoin((parseInt(fistId) + 3), (parseInt(secondId) + 1));
                                            } else {
                                                //se acontecer algum erro, exclui as notas...
                                                remove_id('nota' + fistId);
                                                remove_id('nota' + (parseInt(fistId) + 1));
                                                remove_id('nota' + parseInt(secondId));
                                            }
                                        } else if (numLines == 3) {
                                            //juntando quatro linhas...
                                            const nota1 = document.getElementById('nota' + fistId),
                                                nota2 = document.getElementById('nota' + (parseInt(fistId) + 1)),
                                                nota3 = document.getElementById('nota' + (parseInt(fistId) + 2)),
                                                nota4 = document.getElementById('nota' + parseInt(secondId));
                                            if (changeNote(nota1) && changeNote(nota2) && changeNote(nota3) && changeNote(nota4)) {
                                                //se a troca das duas notas for bem suscedida, cria a linha de uniao entre elas...
                                                createLineJoin((parseInt(fistId) + 2), (parseInt(fistId) + 2));
                                                createLineJoin((parseInt(fistId) + 3), (parseInt(fistId) + 3));
                                                createLineJoin((parseInt(fistId) + 3), (parseInt(secondId) + 1));
                                            } else {
                                                //se acontecer algum erro, exclui as notas...
                                                remove_id('nota' + fistId);
                                                remove_id('nota' + (parseInt(fistId) + 1));
                                                remove_id('nota' + (parseInt(fistId) + 2));
                                                remove_id('nota' + parseInt(secondId));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    });
}

function createLineJoinNotes(_l1, _l2) {
    //funcao para retornar o objeto linha que liga as notas clicadas...
    return {
        name: _l1.name,
        x1: _l1.x1,
        y1: _l1.y1,
        x2: _l2.x2,
        y2: _l2.y2,
        mom: _l1.lineOrigin,
        classe: 'linejoincolcheia',
        mom: apenasNumeros(_l1.lineOrigin.substring(_l1.lineOrigin.length - 3, _l1.lineOrigin.length)),
        idName: 'join' + _l1.name + idLineJoin,
        idDiv: 'idSVG' + apenasNumeros(_l1.lineOrigin.substring(_l1.lineOrigin.length - 3, _l1.lineOrigin.length))
    }
}