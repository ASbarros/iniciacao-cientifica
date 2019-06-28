/**
 * classe para o processamento da linha vertical para o tempo
 * @author anderson dos santos de barros
 */

const tempo = 10;
let x = 5,
    a = 0.3,
    idSVG = 0;

function time() {
    let idTime = 0;
    //id da linha...
    new createCircle('grande' + idSVG, 1.5);
    //criando o timer, composto por dois circulos...
    new createCircle(idSVG, 0.3);

    let timer = setInterval(() => {
        //timer...
        document.getElementById('circle-' + idSVG).setAttributeNS(null, 'r', a + '%');
        a += 0.1;
        if (a > 1.5) a = 0.1;
    }, tempo * 2.5);

    setTimeout(() => {
        //linha passando...
        let Tscroll = 350,
            //variavel para incrementar o scroll...
            objLine,
            inter = setInterval(() => {
                try {
                    idTime++;
                    objLine = {
                        x1: x,
                        x2: x,
                        y1: 40,
                        y2: 60,
                        idName: 'time' + idTime,
                        idDiv: "idSVG" + idSVG,
                        classe: 'time'
                    }
                    new createLine(objLine);
                    //createLine(x, 40, x, 60, "time" + idTime, "idSVG" + idSVG, "time");
                    x = x + 0.18;
                    let id = 'time' + (idTime - 1) + '-idSVG' + idSVG;
                    //id da linha ...
                    remove_id(id);
                    if (x >= 98.3) {
                        //voltando ao inicio da pauta...
                        window.scrollTo(0, Tscroll);
                        Tscroll = Tscroll + 350;
                        x = 5;
                        remove_id("time" + idTime + "-idSVG" + idSVG);
                        //removendo a linha...
                        remove_id('circle-grande' + idSVG);
                        //removendo o timer, composto por dois circulos...
                        remove_id('circle-' + idSVG);
                        idSVG++;
                        //incremento...
                        new createCircle('grande' + idSVG, 1.5);
                        //criando o proximo timer...
                        new createCircle(idSVG, 0.3);
                    }
                } catch (e) {
                    clearInterval(inter);
                    clearInterval(timer);
                    idSVG = 0;
                }
            }, tempo);
        //deley...
    }, 300);
}

function createCircle(_i, _r) {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttributeNS(null, "id", 'circle-' + _i);
    circle.setAttributeNS(null, "cx", '50%');
    circle.setAttributeNS(null, "cy", '92%');
    circle.setAttributeNS(null, "r", _r + '%');
    circle.setAttributeNS(null, "class", 'circle');
    document.getElementById('idSVG' + idSVG).appendChild(circle);
}