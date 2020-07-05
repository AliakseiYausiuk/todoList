import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValueType} from '../../App';
import AddItemFrom from '../../AddItemFrom';
import EditableSpan from '../../EditableSpan';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoListPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todoListID: string) => void;
    changeFilter: (id: string, value: filterValueType) => void;
    addTask: (title: string, todoListID: string) => void;
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void;
    filter: filterValueType;
    removeTodoList: (id: string) => void;
    changeTasksTitle:(id:string,title:string,todoListID:string) => void;
};

function TodoList(props: TodoListPropsType) {

    //хуки принимают значения string или null, в первом хуке стартовое значение пустая строка "",а втором Null
    // let [title, setTitle] = useState<string>('');
    // let [error, setError] = useState<string | null>(null);


    let jsxTasks = props.tasks.map((t) => {

        //берём значение у инпута  с помощью onChangeHandler
        const onStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked;
            //t - это из параметров метода map ,это так таска которая будет отрисовываться ,и мы берём id этой таски
            props.changeStatus(t.id, newIsDoneValue, props.id);
        }

        const onTitleChangeCallback = (newTitle:string) => {
            props.changeTasksTitle(t.id,newTitle,props.id)
        }

        return (
            <li key={t.id} className={props.filter !== "all" && t.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}
                />
                <EditableSpan title={t.title} saveTitle={onTitleChangeCallback}/>
                <button
                    onClick={() => {
                        // alert(t.id);
                        props.removeTask(t.id, props.id);
                    }}
                >
                    x
                </button>
            </li>
        );
    })
    // const onAddTasks = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(title, props.id);
    //         setTitle('');
    //     } else {
    //         setError('Title is required');
    //     }
    //     setTitle('');
    //
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    //
    // const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         onAddTasks();
    //     }
    // }

    const onChangeAll = () => props.changeFilter(props.id, 'all');

    const onChangeActive = () => props.changeFilter(props.id, 'active');

    const onChangeCompleted = () => props.changeFilter(props.id, 'completed');

    const createTaskTitle = (title:string) => {
        props.addTask(title,props.id);
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>x
                </button>
            </h3>
            <AddItemFrom addItem={createTaskTitle}/>


            {/*<div>*/}

            {/*    <input type='text' value={title} onChange={onChangeHandler} onKeyPress={onKeyPress}*/}
            {/*           className={error ? "error" : ""}/>*/}
            {/*    <button onClick={onAddTasks}>add</button>*/}
            {/*    {error && <div className={'error-message'}>{error}</div>}*/}
            {/*</div>*/}


            <ul>
                {jsxTasks}


                {/*
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li> */}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onChangeAll}>All
                </button>
                <button onClick={onChangeActive} className={props.filter === "active" ? "active-filter" : ""}>Active
                </button>
                <button onClick={onChangeCompleted}
                        className={props.filter === "completed" ? "active-filter" : ""}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
