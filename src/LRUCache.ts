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