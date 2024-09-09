import Expression from "../abstract/expression"
import Literal from "../expressions/literal"
import Type from "../symbol/types"
import {RELATIONAL_OP} from "../symbol/data"

class Relational extends Expression {
    constructor(line, column, left, right, op) {
      super();
      this.left = left;
      this.right = right;
      this.op = op;
      this.line = line;
      this.column = column;
    }
    #igual(a,b){
       //se hace la verificacion de tipos
       let correcto = false;
       if(((a.type===Type.INT || a.type===Type.FLOAT) &&
          (b.type===Type.INT || b.type===Type.FLOAT))){
          correcto = true;
       }else if(a.type===Type.BOOLEAN && b.type===Type.BOOLEAN){
          correcto = true;
       }else if(a.type===Type.STRING && b.type===Type.STRING){
          correcto = true;
       }else if(a.type===Type.CHAR && b.type===Type.CHAR){
          correcto = true;
       }

       if(correcto){
          if(a.value===b.value){
            return true;
          }
          return false;
       }else{
          //se genera un error de tipos
          console.log("Error de tipos");
          return null;
       }
    }
    #mayorque(a,b){
      let correcto;
      if(((a.type===Type.INT || a.type===Type.FLOAT) &&
          (b.type===Type.INT || b.type===Type.FLOAT))){
            //se procesa para numeros enteros o flotantes
            if(a.value>b.value){
              return correcto=true;
            }
      }else if(a.type===Type.CHAR && b.type===Type.CHAR){
            if(a.value>b.value){
              return correcto=true;
            }
      }else{
        //error de tipos
        console.log("Error de tipos, los valores no pueden ser comparados")
        return correcto=null;
      }
      correcto = false;
      return correcto;
    }
    #menorque(a,b){
      let correcto;
      if(((a.type===Type.INT || a.type===Type.FLOAT) &&
          (b.type===Type.INT || b.type===Type.FLOAT))){
            //se procesa para numeros enteros o flotantes
            if(a.value<b.value){
              return correcto=true;
            }
      }else if(a.type===Type.CHAR && b.type===Type.CHAR){
            if(a.value<b.value){
              return correcto=true;
            }
      }else{
        //error de tipos
        console.log("Error de tipos, los valores no pueden ser comparados")
        return correcto=null;
      }
      correcto = false;
      return correcto;
    }
    execute(env) {
      const resultado_izdo = this.left.execute(env);
      const resultado_derecho = this.right.execute(env);
      let result = new Literal(this.line, this.column, value, undefined);
      let correcto;
      switch (op) {
        case RELATIONAL_OP.MAYOR:
          correcto = this.#mayorque(resultado_izdo, resultado_derecho);
          if(correcto!=null){
            result.value = correcto;
            result.type = Type.BOOLEAN;
          }
          break;
        case RELATIONAL_OP.MENOR:
          correcto = this.#menorque(resultado_izdo, resultado_derecho);
          if(correcto!=null){
            result.value = correcto;
            result.type = Type.BOOLEAN;
          }
          break;
        case RELATIONAL_OP.MAYOR_IGUAL:
          correcto = this.#menorque(resultado_izdo, resultado_derecho);
          if(correcto!=null){
            result.value = !correcto;
            result.type = Type.BOOLEAN;
          }
          break;
        case RELATIONAL_OP.MENOR_IGUAL:
          correcto = this.#mayorque(resultado_izdo, resultado_derecho);
          if(correcto!=null){
            result.value = !correcto;
            result.type = Type.BOOLEAN;
          }
          break;
        case RELATIONAL_OP.IGUAL:
          correcto = this.#igual(resultado_izdo, resultado_derecho);
          if(correcto!=null){
            result.value = correcto;
            result.type = Type.BOOLEAN;
          }
          break;
        case RELATIONAL_OP.NO_IGUAL:
          //el valor obtenido en la funcion comparacion se niega
          correcto = this.#igual(resultado_izdo, resultado_derecho);
          if(correcto!=null){
            result.value = !correcto;
            result.type = Type.BOOLEAN;
          }
          break;
      }
      console.log("Expresion Aritmetica");
      return result;
    }
  }
  
  export default Relational;