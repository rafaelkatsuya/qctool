const forbiddenCharacters = ['！','？','：','（','）','　','･']
const potentiallyForbiddenWords = ['性同一性障害', 'クィア', 'ビアン', 'バイ', '男らしさ', '女らしさ', '禁断の', 'セクマイ',
    'インターセックス', '半陰陽', '両性具有', 'FtM', 'MtF', 'ストレート', '二丁目', '男役', '夫役', '妻役', '女役']
const forbiddenWords = ['レズ', 'ホモ', 'オカマ', 'カマ', 'オネエ', 'ニューハーフ', 'オナベ', 'おとこおんな', 'ノーマル',
    '性転換手術', 'ノンケ']

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
    let halfWidthCount = (string.match(/[a-zA-Z0-9\u0020\!?]/g) || []).length / 2;
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
    //Removes line feeds in source
    let inputField = $(this).find('.text-input')
    inputField.val(inputField.val().replace(/(\r\n|\n|\r)/gm, '').trim());

    let inputText = inputField.val();
    let potentiallyForbiddenWordsFound = [];
    let forbiddenWordsFound = [];

    if (inputText) {
      let textOutput = $(this).find('.text-output');
      textOutput.html('Character count: ' + jaCharacterCount(inputText) + '<br><br>');

      potentiallyForbiddenWords.forEach(word => {
          if (inputText.includes(word)) {
              potentiallyForbiddenWordsFound.push(word)
          }
      });

      forbiddenWords.forEach(word => {
          if (inputText.includes(word)) {
              forbiddenWordsFound.push(word)
          }
      });

      if (potentiallyForbiddenWordsFound.length + forbiddenWordsFound.length > 0) {
        textOutput.html(textOutput.html() + '<span>Problematic words:</span><br>');
        textOutput.html(textOutput.html() + '<span class="potentially-forbidden-word">'+ potentiallyForbiddenWordsFound.join('・') + '</span><br>');
        textOutput.html(textOutput.html() + '<span class="forbidden-word">' + forbiddenWordsFound.join('・') + '</span><br><br>');
      }

      textOutput.html(textOutput.html() + '<span>Output text:</span><br>');

      for (var i = 0; i < inputText.length; i++) {
        if (forbiddenCharacters.includes(inputText[i])) {
          textOutput.html(textOutput.html() + '<span class="forbidden-character">' + inputText[i]) + '</span>';
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