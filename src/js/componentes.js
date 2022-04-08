import { Todo } from "../classes"
import { todoList } from "../index"

//referencia html
const divTodoList = document.querySelector(".todo-list");
const txtImput = document.querySelector(".new-todo");


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${(todo.completado)?"completed":"" }"data-id="abc">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)?"checked":"" }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//evemtos
txtImput.addEventListener("keyup",(event)=>{
    if (event.keyCode === 13){

        console.log(txtImput.value);
        const nuevoTodo = new Todo(txtImput.value);
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml(nuevoTodo);
        txtImput.value = "";

    }
});