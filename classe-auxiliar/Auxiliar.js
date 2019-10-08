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

function numLinhasEntreNotas(primeiraNota, ultimaNota) {
    // função responsável por retornar a quantidade de
    // linhas a serem criadas entre as notas selecionadas...
    const nota = document.getElementById('nota' + primeiraNota),
        svg = nota.getAttributeNS(null, 'svg'),
        indece = apenasNumeros(svg);
    // esse trecho é para saber em qual pauta está sendo criada a linha...

    let posicaoPrimeiraNota = 0,
        posicaoUltimaNota = 0,
        achouPrimeiraNota = false,
        achouUltimaNota = false;
    // variaveis auxiliares...

    vetObjNote[indece].notas.forEach(el => {
        if (el.id === 'nota' + primeiraNota) {
            achouPrimeiraNota = true;
        }
        if (!achouPrimeiraNota) posicaoPrimeiraNota++;
        if (el.id === 'nota' + ultimaNota) {
            achouUltimaNota = true;
        }
        if (!achouUltimaNota) posicaoUltimaNota++;
    });
    return posicaoUltimaNota - posicaoPrimeiraNota;
}