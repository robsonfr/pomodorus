let contador=0;
let pausado=true;
let tempo1=new Date();
let tipoContador=0;
let tempos = [0,0];

onmessage = function(mensagem) {
    console.log(mensagem.data);
    if (mensagem.data.pausado != undefined) {
        pausado = mensagem.data.pausado;
    } 
    if (mensagem.data.tempos != undefined) {
        tempo1 = mensagem.data.tempo1;
        tempos = mensagem.data.tempos;
        tipoContador = 0;
        contador = tempos[tipoContador];
    }
}

function updateContador() {
    const tempo2 = new Date();
    let alarme=false;
    if ((!pausado) && (tempo2 - tempo1 >= 1000)) {
        contador--;
        tempo1 = tempo2;
    }
    if (contador < 0) {
        tipoContador = 1 - tipoContador;
        alarme = true;
        contador = tempos[tipoContador];
    }
    postMessage({"tipo" : tipoContador, "contador" : contador, "alarme" : alarme});
    setTimeout(updateContador, 200);
}

setTimeout(updateContador, 200);