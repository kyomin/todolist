const { Todo } = require('../models');
const maxFlag = 2;

//=======================================
//             Todo Service
//=======================================

const getTodos = (userId) => {
    return new Promise((resolve, reject) => {
        Todo.findAll({ where: {userId: userId}, order: [ ['flag', 'ASC'] ] })
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
    let typeList = [];
    let len = totalList.length;

    // 불러온 todo 리스트의 길이가 0일 경우의 예외처리 !!
    if(!len) {
        for(let idx=0; idx<=maxFlag; idx++) {
            resultMap[idx] = [];
        }

        return resultMap;
    }

    // 첫 번째 타입의 첫 원소에 대해 처리한다. 
    let currentType = totalList[0].flag;
    typeList.push(totalList[0]);

    for(let idx = 1; idx < len; idx++) {
        // 이전 타입과 같다면
        if(totalList[idx].flag === currentType) {
            typeList.push(totalList[idx]);
        } else {    // 이전 타입과 다르다면, 즉 새로운 타입이 시작된다면
            resultMap[currentType] = typeList;

            // 새로운 타입을 담기 위해 컨테이너 초기화 후 원소 담기
            typeList = [];
            typeList.push(totalList[idx]);

            // 타입 바꿔주기
            currentType = totalList[idx].flag;
        }
    }

    // 마지막 타입에 대한 처리
    resultMap[currentType] = typeList;

    return resultMap;
}

const updateTodo = (id) => {
    return new Promise((resolve, reject) => {
        getNextFlag(id)
        .then((nextFlag) => {
            Todo.update({ flag: nextFlag }, { where: {id: id} })
            .then(() => {
                resolve({ updateSuccess: true });
            })
            .catch(() => {
                reject({
                    updateSuccess: false,
                    message: "비밀번호 업데이트에 실패했습니다."
                });
            });
        })
        .catch((err) => {
            reject(err);
        })
    });
}

const getNextFlag = (id) => {
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
            if(todo.dataValues.flag === maxFlag) {
                reject({
                    updateSuccess: false,
                    message: "다음 단계로 넘어갈 수 없습니다."
                });
            } else {
                resolve(todo.dataValues.flag+1);
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
    updateTodo,
    deleteTodo
};