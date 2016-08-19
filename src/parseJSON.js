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

  if (!(checkBoundingChar(str, char))) {
    // str isn't properly formed
    return undefined;
  }

  return str.slice(1,-1);
};

////////// HELPER //////////

var parseObj = function(json) {
  // check for object
  var result = {};

  var innerString = getInnerString(json, '{');
  if (!innerString) {
    // not an actual object
    return undefined;
  }
  innerString = trimWhitespace(innerString);
  if (innerString[0] !== '"') {
    // object keys not surrounded by quotes,
    // therefore JSON is not properly formed
    return undefined;
  }
  // walk through string and find other quotation mark
  var posQuote = -1;
  for (var i = 1; i < innerString.length; i++) {
    if (posQuote === -1 && innerString[i] === '"' &&
      innerString[i-1] !== '\\') {
      posQuote = i;
      break;
    }
  }

  if (posQuote === -1) {
    // no matching quote on the other side.
    // JSON is not properly formed
    return undefined;
  }

  var key = innerString.slice(1, posQuote);

  // now find the value to go with key

  var remainingString = innerString.slice(posQuote + 1);
  remainingString = trimWhitespace(remainingString);

  // first char should now be the ':'

  if (remainingString[0] !== ':') {
    return undefined;
  }

  var valueString = trimWhitespace(remainingString.slice(1)); // remove : and trim

  result[key] = valueString;

  // currently all values are strings.
  // need to evaluate them and see if they need to be further parsed
  // (send back to evaluate as JSON??)

  return result;

};


////////////////////////////

var parseJSON = function(json) {
  // your code goes here
};

