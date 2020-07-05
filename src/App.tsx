import React, {useState} from "react";
import "./App.css";
import TodoList from "./componets/Todolist/TodoList";
import {v1} from 'uuid';
import AddItemFrom from './AddItemFrom';


export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

type TodoListType = {
    id: string,
    title: string,
    filter: filterValueType
}
export type filterValueType = 'all' | 'active' | 'completed';

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();
    let todoListID3 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'Books', filter: 'all'},
        {id: todoListID2, title: 'Songs', filter: 'active'},
        {id: todoListID3, title: 'Songs', filter: 'completed'},
    ]);

    let [tasks__1, setTasks] = useState<TasksStateType>(
        {
            [todoListID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "RestAPI", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListID2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "RestAPI", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListID3]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "RestAPI", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],

        },
    );

    // let [filter, setFilter] = useState<filterValueType>('active');


    // const tasks__1 = [
    //   { id: 1, title: "HTML&CSS", isDone: true },
    //   { id: 2, title: "JS", isDone: true },
    //   { id: 3, title: "ReactJS", isDone: false },
    //   { id: 4, title: "RestAPI", isDone: false },
    //   { id: 5, title: "GraphQL", isDone: false },
    //   // { is: 4, title: "React", isDone: false },
    // ];


    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks__1[todoListID];
        tasks__1[todoListID] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks__1});

        // let resultTasks = tasks__1.filter((t) => {
        //   if (t.id !== id) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
    }

    function changeFilter(id: string, value: filterValueType) {
        let todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let todoListTasks = tasks__1[todoListID];
        tasks__1[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks__1});

    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks__1[todoListID];
        let task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks__1});
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        //освобождаем место ,удаляем с объекта не нужный массив с данными
        delete tasks__1[id];
        setTasks({...tasks__1})


    }

    // let tasksForTodoList = tasks__1;
    // if (filter === 'active') {
    //     tasksForTodoList = tasks__1.filter(t => t.isDone === false)
    // }
    // if (filter === 'completed') {
    //     tasksForTodoList = tasks__1.filter(t => t.isDone === true)
    // }

    function addTodolist(title: string) {
        let newTodoListID = v1();
        let newTodoList: TodoListType = {

            id: newTodoListID,
            title: title,
            filter: 'all',

        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks__1,
            [newTodoListID]: []
        })
    }

    function changeTasksTitle(id:string,title:string,todoListID:string) {
        let todoListTasks = tasks__1[todoListID];
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks__1})
        }
    }

    return (
        <div className="App">
            <AddItemFrom addItem={addTodolist}/>
            {todoLists.map(tl => {
                let allTasks = tasks__1[tl.id]
                let tasksForTodoList = allTasks;

                if (tl.filter === 'active') {
                    tasksForTodoList = allTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = allTasks.filter(t => t.isDone === true)
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTasksTitle={changeTasksTitle}
                    />
                )
            })}
            {/*<TodoList*/}
            {/*    title={"What to learn"}*/}
            {/*    tasks={tasksForTodoList}*/}
            {/*    removeTask={removeTask}*/}
            {/*    changeFilter={changeFilter}*/}
            {/*    addTask={addTask}*/}
            {/*    changeStatus={changeStatus}*/}
            {/*    filter={filter}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
