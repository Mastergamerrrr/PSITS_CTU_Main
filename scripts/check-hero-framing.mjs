import assert from 'node:assert/strict';
import {
  getHeroSceneLayout,
  getProjectedOrbitDiameter,
} from '../src/components/home/hero-scene-layout.js';

const viewports = [
  { label: 'zoomed in', width: 1024, height: 650 },
  { label: 'desktop', width: 1440, height: 800 },
  { label: 'zoomed out', width: 2880, height: 1600 },
];

const measurements = viewports.map(({ label, width, height }) => {
  const layout = getHeroSceneLayout(width, height);
  return {
    label,
    diameter: getProjectedOrbitDiameter(height, layout),
  };
});

const [zoomedIn, desktop, zoomedOut] = measurements;
console.table(measurements.map(({ label, diameter }) => ({
  viewport: label,
  projectedDiameter: `${Math.round(diameter)}px`,
})));

assert.ok(
  zoomedOut.diameter / desktop.diameter <= 1.15,
  '3D subject grows disproportionately when the effective viewport doubles',
);
assert.ok(
  desktop.diameter / zoomedIn.diameter <= 1.25,
  '3D subject shrinks disproportionately at a zoomed-in desktop viewport',
);
assert.ok(
  zoomedOut.diameter <= 640,
  '3D subject exceeds the intended desktop screen-space cap',
);
