/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

idFilial=1;

function geraNavegacao() {
    $('#navegador').html('<a class="mdl-navigation__link" href="principal.html">Home</a>\n\
<a class="mdl-navigation__link" href="cliente.html">Manter Pessoas</a>\n\
<a class="mdl-navigation__link" href="produtos.html">Manter Produtos</a>\n\
<a class="mdl-navigation__link" href="pedidos.html">Manter Pedidos</a>\n\
<a class="mdl-navigation__link" href="filial.html">Manter Filiais</a>\n\
<a class="mdl-navigation__link" href="empresa.html">Manter Empresa</a>');
    $.getScript('js/ajax.custom.js', function ()
    {
        $.getScript('js/mustache.js', function ()
        {
            preecheFiliais();
        });
    });
}

function preecheFiliais() {
    chamadaWs("ServiceFilial/buscaPorEmpresa/" + 1, "GET", null, retornaFiliais);
}
function retornaFiliais(client) {
    var resposta = JSON.parse(client.responseText);
    $(resposta).each(function (i, v) {
        var template = '<li class="mdl-menu__item" id={{codFilial}} onclick="setaFilialAtiva({{codFilial}})">{{filNomeFantasia}}</li>';
        var info = Mustache.render(template, v);
        $('#listaDeFiliais').append(info);
    });
}

function setaFilialAtiva(id){
    window.sessionStorage.setItem('filial', id);
    $('#listaDeFiliais').parent().removeClass("is-visible");
}


function buscaFilialPorEmpresa() {

    var client = new XMLHttpRequest();
    client.open("GET", url + "ServiceFilial/buscaPorEmpresa/" + getEmpresaAtiva());
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

