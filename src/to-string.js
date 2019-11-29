function isValidNumber(numb) {
  const validNumberRe = /([0-2][0-9])[\:\.]([0-5][0-9])/;
  return numb.match(validNumberRe);
}

function toString(numb) {
  if (typeof numb != 'string') {
    throw new Error('Argument is non-string, expected string');
  }

  let match;
  if (!(match = isValidNumber(numb))) {
    throw new Error('Invalid number format, expected mm:ss');
  }

  const HOURS = {
    0: 'twelve',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven'
  };

  const ONES = {
    0: '',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
  };

  const TEENS = {
    0: 'ten',
    1: 'eleven',
    2: 'twelve',
    3: 'thirteen',
    4: 'fourteen',
    5: 'fifteen',
    6: 'sixteen',
    7: 'seventeen',
    8: 'eighteen',
    9: 'nineteen'
  };

  const TENS = {
    0: '',
    1: '',
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty'
  };

  let meredian = '';

  const [hours, minutes] = [...match].slice(1).map(Number);

  if (hours < 12) {
    meredian = 'am';
  } else {
    meredian = 'pm';
  }

  let stringified = '';

  // hours
  stringified += HOURS[hours % 12] + ' ';

  // minutes
  if (minutes < 10) {
    stringified += ONES[minutes % 10] + ' ';
  } else if (minutes < 20) {
    stringified += TEENS[minutes % 10] + ' ';
  } else {
    const minutesSplit = String(minutes)
      .split('')
      .map(Number);

    stringified += TENS[minutesSplit[0]] + ' ' + ONES[minutesSplit[1]] + ' ';
  }

  stringified += meredian;

  return stringified;
}
