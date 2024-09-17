import { parse } from "./parser/parser.js";
import Environment from './scripts/symbol/env.js';

const btnEjecutar = document.getElementById("btnEjecutar");
btnEjecutar.onclick = function(){
    const texto = document.getElementById("texto1").value;
      let result = parse(texto);
      let global = new Environment(null);
      result.forEach((element)=>{
        element.execute(global);
      });
      console.log(result);
}

function TablaSimbolos(){

}
