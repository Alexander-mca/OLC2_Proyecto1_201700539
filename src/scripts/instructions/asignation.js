import Instruction from "../abstract/instruction.js";

class Asignation extends Instruction {
  constructor(line, column, nombre, expresion) {
    super();
    this.nombre = nombre;
    this.expresion = expresion;
    this.line = line;
    this.column = column;
  }

  execute(env) {
    console.log("Asignacion de variable");
    const result = this.expresion.execute(env);
    //se verifica que los tipos sean los mismos de la variable y la expresion 
    //se verifica que la variable este en el mismo entorno 
    // { name: ..., tipo:...}
    if (!result) {
      // reportan el error
    }
    
    env.guardarVariable(result);
  }
}

export default Asignation;