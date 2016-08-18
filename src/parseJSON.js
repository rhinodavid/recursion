// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

//////////// UTILITY ///////////////////

var trimWhitespace = function (str) {
  // takes a string and removes spaces from the beginning
  // and end of the string
  
  // currently only trims spaces. will need to eventually
  // include tab, newline, etc
  if (str[0] === ' ') {
    return trimWhitespace(str.slice(1));
  } else if (str[str.length -1] === ' ') {
    return trimWhitespace(str.slice(0,-1));
  } else {
    return str;
  }
};

var parseJSON = function(json) {
  // your code goes here
};

