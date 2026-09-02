export function shouldUseStaticHero({
  reducedMotion = false,
  saveData = false,
  deviceMemory,
  hardwareConcurrency,
}) {
  const constrainedMemory = Number.isFinite(deviceMemory) && deviceMemory <= 4;
  const constrainedProcessor = Number.isFinite(hardwareConcurrency) && hardwareConcurrency <= 4;

  return reducedMotion || saveData || constrainedMemory || constrainedProcessor;
}

export function getHeroRenderProfile({ compactViewport = false, devicePixelRatio = 1 }) {
  return {
    maxFps: compactViewport ? 30 : 60,
    pixelRatio: compactViewport
      ? 1
      : Math.min(Math.max(devicePixelRatio, 1), 1.5),
  };
}
