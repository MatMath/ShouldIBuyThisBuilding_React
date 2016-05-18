export function convertToCurrency (valueToConvert) {
    // http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    let returnNumber = parseFloat(valueToConvert);
    if (returnNumber) {
      return returnNumber.toFixed(0).replace(/./g, function(c, i, a) {
        return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
      });
    }
}
