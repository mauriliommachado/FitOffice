/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function someModel() {
    document.getElementById("myModal").style.display = "none";
}

function mostraModel() {
    document.getElementById("myModal").style.display = "block";
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

function campoObrigatorio(campo){
    if (campo.val().isEmpty()) {
        campo.parent().addClass("is-invalid");
        return false;
    } else {
        campo.parent().removeClass("is-invalid");
        return true;
    }
}

function DigitaFiltro(tableId, inputId) {
    var texto = $('#' + inputId).val();

    $('#' + tableId + ' tr').each(function (i, row) {
        //row.show();
        
        var achou = false;
        if (i == 0) {
            return;
        }
        
        //your code goes here, looping over every row.
        //cells are accessed as easy

        var cellLength = row.cells.length;  
        for (var y = 0; y < cellLength; y += 1) {
            var cell = row.cells[y].innerHTML;

            if (cell.toUpperCase().indexOf(texto.toUpperCase()) != -1 && i > 0) {
                achou = true;
                break;
            }
        }
        if (!achou) {
//            row.style.display = 'none';
            $(row).fadeOut('fast','linear');
        }else{
            $(row).fadeIn('fast','linear').animate();
        }

    });
    var table = document.getElementById(tableId);

    var rowLength = table.rows.length;


    for (var i = 1; i < rowLength; i += 1) {
        var row = table.rows[i];

    }
}

function preparaModel(chamadaAjax,zeraValor) {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("show-dialog");
    var span = document.getElementsByClassName("close");
    try {


        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                zeraValor();
                chamadaAjax();
            }
        };

    } catch (e) {
    }
}   

function preparaModel2() {
    var modal = document.getElementById('myModal2');
    var btn = document.getElementById("show-dialog");
    var span = document.getElementsByClassName("close");
    try {


        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
//                zeraValor();
//                chamadaAjax();
            }
        };

    } catch (e) {
    }
}  

function getFilialAtiva(){
    return window.sessionStorage.getItem("filial");
}
function getEmpresaAtiva(){
    return window.sessionStorage.getItem("company");
}


