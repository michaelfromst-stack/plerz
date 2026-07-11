import { AssetQueue } from './prioritizer.js';
import { LayoutSync } from './layout-sync.js';

export class PlerzEngine {
  constructor(config = {}) {
    this.queue = new AssetQueue();
    this.sync = new LayoutSync((el, w, h) => this.handleResize(el, w, h));
    this.elements = new Set();
  }

  register(element, isPriority = false) {
    this.elements.add(element);
    this.sync.observe(element);
    this.queue.enqueue(element, isPriority);
  }

  handleResize(element, width, height) {
    // Prevent aspect ratio layout shift on viewport resize
    const ratio = element.getAttribute('data-aspect-ratio');
    if (ratio) {
      const calculatedHeight = width / parseFloat(ratio);
      element.style.height = `${calculatedHeight}px`;
    }
  }

  processQueue() {
    while (!this.queue.isEmpty()) {
      const element = this.queue.dequeue();
      const realSrc = element.getAttribute('data-src');
      if (realSrc) {
        element.src = realSrc;
        element.onload = () => element.classList.add('loaded');
      }
    }
  }
}