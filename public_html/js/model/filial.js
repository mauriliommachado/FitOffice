/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var id = 101;
var idFilial = 0;
function buscaFilialPorEmpresa() {
    var client = new XMLHttpRequest();
    client.open("GET", "http://localhost:9999/FitFood/webresources/ServiceFilial/buscaPorEmpresa/" + id);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            if (client.responseText === "") {
                return;
            }
            preencheCampos(client.responseText);
            preencheLista(client.responseText, false);
            $('#spinner').removeClass('is-active');
        }
    };
    client.send();
}

function preencheCampos(response) {
    $.getScript('js/validacoes.js', function ()
    {
        var resposta = JSON.parse(response);
        // script is now loaded and executed.
        // put your dependent JS here.
        $("#cnpj").parent().addClass("is-dirty");
        $("#id").parent().addClass("is-dirty");
        $("#nomeFantasia").parent().addClass("is-dirty");
        $(resposta).each(function (i, v) {
            if (idFilial == 0) {
                $('#cnpj').val(cpfCnpj(v.codEmpresa.empCNPJ));
                $('#id').val(v.codFilial);
                $('#nomeFantasia').val(v.filNomeFantasia);
                idFilial = v.codFilial;
                return false;
            } else {
                if (idFilial == v.codFilial) {
                    $('#cnpj').val(cpfCnpj(v.codEmpresa.empCNPJ));
                    $('#id').val(v.codFilial);
                    $('#nomeFantasia').val(v.filNomeFantasia);
                    return false;
                }
            }
        });
    });
}

function preencheLista(response, replace) {
    $.getScript('js/validacoes.js', function ()
    {
        var resposta = JSON.parse(response);
        var html = '';
        $("#tbFiliais tbody").html('');
        $(resposta).each(function (i, v) {
            html += '<tr id=' + v.codFilial + '>';
            html += '<td class="mdl-data-table__cell--non-numeric">' + v.filNomeFantasia + '</td>';
            html += '<td>' + cpfCnpj(v.codEmpresa.empCNPJ) + '</td>';
            if (v.filAtiva) {
                html += '<td class="mdl-data-table__cell--non-numeric">Ativa</td>';
            } else {
                html += '<td class="mdl-data-table__cell--non-numeric">Inativa</td>';
            }
            if (v.codFilial == idFilial) {
                html += '<td><button id="btnSelecionar"\n\
 class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "\n\
 disabled style="float: right">Selecionar</button></td>';
            } else {
                html += '<td><button id="btnSelecionar"\n\
 class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"\n\
 style="float: right" onclick="idFilial=' + v.codFilial + ';buscaFilialPorEmpresa();">Selecionar</button></td>';
            }

            $("#tbFiliais tbody").append(html);
            html = '';
        });
    });
}


function gravaFilial() {
    var client = new XMLHttpRequest();
    client.open("PUT", "http://localhost:9999/FitFood/webresources/ServiceFilial/grava");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            preencheCampos(client.responseText);
            var snackbarContainer = document.querySelector('#demo-toast-example');
            'use strict';
            var data = {message: 'Salvo com Sucesso!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
            buscaFilialPorEmpresa();
        }
    };
    var json = formToJSON();
    client.send(json);
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
        "filAtiva": true,
        "codFilial": $('#id').val()==""?0:$('#id').val(),
        "filNumero": "123",
        "filRazaoSocial": "123",
        "filNomeFantasia": $("#nomeFantasia").val(),
        "filIE": "123",
        "codEmpresa": {"codEmpresa": id, "empCNPJ": $("#cnpj").val()}
    });
}

