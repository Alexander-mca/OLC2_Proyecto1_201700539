import Instruction from "../abstract/instruction.js";
import tree from "../symbol/entorno.js";

class Declaration extends Instruction {
  constructor(line, column, nombre, tipo, expresion) {
    super();
    this.nombre = nombre;
    this.tipo = tipo;
    this.expresion = expresion;
    this.line = line;
    this.column = column;
  }

  execute(env) {
    console.log("Declaracion de variable");
    const result = this.expresion.execute(env);
    //se guarda la variable en el struct global de variables y entornos
    // { name: ..., tipo:...}
    if (!result) {
      // reportan el error
      console.log("Error en la declaracion de la variable");
    }

    env.guardarVariable(result);
  }
}

export default Declaration;