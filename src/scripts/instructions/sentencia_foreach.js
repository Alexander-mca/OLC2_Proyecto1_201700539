import Instruction from "../abstract/instruction";
import Environment from "../symbol/env.js";
import Symbol from "../symbol/symbol.js";

class Sentencia_Foreach extends Instruction{
    constructor(line, column, decl, arreglo, ins){
        super();
        this.line = line;
        this.column = column;
        this.decl = decl;
        this.arreglo = arreglo;
        this.ins = ins;
    }
    execute(env){
        let for_env = new Environment(env);
        this.decl.execute(for_env);
        let temp = new Symbol(this.line, this.column, this.arreglo, undefined, undefined);
        let var_arr = for_env.buscar_variable(temp.id);
        if(var_arr===null || var_arr===undefined){
            //error
            console.log("Error, el arreglo no ha sido declarado");
            return;
        }
        //pendiente hacer el manejo de arreglos
        
    }
}

export default Sentencia_Foreach;