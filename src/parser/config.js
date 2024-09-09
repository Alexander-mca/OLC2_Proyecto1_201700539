const { default: Sentencia_For } = require("../scripts/instructions/sentencia_for");
const { default: Sentencia_Foreach } = require("../scripts/instructions/sentencia_foreach");

module.exports = {
    format: "es",
    input: "parser.pegjs",
    dependencies: {
      Arithmetic: "../expressions/arithmetic.js",
      Type: "../symbol/types.js",
      Logical: "../expressions/logical.js",
      Relational: "../expressions/relational.js",
      Literal: "../expressions/literal.js",
      Declaration: "../instructions/declaration.js",
      Asignation: "../instructions/asignation.js",
      Sentencia_For: "../instrutions/sentencia_for.js",
      Sentencia_While: "../instructions/Sentencia_While.js",
      Sentencia_Switch: "../instructions/Sentencia_Switch.js",
      Sentencia_If: "../instructions/sentencia_if.js",
      Sentencia_Case: "../instructions/Sentencia_Case.js",
      Sentencia_For: "../instructions/sentencia_for.js",
      Sentencia_Foreach: "../instructions/sentencia_foreach.js"

    },
  };