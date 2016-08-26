/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var id = 3;
var idProduto = 0;
var idEmpresa = 1;
var url = window.sessionStorage.getItem('baseUrl');
function buscaProdutoPorFilial() {

    var client = new XMLHttpRequest();
    client.open("GET", url+"ServiceProduto/buscaPorFilial/" + id);
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

function deletaProduto() {
    if (idProduto <= 0) {
        someModel();
        return;
    }
    var client = new XMLHttpRequest();
    client.open("GET", url+"ServiceProduto/delete/" + idProduto);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            if (client.responseText === "") {
                return;
            }
            idProduto = 0;
            if (Boolean(client.responseText) == true) {
                var snackbarContainer = document.querySelector('#demo-toast-example');
                'use strict';
                var data = {message: 'Deletado com Sucesso!'};
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }
            someModel();

            buscaProdutoPorFilial();
            $('#spinner').removeClass('is-active');
        }
    };
    client.send();
}

function btnGravar() {
    gravaProduto();
    idProduto = 0;
}

function preencheCampos(response) {
    $.getScript('js/validacoes.js', function ()
    {
        var resposta = JSON.parse(response);
        // script is now loaded and executed.
        // put your dependent JS here.

        $(resposta).each(function (i, v) {
            if (idProduto != 0) {
                if (idProduto == v.codProduto) {
                    buscaMarcasPorFilial();
                    buscaCategoriasPorEmpresa();
                    if (v.proDescricao != "") {
                        $("#proDescricao").parent().addClass("is-dirty");
                    } else {
                        $("#proDescricao").parent().removeClass("is-invalid");
                        $("#proDescricao").parent().removeClass("is-dirty");
                    }
                    if (v.proReferencia != "") {
                        $("#proReferencia").parent().addClass("is-dirty");
                    } else {
                        $("#proReferencia").parent().removeClass("is-invalid");
                        $("#proReferencia").parent().removeClass("is-dirty");
                    }
                    if (v.codMarca.codMarca != "") {
                        $("#cmbMarca").parent().addClass("is-dirty");
                    } else {
                        $("#cmbMarca").parent().removeClass("is-invalid");
                        $("#cmbMarca").parent().removeClass("is-dirty");
                    }
                    if (v.codCategoria.catDescricao != "") {
                        $("#cmbCategorias").parent().addClass("is-dirty");
                    } else {
                        $("#cmbCategorias").parent().removeClass("is-invalid");
                        $("#cmbCategorias").parent().removeClass("is-dirty");
                    }
                    if (v.proPrecoVenda != "") {
                        $("#proPrecoVenda").parent().addClass("is-dirty");
                    } else {
                        $("#proPrecoVenda").parent().removeClass("is-invalid");
                        $("#proPrecoVenda").parent().removeClass("is-dirty");
                    }
                    if (v.proUrlImagem != "") {
                        $("#proUrlImagem").parent().addClass("is-dirty");
                        $('#imagem').css('visibility', 'visible');
                        $('#imagem').attr("src", v.proUrlImagem);
                    } else {
                        $("#proUrlImagem").parent().removeClass("is-invalid");
                        $("#proUrlImagem").parent().removeClass("is-dirty");
                    }
                    $('#proUrlImagem').val(v.proUrlImagem);

                    $('#proPrecoVenda').val(v.proPrecoVenda);
                    $('#cmbCategorias').val(v.codCategoria.codCategoria);
                    $('#cmbMarca').val(v.codMarca.codMarca);
                    $('#proDescricao').val(v.proDescricao);
                    $('#proReferencia').val(v.proReferencia);
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
            var template = $('#user-template').html();
            var info = Mustache.render(template, v);
            $('#tbFiliais tbody').append(info);
        });
    });
}
function btnSeleciona() {
    buscaProdutoPorFilial();
    mostraModel();
}

function validaCampos() {
    var retorno = true;
    retorno = campoObrigatorio($("#proDescricao"));
    retorno = campoObrigatorio($("#proReferencia"));
    retorno = campoObrigatorio($("#proPrecoVenda"));
    return retorno;
}

function gravaProduto() {
    if (!validaCampos()) {
        return;
    }
    someModel();
    var client = new XMLHttpRequest();
    client.open("PUT", url+"ServiceProduto/grava");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            preencheCampos(client.responseText);
            var snackbarContainer = document.querySelector('#demo-toast-example');
            'use strict';
            var data = {message: 'Salvo com Sucesso!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

            idProduto = 0;
            buscaProdutoPorFilial();
        }
    };
    var json = formToJSON();
    client.send(json);
}


function gravaMarca() {
    var client = new XMLHttpRequest();
    client.open("PUT", url+"ServiceMarca/grava");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            var snackbarContainer = document.querySelector('#demo-toast-example');
            'use strict';
            var data = {message: 'Salvo com Sucesso!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

            buscaMarcasPorFilial();
            document.getElementById('myModal2').style.display = 'none';
            mostraModel()
        }
    };
    var json = formToJSONMarca();
    client.send(json);
}

function gravaCategoria() {
    var client = new XMLHttpRequest();
    client.open("PUT", url+"ServiceCategoria/grava");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            var snackbarContainer = document.querySelector('#demo-toast-example');
            'use strict';
            var data = {message: 'Salvo com Sucesso!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

            buscaCategoriasPorEmpresa();
            document.getElementById('myModal3').style.display = 'none';
            mostraModel()
        }
    };
    var json = formToJSONCategoria();
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
        "proUrlImagem": $('#proUrlImagem').val(),
        "codProduto": idProduto,
        "proPrecoVenda": $('#proPrecoVenda').val(),
        "proDescricao": $('#proDescricao').val(),
        "proReferencia": $("#proReferencia").val(),
        "codMarca": {"codMarca": $("#cmbMarca").val(), "marDescricao": ""},
        "codCategoria": {"codCategoria": $("#cmbCategorias").val(), "catDescricao": ""},
        "codFilial": {"codFilial": id}
    });
}

function formToJSONMarca() {
    return JSON.stringify({
        "codMarca": null,
        "marDescricao": $('#novaMarca').val(),
        "codEmpresa": {"codEmpresa": idEmpresa}
    });
}

function formToJSONCategoria() {
    return JSON.stringify({
        "codCategoria": null,
        "catDescricao": $('#novaCategoria').val(),
        "codEmpresa": {"codEmpresa": idEmpresa}
    });
}

function ZeraIdProduto() {
    idProduto = 0;
}

function buscaMarcasPorFilial() {

    var client = new XMLHttpRequest();
    client.open("GET", url+"ServiceMarca/busca", false);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            if (client.responseText === "") {
                return;
            }
            preencheComboMarcas(client.responseText);

        }
    };
    client.send();
}

function preencheComboMarcas(json) {
    $("#cmbMarca").html('');
    var resposta = JSON.parse(json);
    $(resposta).each(function (i, v) {
        var template = $('#templateCombo').html();
        var info = Mustache.render(template, v);
        $('#cmbMarca').append(info);
    });
}

function buscaCategoriasPorEmpresa() {

    var client = new XMLHttpRequest();
    client.open("GET", url+"ServiceCategoria/busca", false);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            if (client.responseText === "") {
                return;
            }
            preencheComboCategorias(client.responseText);

        }
    };
    client.send();
}

function preencheComboCategorias(json) {
    $("#cmbCategorias").html('');
    var resposta = JSON.parse(json);
    $(resposta).each(function (i, v) {
        var template = $('#templateComboCat').html();
        var info = Mustache.render(template, v);
        $('#cmbCategorias').append(info);
    });
}



