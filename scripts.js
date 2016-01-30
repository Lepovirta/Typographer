function spaceToPlus(string) {
  return string.split(' ').join('+');
}

function randBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

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

function newFonts(firstLocked, secondLocked, fonts) {

  if(typeof clicky !== "undefined") { clicky.log('#new-combination','New combination generated'); }
  
  if(!firstLocked) {
    var headerFontName = selectOne(fonts);
    var headerFontSize = randBetween(30, 70);
    var headerFont = new Font(headerFontName, headerFontSize);
    headerFont.useStyleFor('h1');
    headerFont.useStyleFor('h2');
    $('#header-font').attr('href', headerFont.nameAsLinkElement());
    $('#header-font').text(headerFont.name);
  }
  
  if(!secondLocked) {
    var contentFontName = selectOne(fonts);
    var contentFontSize = randBetween(14, 20);
    var contentFont = new Font(contentFontName, contentFontSize);
    contentFont.useStyleFor('p');
    $('#content-font').attr('href', contentFont.nameAsLinkElement());
    $('#content-font').text(contentFont.name);
  }
  
}

var fonts = Typographer.fontList;

function booleanToEnglish(boolean) {
  return boolean ? "Yes" : "No";
}

function ViewModel() {
  var self = this;
  
  self.firstLocked = ko.observable(false);
  self.secondLocked = ko.observable(false);

  newFonts(self.firstLocked(), self.secondLocked(), fonts);
  
  self.firstLabel = ko.computed(function(){
    return "Lock #1 ("+booleanToEnglish(self.firstLocked())+")";
  });
  
  self.secondLabel = ko.computed(function(){
    return "Lock #2 ("+booleanToEnglish(self.secondLocked())+")";
  });

  self.lockFirst = function() {
    self.firstLocked(!self.firstLocked());
  }

  self.lockSecond = function() {
    self.secondLocked(!self.secondLocked());
  }

  self.newCombination = function () {
    newFonts(self.firstLocked(), self.secondLocked(), fonts);
  };

  $(document).keypress(function(e) {
    if(e.which == 32) {
      newFonts(self.firstLocked(), self.secondLocked(), fonts);
    }
  });    
} 

ko.applyBindings(new ViewModel());
