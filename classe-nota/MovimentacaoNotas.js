 /**
  * arquivo MovimentacaoNotas.js
  * para metodos que fazem a movimentacao das notas
  * @author anderson dos santos de barros
  */

 function ativarMovimentacao() {
     //adiciona o evento de movimentacao...
     const note = document.getElementById(event.target.id);
     note.addEventListener('mousemove', movimentacao);
     note.setAttributeNS(null, 'clickY', event.pageY);
     note.setAttributeNS(null, 'clickX', event.pageX);
     //adiciona o atributo para saber qual foi a posicao do click inicial...
 }

 function retiraMovimentacao() {
     //retira o evento de movimentacao...
     const note = document.getElementById(event.target.id);
     note.removeEventListener('mousemove', movimentacao);
     note.removeAttributeNS(null, 'clickY', this.localName);
     note.removeAttributeNS(null, 'clickX', this.localName);
     //retirando os atributos, pois nao sao mais necessarios...
 }

 function movimentacao() {
     // evento de movimentacao da nota de acordo com o mouse....

     const note = document.getElementById(event.target.id);
         //pegando a nota clicada...
     let lineOrigin = note.getAttributeNS(null, 'lineOrigin'),
         numLine = apenasNumeros(lineOrigin.substring(10, lineOrigin.length - 7));
     //pegando o numero da linha em que a nota foi criada...
     const obj_y = note.getAttributeNS(null, 'obj_y'),
         obj_x = note.getAttributeNS(null, 'obj_x'),
         clickY = note.getAttributeNS(null, 'clickY'),
         clickX = note.getAttributeNS(null, 'clickX'),
         transformX = apenasNumeros(note.getAttributeNS(null, 'transform').split(' ')[0])
         //pegando os atributos da nota...
         primeiraParte = lineOrigin.substring(0, 10),
         segundaParte = lineOrigin.substring(lineOrigin.length - 7, lineOrigin.length),
         y = returnPositionY_px(lineOrigin) - obj_y;
     if (event.pageY + 5 > clickY) {
         //se o movimento for para baixo...
         if (numLine > 1) numLine--;
         lineOrigin = primeiraParte + numLine + segundaParte;
         note.removeAttributeNS(null, 'lineOrigin', this.localName);
         note.setAttributeNS(null, 'lineOrigin', lineOrigin);
         //atualizando o atributo da nota...
     }
     if (event.pageY - 5 < clickY) {
         //se o movimento for para cima...
         if (numLine < 29) numLine++;
         lineOrigin = primeiraParte + numLine + segundaParte;
         note.removeAttributeNS(null, 'lineOrigin', this.localName);
         note.setAttributeNS(null, 'lineOrigin', lineOrigin);
         //atualizando o atributo da nota...
     }

     const newTransformX = transformX + (event.pageX - clickX);
     // atualizando o valor X da propriedade transform
    
     note.removeAttributeNS(null, 'transform', this.localName);
     //removendo o atributo antigo...
     note.setAttributeNS(null, 'transform',
         'translate(' + newTransformX + ' ' + y + ')');
     //colocando a nova posicao...
     for (const i in vetObjNote) {
         //atualizando a posicao das notas no vetor...
         if (event.target.id === vetObjNote[i].id) {
             vetObjNote[i].x = event.pageX - obj_x;
             break;
         }
     }
     sortVector(vetObjNote); //ordenando novamente...

     try { //tentando mover a linha associada...
         const idLine = note.getAttributeNS(null, 'x1y1Line'),
             line = document.getElementById(idLine);
         //pegando a linha associada...
         line.removeAttributeNS(null, 'y1', this.localName);
         line.setAttributeNS(null, 'y1', y + 0.8);
         line.removeAttributeNS(null, 'x1', this.localName);
         line.setAttributeNS(null, 'x1', returnPositionX_porcentagem((event.pageX)) + '%');
     } catch {
         //se nao tiver a linha associada, nao faz nada...
     }

     try { //tentando mover a linha associada a nota...
         const idLine = note.getAttributeNS(null, 'x2y2Line'),
             line = document.getElementById(idLine);
         //pegando a linha associada...
         line.removeAttributeNS(null, 'y2', this.localName);
         line.setAttributeNS(null, 'y2', y + 0.8);
         line.removeAttributeNS(null, 'x2', this.localName);
         line.setAttributeNS(null, 'x2', (returnPositionX_porcentagem((event.pageX)) + 0.5) + '%');
     } catch {
         //se nao tiver a linha associada, nao faz nada...
     }
     try { //tentando mover a linha associada...
         const idLine = note.getAttributeNS(null, 'x1y1Line2'),
             line = document.getElementById(idLine);
         //pegando a linha associada...
         line.removeAttributeNS(null, 'y1', this.localName);
         line.setAttributeNS(null, 'y1', y + 9);
         line.removeAttributeNS(null, 'x1', this.localName);
         line.setAttributeNS(null, 'x1', returnPositionX_porcentagem((event.pageX)) + '%');
     } catch {
         //se nao tiver a linha associada, nao faz nada...
     }
     try { //tentando mover a linha associada...
         const idLine = note.getAttributeNS(null, 'x2y2Line2'),
             line = document.getElementById(idLine);
         //pegando a linha associada...
         line.removeAttributeNS(null, 'y2', this.localName);
         line.setAttributeNS(null, 'y2', y + 9);
         line.removeAttributeNS(null, 'x2', this.localName);
         line.setAttributeNS(null, 'x2', returnPositionX_porcentagem((event.pageX)) + '%');
     } catch {
         //se nao tiver a linha associada, nao faz nada...
     }
 }