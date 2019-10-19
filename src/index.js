
module.exports = function check(str, bracketsConfig) {
  // your solution

  // Definitions: start

  //    initial: if there are NO THE SAME opening and closing brackets in bracketsConfig
  // bracket is opening             if it's second index is 0
  // bracket is closing             if it's second index is 1

  //    initial: if there ARE THE SAME opening and closing brackets in bracketsConfig
  // bracket is closing             if last element in stackArray is NOT EQUAL to current string element
  //                                && bracket is opening 
  //                                && it's second index is 0 
  //                                => bracket is closing (change second index for 1)

  // brackets has the same type     if their first indexes are equal

  // Definitions: end

  let strCounter = 0;
  let firstIndexOfString = 0, secondIndexOfString = 0;
  let stackArray = [], firstIndexStackArray = [], secondIndexStackArray = [];

  for (strCounter = 0; strCounter < str.length; strCounter++) {

    // checking if string elements are opening or closing brackets : _start_
    firstIndexOfString  = getFirstIndexInBracketsConfig(str[strCounter], bracketsConfig);
    secondIndexOfString = getSecondIndexInBracketsConfig(str[strCounter], bracketsConfig);

    // check if there ARE the same opening and closing brackets with current indexes in bracketsConfig
    // && string bracket is opening
    // && the last stackArray element equal to current string bracket
    // => string bracket is closing (change secondIndexOfString for 1)
    if ((bracketsConfig[firstIndexOfString][0] == bracketsConfig[firstIndexOfString][1])
        && (secondIndexOfString == 0) 
        && (stackArray[stackArray.length - 1] == str[strCounter])) { 
          secondIndexOfString = 1;
    }
    // checking if string elements are opening or closing brackets : _end_

    // main 
    //  if stackArray is empty and bracket of incoming string is closing => brackets sequence is incorrect
    if ((stackArray.length == 0) && (secondIndexOfString == 1)) {
      return false;
    }
    //  if bracket of incoming string is opening 
    //  => add bracket into stackArray
    else if (secondIndexOfString == 0) {
      stackArray.push(str[strCounter]);
      firstIndexStackArray.push(firstIndexOfString);
      secondIndexStackArray.push(secondIndexOfString);
    }
    //  if the last opening bracket in stackArray has the other type with the closing bracket of incoming string  
    //  => brackets sequence is incorrect   
    else if (firstIndexStackArray[stackArray.length - 1] != firstIndexOfString) {
      return false;
    }
    //  if the last opening bracket in stackArray has the same type with the closing bracket of incoming string  
    //  => delete bracket from stackArray   
    else if (firstIndexStackArray[stackArray.length - 1] == firstIndexOfString) {
      stackArray.pop(str[strCounter]);
      firstIndexStackArray.pop(firstIndexOfString);
      secondIndexStackArray.pop(secondIndexOfString);
    }
  }

  // if the whole string is checked (all opening brackets closed and deleted from stackArray => stackArray's length is 0) 
  //  => brackets sequence is correct 
  if (stackArray.length == 0)
    return true;
  else 
    return false;
}

function getFirstIndexInBracketsConfig(singleBracket, bracketsConfig) {
  for (let strCounter = 0; strCounter < bracketsConfig.length * 2; strCounter++)
    // if singleBracket is equal to first or second element in bracketsConfig => return first index that we found
    if ((singleBracket == bracketsConfig[strCounter][0]) || (singleBracket == bracketsConfig[strCounter][1]))
      return strCounter;
}

function getSecondIndexInBracketsConfig(singleBracket, bracketsConfig) {
  for (let strCounter = 0; strCounter < bracketsConfig.length * 2; strCounter++) {
    if (singleBracket == bracketsConfig[strCounter][0])
      return 0;
    else if (singleBracket == bracketsConfig[strCounter][1])
      return 1;
  }
}