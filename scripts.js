function spaceToPlus(string) {
  return string.split(' ').join('+');
}

function randBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

function Font(name, size) {
  this.name = name;
  this.size = size;
  this.nameAsLinkElement = function() {
    return 'http://fonts.googleapis.com/css?family=' + spaceToPlus(this.name);
  }
  this.useStyleFor = function(selector) {
    var fontElement = document.createElement('link');
    fontElement.type = 'text/css';
    fontElement.rel = 'stylesheet';
    fontElement.id = '#'+selector+"Font";
    fontElement.href = this.nameAsLinkElement();
    $('head').remove('#'+selector+"Font");
    $('head').append(fontElement);
    $(selector).css('font-family', this.name);
    if(selector === "h2") {
      this.size *= 2/3; // Hack
    }
    $(selector).css('font-size', this.size + "px");
  }
}

function selectOne(fontList) {
  var randomIndex = Math.floor(Math.random()*fontList.length);
  return fontList[randomIndex];
}

function newFonts(fonts) {

  var headerFontName = selectOne(fonts);
  var headerFontSize = randBetween(30, 70);
  var headerFont = new Font(headerFontName, headerFontSize);
  headerFont.useStyleFor('h1');
  headerFont.useStyleFor('h2');
  $('#header-font').attr('href', headerFont.nameAsLinkElement());
  $('#header-font').text(headerFont.name);

  var contentFontName = selectOne(fonts);
  var contentFontSize = randBetween(14, 20);
  var contentFont = new Font(contentFontName, contentFontSize);
  contentFont.useStyleFor('p');
  $('#content-font').attr('href', contentFont.nameAsLinkElement());
  $('#content-font').text(contentFont.name);

}

$(document).ready(function(){
  var fonts = Typographer.fontList;
  newFonts(fonts);

  $(document).keypress(function(e) {
    if(e.which == 32) { // Space
      newFonts(fonts);
    }
  });

  $('#generate').on('click', function(){
    newFonts(fonts);
  });

});
