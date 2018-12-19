
const uniqid = require('uniqid');

module.exports = {
  generateGameLink () {
    return uniqid();
  }
};
