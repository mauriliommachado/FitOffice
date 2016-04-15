/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function mostraToast(divToast, buttonToast,text) {
    'use strict';
    window['counter'] = 0;
    var snackbarContainer = document.querySelector('#'+divToast);
    var showToastButton = document.querySelector('#'+buttonToast);
    showToastButton.addEventListener('click', function () {
        'use strict';
        ++counter;
        var data;
        data = {message: text};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
}

