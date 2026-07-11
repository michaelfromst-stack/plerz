import { AssetQueue } from '../src/prioritizer.js';

console.log('--- Initializing Plerz tests ---');
const queue = new AssetQueue();
queue.enqueue('low-1', false);
queue.enqueue('high-1', true);
queue.enqueue('low-2', false);

const firstOut = queue.dequeue();
console.log('Queue priority validation test: ', firstOut === 'high-1' ? 'PASSED' : 'FAILED');
console.log('--- Plerz tests complete ---');