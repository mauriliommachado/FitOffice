/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function login(id, pwd) {
    mostraSpinnerCarregando();
    window.location.href = 'principal.html';
    tiraSpinner();
}
function mostraSpinnerCarregando() {
    $('#content').hide();
    $('#spinner').addClass('is-active');

}
function tiraSpinner() {
    $('#content').show();
    $('#spinner').removeClass('is-active');
}


function chamadaWs(url,tipo,parametro,funcaoNoRetorno) {
    var client = new XMLHttpRequest();
    client.open(tipo, window.sessionStorage.getItem('baseUrl')+url);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            funcaoNoRetorno(client);
        }
    };
    client.send(parametro);
}