import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import { EDIT_TODO } from "../Graphql/Mutation"
import {DELETE_TODO} from '../Graphql/Mutation'
import {useMutation} from '@apollo/client'

const Todo = (props) => {
    const [show,setShow]=useState(false)
    const {register, handleSubmit} = useForm();
    const [deleteTodo] = useMutation(DELETE_TODO); 
    const onDelete = (data) => {
        deleteTodo({variables: { deleteTodoId: data }})
        var url = window.location.href
        window.location.assign(url);
    }
    const [editTodo] = useMutation(EDIT_TODO);
    const onEdit = (data) => {
        editTodo({variables: data})
        var url = window.location.href
        window.location.assign(url);
    }
    
    return (
        <div className="max-w-lg  shadow-lg mb-4">
            <div className="px-6 py-4 flex">
                <p>{props.content}</p>
                <div className="ml-auto flex">
                    {props.status === 'BACKLOG'? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#1F2937">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>:null
                    }
                    {props.status === 'IN_PROGRESS'? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#6B7280">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>:null
                    }
                    {props.status === 'DONE'? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#10B981">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>:null
                    }
                    <svg data-testid="show" onClick={()=>setShow(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 border-l-2 cursor-pointer" viewBox="0 0 20 20" fill="#F59E0B">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <svg onClick={() => onDelete(props.id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="#DC2626" viewBox="0 0 24 24" stroke="currentColor" data-testid="deleteBtn">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div> 
            </div>
            {
            show?<div>
                <div className="w-full px-4">
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" data-testid="editcontent" defaultValue={props.content} {...register('content')}/>
                    <input className="hidden" value={props.id} {...register('editTodoId')}/>
                </div>
                <div className="w-full mt-2 mb-6 md:mb-0 px-4">
                    <div className="relative">
                        <select defaultValue={props.status} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-testid="editstatus" id="grid-state" {...register('status')}>
                            <option value="BACKLOG">BACKLOG</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="py-4 flex">
                    <button onClick={()=>setShow(false)} className="w-1/2 ml-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                    Cancel
                    </button>
                    <button onClick={handleSubmit(onEdit)} className="w-1/2 mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" data-testid="editBtn">
                    Update
                    </button>
                </div>
            </div>:null
            }
        </div>
    )
}

export default Todo
