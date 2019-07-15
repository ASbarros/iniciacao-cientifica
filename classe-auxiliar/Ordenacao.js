/**
 * arquivo referente a ordenacao de vetores
 * para metodos que nao estao em uma classe especifica
 * @author anderson dos santos de barros
 */
function sortfunction(a, b) {
    return (a.x - b.x) //faz com que o array seja ordenado numericamente e de ordem crescente...
}

function sortVector(_vector) {
    //para ordenar um vetor...
    for (const i in _vector)
        _vector[i].notas.sort(sortfunction);
}