// Import the combineReducers function from redux.
import { combineReducers } from "redux";
import uuid from 'uuid'
// combineReducers will produce an object with the keys authors and books.
// The value of author's key will be the returned state of the function authorsReducer.
// Similarly with the key books.
// This object, which is a newly produced state, is assigned to rootReducer variable.
const rootReducer = combineReducers({
    authors: authorsReducer,
    books: booksReducer
});

// Export rootReducer, is made available to other components.
export default rootReducer;

function booksReducer(state = [], action) {
    let idx;
    switch (action.type) {
        case "ADD_BOOK":
            return [...state, action.book];

        case "REMOVE_BOOK":
            idx = state.findIndex(book => book.id === action.id)
            return [...state.slice(0, idx), ...state.slice(idx + 1)];

        default:
            return state;
    }
}

function authorsReducer(state = [], action) {
    let idx;
    switch (action.type) {
        case "ADD_AUTHOR":
            return [...state, action.author];

        case "REMOVE_AUTHOR":
            idx = state.findIndex(author => author.id === action.id)
            return [...state.slice(0, idx), ...state.slice(idx + 1)];

        case "ADD_BOOK":
            let existingAuthor = state.filter(
                author => author.authorName === action.book.authorName
            );
            if (existingAuthor.length > 0) {
                return state;
            } else {
            return [...state, { authorName: action.book.authorName, id: uuid() }];
        }

        default:
            return state;
    }
}