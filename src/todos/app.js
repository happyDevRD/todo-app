import html from './app.html?raw';
import todoStore from '../store/todo.store'
import { renderTodos } from './use-cases';

const ElementIDs = {
    ClearCompleted : '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput : '#new-todo-input',
}

/**
 * 
 * @param { String } elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getToDos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();


    //referencia al html
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const ClearElementCompleted = document.querySelector(ElementIDs.ClearCompleted)


    // listener
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addToDos( event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleToDo(element.getAttribute('data-id') );
        displayTodos();
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        
        if (!element || !isDestroyElement) return;
        
        todoStore.deleteToDo(element.getAttribute('data-id'));
        displayTodos();
    })

    ClearElementCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })


}   