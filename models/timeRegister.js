const Sequelize = require('sequelize')
const db = require('../configs/database')
const TimeRegister = db.define('timeRegister', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    employeeId:{
        type:Sequelize.STRING,
        references:{
            model:db.define('employee'),
            key:'id'
        },
        allowNull:false 
    },
    description:{
        type:Sequelize.STRING,
    },
    location:{
        type:Sequelize.ARRAY(Sequelize.STRING)
    },
    isCheckIn:{
        type:Sequelize.BOOLEAN
    },
    registrationTime:{
        type:Sequelize.DATE
    }
})
TimeRegister.belongsTo(db.define('employee'), {foreignKey:'employeeId', targetKey:'id'})
module.exports = TimeRegister