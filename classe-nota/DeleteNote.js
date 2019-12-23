/**
 * arquivo responsavel por excluir uma nota...
 * @author anderson dos santos de barros
 */
import { vetObjNote } from '../classe-auxiliar/VariaveisGlobais.js';
import { apenasNumeros, remove_id } from '../classe-auxiliar/Auxiliar.js';
import { sortVector } from '../classe-auxiliar/Ordenacao.js';
import { removeLinha } from '../classe-linha/Linha.js';

export function DeleteNote(tentativa = 0) {
    //funcao para apagar uma nota pelo click...
    if (typeof tentativa == 'object') tentativa = 0;
    if (tentativa < 2) {
        $('.svg').one('click', (e) => {
            const click = e.target.id,
            regex = /\b(nota[0-9]\d*)\b/;
            //expressao regular para pegar apenas as notas...
            if (click.match(regex)) {
                const objLine = document.getElementById(click);
                // se tiver alguma linha associada com a nota, vai excluir tambem...
                const x1y1Line = objLine.getAttributeNS(null, 'x1y1Line'),
                x2y2Line = objLine.getAttributeNS(null, 'x2y2Line');
                
                try {
                    const indeceDaPauta = apenasNumeros(objLine.getAttributeNS(null, 'svg'));
                    vetObjNote[indeceDaPauta].notas.splice(apenasNumeros(click), 1);
                    // remove um elemento a partir da nota excluída do vetor de notas...
                    sortVector(vetObjNote);
                    // reordena o vetor...
                    remove_id(click);
                    // remove a nota...
                    x1y1Line ? removeLinha(x1y1Line) : '';
                    x2y2Line ? removeLinha(x2y2Line) : '';
                    // remove as linhas associadas a nota removida...
                    
                } catch (error) {
                    // 
                }
            } else DeleteNote(tentativa++);
            //se o primeiro click der errado, a funcao é chamada outra vez...
        });
    }
}