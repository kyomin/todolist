const { Todo } = require('../models');

//=======================================
//             Todo Service
//=======================================

const getTodos = (userId) => {
    return new Promise((resolve, reject) => {
        Todo.findAll({ where: {userId: userId}, order: [ ['flag', 'ASC'] ] })
        .then((todos) => {
            if(!todos.length) {
                reject({
                    getTodosSuccess: false,
                    message: "작성한 TODO 리스트가 없습니다"
                 });
            }
            resolve(makeTypeList(todos));
        })
        .catch(() => {
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

    /* 
        첫 번째 타입의 첫 원소에 대해 처리한다. 
        todo 리스트가 존재할 때에만 이 함수를 호출하므로 길이 1 이상을 보장하기 때문이다.
    */
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

module.exports = {
    getTodos,
    makeTodo
};