# typescript_lru_impls

This repository is for implementation LRU algorithm with typescript

LRU(Least Recently Used) 是一種演算法把最近未使用的 Cache 值給移除掉


## 觀察

首先是 cache 有一個最大容量 K 

並且在超過這個容量 K 時 ， 有值要插入需要把最少存取的值移除

再在把這個新的值放入

## 初步想法是

首先是 

1 必須儲存 cache 容量值 cap

2 所有的 cache 值是 key value 並且要被有順序性保存，舉例來說，最新被存儲放最前面，最晚被存除放最後面

3 所有 cache 值由於需要快速存儲可以透過 map 來以 key value 方式做存放


簡單的想法是

透過 container 中 list 來紀錄所有值，最新存取放最前面

case 1: 放入新值時

每次存放新的值先檢查 cache 是否已經有該 key 值， 如果有更新 value 值 並且把該 key value 移到 list 最前面

如果不具有該 key值， 則先檢查 list 是否已達到 cap

如果達到 cap 則移除 list 最後元素以及在 map 之中的 key 

把 key value 放到 list 最前面並且放入 map 之中

case 2: 存取值某個 key 時

如果 key 不存在於 map 中，則回傳 -1

如果 key 存在則把 元素 key value 放到最前面， 並且回傳 value

## 實作
### Pair

```typescript
import { Comparable } from './Comparable.interface';
export default class Pair implements Comparable<Pair>{
  K: number;
  V: number;
  constructor(key: number, value: number) {
    this.K = key;
    this.V = value;
  }
  equals(compareObj: Pair): boolean {
    return (compareObj.K == this.K) && (compareObj.V == this.V);  
  } 
}
```

### Node

```typescript
import { Comparable } from './Comparable.interface';
export default class Node<T extends Comparable<T>> implements Comparable<Node<T>> {
  public prev: &Node<T>;
  public next: &Node<T>;
  public value: T;
  constructor(value: T, prev: &Node<T>, next: &Node<T>) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
  equals(compareObj: &Node<T>): boolean {
    return this.value.equals(compareObj.value);
  }
}
```

### List


```typescript
import Pair from "./Pair";
import Node from "./Node";
export default class List{
  private size: number;
  private head: &(Node<Pair>);
  private tail: &(Node<Pair>);
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  private FindTarget(ele: &(Node<Pair>)): &(Node<Pair>) {
    let frontSearch = this.head;
    let backSearch = this.tail;
    while(frontSearch.equals(ele) === false && backSearch.equals(ele) === false) {
      frontSearch = frontSearch.next;
      backSearch = backSearch.next;
    }
    return (frontSearch !== null)? frontSearch : backSearch;
  }
  public MoveToFront(ele: &(Node<Pair>)) {
    if (this.size === 0) {
      return;
    } 
    // case 1: ele is head
    if (ele.equals(this.head)) {
      return;
    }
    // case 2: ele is tail
    if (ele.equals(this.tail)){
      let target = this.tail;
      if (target.prev !== null) {
        target.prev.next = null;
      }
      // switch tail to prev
      this.tail = target.prev;
      // switch head with target
      this.head.prev = target;
      target.next = this.head;
      target.prev = null;
      this.head = target;
      return;
    }
    // case 3: rest case
    let target = this.FindTarget(ele);
    if (target.prev !== null) {
      target.prev.next = target.next;
    }
    if (target.next !== null) {
      target.next.prev = target.prev;
    }
    this.head.prev = target;
    target.next = this.head;
    target.prev = null;
    this.head = target;
  }
  public PushToFront(ele: &(Node<Pair>)): &(Node<Pair>) {
    ele.next = this.head;
    if (this.size > 0) {
     this.head.prev = ele;
    }
    ele.prev = null;
    this.head = ele;
    if (this.size == 0) {
      this.tail = ele;
    }
    this.size += 1;
    return this.head;
  }

  public Len(): number {
    return this.size;
  }

  public Remove(ele: &(Node<Pair>)) {
    if (this.size === 0) {
      return;
    }
    // case 1 ele is this.tail
    if (ele.equals(this.tail)) {
      let target = this.tail;
      if (target.prev) {
        target.prev.next = null;
      }
      this.tail = target.prev;
      target.prev = null;
    } else if (ele.equals(this.head)) { // case 2 ele is this.head
      let target = this.head;
      if (target.next) {
        target.next.prev = null;
      }
      this.head = target.next;
    } else {
      let target = this.FindTarget(ele);
      if (target.prev) {
        target.prev.next = target.next;
      }
      if (target.next) {
        target.next.prev = target.prev;
      }
      target.prev = null;
      target.next = null;
    }
    this.size -= 1;
  }

  public ListAll() {
    let target: &(Node<Pair>) = this.head;
    while(target !== null) {
      console.log(target.value);
      target = target.next;
    }
  }

  public Back(): &(Node<Pair>) {
    return this.tail;
  }

  public Head(): &(Node<Pair>) {
    return this.head;
  }
}
```

### LRUCache

```typescript
import List from "./List";
import Pair from "./Pair";
import Node from "./Node";
export default class LRUCache {
  private capacity: number;
  private cacheMap: Map<number, &(Node<Pair>)>;
  private list: &List; 
  constructor(capacity: number) {
    this.capacity = capacity;
    this.list = new List();
    this.cacheMap = new Map<number, &(Node<Pair>)>();
  }
  get(key: number): number {
    let ele = this.cacheMap.get(key);
    if (ele !== undefined) {
      this.list.MoveToFront(ele);
      return ele.value.V;
    } 
    return -1;
  }
  put(key: number, value: number): void {
    let ele = this.cacheMap.get(key);
    if (ele !== undefined) {
      this.list.MoveToFront(ele);
      ele.value.V = value;
      return;
    }
    if (this.list.Len() === this.capacity) {
      let last = this.list.Back();
      let node = last.value;
      this.cacheMap.delete(node.K);
      this.list.Remove(last);
    }
    ele = this.list.PushToFront(new Node(new Pair(key, value), null, null));
    this.cacheMap.set(key, ele);
  }
}
```