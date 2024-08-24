//Gramatica dedicada al analisis del lenguaje Oakland

Instrucciones 
= first:Instrucciones second:Instruccion
 /first:Instruccion

 Instruccion
 = head: Declaracion

Declaracion
= head:Tipo Id "=" tail:Expresion ";"
 /head:Tipo Id ";"
 / "var" Id "=" Expresion ";"

 Tipo
 = "int"
    /"float"
    /"string"
    /"char"
    /"bool"

Expresion
= Integer
 /Id



Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

Id "Id"
= _ [A-Za-z_][A-Za-z_0-9]* {return text();}

_ "whitespace"
  = [ \t\n\r]*