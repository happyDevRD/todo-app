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
    loadStore();
    console.log('Init Store');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state'));
    
    state.todos = todos;
    state.filter = filter;

}

const saveStateToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state));
}

const getToDos = (filter = Filters.All) => {
    switch ( filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case  Filters.Completed:
            return state.todos.filter(todo => !todo.done);
            
        default:
            throw new Error(`Option ${ filter } is not valid.`);
        };
}

const addToDos = (description) => {
    if(!description)throw new Error('Not Implement');
    state.todos.push(new Todo(description));

    saveStateToLocalStorage();

}

const toggleToDo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done
        }
        return todo
    });

    saveStateToLocalStorage();
}

const deleteToDo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newfilter 
 */
const setFilter = (newfilter = Filters.All) => {
    state.filter = newfilter;
    saveStateToLocalStorage();
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