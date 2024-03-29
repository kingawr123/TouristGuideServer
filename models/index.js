const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.tours = require('./tour.model.js')(mongoose);
db.user = require('./user.model.js')(mongoose);
db.role = require('./role.model.js')(mongoose);
db.reviews = require('./review.model.js')(mongoose);
db.reservations = require('./reservation.model.js')(mongoose);
db.history = require('./history.model.js')(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
