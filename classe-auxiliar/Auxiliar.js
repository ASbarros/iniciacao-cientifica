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

function apenasNumerosInput() {
    //funcao para o input ter apenas numeros...
    const input = document.getElementById('inputTime');
    input.value = input.value.substring(0, 1) == 0 ? input.value.substring(1, input.value.length) : input.value;
    //se o primeiro digito for zero, ele é retirado...
    input.value = input.value.replace(/[^0-9\.]/g, '');
    //regex para deixar apenas o caracteres numericos...
}