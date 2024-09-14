import Instruction from "../abstract/instruction.js";
import Symbol from "../symbol/symbol.js";
import {SYMBOL_TYPE} from "../symbol/data.js";
import Type from "../symbol/types.js";
import Literal from "../expressions/literal.js";

class Declaration extends Instruction {
  constructor(line, column, id, tipo, expresion) {
    super();
    this.id = id;
    this.tipo = tipo;
    this.expresion = expresion;
    this.line = line;
    this.column = column;
  }
  #valor_defecto(type){
    let temp;
    switch (type) {
      case Type.BOOLEAN:
        temp=false;
        break;
      case Type.CHAR:
        temp = '\u0000';
        break;
      case Type.FLOAT:
        temp = 0.0;
        break;
      case Type.STRING:
        temp = "";
        break;
      case Type.INT:
        temp = 0;
        break;
      default:
        break;
    }
  }
  execute(env) {
    console.log("Declaracion de variable");
    let result = this.expresion.execute(env);
    

    if(result===undefined || result===null){
      //si la expresion no viene se asignan valores por defecto
      result = new Literal(this.line, this.column, this.#valor_defecto(this.tip), tipo);
    }

    if(!(result.type === tipo) || !(result.type===Type.INT && tipo === Type.FLOAT)){
        //se reporta error de tipos
        console.log("Error, los tipos no coinciden.")
        result.value = null;
    }

    let variable  = new Symbol(this.line, this.column, this.id.value, result.value, this.tipo, SYMBOL_TYPE.VARIABLE);
    //se busca si la variable ya fue declarada 
    let temp = env.buscar_variable(variable);
    if(temp!=null){
        //la variable ya existe
        if((temp.type === tipo && result.type==tipo) || 
        (temp.type===Type.FLOAT && result.type===Type.INT)){
           temp.value = result.value;
        }
        //se asigna el valor de la expresion a la variable ya exitente
        env.add(temp);
        return;
    }
    
    //la variable no existe
    //se guarda la nueva variable en el entorno
    env.add(variable);
  }
}

export default Declaration;