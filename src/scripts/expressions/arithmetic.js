import Expression from "../abstract/expression"
import {ARITHMETIC_OP} from "../symbol/data"
import Type from "../symbol/types"
import Literal from "../expressions/literal"
class Arithmetic extends Expression {
    constructor(line, column, left, right, op) {
      super();
      this.left = left;
      this.right = right;
      this.op = op;
      this.line = line;
      this.column = column;
    }
  
    #suma(a,b) {
      let result = new Literal(this.line, this.column, value, type);
      if(a.type===Type.INT && b.type===Type.INT){
        result.value = a.value + b.value;
        result.type = Type.INT;
      }else if((a.type===Type.INT && a.type===Type.FLOAT)|| 
      (a.type===Type.FLOAT && b.type===Type.INT) ||
      (a.type===Type.FLOAT && b.type===Type.FLOAT)){
        result.value = a.value + b.value;
          result.type = Type.FLOAT;
      }else if(a.type===Type.STRING && b.type===Type.STRING){
        result.value = a.value + b.value;
        result.type = Type.STRING;
      }else{
        //marca error de tipos
        console.log("Error Semantico, No se puede sumar valores tipo:"+ a.type.toString()
          +" con valores tipo:"+b.type.toString());
          return;
      }
      return result;
    }

    #resta(a,b){
      let result = new Literal(this.line, this.column, value, type);
      if((a.type===Type.INT && a.type===Type.FLOAT)|| 
        (a.type===Type.FLOAT && b.type===Type.INT) ||
        (a.type===Type.FLOAT && b.type===Type.FLOAT)){
          result.value = a.value - b.value;
          result.type = Type.FLOAT;
      }else if(a.type===Type.INT && b.type===Type.INT){
          result.value = a.value - b.value;
          result.type = Type.INT;
      }else{
        console.log("Error Semantico, No se puede restar valores tipo:"+ a.type.toString()
        +" con valores tipo:"+b.type.toString());
        return;
      }

      return result;
    }
    #division(a,b){
      let result = new Literal(this.line, this.column, value, type);
      if((a.type===Type.INT && a.type===Type.FLOAT)|| 
        (a.type===Type.FLOAT && b.type===Type.INT) ||
        (a.type===Type.FLOAT && b.type===Type.FLOAT)){
          if(b.value===0){
            //se marca error
            result.value = null;
            console.log("Error en la operacion, no se puede dividir por 0");
          }
          result.value = a.value / b.value;
          result.type = Type.FLOAT;
      }else if(a.type===Type.INT && b.type===Type.INT){
          result.value = a.value / b.value;
          result.type = Type.INT;
      }else{
        console.log("Error Semantico, No se puede dividir valores tipo:"+ a.type.toString()
        +" con valores tipo:"+b.type.toString());
        return;
      }

      return result;
    }
    #multiplicacion(a,b){
      let result = new Literal(this.line, this.column, value, type);
      if((a.type===Type.INT && a.type===Type.FLOAT)|| 
        (a.type===Type.FLOAT && b.type===Type.INT) ||
        (a.type===Type.FLOAT && b.type===Type.FLOAT)){
          result.value = a.value * b.value;
          result.type = Type.FLOAT;
      }else if(a.type===Type.INT && b.type===Type.INT){
          result.value = a.value * b.value;
          result.type = Type.INT;
      }else{
        console.log("Error Semantico, No se puede multiplicar valores tipo:"+ a.type.toString()
        +" con valores tipo:"+b.type.toString());
        return;
      }

      return result;
    }
    #modulo(a,b){
        let result = new Literal(this.line, this.column, value, type);
        if(a.type===Type.INT && b.type===Type.INT){
          if(b.value===0){
            //se nmarca error
            result.value = null;
            console.log("Error en la operacion, no se puede dividir por 0");
          }
          result.value = a.value%b.value;
          result.type = Type.INT;
        }else{
          console.log("Error Semantico, No se puede operar valores tipo:"+ a.type.toString()
          +" con valores tipo:"+b.type.toString());
          return;
        }
    }
    execute(env) {
      const resultado_izdo = this.left.execute(env);
      const resultado_derecho = this.right.execute(env);
      let result = new Literal(this.line, this.column, value, type);

      if(this.op===ARITHMETIC_OP.MAS){
          result = this.#suma(resultado_izdo, resultado_derecho);
          return result;
      }
      if(this.op===ARITHMETIC_OP.MENOS){
          result = this.#resta(resultado_izdo,resultado_derecho);
          return result;
      }
      if(this.op===ARITHMETIC_OP.DIVIDIR){
        result = this.#division(resultado_izdo, resultado_derecho);
        return result;
        
      }
      if(this.op===ARITHMETIC_OP.MULTIPLICAR){
         return result = this.#multiplicacion(resultado_izdo, resultado_derecho);
      }
      if(this.op===ARITHMETIC_OP.MODULO){
        return result = this.#modulo(resultado_izdo, resultado_derecho);
      }
      console.log("Expresion Aritmetica");
    }
  }
  
  export default Arithmetic;