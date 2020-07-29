//=======================================
//             User Model
//=======================================

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        token: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: true });
}