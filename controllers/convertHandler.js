function ConvertHandler() {
  const regex = /^([\d\.\/]*)\s*([a-z]+)$/i
  const UNIT_MAP = {
    'gal': {
      full: 'gallons', 
      returnUnit: 'L', 
      factor: 3.78541 
    },
    'L': {
      full: 'liters', 
      returnUnit: 'gal', 
      factor: 1 / 3.78541 
    },
    'lbs': {
      full: 'pounds', 
      returnUnit: 'kg', 
      factor: 0.453592 
    },
    'kg': {
      full: 'kilograms', 
      returnUnit: 'lbs', 
      factor: 1 / 0.453592 
    },
    'mi': {
      full: 'miles', 
      returnUnit: 'km', 
      factor: 1.60934 
    },
    'km': {
      full: 'kilometers', 
      returnUnit: 'mi', 
      factor: 1 / 1.60934 
    }
  }

  this.getNum = function(input) {
    let result = null;
    const match = input.match(regex);

    let numString = '';
    if(match && match[1]) {
      numString = match[1];
    } else if (match && !match[1] && match[2]) {
      numString = '1';
    } else {
      return null;
    }

    const slashCount = numString.split('/').length - 1;
    if (slashCount > 1) {
      return 'invalid number';
    }

    if (slashCount === 1) {
      const parts = numString.split('/');
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);

      if (denominator === 0) {
        return 'invalid number';
      }

      result = numerator / denominator
    } else {
      result = parseFloat(numString);
    }

    if (isNaN(result)) {
      return 'invalid number';
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const match = input.match(regex);

    if (!match || !match[2]) {
      if (match && match[1] && !match[2]) {
        return 'invalid unit';
      }
      return 'invalid unit';
    }

    result = match[2].toLowerCase();

    if (result === 'l') {
      result = 'L';
    }

    if (UNIT_MAP[result]) {
      return result;
    } else {
      return 'invalid unit';
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    result = UNIT_MAP[initUnit]['returnUnit'];
    console.log(result)
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    result = UNIT_MAP[unit]['full'];
    console.log(result)
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const factor = UNIT_MAP[initUnit]['factor'];
    result = parseFloat((initNum * factor).toFixed(5));
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
