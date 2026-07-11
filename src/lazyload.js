import { throttle, isElementInViewport } from './utils.js';

export class PlerzLazyLoader {
  constructor(options = {}) {
    this.selector = options.selector || '.lazy';
    this.rootMargin = options.rootMargin || '50px 0px';
    this.threshold = options.threshold || 0.01;
    this.observer = null;
  }

  init() {
    const targets = document.querySelectorAll(this.selector);
    
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: this.rootMargin,
        threshold: this.threshold
      });
      
      targets.forEach(t => this.observer.observe(t));
    } else {
      // Fallback throttle listener for older browsers
      const handler = throttle(() => {
        targets.forEach(t => {
          if (isElementInViewport(t)) {
            this.loadImage(t);
          }
        });
      }, 200);
      window.addEventListener('scroll', handler);
      handler();
    }
  }

  loadImage(element) {
    const src = element.getAttribute('data-src');
    const srcset = element.getAttribute('data-srcset');
    
    if (src) element.setAttribute('src', src);
    if (srcset) element.setAttribute('srcset', srcset);
    
    element.classList.add('loaded');
  }
}