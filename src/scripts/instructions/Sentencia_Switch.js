import Instruction from "../abstract/instruction.js";
import {RELATIONAL_OP} from "../symbol/data.js";
import Relational from "../expressions/relational.js";
import Environment from "../symbol/env.js";
class Sentencia_Switch extends Instruction{
    constructor(line, column, exp, s_case, s_def){
        super();
        this.line = line;
        this.column = column;
        this. exp = exp;
        this.s_case = s_case;
        this.s_def = s_def;
    }

    execute(env){
        //se obtiene la expresion padre
        let valor = this.exp.execute(env);
        let next=false;
        for(let i=0; i<this.ins.length; i++){
            //se ejecuta la expresion del case
            let element = this.ins[i];
            //se avalua la expresion hijo
            let val_case = element.exp.execute(env);
            //se crea una exp relacional para evaluar si exp padre y exp hijo son iguales
            let temp = new Relational(this.line, this.column, valor, val_case, RELATIONAL_OP.IGUAL);
            let evaluation = temp.execute(env);

            if(evaluation.value || next){
                //si las expresiones son iguales se ejecuta lo que esta en el case
                let vino_break = element.execute(env);
                if(vino_break!=null){
                    //si vino un break se detiene el switch
                    if(vino_break){
                        break;
                    }
                    //si no vino break se va a ejecutar el siguiente case
                    next = true;
                    continue;
                }
                return;
            }
        }
        //default se evalua, ningun case coincide
        if(this.s_def!=null || this.s_def!=undefined){
            this.s_def.forEach(element => {
                let def_env = new Environment(env);
                element.execute(def_env);
            });
        }
        

    }
}

export default Sentencia_Switch;