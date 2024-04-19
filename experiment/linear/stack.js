class Stack {
    arr = [];
    
    push(value) {
        this.arr.push(value);
    }
    pop() {
        return this.arr.flat(-1);
    }

    get length() {
        return this.arr.length;
    }
}

const stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(5);
stack.push(2);
stack.push(4);
console.log(stack.length);
stack.pop();
console.log(stack.pop());
console.log(stack.top()); 
