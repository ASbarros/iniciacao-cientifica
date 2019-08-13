/**  
 * Classe para captura de audio e sua manipulação
 * @author Anderson dos Santos de Barros
 */

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
            chunks.push(data.data);
        }
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {
                    type: 'audio/ogg; code=opus'
                }),
                reader = new window.FileReader()
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const audio = document.createElement('audio');
                audio.src = reader.result;
                audio.controls = true;
                $('#audio').append(audio);
            } 
        }
    }, err => { //permissão negada...
        alert(err)
    })
const startAudio = () => mediaRecorder.start();
const stopAudio = () => mediaRecorder.stop();