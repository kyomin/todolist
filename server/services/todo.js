const { Todo } = require('../models');
const { maxFlag, minFlag } = require('../utils/constants');

//=======================================
//             Todo Service
//=======================================

const getTodos = (userId) => {
    return new Promise((resolve, reject) => {
        Todo.findAll({ where: {userId: userId}, order: [ ['createdAt', 'ASC'] ] })
        .then((todos) => {
            resolve({
                todos: makeTypeList(todos),
                getTodosSuccess: true
            });
        })
        .catch((err) => {
            reject({
                getTodosSuccess: false,
                message: "TODO 리스트 불러오기에 실패했습니다."
            });
        });
    });
}

const makeTodo = (req) => {
    return new Promise((resolve, reject) => {
        Todo.create(req.body)
        .then(() => {
            return resolve({ success: true });
        })
        .catch((err) => {
            return reject({ success: false, message: err });
        });
    });
}

const makeTypeList = (totalList) => {
    let resultMap = {};
    let len = totalList.length;

    // 일단 빈 배열로 모든 flag에 매핑 시킨다.
    for(let idx=0; idx<=maxFlag; idx++) {
        resultMap[idx] = [];
    }

    // 일치하는 flag에 데이터를 추가하는 작업이다.
    for(let idx = 0; idx < len; idx++) {
        let curFlag = totalList[idx].flag;
        let curData = totalList[idx]

        resultMap[curFlag].push(curData);
    }

    return resultMap;
}

const updateTodoFlag = (id, changeFlagValue) => {
    return new Promise((resolve, reject) => {
        getChangedFlag(id, changeFlagValue)
        .then((nextFlag) => {
            Todo.update({ flag: nextFlag }, { where: {id: id} })
            .then(() => {
                resolve({ updateSuccess: true });
            })
            .catch(() => {
                reject({
                    updateSuccess: false,
                    message: "todo 상태 업데이트에 실패했습니다."
                });
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}

const getChangedFlag = (id, changeFlagValue) => {
    return new Promise((resolve, reject) => {
        Todo.findOne({ where: {id: id} })
        .then((todo) => {
            if(!todo) {
                reject({
                    updateSuccess: false,
                    message: "DB에서 해당 할 일을 찾지 못했습니다."
                });
            }

            // 다음 단계로 넘어갈 수 없는 경우의 예외처리 => 최대 flag 값을 변수로 관리할 수 있는 방법 생각해보기
            if(todo.dataValues.flag+changeFlagValue > maxFlag || todo.dataValues.flag+changeFlagValue < minFlag) {
                reject({
                    updateSuccess: false,
                    message: "다음 단계로 넘어갈 수 없습니다."
                });
            } else {
                resolve(todo.dataValues.flag+changeFlagValue);
            }
        })
        .catch((err) => {
            reject({
                updateSuccess: false,
                message: err
            });
        });
    });
}

const updateTodoDescription = (id, newDescription) => {
    return new Promise((resolve, reject) => {
        Todo.update({ description: newDescription }, { where: {id: id} })
        .then(() => {
            resolve({ updateSuccess: true });
        })
        .catch((err) => {
            reject({
                updateSuccess: false,
                message: "todo 업데이트에 실패했습니다."
            });
        }); 
    });
}

const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        Todo.destroy({ where: {id: id} })
        .then((id) => {
            resolve({ deleteSuccess: true });
        })
        .catch(() => {
            reject({ deleteSuccess: false });
        });
    });
}

module.exports = {
    getTodos,
    makeTodo,
    updateTodoFlag,
    updateTodoDescription,
    deleteTodo
};