function spaceToPlus(string) {
  return string.split(' ').join('+');
}

function randBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function Font(name, size) {
  this.name = name;
  this.size = size;
  this.href = function() {
    return 'http://fonts.googleapis.com/css?family=' + spaceToPlus(this.name);
  }
  this.useStyleFor = function(selector) {
    var fontElement = document.createElement('link');
    fontElement.rel = 'stylesheet';
    fontElement.id = '#'+selector+"Font";
    fontElement.href = this.href();
    $('head').remove('#'+selector+"Font");
    $('head').append(fontElement);
    $(selector).css('font-family', this.name);
    if(selector === "h2") {
      this.size *= 2/3
    }
    $(selector).css('font-size', this.size + "px");
  }
}

function selectOne(fontList) {
  var randomIndex = Math.floor(Math.random()*fontList.length);
  return fontList[randomIndex];
}

function newFont(size, targetElements) {
  if(typeof clicky !== "undefined") { clicky.log('#new-combination','New combination generated'); }
  var fontName = selectOne(fonts);
  var fontSize = size;
  var font = new Font(fontName, fontSize);
  for(var i = 0; i < targetElements.length; i++) {
    font.useStyleFor(targetElements[i]);
  }
  return font;
}

var fonts = Typographer.fontList;

function booleanToEnglish(boolean) {
  return boolean ? "Yes" : "No";
}

function ViewModel() {
  var self = this;

  var lockedCssClass = "button-primary";
  var unLockedCssClass = "button-outline";

  self.currentHeaderFont = ko.observable();
  self.currentContentFont = ko.observable();
  
  self.firstLocked = ko.observable(false);
  self.secondLocked = ko.observable(false);
  self.headerFont = ko.observable();
  self.headerFontHref = ko.observable();
  self.contentFont = ko.observable();
  self.contentFontHref = ko.observable();

  self.firstCss = ko.pureComputed(function(){
    return self.firstLocked() ? lockedCssClass : unLockedCssClass;
  });

  self.secondCss = ko.pureComputed(function(){
    return self.secondLocked() ? lockedCssClass : unLockedCssClass;
  });

  self.firstLabel = ko.pureComputed(function(){
    if(self.firstLocked()) {
      return "Unlock #1 (1)";
    }
    return "Lock #1 (1)";
  });

  self.secondLabel = ko.pureComputed(function(){
    if(self.secondLocked()) {
      return "Unlock #2 (2)";
    }
    return "Lock #2 (2)";
  });

  self.lockFirst = function() {
    self.firstLocked(!self.firstLocked());
  }

  self.lockSecond = function() {
    self.secondLocked(!self.secondLocked());
  }

  self.newCombination = function () {
    if(!self.firstLocked()) {
       self.currentHeaderFont(newFont(randBetween(31, 70), ['h1', 'h2'])); 
    }
    if(!self.secondLocked()){
      self.currentContentFont(newFont(randBetween(15, 20), ['p']));      
    }
  }

  self.newCombination();

  window.addEventListener("keydown", checkKeyPressed, false);

  function checkKeyPressed(e) {
    switch(e.keyCode) {
      case 49:
        self.lockFirst();
        break;
      case 50:
        self.lockSecond();
        break;
      case 78:
        self.newCombination();
        break;
    }
  }
}

ko.applyBindings(new ViewModel());
