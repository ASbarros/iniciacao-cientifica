/**  
 * Classe para captura de audio e sua manipulação
 * @author Anderson dos Santos de Barros
 */

import { audioPronto } from './transformataRapidaFourier.js'

//função para pegar o audio...
let mediaRecorder;
navigator
    .mediaDevices
    .getUserMedia({
        audio: true
    }) //pede permissão ao usuario, quando ele aceitar, chama a função... 
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        let chunks = [];
        mediaRecorder.ondataavailable = data => {
            chunks = [];
            chunks.push(data.data);
        }
        mediaRecorder.onstop = () => {
            //função callback, sera chamada quando terminar o audio...
            const blob = new Blob(chunks, {
                    type: 'audio/wav'
                }),
                reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const audio = document.createElement('audio');
                audio.src = reader.result;
                audio.id = "el-audio";
                console.log(audio.src);
                audio.controls = true;
                $('#audio').append(audio);
                audioPronto();
            }
        }
    }, err => { //permissão negada...
        alert(err)
    })
export const startAudio = () => mediaRecorder.start();
export const stopAudio = () => mediaRecorder.stop();