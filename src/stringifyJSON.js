// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var trimTrailingComma = function(str) {
  // takes a string and if the last character is a comma,
  // returns the string without the trailing comma

  if (str[str.length - 1] === ',') {
    return str.slice(0, -1);
  } else {
    return str;
  }
};

var stringifyJSON = function(obj) {
  // your code goes here

  if (obj === undefined || obj === {}) {
    return undefined;
  }

  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString();
  }

  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }

  var result;

  if (Array.isArray(obj)) {
    result = '[';
    for (var i = 0; i < obj.length; i++) {
      result = result + stringifyJSON(obj[i]) + ',';
    }
    result = trimTrailingComma(result);
    result = result + ']';
    return result;
  }

  if (typeof obj === 'object') {
    result = '{';
    for (var key in obj) {
      if (key !== 'undefined' && key !== 'functions') {
        result = result + '"' + key + '"' + ':';
        result = result  + stringifyJSON(obj[key]) + ',';
      }
    }
    result = trimTrailingComma(result);
    result = result + '}';
    return result;
  }

};
