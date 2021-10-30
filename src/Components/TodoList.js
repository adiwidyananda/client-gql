import React from "react";
import {LIST_TODOS} from '../Graphql/Queries'
import { ADD_TODO } from "../Graphql/Mutation";
import {useQuery, useMutation} from '@apollo/client'
import { useForm } from "react-hook-form";
import Todo from './Todo';


function TodoList() {
    const {register, handleSubmit} = useForm();
    const [addTodo] = useMutation(ADD_TODO);  
    const onSubmit = (data) => {
        addTodo({variables: data,})
        var url = window.location.href
        window.location.assign(url);
    } 
    const {data, loading, error} = useQuery(LIST_TODOS);
    var list = []
    if (!loading && !error) {     
        list = data.listTodos.map((todo) => {
            return ( 
                <Todo key={todo.id} content={todo.content} status={todo.status} id={todo.id}/>
            )
        })
    }
    return (
        <div className="mt-8 flex justify-center">
            <div className="w-10/12 md:w-1/3">
                <div className="px-6 mb-4 py-4 rounded overflow-hidden shadow-lg">
                    <div className="addTodo">
                        <div className="font-bold text-center text-xl mb-2">Todo List</div>
                        <form>
                            <div className="w-full">
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" data-testid="content" placeholder="Todo" {...register('content', {required: "This is required"})} />
                            </div>
                            <div className="w-full mt-2 mb-6 md:mb-0">
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" data-testid="status" {...register('status')}>
                                        <option value="BACKLOG">BACKLOG</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-2">
                                <button onClick={handleSubmit(onSubmit)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" data-testid="addBtn">
                                Add Todo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>{list}</div>
            </div>
            <p className="hidden" data-testid="application">complete</p>
        </div>
    )
}

export default TodoList;