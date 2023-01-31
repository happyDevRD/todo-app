import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    ClearCompleted : '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput : '#new-todo-input',
    TodoFilters: '.filtro',
    pendingCountLabel: '#pending-count',
}

/**
 * 
 * @param { String } elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getToDos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending(ElementIDs.pendingCountLabel);
    };

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();


    //referencia al html
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const ClearElementCompleted = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);


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
    });

    filtersLIs.forEach(element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter( Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed)
                    break;
            }

            displayTodos();
        })
    });
}   