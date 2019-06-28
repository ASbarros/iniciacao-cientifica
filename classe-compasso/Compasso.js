/**
 * classe compasso
 * @author anderson dos santos de barros
 */

//funcao para criar o compasso(as linhas verticais)...
function createCompass(_NumCompasso, _idDiv) {
    //variavel responsavel por comtrolar o espacamento dos compassos...
    let EspaCompasso = 100 / _NumCompasso;
    //para garantir o mesmo espacamento...
    let TamCompasso = EspaCompasso;

    let y1 = 40,
        y2 = 60,
        objLine,
        id = 0;
    id++;
    for (let i = 1; i < _NumCompasso; i++, EspaCompasso += TamCompasso, id++) {
        objLine = {
            x1: EspaCompasso,
            x2: EspaCompasso,
            y1: y1,
            y2: y2,
            idName: 'compasso' + id,
            idDiv: _idDiv,
            classe: 'compasso'
        }
        new createLine(objLine);
    }
    objLine.x1 = 98.2;
    objLine.x2 = 98.2;
    objLine.idDiv = 'compasso' + id;
    objLine.idDiv = _idDiv;
    new createLine(objLine);
}