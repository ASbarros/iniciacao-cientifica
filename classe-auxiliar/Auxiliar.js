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
