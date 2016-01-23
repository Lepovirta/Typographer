function selectOne(fontList) {
  var randomIndex = Math.floor(Math.random()*fontList.length);
  return fontList[randomIndex];
}

function generateNewFontFamily(font, idOfElement) {
  var style = document.createElement('link');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  style.id = idOfElement;
  style.viewHref = 'https://www.google.com/fonts/specimen/';
  style.viewHref += font.split(' ').join('+');
  style.href = 'http://fonts.googleapis.com/css?family=';
  style.href += font.split(' ').join('+');
  return style;
}

function newFonts(fonts) {

  $('#loading').show();

  var randomFont = selectOne(fonts);

  $('h1').css('font-family', randomFont);
  var font = generateNewFontFamily(randomFont, "#h1Font");
  $('head').remove('#h1Font');
  $('head').append(font);

  $('h2').css('font-family', randomFont);
  var font = generateNewFontFamily(randomFont, "#h2Font");
  $('head').remove('#h2Font');
  $('head').append(font);
  $('#header-font').attr('href', font.href);
  $('#header-font').text(randomFont);

  randomFont = selectOne(fonts);

  $('p').css('font-family', randomFont);
  var font = generateNewFontFamily(randomFont, "#pFont");
  $('head').remove('#pFont');
  $('head').append(font);
  $('#content-font').attr('href', font.href);
  $('#content-font').text(randomFont);

  setTimeout(function(){
    $('#loading').hide();
  }, 300);

}

$(document).ready(function(){
  var fonts = Typographer.fontList;
  newFonts(fonts);

  $(document).keypress(function(e) {
    // Space
    if(e.which == 32) {
      newFonts(fonts);
    }
  });

  $('#generate').on('click', function(){
    newFonts(fonts);
  });

});
