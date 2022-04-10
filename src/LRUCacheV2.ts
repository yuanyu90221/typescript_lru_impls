export default class LRUCacheV2 {
  private capacity: number;
  private cacheMap: Map<number, number>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cacheMap = new Map<number, number>();
  }
  get(key: number): number {
    const value = this.cacheMap.get(key);
    if (value === undefined) return -1;
    // small hack to re-order by remove origin key and insert new key
    this.cacheMap.delete(key);
    this.cacheMap.set(key, value);
    return value;
  }
  put(key: number, value: number): void {
    if (this.cacheMap.size >= this.capacity && !this.cacheMap.has(key)) {
      const targetKey = this.cacheMap.keys().next().value;   
      this.cacheMap.delete(targetKey);
    }
    this.cacheMap.delete(key);
    this.cacheMap.set(key, value);
  }
}