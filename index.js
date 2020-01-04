import { createDiv } from './classe-pauta/Pauta.js';
import { PositionNote } from './classe-nota/Nota.js';
import { join } from './classe-nota/JuntarNotas.js';
import { time } from './classe-tempo/Tempo.js';
import { DeleteNote } from './classe-nota/DeleteNote.js'

function createNote(e) {
    switch ($(e.currentTarget)[0].value) {
        case '1':
            PositionNote('seminima');
            break;
        case '2':
            PositionNote('seminima', 2);
            break;
        case '3':
            PositionNote('seminima', 3);
            break;
        case '4':
            PositionNote('seminima', 4);
            break;
        default:
            break;
    }
    switch ($(e.currentTarget)[0].id) {
        case 'btn-createNoteBemol':
            PositionNote('bemol')
            break;
        case 'btn-createNoteColcheia':
            PositionNote('colcheia')
            break;
        case 'btn-createNoteSemicolcheia':
            PositionNote('semicolcheia')
            break;
        case 'btn-createNoteFusa':
            PositionNote('fusa')
            break;
        case 'btn-createNoteSemifusa':
            PositionNote('bemsemifusaol')
            break;
        case 'btn-createNoteFusa':
            PositionNote('fusa')
            break;
        case 'btn-createNoteSemifusa':
            PositionNote('bemsemifusaol')
            break;
        case 'btn-createNoteSemibreve':
            PositionNote('semibreve')
            break;
        case 'btn-createNoteSustenido':
            PositionNote('sustenido')
            break;
        case 'btn-createNoteMinima':
            PositionNote('pausa_de_semibreve')
            break;
        case 'btn-createPausaDeMinima':
            PositionNote('pausa_de_minima')
            break;
        case 'btn-createPausaDeSemicolcheia':
            PositionNote('pausa_de_semicolcheia')
            break;
        case 'btn-createPausaDeColcheia':
            PositionNote('pausa_de_colcheia')
            break;
        case 'btn-createPausaDeSeminima':
            PositionNote('pausa_de_seminima')
            break;
        default:
            break;
    }
}

document.body.onload = function () {
    createDiv();
    $('#btn-createDiv').click(createDiv);
    $('#btn-joinNotes').click(join);
    $('#btn-timer').click(time);
    $('#btn-DeleteNote').click(DeleteNote);
    const btnsCreateNote = document.getElementsByName('btn-create');
    for (const btn of btnsCreateNote) {
        $(btn).click(createNote);
    }
}