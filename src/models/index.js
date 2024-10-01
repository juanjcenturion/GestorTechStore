const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};

// Importa los modelos
db.Role = require('./role')(sequelize, Sequelize.DataTypes)
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Device = require('./device')(sequelize, Sequelize.DataTypes);
db.RepairOrder = require('./repair_order')(sequelize, Sequelize.DataTypes);
db.Repair = require('./repair')(sequelize, Sequelize.DataTypes);
db.Type = require('./type')(sequelize, Sequelize.DataTypes);
db.State = require('./state')(sequelize, Sequelize.DataTypes);

// Realiza las asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporta la instancia de sequelize y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;

