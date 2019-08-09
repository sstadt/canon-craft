
// User Functions
exports.onUserCreate = require('./user/onCreate.js');

// Game Functions
exports.onGameCreate = require('./game/onGameCreate.js');
exports.onGameUpdate = require('./game/onGameUpdate.js');
exports.onGameDelete = require('./game/onGameDelete.js');
exports.joinGame = require('./game/joinGame.js');

// Quest Functions
exports.onQuestCreate = require('./quest/onQuestCreate.js');
exports.onQuestUpdate = require('./quest/onQuestUpdate.js');

// Storage Functions
exports.onObjectFinalize = require('./storage/onObjectFinalize.js');
exports.onObjectDelete = require('./storage/onObjectDelete.js');
