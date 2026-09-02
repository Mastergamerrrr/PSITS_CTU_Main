import { useEffect, useRef, useState } from 'react';
import { getHeroSceneLayout } from './hero-scene-layout';
import { getHeroRenderProfile, shouldUseStaticHero } from './hero-performance';

function detectStaticHero() {
  if (typeof window === 'undefined') return true;

  const connection = navigator.connection;
  return shouldUseStaticHero({
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: connection?.saveData === true,
    deviceMemory: navigator.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
  });
}

/**
 * Ambient hero artwork. The model moves independently while pointer movement
 * updates only the hero's CSS background field.
 */
export default function HeroNetwork() {
  const mountRef = useRef(null);
  const meshRef = useRef(null);
  const [staticMode, setStaticMode] = useState(detectStaticHero);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    const updateMode = () => setStaticMode(detectStaticHero());

    reducedMotion.addEventListener('change', updateMode);
    connection?.addEventListener?.('change', updateMode);
    return () => {
      reducedMotion.removeEventListener('change', updateMode);
      connection?.removeEventListener?.('change', updateMode);
    };
  }, []);

  useEffect(() => {
    if (staticMode) return undefined;

    let cancelled = false;
    let disposeScene = () => {};

    async function setupScene() {
      const mount = mountRef.current;
      const meshCanvas = meshRef.current;
      const hero = mount?.closest('.hero-home');
      if (!mount || !meshCanvas || !hero) return;
      const meshContext = meshCanvas.getContext('2d', { alpha: true });
      if (!meshContext) return;

      try {
        const THREE = await import('three');
        if (cancelled) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
        camera.position.set(0, 0, 8.4);
        const compactViewport = window.matchMedia('(max-width: 767px)');
        const initialRenderProfile = getHeroRenderProfile({
          compactViewport: compactViewport.matches,
          devicePixelRatio: window.devicePixelRatio,
        });

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(initialRenderProfile.pixelRatio);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.domElement.className = 'hero-atmosphere-canvas';
        mount.appendChild(renderer.domElement);

        const core = new THREE.Group();
        core.rotation.set(-0.2, 0.35, 0);
        scene.add(core);

        const materials = {
          shell: new THREE.MeshPhysicalMaterial({
            color: 0xb9d2fa,
            roughness: 0.18,
            metalness: 0.08,
            clearcoat: 1,
            clearcoatRoughness: 0.16,
            transparent: true,
            opacity: 0.26,
            side: THREE.DoubleSide,
          }),
          knot: new THREE.MeshStandardMaterial({
            color: 0x0066ff,
            roughness: 0.24,
            metalness: 0.5,
          }),
          line: new THREE.LineBasicMaterial({
            color: 0x0b3b8f,
            transparent: true,
            opacity: 0.18,
          }),
          orbit: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.22,
            metalness: 0.38,
          }),
          node: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.18,
            metalness: 0.12,
          }),
          signal: new THREE.MeshStandardMaterial({
            color: 0xf5b800,
            emissive: 0xf5b800,
            emissiveIntensity: 0.1,
            roughness: 0.28,
          }),
        };

        const shellGeometry = new THREE.IcosahedronGeometry(1.72, 1);
        const shell = new THREE.Mesh(shellGeometry, materials.shell);
        shell.scale.set(1, 1.06, 1);
        core.add(shell);

        const wire = new THREE.LineSegments(
          new THREE.EdgesGeometry(shellGeometry, 12),
          materials.line,
        );
        wire.scale.copy(shell.scale);
        core.add(wire);

        const knot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(0.78, 0.2, 112, 14, 2, 3),
          materials.knot,
        );
        knot.rotation.set(0.5, 0.2, -0.2);
        core.add(knot);

        const orbitConfigs = [
          { radius: 2.15, tiltX: 1.08, tiltY: 0.2, material: materials.orbit },
          { radius: 2.42, tiltX: 1.48, tiltY: -0.45, material: materials.signal },
        ];
        const orbits = orbitConfigs.map(({ radius, tiltX, tiltY, material }, index) => {
          const orbit = new THREE.Group();
          orbit.rotation.set(tiltX, tiltY, index * 0.48);
          orbit.add(new THREE.Mesh(
            new THREE.TorusGeometry(radius, index === 1 ? 0.018 : 0.024, 8, 128),
            material,
          ));

          const marker = new THREE.Mesh(
            new THREE.SphereGeometry(index === 1 ? 0.13 : 0.09, 16, 16),
            index === 1 ? materials.signal : materials.node,
          );
          marker.position.set(radius, 0, 0);
          orbit.add(marker);
          core.add(orbit);
          return orbit;
        });

        const nodeGeometry = new THREE.SphereGeometry(0.065, 9, 9);
        const nodeCount = 24;
        const nodes = new THREE.InstancedMesh(nodeGeometry, materials.node, nodeCount);
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();
        for (let index = 0; index < nodeCount; index += 1) {
          const y = 1 - (index / (nodeCount - 1)) * 2;
          const radial = Math.sqrt(1 - y * y);
          const angle = index * Math.PI * (3 - Math.sqrt(5));
          position.set(Math.cos(angle) * radial, y, Math.sin(angle) * radial);
          position.multiplyScalar(1.78);
          matrix.makeTranslation(position.x, position.y * 1.06, position.z);
          nodes.setMatrixAt(index, matrix);
        }
        nodes.instanceMatrix.needsUpdate = true;
        core.add(nodes);

        scene.add(new THREE.HemisphereLight(0xffffff, 0xb9d2fa, 2.4));
        const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
        keyLight.position.set(3.5, 4.5, 5);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x0066ff, 3.4);
        rimLight.position.set(-4, -1.5, -2.5);
        scene.add(rimLight);

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        let width = 0;
        let height = 0;
        let coreBaseX = 0;
        let coreBaseY = 0;
        let isVisible = true;
        let meshColumns = 0;
        let meshRows = 0;
        let meshPoints = [];
        const trailRings = [];
        const pointer = {
          x: 0,
          y: 0,
          targetX: 0,
          targetY: 0,
          strength: 0,
          inside: false,
        };
        let lastRingX = 0;
        let lastRingY = 0;
        let lastRingTime = 0;
        let lastPointerMoveTime = 0;
        let animationFrame = 0;
        const clock = new THREE.Clock();

        const rebuildMesh = () => {
          const spacing = width < 640
            ? 44
            : Math.min(88, Math.max(58, width / 24));
          meshColumns = Math.ceil(width / spacing) + 3;
          meshRows = Math.ceil(height / spacing) + 3;
          meshPoints = [];

          for (let row = 0; row < meshRows; row += 1) {
            for (let column = 0; column < meshColumns; column += 1) {
              const offset = row % 2 === 0 ? 0 : spacing * 0.5;
              const x = (column - 1) * spacing + offset;
              const y = (row - 1) * spacing;
              meshPoints.push({ x, y, drawX: x, drawY: y, influence: 0 });
            }
          }
        };

        const drawInteractiveMesh = (delta) => {
          const interactive = precisePointer.matches && !reducedMotion.matches;
          const time = clock.elapsedTime;
          const influenceRadius = width < 640 ? 120 : 185;
          const recentlyMoving = performance.now() - lastPointerMoveTime < 160;

          if (interactive && pointer.inside && recentlyMoving) {
            pointer.x += (pointer.targetX - pointer.x) * 0.2;
            pointer.y += (pointer.targetY - pointer.y) * 0.2;
            pointer.strength += (1 - pointer.strength) * 0.13;
          } else {
            pointer.strength *= 0.88;
          }

          meshContext.clearRect(0, 0, width, height);
          if (pointer.strength > 0.01) {
            const glow = meshContext.createRadialGradient(
              pointer.x,
              pointer.y,
              0,
              pointer.x,
              pointer.y,
              influenceRadius * 1.45,
            );
            glow.addColorStop(0, `rgba(0, 102, 255, ${0.34 * pointer.strength})`);
            glow.addColorStop(0.48, `rgba(185, 210, 250, ${0.18 * pointer.strength})`);
            glow.addColorStop(1, 'rgba(185, 210, 250, 0)');
            meshContext.fillStyle = glow;
            meshContext.fillRect(0, 0, width, height);
          }

          meshPoints.forEach((point) => {
            const dx = point.x - pointer.x;
            const dy = point.y - pointer.y;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const influence = Math.max(0, 1 - distance / influenceRadius) * pointer.strength;
            const ripple = Math.sin(distance * 0.055 - time * 4.2) * 7 * influence;
            const push = influence * 26 + ripple;
            point.drawX = point.x + (dx / distance) * push;
            point.drawY = point.y + (dy / distance) * push;
            point.influence = influence;
          });

          const pointAt = (row, column) => meshPoints[row * meshColumns + column];
          if (pointer.strength > 0.01) {
            for (let row = 0; row < meshRows; row += 1) {
              for (let column = 0; column < meshColumns; column += 1) {
                const point = pointAt(row, column);
                const neighbors = [
                  column + 1 < meshColumns ? pointAt(row, column + 1) : null,
                  row + 1 < meshRows ? pointAt(row + 1, column) : null,
                  row + 1 < meshRows && column > 0 ? pointAt(row + 1, column - 1) : null,
                ];
                neighbors.forEach((neighbor) => {
                  if (!neighbor) return;
                  const segmentInfluence = Math.max(point.influence, neighbor.influence);
                  if (segmentInfluence < 0.035) return;
                  meshContext.strokeStyle = `rgba(185, 210, 250, ${0.08 + segmentInfluence * 0.58})`;
                  meshContext.lineWidth = 1 + segmentInfluence * 0.55;
                  meshContext.beginPath();
                  meshContext.moveTo(point.drawX, point.drawY);
                  meshContext.lineTo(neighbor.drawX, neighbor.drawY);
                  meshContext.stroke();
                });
              }
            }
          }

          meshPoints.forEach((point) => {
            if (point.influence < 0.035) return;
            const radius = 1.25 + point.influence * 2.15;
            meshContext.fillStyle = `rgba(255, 255, 255, ${0.18 + point.influence * 0.76})`;
            meshContext.beginPath();
            meshContext.arc(point.drawX, point.drawY, radius, 0, Math.PI * 2);
            meshContext.fill();
          });

          for (let index = trailRings.length - 1; index >= 0; index -= 1) {
            const ring = trailRings[index];
            ring.radius += delta * 52;
            ring.alpha -= delta * 0.52;
            if (ring.alpha <= 0) {
              trailRings.splice(index, 1);
              continue;
            }
            meshContext.strokeStyle = `rgba(185, 210, 250, ${ring.alpha})`;
            meshContext.lineWidth = 1.4;
            meshContext.beginPath();
            meshContext.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
            meshContext.stroke();
          }
        };

        const resize = () => {
          const bounds = mount.getBoundingClientRect();
          width = Math.max(1, Math.round(bounds.width));
          height = Math.max(1, Math.round(bounds.height));
          const renderProfile = getHeroRenderProfile({
            compactViewport: compactViewport.matches,
            devicePixelRatio: window.devicePixelRatio,
          });
          renderer.setPixelRatio(renderProfile.pixelRatio);
          renderer.setSize(width, height, false);
          const meshDpr = renderProfile.pixelRatio;
          meshCanvas.width = Math.round(width * meshDpr);
          meshCanvas.height = Math.round(height * meshDpr);
          meshContext.setTransform(meshDpr, 0, 0, meshDpr, 0, 0);
          camera.aspect = width / height;

          const layout = getHeroSceneLayout(width, height);
          camera.position.z = layout.cameraZ;
          coreBaseX = layout.coreX;
          coreBaseY = layout.coreY;
          core.scale.setScalar(layout.scale);
          core.position.set(coreBaseX, coreBaseY, 0);
          camera.updateProjectionMatrix();
          rebuildMesh();
          drawInteractiveMesh(0);
        };

        const handlePointerMove = (event) => {
          const bounds = mount.getBoundingClientRect();
          const inside = (
            event.clientX >= bounds.left
            && event.clientX <= bounds.right
            && event.clientY >= bounds.top
            && event.clientY <= bounds.bottom
          );
          if (inside) {
            const localX = event.clientX - bounds.left;
            const localY = event.clientY - bounds.top;
            lastPointerMoveTime = performance.now();
            pointer.targetX = localX;
            pointer.targetY = localY;
            if (!pointer.inside) {
              pointer.x = localX;
              pointer.y = localY;
              lastRingX = localX;
              lastRingY = localY;
            }
            pointer.inside = true;

            const now = performance.now();
            if (
              now - lastRingTime > 70
              && Math.hypot(localX - lastRingX, localY - lastRingY) > 18
            ) {
              trailRings.push({ x: localX, y: localY, radius: 10, alpha: 0.48 });
              if (trailRings.length > 12) trailRings.shift();
              lastRingX = localX;
              lastRingY = localY;
              lastRingTime = now;
            }
          } else {
            pointer.inside = false;
          }
        };
        const handlePointerLeaveWindow = () => {
          pointer.inside = false;
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        const intersectionObserver = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) clock.getDelta();
        }, { threshold: 0.02 });
        intersectionObserver.observe(mount);
        if (precisePointer.matches && !reducedMotion.matches) {
          window.addEventListener('pointermove', handlePointerMove, { passive: true });
          window.addEventListener('blur', handlePointerLeaveWindow);
        }
        resize();

        let lastRenderTime = 0;
        const render = (timestamp = 0) => {
          animationFrame = window.requestAnimationFrame(render);
          if (!isVisible || document.hidden) return;

          const minimumFrameInterval = compactViewport.matches ? 1000 / 30 : 0;
          if (minimumFrameInterval && timestamp - lastRenderTime < minimumFrameInterval) return;
          lastRenderTime = timestamp;

          const delta = Math.min(clock.getDelta(), 0.05);
          if (!reducedMotion.matches) {
            core.rotation.y += delta * 0.075;
            core.rotation.x = -0.2 + Math.sin(clock.elapsedTime * 0.38) * 0.08;
            core.rotation.z = Math.sin(clock.elapsedTime * 0.24) * 0.035;
            core.position.x = coreBaseX + Math.sin(clock.elapsedTime * 0.19) * 0.12;
            core.position.y = coreBaseY + Math.sin(clock.elapsedTime * 0.31) * 0.1;
            knot.rotation.y += delta * 0.24;
            knot.rotation.x += delta * 0.08;
            orbits[0].rotation.z += delta * 0.055;
            orbits[1].rotation.z -= delta * 0.032;
          }

          renderer.render(scene, camera);
          drawInteractiveMesh(delta);
        };
        render();

        disposeScene = () => {
          window.cancelAnimationFrame(animationFrame);
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('blur', handlePointerLeaveWindow);
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          scene.traverse((object) => {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material?.dispose();
            }
          });
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        };
      } catch {
        if (!cancelled) setStaticMode(true);
      }
    }

    setupScene();
    return () => {
      cancelled = true;
      disposeScene();
    };
  }, [staticMode]);

  return (
    <div className={['hero-atmosphere', staticMode ? 'hero-atmosphere-static' : ''].join(' ')} aria-hidden="true">
      <div className="hero-static-art">
        <span className="hero-static-shell" />
        <span className="hero-static-core" />
        <span className="hero-static-orbit hero-static-orbit-one" />
        <span className="hero-static-orbit hero-static-orbit-two" />
        <span className="hero-static-node hero-static-node-one" />
        <span className="hero-static-node hero-static-node-two" />
        <span className="hero-static-node hero-static-node-three" />
        <span className="hero-static-node hero-static-node-four" />
        <span className="hero-static-node hero-static-node-signal" />
      </div>
      <div ref={mountRef} className="hero-atmosphere-mount" />
      <canvas ref={meshRef} className="hero-mesh-canvas" />
    </div>
  );
}
