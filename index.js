import {
    createDiv
} from './classe-pauta/Pauta.js';
import {
    PositionNote
} from './classe-nota/Nota.js';
import {
    join
} from './classe-nota/JuntarNotas.js';
import {
    time
} from './classe-tempo/Tempo.js'

document.body.onload = function () {
    createDiv();
    $('#btn-createDiv').click(createDiv);
    $('#btn-joinNotes').click(join);
    $('#btn-timer').click(time);
    const btnsCreateNote = document.getElementsByName('btn-createNote');
    for (const btn of btnsCreateNote) {
        $(btn).click(PositionNote);
    }
}