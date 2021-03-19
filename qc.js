const forbiddenCharacters = ['！','？','：','（','）','　','･']

function addForm() {
  let newFormDiv = document.createElement('div');
  let newOutputDiv = document.createElement('div'); 
  $(newFormDiv).html('<textarea rows = "5" class="text-input"></textarea>');
  $(newOutputDiv).addClass('text-output');
  $(newFormDiv).append(newOutputDiv);
  $(newFormDiv).addClass('check-form');
  document.body.append(newFormDiv);
}

function removeForm() {
  $('.check-form :last').remove();
}

function jaCharacterCount(string) {
    let halfWidthCount = (string.match(/[a-zA-Z0-9]/g) || []).length / 2;
    return string.length - halfWidthCount;
}

$('#button-add').on('click', function(evt) {
  addForm();
});

$('#button-remove').on('click', function(evt) {
  removeForm();
});

$('#button-check').on('click', function(evt) {
  $('.check-form').each(function(){
    //Removes spaces and line feeds in source
    let inputField = $(this).find('.text-input')
    inputField.val(inputField.val().replace(/\s+/g, '').trim());

    let inputText = inputField.val();

    if (inputText) {
      let textOutput = $(this).find('.text-output');
      textOutput.html('Character count: ' + jaCharacterCount(inputText) + '<br>');

      for (var i = 0; i < inputText.length; i++) {
        if (forbiddenCharacters.includes(inputText[i])) {
          textOutput.html(textOutput.html() + '<span class="forbidden">' + inputText[i]) + '</span>';
        } else if (/\s/.test(inputText[i])) {
          textOutput.html(textOutput.html() + '<span class="space">' + inputText[i]) + '</span>';
        } else {
          textOutput.html(textOutput.html() + inputText[i]);
        }
      }
    }
  });
  return false;
});

function toClipboard(text) {
        var container = $('#container');
        var inp = document.createElement('textarea');
        container.append(inp); 
        inp.value = text;
        inp.select();
        document.execCommand('Copy');
        container.remove(container.lastChild);
        alert("Copied the text: " + inp.value);
    }