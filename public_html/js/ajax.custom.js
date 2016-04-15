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
