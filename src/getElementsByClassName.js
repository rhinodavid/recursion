// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var includesObject = function(arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
};


var getElementsByClassName = function(className) {
  var element = arguments[1] || document.body;
  var result = [];

  // if element is a node

  if (element.nodeType === 3) {
    // we are at a text node (nodeType of 3)
    return [];
  }

  if (element.nodeType) {
    // just got a node. first check it
    if ('classList' in element && includesObject(element.classList, className)) {
      result.push(element);
    }
    // check to see if it has children
    // if so, push them to the function
    if (element.hasChildNodes()) {
      result = result.concat(getElementsByClassName(className, element.childNodes));
    }
  } else {
    // if element.nodeType is undefined, it is an array of child nodes
    // put each array item through the function
    for (var i = 0; i < element.length; i++) {
      result = result.concat(getElementsByClassName(className, element[i]));
    }
  }
  return result;
};
