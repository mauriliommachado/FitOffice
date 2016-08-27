/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var id = 1;
var idPessoa = 0;
var url = window.sessionStorage.getItem('baseUrl');
function buscaPessoaPorEmpresa() {
    chamadaWs("ServicePessoa/buscaPorEmpresa/" + id, "GET", null, retornoBusca);
}

function retornoBusca(client) {
    preencheCampos(client.responseText);
    preencheLista(client.responseText, false);
    $('#spinner').removeClass('is-active');
}

function deletaFilial() {
    if (idPessoa <= 0) {
        someModel();
        return;
    }
    chamadaWs("ServicePessoa/delete/" + idPessoa, "GET", null, retornoDeletaFilial);
}

function retornoDeletaFilial(client) {
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
                    if (v.codEndereco.endCep != "") {
                        $("#endCep").parent().addClass("is-dirty");
                    } else {
                        $("#endCep").parent().removeClass("is-invalid");
                        $("#endCep").parent().removeClass("is-dirty");
                    }
                    if (v.codEndereco.endLogradouro != "") {
                        $("#endLogradouro").parent().addClass("is-dirty");
                    } else {
                        $("#endLogradouro").parent().removeClass("is-invalid");
                        $("#endLogradouro").parent().removeClass("is-dirty");
                    }
                    if (v.codEndereco.endNumero != "") {
                        $("#endNumero").parent().addClass("is-dirty");
                    } else {
                        $("#endNumero").parent().removeClass("is-invalid");
                        $("#endNumero").parent().removeClass("is-dirty");
                    }
                    if (v.codEndereco.endBairro != "") {
                        $("#endBairro").parent().addClass("is-dirty");
                    } else {
                        $("#endBairro").parent().removeClass("is-invalid");
                        $("#endBairro").parent().removeClass("is-dirty");
                    }
                    if (v.codEndereco.endCidade != "") {
                        $("#endCidade").parent().addClass("is-dirty");
                    } else {
                        $("#endCidade").parent().removeClass("is-invalid");
                        $("#endCidade").parent().removeClass("is-dirty");
                    }
                    if (v.codEndereco.endUf != "") {
                        $("#endUf").parent().addClass("is-dirty");
                    } else {
                        $("#endUf").parent().removeClass("is-invalid");
                        $("#endUf").parent().removeClass("is-dirty");
                    }
                    if (v.codEndereco.endComplemento != "") {
                        $("#endComplemento").parent().addClass("is-dirty");
                    } else {
                        $("#endComplemento").parent().removeClass("is-invalid");
                        $("#endComplemento").parent().removeClass("is-dirty");
                    }
                    if (v.pesAtivo == true) {
                        $("#lblAtiva").addClass("is-checked");
                    } else {
                        $("#lblAtiva").removeClass("is-checked");
                    }
                    $('#pesNome').val(v.pesNome);
                    $('#id').val(v.codPessoa);
                    $('#cmbTipo').val(v.codTipoPessoa);
                    $('#cpf').val(cpfCnpj(v.pesCPF));
                    $('#pesEmail').val(v.pesEmail);
                    $('#pesFisica').val(v.pesFisica);
                    $('#pesSenha').val(v.pesSenha);
                    $('#endComplemento').val(v.codEndereco.endComplemento);
                    $('#endUf').val(v.pesDtCadastro);
                    $('#endCidade').val(v.pesDtCadastro);
                    $('#endBairro').val(v.pesDtCadastro);
                    $('#endNumero').val(v.pesDtCadastro);
                    $('#endLogradouro').val(v.pesDtCadastro);
                    $('#endCep').val(v.pesDtCadastro);
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
    chamadaWs("ServicePessoa/grava", "PUT", formToJSON(), retornoGravaPessoa)
}

function retornoGravaPessoa(client) {
    preencheCampos(client.responseText);
    var snackbarContainer = document.querySelector('#demo-toast-example');
    'use strict';
    var data = {message: 'Salvo com Sucesso!'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

    idPessoa = 0;
    buscaPessoaPorEmpresa();
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
        "pesAtivo": $("#lblAtiva").hasClass("is-checked"),
        "codPessoa": $('#id').val() == "" ? 0 : $('#id').val(),
        "codTipoPessoa": $('#cmbTipo').val(),
        "pesCPF": $('#cpf').val().replaceCustom(".", "").replaceCustom("-", ""),
        "pesDtCadastro": $("#pesDtCadastro").val(),
        "pesEmail": $("#pesEmail").val(),
        "pesFisica": true,
        "pesNome": $("#pesNome").val(),
        "pesSenha": $("#pesSenha").val(),
        "pesSexo": true,
        "codEmpresa": {"codEmpresa": id},
        "codEndereco": {"codEndereco": $("#pesSenha").val(),
            "endCep": $("#endCep").val(),
            "endLogradouro": $("#endLogradouro").val(),
            "endNumero": $("#endNumero").val(),
            "endBairro": $("#endBairro").val(),
            "endCidade": $("#endCidade").val(),
            "endUf": $("#endUf").val(),
            "endComplemento": $("#endComplemento").val()
        }
    });
}

function ZeraIdPessoa() {
    idPessoa = 0;
}



