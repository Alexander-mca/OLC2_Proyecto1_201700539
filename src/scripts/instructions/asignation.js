import Instruction from "../abstract/instruction.js";
import Type from "../symbol/types.js";

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
    let variable = env.buscar_variable(this.id);
    //se verifica que la variable este en el mismo entorno 
    if(variable ===  null || variable == undefined){
      //error
      console.log("Error, no se ha encontrado la variable");
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