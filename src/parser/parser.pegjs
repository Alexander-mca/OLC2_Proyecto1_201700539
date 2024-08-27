{
  const ARITHMETIC_OP = {
    MAS: 0,
    MENOS: 1,
    MULTIPLICAR: 2,
    DIVIDIR: 3,
    MODULO: 4,
  };

  const RELATIONAL_OP = {
    MENOR_QUE: 0,
    MENOR_IGUAL: 1,
    MAYOR_QUE: 2,
    MAYOR_IGUAL: 3,
    IGUAL: 4,
    NO_IGUAL: 5,
  };

  const LOGICAL_OP = {
    AND: 0,
    OR: 1,
    NOT: 2
  };
}


//Gramatica dedicada al analisis del lenguaje Oakland


S 
= Instrucciones

Instrucciones 
= ins:Instruccion+


 Instruccion
 = ins: Declaracion
 / ins: Asignation
 / ins:Sentencia_IF

 Sentencia_IF
 = "if(" log:LogicalExp "){" ins:Instrucciones "}" resto:Sentencia_Else {

 }

 Sentencia_Else
 = "else" ins:Sentencia_IF
 / "else{" ins:Instrucciones "}" 
 / epsilon

Asignation
= id:Id "=" exp:Expression ";" {
  const loc = location()?.start;
  return new Asignation(loc?.line, loc?.column, id, exp);
}

Declaracion
= type:Tipo id:Id "=" exp:Expression ";" {
      const loc = location()?.start;
      return new Declaration(loc?.line, loc?.column, id, type, exp);
  }
 /type:Tipo id:Id ";" {
  const loc = location()?.start;
  return new Declaration(loc?.line, loc?.column, id, type, undefined);
 }
 / "var" id:Id "=" exp:Expression ";" {
   const loc = location()?.start;
   return new Declaration(loc?.line, loc?.column, id, "var", exp);
 }

 Tipo
 = type:(_("int"/"float"/"string"/"char"/"bool")_){
    if(type[1] === "int") return Type.INT;
    else if(type[1] === "float") return Type.FLOAT;
    else  if(type[1] === "string") return Type.STRING;
    else if(type[1] === "boolean") return Type.BOOLEAN;
    else if(type[1] === "char") return Type.CHAR;
 }

Expression
= LogicalExp

LogicalExp
= exp:Relational_Exp op:(_("&&"/"||")_) exp1:Relational_Exp{

}
  / "!" exp:Relational_Exp{

  }
  / Relational_Exp

//-----------------------
Relational_Exp
= exp:Arithmetic_Exp op:(_("=="/"!=" / ">"/"<"/">="/"<=")_) exp1: Arithmetic_Exp{

}
/ Cadena op:(_("=="/"!=")_) Cadena{

}
/ Char op:(_("=="/"!=")_) Char
/ Arithmetic_Exp
//-------------------------

Arithmetic_Exp
= Term tail:(_("+"/"-")_ Term)*
/ Cadena tail:("+" Cadena)*
/ Term

Term
= Factor tail:(_("*"/"/"/"%")_ Factor)*{

}
/ Factor

Factor
= "(" _ exp:Arithmetic_Exp ")"{
    return exp;
}
/ "-" exp:Arithmetic_Exp{

}
/ Terminal

Terminal
= value:(_(Integer/Float/Id)_)

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

Id "Id"
= _ [A-Za-z_][A-Za-z_0-9]* {return text();}

epsilon = ''

_ "whitespace"
  = [ \t\n\r]*

Comment_Line "Comment_Line"
= _ "//" .* "\n"

Comment_Multi
= "/*" (!"*/" .)* "*/"

Cadena "Cadena"
= _ "\"" .* "\""

Char "Char"
= _ "\'"."\'"

Float "Float"
= _ [0-9]+"."[0-9]+