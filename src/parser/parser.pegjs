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
/ "{"(ins:Instruccion)+"}"{
  
}


 Instruccion
 = ins: Declaracion
 / ins: Asignacion
 / ins:Sentencia_IF
 / ins:Sentencia_Switch
 / ins:Sentencia_While
 / ins:Sentencia_For
 / ins:Sentencia_Transfer
 

//sentencia IF
 Sentencia_IF
 = "if(" log:LogicalExp "){" (ins:Instruccion)* "}" resto:Sentencia_Else {

 }

 Sentencia_Else
 = "else" ins:Sentencia_IF
 / "else{" (ins:Instruccion)* "}" 
 / epsilon

//sentencia Switch
Sentencia_Switch
= "switch(" Expression "){"(Sentencia_Case)+ def:S_Default"}"{

}

Sentencia_Case
= "case " exp:Expression ":" (ins:Instruccion)* (Sentencia_Transfer)?{

}

S_Default
= "default:" (ins:Instruccion)*{

}
/ epsilon

//Sentencia While
Sentencia_While
= "while(" exp:Expression "){" (Instruccion)* "}"{

}

// sentencia For
Sentencia_For
= "for(int" id:Id "=" exp:(_(Integer/Id)_) ";" exp1:Expression";" Id"++){"(Instruccion)*"}"{

}
/"for(" Tipo Id ":" Id "){" (Instruccion)* "}"{

}

Sentencia_Transfer
= typeT:(_("break;"/"continue;"/"return;")_){
  if(typeT == "break;") return TypeST.BREAK;
  if(typeT == "continue;") return TypeST.CONTINUE;
  if(typeT == "return;") return TypeST.RETURN;
}
/ "return" exp:Expression ";"{
  
}

Asignacion
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
= exp:Relational_Exp "||" exp1:Relational_Exp{

}
  / "!" exp:Relational_Exp{

  }
  / LogicalAND

LogicalAND
= exp:Relational_Exp "&&" exp1:Relational_Exp{

}
/ Relational_Exp

//-----------------------
Relational_Exp
= exp:Arithmetic_Exp op:(_("=="/"!=")_) exp1: Arithmetic_Exp{
      return op.reduce(function(result, element){
        const loc = location()?.start;
        if(element[1]=="=="){
          return new Relational(loc?.line, loc?.column, exp, exp1, RELATIONAL_OP.IGUAL);
        }
        if(element[1]=="!="){
          return new Relational(loc?.line, loc?.column, exp, exp1, RELATIONAL_OP.NO_IGUAL);
        }
      });
}
/ Cadena op:(_("=="/"!=")_) Cadena{
}
/ Char op:(_("=="/"!=")_) Char{

}
/ Relational_M

//-------------------------
Relational_M
= exp:Arithmetic_Exp op:(_("<"/">"/">="/"<=")_) exp1: Arithmetic_Exp{

}
/Char op:(_("<"/">"/">="/"<=")_) Char{

}
/Arithmetic_Exp
//-------------------------

Arithmetic_Exp
= Term tail:(_("+"/"-")_ Term)*{
    return tail.reduce(function(result, element){
        const loc = location()?.start;
        if (element[1] === "+") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MAS); }
        if (element[1] === "-") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MENOS); }

    });
}
/ Cadena tail:("+" Cadena)*{ 
    return tail.reduce(function(result,element){
        const loc = location()?.start;
        return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MAS);
    });
}
/ Term{

}

Term
= Factor tail:(_("*"/"/"/"%")_ Factor)*{
    return tail.reduce(function(result, element) {
        const loc = location()?.start;
        if (element[1] === "*") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MULTIPLICAR); }
        if (element[1] === "/") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.DIVIDIR); }
         if (element[1] === "%") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MODULO); }
      }, head);
}
/ FactorA{

}

FactorA
= "-" exp:Arithmetic_Exp{
    const loc = location()?.start;
    return new Arithmetic(loc?.line, loc?.column, new Literal(loc?.line, loc?.column, -1, Type.INT), expr, ARITHMETIC_OP.MENOS);
}
/Factor
Factor
= "(" _ exp:Arithmetic_Exp ")"{
    return exp;
}
/ "[" _ exp:Arithmetic_Exp "]"{
    return exp;
}
/ Terminal{

}

Terminal
= valor:Integer { 
    const loc = location()?.start;
    return new Literal(loc?.line, loc?.column, valor, Type.INT);
}
/valor:Id{
   return new Literal(loc?.line, loc?.column, valor, Type.IDENTIFICADOR);
}
/valor:Float{
   return new Literal(loc?.line, loc?.column, valor, Type.FLOAT);
}

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