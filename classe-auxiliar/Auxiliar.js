/**
 * arquivo auxiliar
 * para metodos que nao estao em uma classe especifica
 * @author anderson dos santos de barros
 */

function returnPositionY(id) {
    const resposta = apenasNumeros(id.substring(id.length - 10, id.length - 5));
    return 85 - (2.5 * (resposta - 1));
}

//funcao que remove...
function remove_id(id) {
    //usando jquery...
    $('#' + id).remove();
}

function apenasNumeros(string) {
    const numsStr = string.replace(/[^0-9]/g, '');
    //tudo o que nao for numero, sera substituido por vazio...
    return parseInt(numsStr);
}



function returnParms1(_numId) {
    const objLine = {},
        note = document.getElementById('nota' + _numId),
        transform = note.getAttributeNS(null, 'transform'),
        lineOrigin = note.getAttributeNS(null, 'lineOrigin');
    objLine.idNote = 'nota' + _numId;
    objLine.name = note.getAttributeNS(null, 'name');
    objLine.lineOrigin = lineOrigin;
    objLine.x1 = returnPositionX_porcentagemSVG(apenasNumeros(transform.split(' ')[0]) + 37);
    objLine.y1 = returnPositionY(lineOrigin) - 13.5;
    return objLine;

}

function returnParms2(_numId) {
    const objLine = {},
        note = document.getElementById('nota' + _numId),
        transform = note.getAttributeNS(null, 'transform'),
        lineOrigin = note.getAttributeNS(null, 'lineOrigin'),
        idNote = 'nota' + _numId;
    objLine.idNote = idNote;
    objLine.x2 = returnPositionX_porcentagemSVG(apenasNumeros(transform.split(' ')[1]));
    objLine.y2 = returnPositionY(lineOrigin) - 13.5;
    return objLine;
}