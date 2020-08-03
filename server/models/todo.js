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
        flag: {     // 0 : 할 일(todo), 1 : 진행 중인 일(doing), 2 : 완료된 일(done), 숫자보다는 문자열로
            type: Sequelize.INTEGER,    // 타입스크립트 이용해 열거형 정의해서 디비에 넣을 것
            allowNull: false
        }
    }, { timestamps: true });
}