import Expression from "../abstract/expression";
import Literal from "../expressions/literal";
import {LOGICAL_OP} from "../symbol/data";
import Type from "../symbol/types";

class Logical extends Expression {
    constructor(line, column, left, right, op) {
      super();
      this.left = left;
      this.right = right;
      this.op = op;
      this.line = line;
      this.column = column;
    }
  
    execute(env) {
      const resultado_izdo = this.left.execute(env);
      const resultado_derecho = this.right.execute(env);      
      let result = new Literal(this.line, this.column, value, Type.BOOLEAN);

      if((resultado_izdo.type!=Type.BOOLEAN) || (resultado_derecho.type!=Type.BOOLEAN)){
          //se marca error de tipos
          console.log("Error de tipos, no se puede realizar la operacion");
          return;
      }
      let correcto=false;
      switch (this.op) {
        case LOGICAL_OP.OR:
          if(resultado_izdo.value || resultado_derecho.value){
          correcto=true;
          }
          break;
        case LOGICAL_OP.AND:
          if(resultado_izdo.value && resultado_derecho.value){
            correcto=true;
            }
          break;
        case LOGICAL_OP.NOT:
          correcto = !resultado_izdo.value;
          break
        default:
          break;
      }
      console.log("Expresion Logica");
      result.value = correcto;
      return result;
    }
  }
  
  export default Logical;