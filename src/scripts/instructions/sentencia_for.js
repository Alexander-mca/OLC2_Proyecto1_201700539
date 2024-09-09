import Instruction from "../abstract/instruction";
import Environment from "../symbol/env.js";
import Type from "../symbol/types";
import Asignation from "../instructions/asignation.js"
import Declaration from "./declaration.js";

class Sentencia_For extends Instruction{
    constructor(line, column, decl, exp, asig, ins){
        super();
        this.line = line;
        this.column = column;
        this.decl = decl;
        this.exp = exp;
        this.asig = asig;
        this.ins = ins;
    }
    execute(env){
        
        let for_env = new Environment(env);

        let i = this.decl.execute(for_env);

        let condicion = this.exp.execute(for_env);
        if(condicion!=null || condicion!=undefined){
            if(condicion.op!=Type.BOOLEAN){
                //marca error de que no se puede evaluar la operacion
                console.log("Error, no se puede evaluar la condicion");
                return;
            }
        }
        while(condicion.value){
            //se ejecuta el bloque de instrucciones
            let ins_env = new Environment(for_env);
            this.ins.forEach(element => {
                if(element instanceof Asignation || element instanceof Declaration){
                    //se verifica si viene una asignacion y si esta es igual a la variable i dara error
                    if(element.id === i.id){
                        //error
                        console.log("Error, no se puede asignar el valor, la variable es una constante");
                        return;
                    }
                }
                element.execute(ins_env);
            });
            //verficar la asignacion de la variable
            //se termino de evaluar las instructiones, se entra de nuevo en el for
            this.asig.execute(for_env);
            condicion = this.exp.execute(for_env);
        }
        
    }
}

export default Sentencia_For;