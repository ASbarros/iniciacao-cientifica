/**
 * arquivo auxiliar
 * para controle de variavéis globais
 * @author anderson dos santos de barros
 */

let NumDiv = 0;
const svgNS = 'http://www.w3.org/2000/svg';
export let vetObjNote = [];
export let vetLinhaExcluidas = [];
let idLineJoin = 0;
//id para as linhas de juncao das notas...

export function getIdLineJoin() {
    return idLineJoin;
}

export function setIdLineJoin(op) {
    op == '-' ? idLineJoin-- : '';
    op == '+' ? idLineJoin++ : '';
}

export function setNumDiv(val) {
    NumDiv = val;
}

export function getNumDiv() {
    return NumDiv
}

export function getSvgNS() {
    return svgNS
}