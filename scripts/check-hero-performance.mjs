import assert from 'node:assert/strict';
import {
  getHeroRenderProfile,
  shouldUseStaticHero,
} from '../src/components/home/hero-performance.js';

assert.equal(shouldUseStaticHero({ reducedMotion: true }), true);
assert.equal(shouldUseStaticHero({ saveData: true }), true);
assert.equal(shouldUseStaticHero({ deviceMemory: 4, hardwareConcurrency: 8 }), true);
assert.equal(shouldUseStaticHero({ deviceMemory: 8, hardwareConcurrency: 4 }), true);
assert.equal(shouldUseStaticHero({ deviceMemory: 8, hardwareConcurrency: 8 }), false);

assert.deepEqual(
  getHeroRenderProfile({ compactViewport: true, devicePixelRatio: 3 }),
  { maxFps: 30, pixelRatio: 1 },
);
assert.deepEqual(
  getHeroRenderProfile({ compactViewport: false, devicePixelRatio: 2 }),
  { maxFps: 60, pixelRatio: 1.5 },
);

console.log('Hero performance profiles validated.');
