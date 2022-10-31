import { gql } from "@apollo/client";

export const addUser = gql`
    mutation ($username: String!, $email: String!, $password: String!){
        addUser(username : $username, email : $email, password: $password) {
            username
            email
            id
        }
    }
`

export const getPagesNamesQuery = gql`
    query GetPagesNames{
        pages {
            name
            id
        }
    }
`

export const refreshQuery = gql`
    query Refresh {
        refresh {
            accesstoken
            user {
                username
                email
                id
            }
        }
    }
`

export const getPage = gql`
    query ($id: ID) {
        page(id : $id) {
            id
            name
            desc
            sections {
                title
                desc
                bookmark
                code
                examples
            }
        }
    }
`;

export const modifyPage = gql`
    mutation ($name: String, $desc: String, $sections: [InputSection], $update: Boolean!, $id: ID, $token : String!) {
        modifyPage(name: $name, desc: $desc, sections: $sections, update: $update, id: $id, token: $token) {
            name
            desc
            sections {
                title
                desc
                bookmark
                code
                examples
            }
        }
    }
`;



export const deletePage = gql`
    mutation ($id: ID!, $token: String!) {
        deletePage(id: $id, token: $token) {
            id
            name
        }
    }
`;


export const LoginQuery = gql`
    query ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            refreshtoken
            accesstoken
            user {
                username
                email
                id
            }
        }
    }
`