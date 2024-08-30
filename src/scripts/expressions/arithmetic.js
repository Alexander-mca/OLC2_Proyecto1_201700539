import Expression from "../abstract/expression"
import {ARITHMETIC_OP} from "../symbol/data"
class Arithmetic extends Expression {
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
      if(op==ARITHMETIC_OP.MAS){
        return resultado = resultado_izdo + resultado_derecho;
      }
      if(op==ARITHMETIC_OP.MENOS){
        return resultado = resultado_izdo - resultado_derecho;
      }
      if(op==ARITHMETIC_OP.DIVIDIR){
        if(resultado_derecho==0){
          //error de no se puede dividir por cero
          return;
        }
        return resultado = resultado_izdo/resultado_derecho;
      }
      if(op==ARITHMETIC_OP.MULTIPLICAR){
        return resultado = resultado_izdo*resultado_derecho;
      }
      if(op==ARITHMETIC_OP.MODULO){
        return resultado = resultado_izdo%resultado_derecho;
      }
      console.log("Expresion Aritmetica");
    }
  }
  
  export default Arithmetic;