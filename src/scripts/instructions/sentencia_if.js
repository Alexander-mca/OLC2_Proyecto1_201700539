import Instruction from "../abstract/instruction";
import Environment from "../symbol/env";
import Type from "../symbol/types"
class Sentencia_If extends Instruction{
    constructor(line,column, exp, ins, inselse){
        super();
        this.line = line;
        this.column = column;
        this.exp = exp;
        this. ins = ins;
        this.inselse = inselse;
    }

    execute(env){
        const condicion = this.exp.execute(env);

        if(condicion==null || condicion==undefined){
            //se marca error
            console.log("Error en el if");
            return;
        }

        if(condicion.type!=Type.BOOLEAN){
            console.log("Error, La condicion no puede ser evaluada");
            return;
        }

        if(condicion.value){
            //se realizan las instrucciones
            temp_env = new Environment(env);
            this.ins.forEach(element => {
                element.execute(temp_env);
            });
            return;
        }
        //sino se realiza el else
        if(this.inselse instanceof Sentencia_If){
            this.inselse.execute(env);
        }else{
            //solo hay dos opciones, que sea una instancia del If o que sea un grupo de instrucciones
            temp_env = new Environment(env);
            this.inselse.forEach(element=>{
                element.execute(temp_env);
            });
        }
    }
}

export default Sentencia_If;