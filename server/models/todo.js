//=======================================
//             Todo Model
//=======================================

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('todo', {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        flag: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, { timestamps: true });
}