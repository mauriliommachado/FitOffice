/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var id = 1;

function buscaEmpresa() {
    chamadaWs("ServiceEmpresa/busca/" + id, "GET", null, funcaoRetornoBusca);
}

function funcaoRetornoBusca(resposta) {
    preencheCampos(resposta.responseText);
    $('#spinner').removeClass('is-active');
}

function preencheCampos(response) {
    $.getScript('js/validacoes.js', function ()
    {
        if (response === "") {
            return;
        }
        var resposta = JSON.parse(response);
        // script is now loaded and executed.
        // put your dependent JS here.
        $("#cnpj").parent().addClass("is-dirty");
        $("#id").parent().addClass("is-dirty");
        $('#cnpj').val(cpfCnpj(resposta.empCNPJ));
        $('#id').val(resposta.codEmpresa);

    });
}

function funcaoRetornoGrava(resposta) {
    preencheCampos(resposta.responseText);
    var snackbarContainer = document.querySelector('#demo-toast-example');
    'use strict';
    var data = {message: 'Salvo com Sucesso!'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function gravaEmpresa() {
    chamadaWs("ServiceEmpresa/grava/", "PUT", formToJSON(), funcaoRetornoGrava);
}

String.prototype.replaceCustom = function (de, para) {
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1) {
        str = str.replace(de, para);
        pos = str.indexOf(de);
    }
    return (str);
};

function formToJSON() {
    return JSON.stringify({
        codEmpresa: $('#id').val() == "" ? 0 : $('#id').val(),
        "empCNPJ": $('#cnpj').val().replaceCustom(".", "").replaceCustom("/", "").replaceCustom("-", "")
    });
}