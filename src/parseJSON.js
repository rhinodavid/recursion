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

var checkBoundingChar = function(str, char) {
  // checks to see if the str is bounded by the given
  // char and it's pair.
  // i.e. if str is "{abc}" and char is '{' the function
  // will return true
  // if str is "[1,2,3]" and char is '{' it will return false

  var pair = {
    '{' : '}',
    '[' : ']',
    '\'' : '\'',
    '"' : '"'
  };

  if (str[0] === char && str[str.length - 1] === pair[char]) {
    return true;
  } else {
    return false;
  }

};

var getInnerString = function(str, char) {
  // takes a string and returns the value inside a set of outside
  // chars. for example, with str equal to "{'a':25}" and char
  // equal to '{', getInnerString returns "'a':25"
  //
  // currently chars can be '{' or '['
  
  var str = trimWhitespace(str);

  if ((checkBoundingChar(str, char))) {
    // str isn't properly formed
    return undefined;
  }

  return str.slice(1,-1);
};

////////// HELPER //////////





////////////////////////////

var parseJSON = function(json) {
  // your code goes here
};

