import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

function DrawTodoList(props) {
    const [prevTodoList, setPrevTodoList] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const [title, setTitle] = useState("");
    
    useEffect(() => {
        setTodoList(props.todoList);
        setPrevTodoList(props.todoList);
        setTitle(props.title);
    }, []);

    useEffect(() => {
        if(props.todoList !== prevTodoList) {
            setTodoList(props.todoList);
            setPrevTodoList(props.todoList);
            setTitle(props.title);
        }
    }, [props.todoList, props.title]);

    const drawTodoList = () => {
        return todoList.map((todo, idx) => {
            return (
                <div 
                    key={idx} 
                    style={{
                        marginBottom: '20px', fontSize: '18px', cursor: 'pointer',
                        borderBottom: '1px solid gray'
                    }}
                >
                    <h4>
                        {idx+1}. {todo.title}
                    </h4>
                    <div>
                        {todo.description}
                    </div>
                </div>
            );
        });
    }
    
    return (
        <div style={{
                width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
                alignContent: 'center'
            }}
        >
            <div style={{
            width: '40%'
            }}>
                <Title level={1} style={{color: '#40a9ff'}}>{title} List</Title>
                {drawTodoList()}
            </div> 
        </div>
    );
}

export default withRouter(DrawTodoList);