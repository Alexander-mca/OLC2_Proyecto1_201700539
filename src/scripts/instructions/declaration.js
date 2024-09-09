import Instruction from "../abstract/instruction.js";
import Symbol from "../symbol/variable.js";
import Type from "../symbol/types.js"
class Declaration extends Instruction {
  constructor(line, column, id, tipo, expresion) {
    super();
    this.id = id;
    this.tipo = tipo;
    this.expresion = expresion;
    this.line = line;
    this.column = column;
  }

  execute(env) {
    console.log("Declaracion de variable");
    const result = this.expresion.execute(env);
    let variable = env.buscar_variable(this.id);
    
    if(!(result.type === tipo) || !(result.type===Type.INT && tipo === Type.FLOAT)){
        //se reporta error de tipos
        console.log("Error, los tipos no coinciden.")
        result.value = null;
    }
    if(variable!=null){
        //la variable ya existe
        if((variable.type === tipo && result.type==tipo) || 
        (variable.type===Type.FLOAT && result.type===Type.INT)){
           variable.value = result.value;
        }
        //se asigna el valor de la expresion a la variable ya exitente
        env.add(variable);
        return;
    }
    variable = new Symbol(this.line, this.column, this.id, result.value, this.tipo);
    //la variable no existe
    //se guarda la variable en el struct global de variables y entornos
    // { name: ..., tipo:...}
    env.add(variable);
  }
}

export default Declaration;