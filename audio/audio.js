/**  
 * Classe para captura de audio e sua manipulação
 * @author Anderson dos Santos de Barros
 */

function capturaAudio() {
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
                    $('body').append(audio);
                }
            }
            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 3000);
        }, err => { //permissão negada...
            alert(err)
        })
}