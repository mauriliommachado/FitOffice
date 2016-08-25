/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var id = 1;
var idPessoa = 0;
function buscaPessoaPorEmpresa() {

    var client = new XMLHttpRequest();
    client.open("GET", "http://localhost:9999/FitFood/webresources/ServicePessoa/buscaPorEmpresa/"+id);
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

function deletaFilial() {
    if (idPessoa <= 0) {
        someModel();
        return;
    }
    var client = new XMLHttpRequest();
    client.open("GET", "http://localhost:9999/FitFood/webresources/ServicePessoa/delete/" + idPessoa);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            if (client.responseText === "") {
                return;
            }
            idPessoa = 0;
            if (Boolean(client.responseText) == true) {
                var snackbarContainer = document.querySelector('#demo-toast-example');
                'use strict';
                var data = {message: 'Deletado com Sucesso!'};
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }
            someModel();

            buscaPessoaPorEmpresa();
            $('#spinner').removeClass('is-active');
        }
    };
    client.send();
}

function btnGravar() {
    gravaPessoa();
    idPessoa = 0;
}

function preencheCampos(response) {
    $.getScript('js/validacoes.js', function ()
    {
        var resposta = JSON.parse(response);
        // script is now loaded and executed.
        // put your dependent JS here.

        $(resposta).each(function (i, v) {
            $("#pesDtCadastro").parent().addClass("is-dirty");
            if (idPessoa != 0) {
                if (idPessoa == v.codPessoa) {
                    if (v.pesNome != "") {
                        $("#pesNome").parent().addClass("is-dirty");
                    } else {
                        $("#pesNome").parent().removeClass("is-invalid");
                        $("#pesNome").parent().removeClass("is-dirty");
                    }
                    if (v.codPessoa != "") {
                        $("#id").parent().addClass("is-dirty");
                    } else {
                        $("#id").parent().removeClass("is-invalid");
                        $("#id").parent().removeClass("is-dirty");
                    }
                    if (v.pesCPF != "") {
                        $("#cpf").parent().addClass("is-dirty");
                    } else {
                        $("#cpf").parent().removeClass("is-invalid");
                        $("#cpf").parent().removeClass("is-dirty");
                    }
                    if (v.Cod_Tipo_Pessoa != "") {
                        $("#cmbTipo").parent().addClass("is-dirty");
                    } else {
                        $("#cmbTipo").parent().removeClass("is-invalid");
                        $("#cmbTipo").parent().removeClass("is-dirty");
                    }
                    if (v.pesEmail != "") {
                        $("#pesEmail").parent().addClass("is-dirty");
                    } else {
                        $("#pesEmail").parent().removeClass("is-invalid");
                        $("#pesEmail").parent().removeClass("is-dirty");
                    }
                    if (v.pesFisica != "") {
                        $("#pesFisica").parent().addClass("is-dirty");
                    } else {
                        $("#pesFisica").parent().removeClass("is-invalid");
                        $("#pesFisica").parent().removeClass("is-dirty");
                    }
                    if (v.pesSenha != "") {
                        $("#pesSenha").parent().addClass("is-dirty");
                    } else {
                        $("#pesSenha").parent().removeClass("is-invalid");
                        $("#pesSenha").parent().removeClass("is-dirty");
                    }
                    $('#pesNome').val(v.pesNome);
                    $('#id').val(v.codPessoa);
                    $('#cmbTipo').val(v.codTipoPessoa);
                    $('#cpf').val(cpfCnpj(v.pesCPF));
                    $('#pesEmail').val(v.pesEmail);
                    $('#pesFisica').val(v.pesFisica);
                    $('#pesSenha').val(v.pesSenha);
                    $('#pesDtCadastro').val(v.pesDtCadastro);
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
    buscaPessoaPorEmpresa();
    mostraModel();
}

function validaCampos() {
    var retorno = true;
    retorno = campoObrigatorio($("#pesNome"));
    retorno = campoObrigatorio($("#cmbTipo"));
    retorno = campoObrigatorio($("#cpf"));
    retorno = campoObrigatorio($("#pesEmail"));
    return retorno;
}

function gravaPessoa() {
    if (!validaCampos()) {
        return;
    }
    someModel();
    var client = new XMLHttpRequest();
    client.open("PUT", "http://localhost:9999/FitFood/webresources/ServicePessoa/grava");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200)
        {
            preencheCampos(client.responseText);
            var snackbarContainer = document.querySelector('#demo-toast-example');
            'use strict';
            var data = {message: 'Salvo com Sucesso!'};
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

            idPessoa = 0;
            buscaPessoaPorEmpresa();
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
        "pesAtivo": true,
        "codPessoa": $('#id').val() == "" ? 0 : $('#id').val(),
        "codTipoPessoa": $('#cmbTipo').val(),
        "pesCPF": $('#cpf').val().replaceCustom(".","").replaceCustom("-",""),
        "pesDtCadastro": $("#pesDtCadastro").val(),
        "pesEmail": $("#pesEmail").val(),
        "pesFisica": true,
        "pesNome": $("#pesNome").val(),
        "pesSenha": $("#pesSenha").val(),
        "pesSexo": true,
        "codEmpresa": {"codEmpresa": id}
    });
}

function ZeraIdPessoa(){
    idPessoa=0;
}



