class Symbol{
    constructor(line, column, id, value, type, symbol_type){
        this.line = line;
        this.column = column;
        this.id = id;
        this.value = value;
        this.type = type;
        this.symbol_type = symbol_type;
    }
}

export default Symbol;