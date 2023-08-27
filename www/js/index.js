/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

const getId = (id) => document.getElementById(id);
let contador = 0;
let tempo1 = new Date();
let tipoContador = 0;
let pausado = true;        

function getTempo() {
    let nome = "tempo";
    if (tipoContador == 0) {
        nome = "tempo";
    } else {
        nome = "pausa";
    }
    return parseInt(getId(nome).value) * 60;
}

function exibeContador() {
    const relogio = getId("relogio");
    if (tipoContador == 0) {
        relogio.style.color = "#FF3333";
    } else {
        relogio.style.color = "#33FF33";
    }
    const minuto = 100 + parseInt(contador / 60);
    const segundo = 100 + (contador % 60);
    const strMin = ("" + minuto).substring(1,3);
    const strSec = ("" + segundo).substring(1,3);
    relogio.innerHTML = strMin + ":" + strSec;
}


let ww = null;

function processaMensagem(mensagem) {
    tipoContador = mensagem.data.tipo;
    contador = mensagem.data.contador;

    if (mensagem.data.alarme) {
        getId("alarme").play();
    }
    exibeContador();
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//    document.getElementById('deviceready').classList.add('ready');

    getId("btnIniciar").addEventListener("click", function() {
        if (pausado) {
            getId("btnIniciar").innerHTML = "Pausar";
        } else {
            getId("btnIniciar").innerHTML = "Continuar";
        }
        pausado = !pausado;  
        if (ww == null) {
            ww = new Worker("/js/worker.js");
            ww.onmessage = processaMensagem;
            ww.postMessage({"tempos" : [parseInt(getId("tempo").value) * 60, parseInt(getId("pausa").value) * 60], "tempo1" : new Date(), "pausado" : false});
        } else {
            ww.postMessage({"pausado" : pausado});
        }
    });

    getId("btnResetar").addEventListener("click", function() {
        if (ww != null) {
            ww.postMessage({"tempos" : [parseInt(getId("tempo").value) * 60, parseInt(getId("pausa").value) * 60], "tempo1" : new Date()});
        }
    });
}
