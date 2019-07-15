function changeNote(_note) {
    //funcao para trocar as notas...
    try {
        if (_note.getAttributeNS(null, 'name', this.localName) === 'seminima') return true;
        const objSeminima = new getImagem('seminima');
        _note.removeAttributeNS(null, 'd', this.localName);
        _note.setAttributeNS(null, 'd', objSeminima.imagem);
        let trans = _note.getAttributeNS(null, 'transform', this.localName),
            a = trans.split(' '),
            x = apenasNumeros(a[0]),
            y = apenasNumeros(a[1]);
        if (_note.getAttributeNS(null, 'name', this.localName) === 'colcheia') {
            x -= 5;
            _note.removeAttributeNS(null, 'transform', this.localName);
            //removendo o atributo antigo...
            _note.setAttributeNS(null, 'transform', 'translate(' + x + ' ' + y + ')');
            //inserindo um novo atributo com a posicao atual
            return true;
        } else if (_note.getAttributeNS(null, 'name', this.localName) === 'semicolcheia') {
            x = x - 5;
            _note.removeAttributeNS(null, 'transform', this.localName);
            //removendo o atributo antigo...
            _note.setAttributeNS(null, 'transform', 'translate(' + x + ' ' + y + ')');
            //inserindo um novo atributo com a posicao atual
            return true;
        }
    } catch {
        //se acontecer algum erro...
        return false;
    }
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


