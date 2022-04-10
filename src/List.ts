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
    while(ele.equals(frontSearch) === false && ele.equals(backSearch) === false) {
      if (frontSearch !== null) {
        frontSearch = frontSearch.next;
      }
      if (backSearch !== null) {
        backSearch = backSearch.next;
      }
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