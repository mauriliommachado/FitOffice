/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var idPedido = 0;
var idProds = new Array();

function buscaPedidoPorFilial() {
    chamadaWs("ServicePedido/buscaPorFilial/"+getFilialAtiva(), "GET", null, retornoBuscaPedido);
}

function retornoBuscaPedido(client) {
    if (client.responseText === "") {
        return;
    }

    preencheCampos(client.responseText);
    preencheLista(client.responseText, false);
    $('#spinner').removeClass('is-active');
}

function deletaPedido() {
    if (idPedido <= 0) {
        someModel();
        return;
    }
    chamadaWs("ServicePedido/delete/" + idPedido, "GET", null, retornaDeletaPedido)
}

function retornaDeletaPedido(client) {
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
                    $("#tbProdutos tbody").html('');
                    for (var i = 0; i < v.produtoList.length; i++) {
                        idProds.push(v.produtoList[i].codProduto);
                    }
                    var template = $('#templateProduto').html();
                    var info = Mustache.render(template, v);
                    $('#tbProdutos tbody').append(info);
                    if (v.codPedido != "") {
                        $("#id").parent().addClass("is-dirty");
                    } else {
                        $("#id").parent().removeClass("is-invalid");
                        $("#id").parent().removeClass("is-dirty");
                    }
                    $('#id').val(v.codPedido);
                    if (v.codTipoPedido != "") {
                        $("#codTipoPedido").parent().addClass("is-dirty");
                    } else {
                        $("#codTipoPedido").parent().removeClass("is-invalid");
                        $("#codTipoPedido").parent().removeClass("is-dirty");
                    }
                    $('#codTipoPedido').val(v.codTipoPedido);
                    if (v.pedDtBaixa != "") {
                        $("#pedDtBaixa").parent().addClass("is-dirty");
                    } else {
                        $("#pedDtBaixa").parent().removeClass("is-invalid");
                        $("#pedDtBaixa").parent().removeClass("is-dirty");
                    }
                    $('#pedDtBaixa').val(v.pedDtBaixa);
                    if (v.pedDtRealizacao != "") {
                        $("#pedDtRealizacao").parent().addClass("is-dirty");
                    } else {
                        $("#pedDtRealizacao").parent().removeClass("is-invalid");
                        $("#pedDtRealizacao").parent().removeClass("is-dirty");
                    }
                    $('#pedDtRealizacao').val(v.pedDtRealizacao);
                    if (v.pedStatus != "") {
                        $("#pedStatus").parent().addClass("is-dirty");
                    } else {
                        $("#pedStatus").parent().removeClass("is-invalid");
                        $("#pedStatus").parent().removeClass("is-dirty");
                    }
                    $('#pedStatus').val(v.pedStatus);

                    return false;
                }
            }
        });
    });

}


Mustache.Formatters = {
    date: function (str) {
        var dt = new Date(str);
        return (dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear());
    },
    status: function (str) {
        if (str == "1") {
            return "Aguardando aprovação";
        } else if (str == "2") {
            return "Em processamento";
        } else {
            return "Status desconhecido";
        }
    },
    valor: function (str) {
        return " R$" + str.toFixed(2);
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
    chamadaWs("ServicePedido/grava", "PUT", formToJSON(), retornoPedido);
}

function retornoPedido(client) {
    preencheCampos(client.responseText);
    var snackbarContainer = document.querySelector('#demo-toast-example');
    'use strict';
    var data = {message: 'Salvo com Sucesso!'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

    idPedido = 0;
    buscaPedidoPorFilial();
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
            {"codPedido": $('#id').val() == "" ? 0 : $('#id').val(),
                "codTipoPedido": $('#codTipoPedido').val(),
                "pedDtRealizacao": $('#pedDtRealizacao').val(),
                "pedStatus": $('#pedStatus').val(),
                "codFilial": {"codFilial": getFilialAtiva()},
                produtoList: returnJsonProdutos()
            });
}

function returnJsonProdutos() {
    var retorno = new Array();
    for (var i = 0; i < idProds.length; i++) {
        retorno.push({"codProduto": idProds[i]});
    }
    return retorno;
}

function ZeraIdPedido() {
    idPedido = 0;
}



