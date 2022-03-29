
export class Todo{

    constructor( tarea ) {

        this.tarea = tarea;
        
        this.id = new Date().getTime(); // 1284566
        this.completado = false;
        this.creado = new Date();

        

    }

}