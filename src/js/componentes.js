import { Todo } from "../classes"
import { todoList } from "../index"

//referencia html
const divTodoList = document.querySelector(".todo-list");
const txtImput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltors = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filters");

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${(todo.completado)?"completed":"" }"data-id="${todo.id}">
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

divTodoList.addEventListener("click", (Event)=>{
    
    const nombreElemento = Event.target.localName;//input,label,button
    const todoElemento = Event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute("data-id")

    if ( nombreElemento.includes("input")){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle("completed");
    }else if( nombreElemento.includes("button")){

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }


});

btnBorrar.addEventListener("click",()=>{

    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i >= 0; i-- ){

        const elemento = divTodoList.children[i];
        
        if(elemento.classList.contains("completed")){
            divTodoList.removeChild(elemento);
        }

    }



});

ulFiltors.addEventListener("click",(Event)=> {       
    //console.log( Event.target.text );
    const filtro = Event.target.text;
    if(!filtro){ return;}

    anchorFiltros.forEach(elem => elem.classList.remove("selected"));
    Event.target.classList.add("selected");


    for( const elemento of divTodoList.children){

        elemento.classList.remove("hidden");
        const completado = elemento.classList.contains("completed");

        switch(filtro){

            case "Pendientes":
                if(completado){
                    elemento.classList.add("hidden");
                }
            break;

            case "Completados":
                if( !completado){
                    elemento.classList.add("hidden");
                }
            break;

        
        }

    }
})