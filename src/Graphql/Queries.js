import {gql} from "@apollo/client";

export const LIST_TODOS = gql`

    query Query {
        listTodos {
            id
            content
            status
        }
    }

`