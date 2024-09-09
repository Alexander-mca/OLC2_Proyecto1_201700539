import Instruction from "../abstract/instruction";
import Environment from "../symbol/env.js";
import Enviroment from "../symbol/env.js";

class Sentencia_While extends Instruction{
    constructor(line, column, exp, ins){
        super();
        this.line = line;
        this.column = column;
        this.exp = exp;
        this.ins = ins;
    }

    execute(env){
        let condicion = this.exp.execute(env);
        if(condicion!=null  || condicion!=undefined){
           if(condicion.value===true){
                //se evalua lo que viene dentro del while
                this.ins.forEach(element => {
                    let new_env = new Environment(env);
                    element.execute(new_env);    
                });
                //se repite la funcion hasta que venga un valor que de falso y detenga la funcion
                this.execute(env);
           }else if(condicion===false){
                return;  
           }else{
             //error, puede que venga una exp aritmetica o un literal
                console.log("Error, la expresion debe ser relacional o booleana");
                return;
           }
        }
    }
}

export default Sentencia_While;