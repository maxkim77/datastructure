// 연결리스트는 데이터요소의 선형 집합으로 각요소는 

class Linkedlist {
    length = 0;
    head = null;

    add(value) {
        if (this.head) {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = new Node(value);
        } else {
            this.head = new Node(value);
        }
        this.length++;
        return this.length;
    }

    search(index) {
        let count = 0;
        let current = this.head;
        while (count < index) {
            current = current?.next;
            count++;
        }
        return [prev, current];
    }


    remove(value) {
        // Implement remove method
    }

    print() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}

class Node {
    next = null;
    constructor(value) {
        this.value = value;
    }
}

const ll = new Linkedlist();
ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.add(5);
ll.add(6);

console.log(ll.search(3));
console.log(ll.search(5));
console.log(ll.search(7));

// ll.print();
