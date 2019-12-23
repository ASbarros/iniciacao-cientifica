/**
 * arquivo auxiliar
 * para controle de variavéis globais
 * @author anderson dos santos de barros
 */

let NumDiv = 0;
const svgNS = 'http://www.w3.org/2000/svg';
export let vetObjNote = [];
export let vetLinhaExcluidas = [];

export function setNumDiv(val) {
    NumDiv = val;
}

export function getNumDiv() {
    return NumDiv
}

export function getSvgNS() {
    return svgNS
}