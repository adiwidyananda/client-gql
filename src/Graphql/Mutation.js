import {gql} from "@apollo/client";

export const ADD_TODO = gql`

    mutation Mutation($content: String!,  $status: TodoStatus) {
        addTodo(content: $content, status: $status) {
            content
            status
        }
    }

`

export const DELETE_TODO = gql`

    mutation Mutation($deleteTodoId: ID!) {
        deleteTodo(id: $deleteTodoId) {
            ok
        }
    }

`

export const EDIT_TODO = gql`

    mutation Mutation($editTodoId: ID!, $content: String, $status: TodoStatus) {
        editTodo(id: $editTodoId, content: $content, status: $status) {
            content
            status
        }
    }

`