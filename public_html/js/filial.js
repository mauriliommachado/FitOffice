/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var idFilial = 0;
var url = window.sessionStorage.getItem('baseUrl');
function buscaFilialPorEmpresa() {
    chamadaWs("ServiceFilial/buscaPorEmpresa/" + getEmpresaAtiva(), "GET", null, retornoFilialPorEmpresa);
}

Mustache.Formatters = {
    cnpj: function (str) {
        return cpfCnpj(str);
    }
};

function retornoFilialPorEmpresa(client) {
    if (client.responseText === "") {
        return;
    }
    preencheCampos(client.responseText);
    preencheLista(client.responseText, false);
    $('#spinner').removeClass('is-active');
}

function retornoDeletaFilial(client) {
    if (client.responseText === "") {
        return;
    }
    idFilial = 0;
    if (Boolean(client.responseText) == true) {
        var snackbarContainer = document.querySelector('#demo-toast-example');
        'use strict';
        var data = {message: 'Deletado com Sucesso!'};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    someModel();

    buscaFilialPorEmpresa();
    $('#spinner').removeClass('is-active');
}

function deletaFilial() {
    if (idFilial <= 0) {
        someModel();
        return;
    }

    chamadaWs("ServiceFilial/delete/" + idFilial, "GET", null, retornoDeletaFilial);
}

function btnGravar() {
    gravaFilial();
    idFilial = 0;
}

function preencheCampos(response) {
    $.getScript('js/validacoes.js', function ()
    {
        var resposta = JSON.parse(response);
        // script is now loaded and executed.
        // put your dependent JS here.

        $(resposta).each(function (i, v) {
            if (idFilial != 0) {
                if (idFilial == v.codFilial) {
                    if (v.filCNPJ != "") {
                        $("#cnpj").parent().addClass("is-dirty");
                    } else {
                        $("#cnpj").parent().removeClass("is-invalid");
                        $("#cnpj").parent().removeClass("is-dirty");
                    }
                    if (v.codFilial != "") {
                        $("#id").parent().addClass("is-dirty");
                    } else {
                        $("#id").parent().removeClass("is-invalid");
                        $("#id").parent().removeClass("is-dirty");
                    }
                    if (v.filNomeFantasia != "") {
                        $("#nomeFantasia").parent().addClass("is-dirty");
                    } else {
                        $("#nomeFantasia").parent().removeClass("is-invalid");
                        $("#nomeFantasia").parent().removeClass("is-dirty");
                    }
                    if (v.filRazaoSocial != "") {
                        $("#razaoSocial").parent().addClass("is-dirty");
                    } else {
                        $("#razaoSocial").parent().removeClass("is-invalid");
                        $("#razaoSocial").parent().removeClass("is-dirty");
                    }
                    if (v.filIE != "") {
                        $("#inscricaoEstadual").parent().addClass("is-dirty");
                    } else {
                        $("#inscricaoEstadual").parent().removeClass("is-invalid");
                        $("#inscricaoEstadual").parent().removeClass("is-dirty");
                    }
                    if (v.filAtiva == true) {
                        $("#filAtiva").parent().addClass("is-checked");
                    } else {
                        $("#filAtiva").parent().removeClass("is-checked");
                    }
                    if (v.filNumero != "") {
                        $("#numero").parent().addClass("is-dirty");
                    } else {
                        $("#numero").parent().removeClass("is-invalid");
                        $("#numero").parent().removeClass("is-dirty");
                    }
                    $('#cnpj').val(cpfCnpj(v.filCNPJ));
                    $('#id').val(v.codFilial);
                    $('#nomeFantasia').val(v.filNomeFantasia);
                    $('#razaoSocial').val(v.filRazaoSocial);
                    $('#inscricaoEstadual').val(v.filIE);
                    $('#numero').val(v.filNumero);
                    return false;
                }
            }
        });
    });

}

function preencheLista(response, replace) {
    $.getScript('js/validacoes.js', function ()
    {
        $("#tbFiliais tbody").html('');
        var resposta = JSON.parse(response);
        $(resposta).each(function (i, v) {
            var template = $('#filial-template').html();
            var info = Mustache.render(template, v);
            $('#tbFiliais tbody').append(info);
        });
    });
}
function btnSeleciona() {
    buscaFilialPorEmpresa();
    mostraModel();
}



function validaCampos() {
    var retorno = true;
    retorno = campoObrigatorio($("#cnpj"));
    retorno = campoObrigatorio($("#razaoSocial"));
    return retorno;
}

function retornoGravarFilial(client) {
    preencheCampos(client.responseText);
    var snackbarContainer = document.querySelector('#demo-toast-example');
    'use strict';
    var data = {message: 'Salvo com Sucesso!'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

    idFilial = 0;
    buscaFilialPorEmpresa();
}

function gravaFilial() {
    if (!validaCampos()) {
        return;
    }
    someModel();

    chamadaWs("ServiceFilial/grava", "PUT", formToJSON(), retornoGravarFilial);
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
        "filAtiva": $('#filAtiva').parent().hasClass('is-checked'),
        "codFilial": $('#id').val() == "" ? 0 : $('#id').val(),
        "filNumero": $('#numero').val(),
        "filRazaoSocial": $('#razaoSocial').val(),
        "filNomeFantasia": $("#nomeFantasia").val(),
        "filIE": $('#inscricaoEstadual').val(),
        "filCNPJ": $("#cnpj").val().replaceCustom(".", "").replaceCustom("/", "").replaceCustom("-", ""),
        "codEmpresa": {"codEmpresa": getEmpresaAtiva()}
    });
}

function ZeraIdFilial() {
    idFilial = 0;
}



