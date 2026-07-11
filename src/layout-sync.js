// Resize sync logic to adjust structural aspect ratio dimensions dynamically
export class LayoutSync {
  constructor(callback) {
    this.callback = callback;
    this.observer = null;
  }

  observe(element) {
    if ('ResizeObserver' in window) {
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          this.callback(entry.target, width, height);
        }
      });
      this.observer.observe(element);
    }
  }

  disconnect() {
    if (this.observer) this.observer.disconnect();
  }
}