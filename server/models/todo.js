module.exports = (sequelize, Sequelize) => {
    return sequelize.define('todo', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        flag: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: true });
}