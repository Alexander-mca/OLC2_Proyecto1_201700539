//Gramatica dedicada al analisis del lenguaje Oakland






Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

Id "Id"
= _ [A-Za-z_][A-Za-z_0-9]* {return text();}

_ "whitespace"
  = [ \t\n\r]*