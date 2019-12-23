import { createDiv } from './classe-pauta/Pauta.js';
import { PositionNote } from './classe-nota/Nota.js';
import { join } from './classe-nota/JuntarNotas.js';
import { time } from './classe-tempo/Tempo.js';
import { DeleteNote } from './classe-nota/Nota.js'

function createNote(e) {
    if ($(e.currentTarget)[0].value == 1) PositionNote('seminima');
    else if ($(e.currentTarget)[0].value == 2) PositionNote('seminima', 2);
    else if ($(e.currentTarget)[0].value == 3) PositionNote('seminima', 3);
    else if ($(e.currentTarget)[0].value == 4) PositionNote('seminima', 4);
    else if ($(e.currentTarget)[0].id == 'btn-createNoteBemol') PositionNote('bemol');
    else if ($(e.currentTarget)[0].id == 'btn-createNoteColcheia') PositionNote('colcheia');
    else if ($(e.currentTarget)[0].id == 'btn-createNoteSemicolcheia') PositionNote('semicolcheia');
    else if ($(e.currentTarget)[0].id == 'btn-createNoteFusa') PositionNote('fusa');
    else if ($(e.currentTarget)[0].id == 'btn-createNoteSemifusa') PositionNote('semifusa');
    else if ($(e.currentTarget)[0].id == 'btn-createNoteSemibreve') PositionNote('semibreve');
    else if ($(e.currentTarget)[0].id == 'btn-createNoteSustenido') PositionNote('sustenido');
    else if ($(e.currentTarget)[0].id == 'btn-createNoteMinima') PositionNote('minima');
    else if ($(e.currentTarget)[0].id == 'btn-createPausaDeSemibreve') PositionNote('pausa_de_semibreve');
    else if ($(e.currentTarget)[0].id == 'btn-createPausaDeMinima') PositionNote('pausa_de_minima');
    else if ($(e.currentTarget)[0].id == 'btn-createPausaDeSemicocheia') PositionNote('pausa_de_semicocheia');
    else if ($(e.currentTarget)[0].id == 'btn-createPausaDeCocheia') PositionNote('pausa_de_cocheia');
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