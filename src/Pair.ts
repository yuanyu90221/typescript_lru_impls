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