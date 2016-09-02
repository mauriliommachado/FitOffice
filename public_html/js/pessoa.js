/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var idPessoa = 0;
function buscaPessoaPorEmpresa() {
    chamadaWs("ServicePessoa/buscaPorEmpresa/" + getEmpresaAtiva(), "GET", null, retornoBusca);
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
                    resetForm();
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
                    if (v.pesEmail != "") {
                        $("#pesSenha").parent().addClass("is-dirty");
                    } else {
                        $("#pesSenha").parent().removeClass("is-invalid");
                        $("#pesSenha").parent().removeClass("is-dirty");
                    }
                    if (v.pesFisica != "") {
                        $("#pesFisica").parent().addClass("is-dirty");
                    } else {
                        $("#pesFisica").parent().removeClass("is-invalid");
                        $("#pesFisica").parent().removeClass("is-dirty");
                    }
                    if (v.pesDtCadastro != "") {
                        $("#pesDtCadastro").parent().addClass("is-dirty");
                    } else {
                        $("#pesDtCadastro").parent().removeClass("is-invalid");
                        $("#pesDtCadastro").parent().removeClass("is-dirty");
                    }
                    if (v.pesAtivo == true) {
                        $("#lblAtiva").addClass("is-checked");
                    } else {
                        $("#lblAtiva").removeClass("is-checked");
                    }
                    if (v.enderecoList.length > 0) {
                        if (v.enderecoList[0].endCep != "") {
                            $("#endCep").parent().addClass("is-dirty");
                        }
                        if (v.enderecoList[0].endLogradouro != "") {
                            $("#endLogradouro").parent().addClass("is-dirty");
                        }
                        if (v.enderecoList[0].endNumero != "") {
                            $("#endNumero").parent().addClass("is-dirty");
                        }
                        if (v.enderecoList[0].endBairro != "") {
                            $("#endBairro").parent().addClass("is-dirty");
                        }
                        if (v.enderecoList[0].endCidade != "") {
                            $("#endCidade").parent().addClass("is-dirty");
                        }
                        if (v.enderecoList[0].endUf != "") {
                            $("#endUf").parent().addClass("is-dirty");
                        }
                        if (v.enderecoList[0].endComplemento != "") {
                            $("#endComplemento").parent().addClass("is-dirty");
                        }
                        if (v.enderecoList[0].endReferencia != "") {
                            $("#endReferencia").parent().addClass("is-dirty");
                        }
                        $('#endComplemento').val(v.enderecoList[0].endComplemento == null ? "" : v.enderecoList[0].endComplemento);
                        $('#codEndereco').val(v.enderecoList[0].codEndereco);
                        $('#endUf').val(v.enderecoList[0].endUF);
                        $('#endCidade').val(v.enderecoList[0].endCidade);
                        $('#endBairro').val(v.enderecoList[0].endBairro);
                        $('#endNumero').val(v.enderecoList[0].endNumero);
                        $('#endLogradouro').val(v.enderecoList[0].endLogradouro);
                        $('#endReferencia').val(v.enderecoList[0].endReferencia);
                        $('#endCep').val(v.enderecoList[0].endCep);
                    } else {
                        $('#endComplemento').val("");
                        $('#codEndereco').val("");
                        $('#endUf').val("");
                        $('#endCidade').val("");
                        $('#endBairro').val("");
                        $('#endNumero').val("");
                        $('#endLogradouro').val("");
                        $('#endCep').val("");
                        $('#endReferencia').val("");
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

function resetForm() {
    $("#pesNome").parent().addClass("is-dirty");
    $("#pesNome").parent().removeClass("is-invalid");
    $("#pesNome").parent().removeClass("is-dirty");
    $("#id").parent().removeClass("is-invalid");
    $("#id").parent().removeClass("is-dirty");
    $("#cpf").parent().removeClass("is-invalid");
    $("#cpf").parent().removeClass("is-dirty");
    $("#pesEmail").parent().removeClass("is-invalid");
    $("#pesEmail").parent().removeClass("is-dirty");
    $("#pesSenha").parent().removeClass("is-invalid");
    $("#pesSenha").parent().removeClass("is-dirty");
    $("#pesFisica").parent().removeClass("is-invalid");
    $("#pesFisica").parent().removeClass("is-dirty");
    $("#lblAtiva").addClass("is-checked");
    $('#codEndereco').val("");
    $("#endCep").parent().removeClass("is-invalid");
    $("#endCep").parent().removeClass("is-dirty");
    $("#endLogradouro").parent().removeClass("is-invalid");
    $("#endLogradouro").parent().removeClass("is-dirty");
    $("#endNumero").parent().removeClass("is-invalid");
    $("#endNumero").parent().removeClass("is-dirty");
    $("#endBairro").parent().removeClass("is-invalid");
    $("#endBairro").parent().removeClass("is-dirty");
    $("#endCidade").parent().removeClass("is-invalid");
    $("#endCidade").parent().removeClass("is-dirty");
    $("#endUf").parent().removeClass("is-invalid");
    $("#endUf").parent().removeClass("is-dirty");
    $("#endComplemento").parent().removeClass("is-invalid");
    $("#endComplemento").parent().removeClass("is-dirty");
    $('a.mdl-layout__tab').removeClass('is-active');
    // activate desired tab
    $('a[href="#Pessoa"]').addClass('is-active');
    $('a[href="#Endereco"]').removeClass('is-active');
    // remove all is-active classes from panels
    $('.mdl-layout__tab-panel').removeClass('is-active');
    // activate desired tab panel
    $('#Pessoa').addClass('is-active');
    $('#Endereco').removeClass('is-active');
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
        "codEmpresa": {"codEmpresa": getEmpresaAtiva()},
        "enderecoList": [{"codEndereco": $("#codEndereco").val() == "" ? 0 : $('#codEndereco').val(),
                "endCep": $("#endCep").val(),
                "endLogradouro": $("#endLogradouro").val(),
                "endNumero": $("#endNumero").val(),
                "endBairro": $("#endBairro").val(),
                "endCidade": $("#endCidade").val(),
                "endUF": $("#endUf").val()==""?null:("#endUf").val(),
                "endReferencia": $("#endReferencia").val(),
                "endComplemento": $("#endComplemento").val()
            }]
    });
}

function ZeraIdPessoa() {
    idPessoa = 0;
}



