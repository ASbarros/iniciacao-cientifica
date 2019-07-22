/**
 * arquivo TrocaNotas.js
 * para metodos que realizam as trocas das notas
 * @author anderson dos santos de barros
 */
function changeNote(_note) {
    //funcao para trocar as notas...
    try {
        if (_note.getAttributeNS(null, 'name') === 'seminima') return true;
        const objSeminima = new getImagem('seminima');
        _note.removeAttributeNS(null, 'd', this.localName);
        _note.setAttributeNS(null, 'd', objSeminima.imagem);
        let trans = _note.getAttributeNS(null, 'transform'),
            a = trans.split(' '),
            x = apenasNumeros(a[0]),
            y = apenasNumeros(a[1]);
        if (_note.getAttributeNS(null, 'name') === 'colcheia') {
            x -= 5;
            _note.removeAttributeNS(null, 'transform', this.localName);
            //removendo o atributo antigo...
            _note.setAttributeNS(null, 'transform', 'translate(' + x + ' ' + y + ')');
            //inserindo um novo atributo com a posicao atual
            return true;
        } else if (_note.getAttributeNS(null, 'name') === 'semicolcheia') {
            x = x - 5;
            _note.removeAttributeNS(null, 'transform');
            _note.removeAttributeNS(null, 'move');
            //removendo o atributo antigo...
            _note.setAttributeNS(null, 'transform', 'translate(' + x + ' ' + y + ')');
            _note.setAttributeNS(null, 'move', 10);
            //inserindo um novo atributo com a posicao atual
            return true;
        }
    } catch {
        //se acontecer algum erro...
        return false;
    }
}