class MinHeap {
    constructor() {
        /* 최소 힙을 구현할 배열
        */
        this.arr = [];
    }

    /* 최소 힙을 생성하는 메서드 */
    heapify() {
        // 배열의 중간부터 시작하여 각 노드를 최소 힙 속성에 맞게 재배치
        for (let i = Math.floor(this.arr.length / 2) - 1; i >= 0; i--) {
            this.#heapifyDownMin(i);
        }
    }

    /* 최소 힙의 특성을 유지하기 위해 아래로 재배치하는 메서드 */
    #heapifyDownMin(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;

        /* 왼쪽 자식과 비교하여 더 작은 값을 찾음 */
        if (leftChildIndex < this.arr.length && this.arr[leftChildIndex] < this.arr[smallestIndex]) {
            smallestIndex = leftChildIndex;
        }

        /* 오른쪽 자식과 비교하여 더 작은 값을 찾음 */
        if (rightChildIndex < this.arr.length && this.arr[rightChildIndex] < this.arr[smallestIndex]) {
            smallestIndex = rightChildIndex;
        }

        /* 최소 힙 속성을 위배하는 경우 노드를 교환하고 재귀적으로 호출 */
        if (smallestIndex !== index) {
            [this.arr[index], this.arr[smallestIndex]] = [this.arr[smallestIndex], this.arr[index]];
            this.#heapifyDownMin(smallestIndex);
        }
    }

    /* 최소 힙에 새로운 값을 삽입하는 메서드 */
    insert(value) {
        this.arr.push(value);
        this.#reheapUpMin(this.arr.length - 1);
    }

    /* 새로운 값이 추가된 후 최소 힙의 특성을 유지하기 위해 위로 재배치하는 메서드 */
    #reheapUpMin(index) {
        if (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.arr[index] < this.arr[parentIndex]) {
                [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
                this.#reheapUpMin(parentIndex);
            }
        }
    }


    /* 힙 정렬을 수행하여 배열을 정렬된 상태로 반환하는 메서드 */
    sort() {
        const sortedArr = [];
        while (this.arr.length > 0) {
            sortedArr.push(this.remove());
        }
        return sortedArr;
    }
}

/* 최소 힙 테스트 */
const minHeap = new MinHeap();
minHeap.insert(8);
minHeap.insert(3);
minHeap.insert(5);
minHeap.insert(4);
minHeap.insert(2);
minHeap.insert(1);

console.log("min-heap:", minHeap.arr);

/*
      1
     / \
    3   2
   / \ / \
  8  4 5  

*/
