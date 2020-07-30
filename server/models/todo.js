//=======================================
//             Todo Model
//=======================================

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('todo', {
        userId: {
            type: Sequelize.INTEGER,
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
        flag: {     // 0 : 할 일(todo), 1 : 진행 중인 일(doing), 2 : 완료된 일(done)
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, { timestamps: true });
}