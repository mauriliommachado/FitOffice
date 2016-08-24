/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var idFilial = 1;
var idPedido = 0;
function buscaPedidoPorFilial() {

    var client = new XMLHttpRequest();
    client.open("GET", "http://localhost:9999/FitFood/webresources/ServicePedido/busca");
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

function deletaPedido() {
    if (idPedido <= 0) {
        someModel();
        return;
    }
    var client = new XMLHttpRequest();
    client.open("GET", "http://localhost:9999/FitFood/webresources/ServicePedido/delete/" + idPedido);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            if (client.responseText === "") {
                return;
            }
            idPedido = 0;
            if (Boolean(client.responseText) == true) {
                var snackbarContainer = document.querySelector('#demo-toast-example');
                'use strict';
                var data = {message: 'Deletado com Sucesso!'};
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }
            someModel();

            buscaPedidoPorFilial();
            $('#spinner').removeClass('is-active');
        }
    };
    client.send();
}

function btnGravar() {
    gravaPedido();
    idPedido = 0;
}

function preencheCampos(response) {
    $.getScript('js/validacoes.js', function ()
    {
        var resposta = JSON.parse(response);
        // script is now loaded and executed.
        // put your dependent JS here.

        $(resposta).each(function (i, v) {
            if (idPedido != 0) {
                if (idPedido == v.codPedido) {
                    if (v.codTipoPedido != "") {
                        $("#codTipoPedido").parent().addClass("is-dirty");
                    } else {
                        $("#codTipoPedido").parent().removeClass("is-invalid");
                        $("#codTipoPedido").parent().removeClass("is-dirty");
                    }
                    $('#codTipoPedido').val(v.pesNome);
                    if (v.pedDtBaixa != "") {
                        $("#pedDtBaixa").parent().addClass("is-dirty");
                    } else {
                        $("#pedDtBaixa").parent().removeClass("is-invalid");
                        $("#pedDtBaixa").parent().removeClass("is-dirty");
                    }
                    $('#pedDtBaixa').val(v.pesNome);
                    if (v.pedDtRealizacao != "") {
                        $("#pedDtRealizacao").parent().addClass("is-dirty");
                    } else {
                        $("#pedDtRealizacao").parent().removeClass("is-invalid");
                        $("#pedDtRealizacao").parent().removeClass("is-dirty");
                    }
                    $('#pedDtRealizacao').val(v.pesNome);
                    if (v.pedStatus != "") {
                        $("#pedStatus").parent().addClass("is-dirty");
                    } else {
                        $("#pedStatus").parent().removeClass("is-invalid");
                        $("#pedStatus").parent().removeClass("is-dirty");
                    }
                    $('#pedStatus').val(v.pesNome);

                    return false;
                }
            }
        });
    });

}


Mustache.Formatters = {
    date: function (str) {
        var dt = new Date(parseInt(str.substr(6, str.length - 8), 10));
        return (dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear());
    }
};

function preencheLista(response, replace) {
    $.getScript('js/validacoes.js', function ()
    {
        $("#tbFiliais tbody").html('');
        var resposta = JSON.parse(response);
        $(resposta).each(function (i, v) {
            var template = $('#user-template').html();
            var info = Mustache.render(template, v);
            $('#tbFiliais tbody').append(info);
        });
    });
}
function btnSeleciona() {
    buscaPedidoPorFilial();
    mostraModel();
}

function validaCampos() {
    var retorno = true;
//    retorno = campoObrigatorio($("#pesNome"));
//    retorno = campoObrigatorio($("#tipo"));
//    retorno = campoObrigatorio($("#cpf"));
//    retorno = campoObrigatorio($("#pesEmail"));
    return retorno;
}

function gravaPedido() {
    if (!validaCampos()) {
        return;
    }
    someModel();
    var client = new XMLHttpRequest();
    client.open("PUT", "http://localhost:9999/FitFood/webresources/ServicePedido/grava");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            preencheCampos(client.responseText);
            var snackbarContainer = document.querySelector('#demo-toast-example');
            'use strict';
            var data = {message: 'Salvo com Sucesso!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

            idPedido = 0;
            buscaPedidoPorFilial();
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
    return JSON.stringify(
            {"codPedido": 1,
                "codTipoPedido": 1,
                "pedDtBaixa": "Aug 23, 2016 9:18:08 PM",
                "pedDtRealizacao": "Aug 23, 2016 9:18:11 PM",
                "pedStatus": 1,
                "produtoList": [],
                codFilial: {"codFilial": idFilial}
            });
}

function ZeraIdPedido() {
    idPedido = 0;
}



