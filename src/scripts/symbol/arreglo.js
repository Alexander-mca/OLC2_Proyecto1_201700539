import Expression from "../abstract/expression";
import Literal from "../expressions/literal.js";
import {SYMBOL_TYPE} from "../symbol/data.js"
import Symbol from "../symbol/symbol.js";
import Type from "../symbol/types.js"

class Arreglo extends Expression{
    constructor(line, column, type, id, values){
        this.line = line;
        this.column = column;
        this.type = type;
        this.id = id;
        this.values = values;
    }
    constructor(line, column, type1, id, type2, exp){
        this.line = line;
        this.column = column;
        this.type = type1;
        this.id = id;
        this.type2 = type2;
        this.exp = exp;
    }
    #size(exp){

    }
    indexOf(exp){

    }
    Join(){

    }
    length(){
        
    }
    execute(env){
        let new_array = new Symbol(this.line,this.column, this.id, this.values, this.type, SYMBOL_TYPE.ARRAY )
        if(this.values!=null && this.values!=undefined){
            //vienen valores
            if(values instanceof Literal){
                const temp = env.buscar_variable(this.values.value);
                if(this.values===undefined || this.values===null){
                    //error, no existe ese array
                    console.log("Error, el array no existe");
                    return;
                }
                if(this.type==this.values.type && this.values.symbol_type===SYMBOL_TYPE.ARRAY){
                    new_array.value = temp.value;
                    env.add(new_array);
                }else{
                    //error de tipos
                    console.log("Error, no se puede asignar porque los tipos no coinciden.");
                }
            }else{
                //viene una lista de valores entre llaves 
                this.values.forEach(element => {
                    if(element.type !=this.type){
                        //error
                        console.log("Error, los tipos no coinciden");
                        return;
                    }
                });
                //lo que viene ya fue unido en el parser
                env.add(new_array);
                
            }
            //aca viene un conjunto de valores en un array

        }else{
            //se crea un array con la plalabra new
            if(this.type1 != this.type2){
                console.log("Error, los tipos no coinciden.");
                return;
            }
            if(this.exp.type!=Type.INT){
                console.log("Error, la expresion debe ser un numero entero.");
                return;
            }
            new_array.value = [];

        }
    }
}

export default Arreglo;