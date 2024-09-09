import Instruction from "../abstract/instruction";
import Environment from "../symbol/env.js";
import {TRANSFER_S} from "../symbol/data.js";

class Sentencia_Case extends Instruction{
    constructor(line, column, exp, ins, transfer){
        super();
        this.line = line;
        this.column = column;
        this. exp = exp;
        this.ins = ins;
        this.transfer = transfer;
    }

    execute(env){
        this.ins.forEach(element => {
            let new_env = new Environment(env);
            element.execute(new_env);
        });
        if(this.transfer===null || this.transfer===undefined){
            //si no viene nada retorna falso y continua con el siguiente case
            return false;
        }
        if(this.transfer===TRANSFER_S.CONTINUE){
            //se marca error ya que un continue vino fuera de un ciclo, retorn null
            return null;
        }
        if(this.transfer===TRANSFER_S.BREAK){
            return true;
        }

    }
}

export default Sentencia_Case;