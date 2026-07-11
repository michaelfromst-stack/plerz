// Queue prioritizer for viewport assets
export class AssetQueue {
  constructor() {
    this.highPriority = [];
    this.lowPriority = [];
  }

  enqueue(item, isPriority = false) {
    if (isPriority) {
      this.highPriority.push(item);
    } else {
      this.lowPriority.push(item);
    }
  }

  dequeue() {
    if (this.highPriority.length > 0) return this.highPriority.shift();
    return this.lowPriority.shift() || null;
  }

  isEmpty() {
    return this.highPriority.length === 0 && this.lowPriority.length === 0;
  }
}