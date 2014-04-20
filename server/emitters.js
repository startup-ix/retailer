/* This is the EventEmitter between modules
 */

var events = require('events');
var eventEmitter = new events.EventEmitter();
module.exports = eventEmitter;
