import { Todo } from '../todos/models/todo.models';

const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Piedra del Alma'),
        new Todo('Piedra del infinito')
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log('Init Store');
    console.log(state);
}

const loadStore = () => {
    throw new Error('Not Implement');
}

const getToDos = (filter = Filters.All) => {
    switch ( filter) {
        case Filters.All:
            return [...state.todos];
        case  Filters.Completed:
            return [...state.todos.filter(todo => todo.done)];
        case  Filters.Completed:
                return [...state.todos.filter(todo => !todo.done)];
        default:
            throw new Error(`Option ${ filter } is not valid.`);
        };
}

const addToDos = (description) => {
    if(!description){
        throw new Error('Not Implement');
    }

    state.todos.push(new Todo(description))
}

const toggleToDo = (todoId) => {
    throw new Error('Not Implement');
}

const deleteToDo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done);
}

const setFilter = (newfilter = Filters.All) => {
    throw new Error('Not Implement');
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addToDos,
    deleteCompleted,
    deleteToDo,
    getCurrentFilter,
    getToDos,
    initStore,
    loadStore,
    setFilter,
    toggleToDo,
}