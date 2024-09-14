import Instruction from "../abstract/instruction.js";
import Type from "../symbol/types.js";
import {SYMBOL_TYPE} from "../symbol/data.js";
import Symbol from "../symbol/symbol.js";

class Asignation extends Instruction {
  constructor(line, column, id, expresion) {
    super();
    this.id = id;
    this.expresion = expresion;
    this.line = line;
    this.column = column;
  }

  execute(env) {
    console.log("Asignacion de variable");
    const result = this.expresion.execute(env);
    //arreglar aca la llamada de variable
    let temp = new Symbol(this.line, this.column, this.id.value, undefined, undefined, SYMBOL_TYPE.VARIABLE);
    let variable = env.buscar_variable(temp);
    //se verifica que la variable este en el mismo entorno 
    if(variable ===  null || variable == undefined){
      //error
      console.log("Error, La variable no existe");
      return;
    }
    //se verifica que los tipos sean los mismos de la variable y la expresion 
    if((result.type===variable.type) || (variable.type===Type.FLOAT && result.type===Type.INT)){
        //se asigna el valor de la expresion a la variable
        variable.value = result.value;
    }else{
      //error de tipos
      console.log("Error, los tipos no coinciden");
      return;
    }
    
    
    env.add(variable);
  }
}

export default Asignation;