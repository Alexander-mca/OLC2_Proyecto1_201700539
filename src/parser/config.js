module.exports = {
    format: "es",
    input: "parser.pegjs",
    dependencies: {
      Arithmetic: "../expressions/arithmetic.js",
      Type: "../symbol/types.js",
      Logical: "../expressions/logical.js",
      Relational: "../expressions/relational.js",
      Literal: "../expressions/literal.js",
      Declaracion: "../instructions/declaration.js",
      Declaracion: "../instructions/asignation.js",
    },
  };