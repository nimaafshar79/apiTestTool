//varible defining
/*
 Array Object Sample
 {
 name : "name",
 type : "text"||"number"||"select"||...
 }
 */
var inputs = []; // array of name input and types
var settings = null;
$(document).ready(function () {
    //init function (something like constructor)
    $("#input-insert").prop('disabled', true);
    $.ajax({
        url: 'php/readsettings.php',
        success: function (data) {
            settings = JSON.parse(data);
            //autoload something
            $('#use-localhost').prop('checked', settings.use_localhost)
            if (settings.autoload_inputs == true) {
                $('#autoload-inputs').prop('checked', true);
                readInputs();
            }
            if (settings.autoload_options == true) {
                $('#autoload-options').prop('checked', true);
                readOptions();
            }
        }
    });
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
            var formGroup = $('<div class="row form-group"></div>');
            var input = $('<input type="checkbox" value="1" name="' + inputName + '" />');
            var inputWrapper = $('<div class="col-sm-6 checkbox col-sm-offset-3"></div>');
            var inputSpan = $('<span></span>');
            var bold = $('<b>' + inputName + '</b>');
            var deleteWrapper = $('<div class="col-sm-3 text-center"></div>');
            var deleteButton = $('<button type="button" data-input-name="' + inputName + '" class="btn pull-right btn-danger">Delete</button>').click(deleteInput);
            deleteWrapper.append(deleteButton);
            inputSpan.append(input).append(bold);
            inputWrapper.append(inputSpan);
            formGroup.append(inputWrapper).append(deleteWrapper);
            $('#btn-submit').before(formGroup);
        } else {
            var formGroup = $('<div class="form-group"></div>');
            var label = $('<label for="' + inputName + '" class="col-sm-3 control-label" >' + inputName.capitalize() + '</label>');
            var inputWrapper = $('<div class="col-sm-6"></div>');
            var input = $('<input type="' + inputType + '" name="' + inputName + '" id="' + inputName + '" />');
            var deleteBtn = $('<button type="button" data-input-name="' + inputName + '" class="delete-input-btn pull-right btn btn-danger">Delete</button>')
            .click(deleteInput);
            var deleteButton = $('<div class="col-sm-3 text-center">' + '</div>').append(deleteBtn);
            if (inputType == 'text')
                input.addClass('form-control');
            inputWrapper.append(input);
            formGroup.append(label).append(inputWrapper).append(deleteButton);
            $('#btn-submit').before(formGroup);
        }
        //insert to list
        var object = {type: inputType, name: inputName};
        inputs.push(object);
    });
    $('.delete-input-btn').click(deleteInput);
    $('#save-inputs').click(function () {
        //save inputs
    });
    $('#load-inputs').click(function () {
        //load inputs
    });
    $('#main-form').submit(function () {
        var baseUrl = $('#website').val();
        var controller = $('#controller').val();
        var method = $('#method').val();
        var url = 'http://';
        if ($('#use-localhost').prop('checked')) {
            url += 'localhost/';
        }
        url += baseUrl;
        if (controller != '')
            url += '/' + controller;
        if (controller != '' && method != '')
            url += '/' + method;
        $(this).attr('action', url);
        var sendMethod = $('#input-method').val();
        $(this).attr('method', sendMethod);
        var enctype = $('#form-enctype').val();
        if (enctype != 'regular')
            $(this).attr('enctype', 'multipart/form-data');
        return true;
    });
    $('#save-settings-btn').click(function () {
        settings = {
            use_localhost: $('#use-localhost').prop('checked'),
            autoload_inputs: $('#autoload-inputs').prop('checked'),
            autoload_options: $('#autoload-options').prop('checked')
        };
        $.ajax({
            url: 'php/saveSettings.php',
            data: {settings: JSON.stringify(settings)},
            type: "POST",
            success: function () {
                console.log('settings saved');
            }
        });
    });
    $('#load-inputs').click(readInputs);
    $('#load-options').click(readOptions);
    $('#save-inputs').click(function () {
        $.ajax({
            url: 'php/saveInputs.php',
            type: "POST",
            data: {inputs: JSON.stringify(inputs)},
            success: function () {
                console.log('inputs saved');
            }
        });
    });
    $('#save-options').click(function () {
        options = {
            base_url: $('#website').val(),
            controller: $('#controller').val(),
            method: $('#method').val(),
            send_method: $('#input-method').val(),
            form_enctype: $('#form-enctype').val(),
            username : $('#username').val(),
            password : $('#password').val()
        };
        $.ajax({
            url: 'php/saveOptions.php',
            type: "POST",
            data: {options: JSON.stringify(options)},
            success: function () {
                console.log('options saved');
            }
        })
    });
})
;
function deleteInput() {
    var inputName = $(this).attr('data-input-name');
    for (var i = inputs.length - 1; i >= 0; i--) {
        if (inputs[i].name == inputName) {
            inputs.splice(i, 1);
            break;
        }
    }
    $(this).parent().parent().remove();
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
function createInput(inputType, inputName) {
    if (checkValue(inputName) != true)
        return false;
    //insert the input
    if (inputType == 'checkbox') {
        var formGroup = $('<div class="row form-group"></div>');
        var input = $('<input type="checkbox" value="1" name="' + inputName + '" />');
        var inputWrapper = $('<div class="col-sm-6 checkbox col-sm-offset-3"></div>');
        var inputSpan = $('<span></span>');
        var bold = $('<b>' + inputName + '</b>');
        var deleteWrapper = $('<div class="col-sm-3 text-center"></div>');
        var deleteButton = $('<button type="button" data-input-name="' + inputName + '" class="btn pull-right btn-danger">Delete</button>').click(deleteInput);
        deleteWrapper.append(deleteButton);
        inputSpan.append(input).append(bold);
        inputWrapper.append(inputSpan);
        formGroup.append(inputWrapper).append(deleteWrapper);
        $('#btn-submit').before(formGroup);
    } else {
        var formGroup = $('<div class="form-group"></div>');
        var label = $('<label for="' + inputName + '" class="col-sm-3 control-label" >' + inputName.capitalize() + '</label>');
        var inputWrapper = $('<div class="col-sm-6"></div>');
        var input = $('<input type="' + inputType + '" name="' + inputName + '" id="' + inputName + '" />');
        var deleteBtn = $('<button type="button" data-input-name="' + inputName + '" class="delete-input-btn pull-right btn btn-danger">Delete</button>')
        .click(deleteInput);
        var deleteButton = $('<div class="col-sm-3 text-center">' + '</div>').append(deleteBtn);
        if (inputType == 'text')
            input.addClass('form-control');
        inputWrapper.append(input);
        formGroup.append(label).append(inputWrapper).append(deleteButton);
        $('#btn-submit').before(formGroup);
    }
    //insert to list
    var object = {type: inputType, name: inputName};
    inputs.push(object);
}
function readInputs() {
    $.ajax({
        url: 'php/readInputs.php',
        success: function (data) {
            var inputArray = JSON.parse(data);
            //creating inputs
            for (var i = 0; i < inputArray.length; i++) {
                createInput(inputArray[i].type, inputArray[i].name);
            }
        }
    })
}
var options;
function readOptions() {
    $.ajax({
        url: "php/readOptions.php",
        success: function (data) {
            options = JSON.parse(data);
            $('#website').val(options.base_url);
            $('#controller').val(options.controller);
            $('#method').val(options.method);
            $('#input-method').val(options.send_method);
            $('#form-enctype').val(options.form_enctype);
            $('#username').val(options.username),
            $('#password').val(options.password)
        }
    })
}