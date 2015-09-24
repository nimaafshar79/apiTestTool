//varible defining
/*
	Array Object Sample 
	{
		name : "name",
		type : "text"||"number"||"select"||...
	}
*/
var inputs = []; // array of name input and types
$(document).ready(function() {
    //init function (something like constructor)
    $("#input-insert").prop('disabled', true);
});
$(function() {
    //do all you want to in this function i dont know wtf ?!
    $('#input-name').on("keyup", function() {
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
    $('#form').on('submit', function() {
        $('#input-insert').click();
        return false;
    });
    $('#input-insert').click(function() {
        //insert an input
        var inputName = $('#input-name').val();
        $('#input-name').val('');
        var inputType = $('#input-type').val();
        $('#input-type').val('text');
        if (checkValue(inputName) != true)
            return false;
        //insert the input
        switch(inputType){
            case 'text':
                break;
            
        }
        $('#btn-submit').before(row);
    });
    $('#save-settings').click(function() {
        alert('saved');
    });
});

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
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};