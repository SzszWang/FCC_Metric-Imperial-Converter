'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    let error = null;
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      error = 'invalid number and unit';
    } else if (initNum === 'invalid number') {
      error = 'invalid number';
    } else if (initUnit === 'invalid unit') {
      error = 'invalid unit';
    }

    if (error) {
      return res.json({ error: error});
    } else {
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    }
  });

};
