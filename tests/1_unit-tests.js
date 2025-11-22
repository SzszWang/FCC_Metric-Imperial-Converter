const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Whole number input', function (done) {
        const input = '32mi';
        assert.strictEqual(convertHandler.getNum(input), 32, 'should return 32');
        done()
    });

    test('Decimal number input', function (done) {
        const input = '3.5km';
        assert.strictEqual(convertHandler.getNum(input), 3.5, 'should return 3.5');
        done()
    });

    test('Fraction input', function (done) {
        const input = '1/2gal';
        assert.strictEqual(convertHandler.getNum(input), 0.5, 'should return 0.5');
        done()
    });

    test('Fraction input with decimal', function (done) {
        const input = '3.5/2lbs';
        assert.strictEqual(convertHandler.getNum(input), 1.75, 'should return 1.75');
        done()
    });

    test('Invalid input (double-fraction)', function (done) {
        const input = '1/2/3km';
        assert.strictEqual(convertHandler.getNum(input), 'invalid number', 'should return \'invalid number\'');
        done()
    });

    test('No numeric input', function (done) {
        const input = 'mi';
        assert.strictEqual(convertHandler.getNum(input), 1, 'should return 1');
        done()
    });

    test('Valid input unit', function (done) {
        const input = '10mi';
        assert.strictEqual(convertHandler.getUnit(input), 'mi', 'should return mi');
        done()
    });

    test('Invalid input unit', function (done) {
        const input = '100liters';
        assert.strictEqual(convertHandler.getUnit(input), 'invalid unit', 'should return \'invalid unit\'');
        done()
    });

    test('Return unit for valid input unit', function (done) {
        const input = 'mi';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'km', 'should return km');
        done()
    });

    test('String unit for valid input unit', function (done) {
        const input = 'mi';
        assert.strictEqual(convertHandler.spellOutUnit(input), 'miles', 'should return miles');
        done()
    });

    test('"gal" to "L"', function (done) {
        const input = 'gal';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'L', 'should return L');
        done()
    });

    test('"L" to "gal"', function (done) {
        const input = 'L';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'gal', 'should return gal');
        done()
    });

    test('"mi" to "km"', function (done) {
        const input = 'mi';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'km', 'should return km');
        done()
    });

    test('"km" to "mi"', function (done) {
        const input = 'km';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'mi', 'should return mi');
        done()
    });

    test('"lbs" to "kg"', function (done) {
        const input = 'lbs';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'kg', 'should return kg');
        done()
    });

    test('"kg" to "lbs"', function (done) {
        const input = 'kg';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'lbs', 'should return lbs');
        done()
    });
});