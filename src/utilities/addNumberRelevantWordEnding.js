const addNumberRelevantWordEnding = (number) => {
  let numberString = number.toString();

  if (numberString[numberString.length - 1] === '1'
    && numberString[numberString.length - 2] !== '1') {
    return '';
  } else if (numberString[numberString.length - 1] > 1
    && numberString[numberString.length - 1] < 5
    && numberString[numberString.length - 2] !== '1') {
    return 'а';
  } else {
    return 'ов';
  }
}

export default addNumberRelevantWordEnding;