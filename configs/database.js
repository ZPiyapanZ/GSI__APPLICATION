const Sequelize = require('sequelize')
const sequelize = new Sequelize(`postgres://postgres:Root@localhost:5432/gsiApp`)


sequelize.authenticate()
  .then(() =>{
    console.log('Successfully connected to database.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
    process.exit(1)
  })
sequelize.sync()
module.exports = sequelize
