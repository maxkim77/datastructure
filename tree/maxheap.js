class MaxHeap {
    /*
        MaxHeap 클래스의 생성자
        - arr: 최대 힙을 구현할 배열
    */
    constructor() {
        this.arr = [];
    }

    /*
        최대 힙을 생성하는 메서드
    */
    heapify() {
        /* 배열의 중간부터 시작하여 각 노드를 최대 힙 속성에 맞게 재배치
           Math.floor는 주어진 숫자이하의 가장큰 정수를 반환하는 js 내장함수
           부모노드 (자식인덱스 -1) / 2
           heapifyDownMax : 주어진 인덱스를 가진 노드를 기준으로, 해당 노드가 자식 노드보다 작은 경우 자식 노드 중에서 가장 큰 값과 교환하여 힙 속성을 만족시킴.
           */
        for (let i = Math.floor(this.arr.length / 2) - 1; i >= 0; i--) {
            this.#heapifyDownMax(i);
        }
    }

    /*
        최대 힙의 특성을 유지하기 위해 아래로 재배치하는 메서드
        - index: 재배치를 시작할 인덱스
    */
    #heapifyDownMax(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let largestIndex = index;

        // 왼쪽 자식과 비교하여 더 큰 값을 찾음
        if (leftChildIndex < this.arr.length && this.arr[leftChildIndex] > this.arr[largestIndex]) {
            largestIndex = leftChildIndex;
        }

        // 오른쪽 자식과 비교하여 더 큰 값을 찾음
        if (rightChildIndex < this.arr.length && this.arr[rightChildIndex] > this.arr[largestIndex]) {
            largestIndex = rightChildIndex;
        }

        // 최대 힙 속성을 위배하는 경우 노드를 교환하고 재귀적으로 호출
        if (largestIndex !== index) {
            [this.arr[index], this.arr[largestIndex]] = [this.arr[largestIndex], this.arr[index]];
            this.#heapifyDownMax(largestIndex);
        }
    }

    /*
        최대 힙에 새로운 값을 삽입하는 메서드
        - value: 삽입할 값
    */
    insert(value) {
        this.arr.push(value);
        this.#reheapUpMax(this.arr.length - 1);
    }

    /*
        새로운 값이 추가된 후 최대 힙의 특성을 유지하기 위해 위로 재배치하는 메서드
        - index: 재배치를 시작할 인덱스
    */
    #reheapUpMax(index) {
        if (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.arr[index] > this.arr[parentIndex]) {
                [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
                this.#reheapUpMax(parentIndex);
            }
        }
    }

    /*
        힙 정렬을 수행하여 배열을 정렬된 상태로 반환하는 메서드
    */
    sort() {
        const sortedArr = [];
        while (this.arr.length > 0) {
            sortedArr.push(this.remove());
        }
        return sortedArr;
    }
}

// 최대 힙 테스트
const maxHeap = new MaxHeap();
maxHeap.insert(8);
maxHeap.insert(3);
maxHeap.insert(5);
maxHeap.insert(4);
maxHeap.insert(2);
maxHeap.insert(1);

console.log("max-heap:", maxHeap.arr);

/*
        8
      /   \
     4     5
    / \   /
   3   2 1

*/
