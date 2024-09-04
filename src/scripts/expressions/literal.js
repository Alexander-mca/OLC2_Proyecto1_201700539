import Expression from "../abstract/expression.js";
import Type from "../symbol/types.js";

class Literal extends Expression {
  constructor(line, column, value, type) {
    super();
    this.line = line;
    this.column = column;
    this.value = value;
    this.type = type;
  }

  execute(env) {
    temp = new Literal(this.line, this.column, value, type);
    switch (this.type) {
      case Type.STRING:
        temp.value = temp.value.toString();
        break;
      case Type.INT:
        temp.value = parseInt(temp.value,10);
        break;
      case Type.CHAR:
        temp.value = temp.value[0];
        break;
      case Type.BOOLEAN:
        temp.value = (temp.value=="true"? true:false); 
        break;
      case Type.IDENTIFIER:
        //se busca si la variable existe en el arbol de entornos
        let symbol = env.buscar_variable(this.value);
        if(symbol==null){
          console.log("Error, la variable no existe");
          return;
        }
        temp.value = symbol.value;
        temp.type = symbol.type;
        break;
    }
    return temp;
    
  }
}

export default Literal;