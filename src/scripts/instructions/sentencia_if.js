import Instruction from "../abstract/instruction";
import tree from "../symbol/entorno";
class Sentencia_If extends Instruction{
    constructor(line,column, exp, ins, inselse){
        this.line = line;
        this.column = column;
        this.exp = exp;
        this. ins = ins;
        this.inselse = inselse;
    }

    execute(env){
        //tree.addEnvironment()
    }
}

export default Sentencia_If;