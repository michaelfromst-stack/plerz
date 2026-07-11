# plerz

High-performance lazy loader for viewport-aware image loading and page layout optimization.

## Advantages
- **SEO Friendly**: Ensures all image resources are indexed appropriately.
- **IntersectionObserver Native**: Heavy scroll event listeners are bypassed on modern viewports.
- **Dual Mode**: Clean fallback to viewport math in case of legacy user-agent strings.

## Usage
```javascript
import { PlerzLazyLoader } from 'plerz-lazyload';

const loader = new PlerzLazyLoader({ rootMargin: '100px 0px' });
loader.init();
```
