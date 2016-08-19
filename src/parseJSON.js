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
  //
  // if no char is given, the first charachter is used

  var char = char || str [0];

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
  
  var str = trimWhitespace(str);

  return str.slice(1,-1);
};

var findCommaSeparator = function(str) {
  // takes a string that comes after the :
  // in a key value pair and finds the position
  // of the first comma that is separating another
  // key-value pair.
  //
  // returns -1 if there isn't one (i.e. this was the
  // last property)
  //
  // so if the object was {"a":9, "b":10},
  // this function would be called with a string that
  // looked like 9, "b":10 and would return 1

  // need to step through the string and find a comma
  // NOT in a string-value

  var str = trimWhitespace(str);
  var inStringValue = str[0] === '"' ? true : false;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === ',' && !inStringValue) {
      // this would be the i to slice the string after too
      return i;
    }
    if (str[i] === '"') {
      // flip the value
      if (inStringValue) {
        inStringValue = false;
      } else {
        inStringValue = true;
      }
    }
  }
  return -1;
};

////////// HELPER //////////

var parseObj = function(json) {
  // check for object
  var result = {};

  if (!checkBoundingChar(json, '{')) {
    return undefined;
  }

  var innerString = getInnerString(json, '{');
  if (innerString === "") {
    // not an actual object
    return {};
  }
  var lastProperty = false;
  while (!lastProperty) {
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

    var remainingString = trimWhitespace(remainingString.slice(1)); // remove : and trim
    
    // check to see if valueString includes a comma and more key/value pairs
    var nextCommaSeparator = findCommaSeparator(remainingString);
    
    if (nextCommaSeparator === -1) {
      // no more key/value pairs
      result[key] = parseValue(remainingString);
      lastProperty = true;
    } else {
      result[key] = parseValue(remainingString.slice(0,nextCommaSeparator));
      innerString = remainingString.slice(nextCommaSeparator+1);
      // lastProperty still false
    }

  }

  return result;

};

var parseValue = function(val) {
  // your code goes here

  var val = trimWhitespace(val);

  if (val === 'null') {
    return null;
  }

  if (val === 'false') {
    return false;
  }

  if (val === 'true') {
    return true;
  }

  if (val[0] === '{') {
    return parseObj(val);
  } else if (val[0] === '"') {
    // val is actually a string
    if (!checkBoundingChar(val, '"')) {
      return undefined;
    } else {
      return val.slice(1, val.length -1);
    }
  } else { // more cases need to go here. just obj and num for now
    return +val;
  }
};

////////////////////////////////
var parseJSON = function(json) {
  // check to see if it is an array or obj,
  // and if so then send it to the parseValue to start
  // off

  var json = trimWhitespace(json);
  var firstChar = json[0];
  if (firstChar === '{' || firstChar == '[') {
    if (checkBoundingChar(json)) {
      return parseValue(json);
    }
  }
  return undefined;
};
