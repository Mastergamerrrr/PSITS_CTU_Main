const CAMERA_FOV_DEGREES = 35;
const OUTER_ORBIT_DIAMETER = 4.84;

export function getHeroSceneLayout(width, height) {
  const fovRadians = CAMERA_FOV_DEGREES * Math.PI / 180;
  const halfFovTangent = Math.tan(fovRadians / 2);
  let scale;
  let desiredDiameter;
  let targetX;
  let targetY;

  if (width >= 1024) {
    scale = 1;
    desiredDiameter = Math.min(Math.max(width * 0.4, 480), 620, height * 0.78);
    targetX = 0.77;
    targetY = 0.5;
  } else if (width >= 640) {
    scale = 0.9;
    desiredDiameter = Math.min(Math.max(width * 0.52, 360), 520, height * 0.74);
    targetX = 0.68;
    targetY = 0.59;
  } else {
    scale = 0.75;
    desiredDiameter = Math.min(Math.max(width * 0.82, 260), 360, height * 0.62);
    targetX = 0.5;
    targetY = 0.72;
  }

  const worldDiameter = OUTER_ORBIT_DIAMETER * scale;
  const cameraZ = worldDiameter * height / (desiredDiameter * 2 * halfFovTangent);
  const visibleWorldHeight = 2 * halfFovTangent * cameraZ;
  const visibleWorldWidth = visibleWorldHeight * (width / height);

  return {
    cameraZ,
    coreX: (targetX - 0.5) * visibleWorldWidth,
    coreY: (0.5 - targetY) * visibleWorldHeight,
    scale,
  };
}

export function getProjectedOrbitDiameter(height, layout) {
  const fovRadians = CAMERA_FOV_DEGREES * Math.PI / 180;
  const visibleWorldHeight = 2 * Math.tan(fovRadians / 2) * layout.cameraZ;
  return OUTER_ORBIT_DIAMETER * layout.scale / visibleWorldHeight * height;
}
