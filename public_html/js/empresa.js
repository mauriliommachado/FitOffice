/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var id = 1;
var url = window.sessionStorage.getItem('baseUrl');

function buscaEmpresa() {
    
    var client = new XMLHttpRequest();
    client.open("GET", url+"ServiceEmpresa/busca/"+id);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            preencheCampos(client.responseText);
            $('#spinner').removeClass('is-active');
        }
    };
    client.send();
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


function gravaEmpresa() {
    var client = new XMLHttpRequest();
    client.open("PUT", url+"ServiceEmpresa/grava/");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            preencheCampos(client.responseText);
            var snackbarContainer = document.querySelector('#demo-toast-example');
            'use strict';
            var data = {message: 'Salvo com Sucesso!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
    };
    client.send(formToJSON());
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
        codEmpresa: $('#id').val()==""?0:$('#id').val(),
        "empCNPJ": $('#cnpj').val().replaceCustom(".", "").replaceCustom("/", "").replaceCustom("-", "")
    });
}