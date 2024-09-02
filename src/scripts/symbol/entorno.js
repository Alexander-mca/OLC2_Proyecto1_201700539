class Node {
    constructor(name) {
        this.name = name; // Nombre del entorno o variable
        this.children = []; // Hijos del nodo (otras variables o subentornos)
        this.variables = {}; // Almacena las variables en este entorno
    }

    addVariable(key, value) {
        this.variables[key] = value; // Añade una variable al entorno actual
    }

    addChild(node) {
        this.children.push(node); // Añade un hijo (subentorno o variable)
    }
}

class EnvironmentTree {
    constructor() {
        this.root = new Node("global"); // Nodo raíz, representa el entorno global
    }

    findNode(name, node = this.root) {
        if (node.name === name) {
            return node; // Retorna el nodo si el nombre coincide
        }

        for (let child of node.children) {
            let found = this.findNode(name, child);
            if (found) {
                return found; // Retorna el nodo si se encuentra en los hijos
            }
        }

        return null; // Retorna null si no se encuentra
    }

    addEnvironment(name, parentName) {
        const parentNode = this.findNode(parentName);
        if (parentNode) {
            const newNode = new Node(name);
            parentNode.addChild(newNode); // Añade un nuevo entorno bajo el entorno padre especificado
        } else {
            console.log(`No se encontró el entorno padre: ${parentName}`);
        }
    }

    addVariableToEnvironment(envName, key, value) {
        const envNode = this.findNode(envName);
        if (envNode) {
            envNode.addVariable(key, value); // Añade una variable al entorno especificado
        } else {
            console.log(`No se encontró el entorno: ${envName}`);
        }
    }

    display(node = this.root, indent = 0) {
        console.log(`${' '.repeat(indent)}${node.name}:`, node.variables);
        for (let child of node.children) {
            this.display(child, indent + 2); // Despliega el árbol en forma jerárquica
        }
    }
}

// Ejemplo de uso:

const tree = new EnvironmentTree();

export default tree;
