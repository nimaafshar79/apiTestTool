//varible defining
/*
 Array Object Sample
 {
 name : "name",
 type : "text"||"number"||"select"||...
 }
 */
var inputs = []; // array of name input and types
$(document).ready(function () {
    //init function (something like constructor)
    $("#input-insert").prop('disabled', true);
});
$(function () {
    //do all you want to in this function i dont know wtf ?!
    $('#input-name').on("keyup", function () {
        var value = $(this).val();
        var canInsert = true;
        if (value == '') {
            canInsert = false;
        } else {
            for (var i = inputs.length - 1; i >= 0; i--) {
                if (inputs[i].name == value) {
                    canInsert = false;
                    break;
                }
            }
        }
        $('#input-insert').prop("disabled", !canInsert);
    });
    $('#input-name').keydown(function (event) {
        if (event.which == 13)
            $('#input-insert').click();
    });
    $('#input-insert').click(function () {
        //insert an input
        var inputName = $('#input-name').val();
        $('#input-name').val('');
        var inputType = $('#input-type').val();
        $('#input-type').val('text');
        if (checkValue(inputName) != true)
            return false;
        //insert the input
        if (inputType == 'checkbox') {
            var formGroup = $('<div class="row"></div>');
            var input = $('<input type="checkbox" value="1" name="'+inputName+'" />');
            var inputWrapper = $('<div class="row"></div>');
        } else {
            var formGroup = $('<div class="form-group"></div>');
            var label = $('<label for="' + inputName + '" class="col-sm-3 control-label" >' + inputName.capitalize() + '</label>');
            var inputWrapper = $('<div class="col-sm-6"></div>');
            var input = $('<input type="' + inputType + '" name="' + inputName + '" id="' + inputName + '" />');
            var deleteBtn = $('<button type="button" data-input-name="' + inputName + '" class="delete-input-btn btn btn-danger">Delete</button>')
                .click(deleteInput);
            var deleteButton = $('<div class="col-sm-3 text-center">' + '</div>').append(deleteBtn);
            if (inputType == 'text')
                input.addClass('form-control');
            inputWrapper.append(input);
            formGroup.append(label).append(inputWrapper).append(deleteButton);
        }
        $('#btn-submit').before(formGroup);
    });
    $('#save-settings').click(function () {
        alert('saved');
    });
    $('.delete-input-btn').click(deleteInput);
});
function deleteInput() {
    alert(' deleted');
}
function checkValue(value) {
    var canInsert = true;
    if (value == '') {
        canInsert = false;
    } else {
        for (var i = inputs.length - 1; i >= 0; i--) {
            if (inputs[i].name == value) {
                canInsert = false;
                break;
            }
        }
    }
    return canInsert;
}
String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};
$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});
