/**
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.randomInteger = randomInteger;
