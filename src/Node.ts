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