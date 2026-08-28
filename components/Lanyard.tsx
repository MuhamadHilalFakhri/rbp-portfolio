"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  Canvas,
  events as createPointerEvents,
  extend,
  useFrame,
  type ThreeElement,
  type ThreeEvent,
} from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

const CARD_MODEL_URL = "/lanyard/card-optimized.glb";
const CARD_TEXTURE_URL = "/hilal-navy.webp";
const CARD_IMAGE_ASPECT = 2 / 3;
const CARD_MODEL_ASPECT = 0.7164179;
const CARD_WIDTH_SCALE = CARD_IMAGE_ASPECT / CARD_MODEL_ASPECT;
const CARD_TEXTURE_VERTICAL_OFFSET = -0.015;
const ATTACHMENT_HEIGHT = 1.72;
const ROPE_LENGTH = 4.45;
const CARD_RESTING_Y = 0.15;
const CARD_RESTING_X_OFFSET = 0.65;
const MOBILE_VIEWPORT_EDGE_MARGIN = 0.18;
const CARD_ENTRANCE_DURATION = 0.75;

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

interface LanyardProps {
  active?: boolean;
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  lanyardWidth?: number;
  horizontalOffset?: number;
  eventSource?: RefObject<HTMLElement | null>;
  className?: string;
}

export default function Lanyard({
  active = true,
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  lanyardWidth = 1,
  horizontalOffset = 0,
  eventSource,
  className = "",
}: LanyardProps) {
  const interactionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const interactionSource = eventSource ?? interactionRef;

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`pointer-events-none relative z-0 flex h-full w-full items-center justify-center select-none ${className}`}
    >
      <Canvas
        camera={{ position, fov }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        eventSource={interactionSource as RefObject<HTMLElement>}
        events={(store) => {
          const eventManager = createPointerEvents(store);

          return {
            ...eventManager,
            compute: (event, state) => {
              const bounds = state.gl.domElement.getBoundingClientRect();
              const x = event.clientX - bounds.left;
              const y = event.clientY - bounds.top;

              state.pointer.set(
                (x / bounds.width) * 2 - 1,
                -(y / bounds.height) * 2 + 1
              );
              state.raycaster.setFromCamera(state.pointer, state.camera);
            },
          };
        }}
        gl={{
          alpha: transparent,
          antialias: !isMobile,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: isMobile ? "pan-y" : "none" }}
        fallback={<div className="h-full w-full bg-transparent" />}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        }}
      >
        <ambientLight intensity={2.4} />
        <directionalLight intensity={4} position={[4, 6, 8]} />
        <directionalLight intensity={2} position={[-4, 2, 5]} />
        <pointLight intensity={8} position={[0, -4, 6]} />
        <Band
          active={active}
          gravityY={gravity[1]}
          horizontalOffset={isMobile ? 0 : horizontalOffset}
          isMobile={isMobile}
          lanyardWidth={lanyardWidth}
        />
      </Canvas>
      <div
        ref={interactionRef}
        aria-hidden="true"
        data-lanyard-drag-area
        className={`absolute top-[27%] left-[5%] z-10 h-[52%] w-[90%] cursor-grab select-none md:top-[28%] md:right-[3%] md:left-auto md:h-[48%] md:w-[36%] ${
          eventSource || !active ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{ touchAction: isMobile ? "pan-y" : "none" }}
      />
    </div>
  );
}

interface BandProps {
  active?: boolean;
  gravityY: number;
  isMobile?: boolean;
  lanyardWidth?: number;
  horizontalOffset?: number;
}

function Band({
  active = true,
  gravityY,
  isMobile = false,
  lanyardWidth = 1,
  horizontalOffset = 0,
}: BandProps) {
  const band = useRef<
    THREE.Mesh<
      InstanceType<typeof MeshLineGeometry>,
      InstanceType<typeof MeshLineMaterial>
    >
  >(null!);
  const card = useRef<THREE.Group>(null!);
  const cardFace = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  >(null!);
  const cardClip = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
  >(null!);
  const cardClamp = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
  >(null!);
  const [raycaster] = useState(() => new THREE.Raycaster());
  const [dragPlane] = useState(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  );
  const [dragPoint] = useState(() => new THREE.Vector3());
  const [anchor] = useState(() => new THREE.Vector3(horizontalOffset, 6.3, 0));
  const [cardPosition] = useState(
    () =>
      new THREE.Vector3(
        horizontalOffset + CARD_RESTING_X_OFFSET,
        CARD_RESTING_Y,
        0
      )
  );
  const [cardVelocity] = useState(() => new THREE.Vector3());
  const [previousDragPosition] = useState(() => cardPosition.clone());
  const [dragStartPosition] = useState(() => cardPosition.clone());
  const [attachment] = useState(() => new THREE.Vector3());
  const [constraintDirection] = useState(() => new THREE.Vector3());
  const [nextPosition] = useState(() => new THREE.Vector3());
  const [curvePointOne] = useState(() => new THREE.Vector3());
  const [curvePointTwo] = useState(() => new THREE.Vector3());
  const entranceProgress = useRef(0);
  const sourceBandTexture = useTexture("/lanyard/lanyard.png");
  const sourceCardTexture = useTexture(CARD_TEXTURE_URL);
  const bandTexture = useMemo(() => {
    const texture = sourceBandTexture.clone();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [sourceBandTexture]);
  const { nodes, materials } = useGLTF(CARD_MODEL_URL) as unknown as {
    nodes: Record<"card" | "clip" | "clamp", THREE.Mesh>;
    materials: {
      base: THREE.MeshStandardMaterial;
      metal: THREE.MeshStandardMaterial;
    };
  };
  const cardTexture = useMemo(() => {
    const texture = sourceCardTexture.clone();
    // The GLB atlas gives each card face half the texture width and three
    // quarters of its height. Expand that UV region so the portrait fills
    // both faces without being stretched or cut in half.
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(2, 4 / 3);
    texture.offset.set(0, CARD_TEXTURE_VERTICAL_OFFSET);
    texture.anisotropy = 8;
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [sourceCardTexture]);
  const cardMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: cardTexture,
      opacity: 0,
      side: materials.base.side,
      toneMapped: false,
      transparent: true,
    });
  }, [cardTexture, materials.base.side]);
  const metalMaterial = useMemo(() => {
    const material = materials.metal.clone();
    material.opacity = 0;
    material.transparent = true;
    return material;
  }, [materials.metal]);
  const [curve] = useState(() => {
    const nextCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    nextCurve.curveType = "chordal";
    return nextCurve;
  });
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const resourcesMounted = useRef(false);

  useEffect(() => {
    resourcesMounted.current = true;

    return () => {
      resourcesMounted.current = false;
      window.setTimeout(() => {
        if (resourcesMounted.current) return;
        bandTexture.dispose();
        cardTexture.dispose();
        cardMaterial.dispose();
        metalMaterial.dispose();
      }, 0);
    };
  }, [bandTexture, cardMaterial, cardTexture, metalMaterial]);

  useEffect(() => {
    document.body.style.cursor = dragged
      ? "grabbing"
      : hovered
        ? "grab"
        : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useEffect(() => {
    if (!dragged) return;

    const stopDragging = (): void => drag(false);
    window.addEventListener("pointerup", stopDragging, { once: true });
    window.addEventListener("pointercancel", stopDragging, { once: true });

    return () => {
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, [dragged]);

  useFrame((state, delta) => {
    const frameDelta = Math.min(delta, 1 / 30);
    anchor.set(horizontalOffset, 6.3, 0);
    const restingX = horizontalOffset + CARD_RESTING_X_OFFSET;
    const mobileHorizontalLimit = Math.max(
      1.35,
      state.viewport.width / 2 - MOBILE_VIEWPORT_EDGE_MARGIN
    );

    if (!active) {
      cardPosition.set(restingX, CARD_RESTING_Y, 0);
      cardVelocity.set(0, 0, 0);
      previousDragPosition.copy(cardPosition);
      entranceProgress.current = 0;
    } else {
      entranceProgress.current = Math.min(
        1,
        entranceProgress.current + frameDelta / CARD_ENTRANCE_DURATION
      );
    }

    if (active && dragged && typeof dragged !== "boolean") {
      raycaster.setFromCamera(state.pointer, state.camera);
      if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
        nextPosition.copy(dragPoint).sub(dragged);

        if (isMobile) {
          nextPosition.set(
            THREE.MathUtils.clamp(
              nextPosition.x,
              -mobileHorizontalLimit,
              mobileHorizontalLimit
            ),
            dragStartPosition.y,
            dragStartPosition.z
          );
        }

        cardVelocity
          .copy(nextPosition)
          .sub(previousDragPosition)
          .divideScalar(Math.max(frameDelta, 0.001))
          .multiplyScalar(0.55)
          .clampLength(0, 18);
        cardPosition.copy(nextPosition);
        previousDragPosition.copy(nextPosition);
      }
    } else if (active) {
      // Keep the card gently alive when idle, so it does not look frozen.
      const time = state.clock.getElapsedTime();
      const idleSway =
        Math.sin(time * 1.15) * 0.8 + Math.sin(time * 0.55 + 1.4) * 0.35;
      cardVelocity.setX(cardVelocity.x + idleSway * frameDelta);

      // Apply gravity with realistic weight
      cardVelocity.set(
        cardVelocity.x,
        cardVelocity.y + gravityY * 0.65 * frameDelta,
        cardVelocity.z
      );

      // Gentle air resistance — allows smooth swinging
      cardVelocity.multiplyScalar(Math.exp(-0.6 * frameDelta));

      // Dampen z-axis to slowly return card to plane
      cardVelocity.setZ(cardVelocity.z * Math.exp(-2.5 * frameDelta));

      cardPosition.addScaledVector(cardVelocity, frameDelta);

      attachment.copy(cardPosition);
      attachment.set(
        attachment.x,
        attachment.y + ATTACHMENT_HEIGHT,
        attachment.z
      );
      constraintDirection.copy(attachment).sub(anchor);
      const distance = constraintDirection.length();

      if (distance > ROPE_LENGTH) {
        constraintDirection.multiplyScalar(1 / distance);
        const excess = distance - ROPE_LENGTH;

        // Calculate the constrained position (reuse nextPosition as temp)
        nextPosition
          .copy(anchor)
          .addScaledVector(constraintDirection, ROPE_LENGTH);
        nextPosition.set(
          nextPosition.x,
          nextPosition.y - ATTACHMENT_HEIGHT,
          nextPosition.z
        );

        // Smooth spring correction — speed scales with how far past the rope
        // Small excess → gentle pull, large excess → stronger pull, never instant
        const correctionRate = Math.min(excess * 5, 20);
        const t = 1 - Math.exp(-correctionRate * frameDelta);
        cardPosition.lerp(nextPosition, t);

        // Apply inward spring force on velocity for natural acceleration back
        cardVelocity.addScaledVector(
          constraintDirection,
          -excess * 45 * frameDelta
        );

        // Dampen outward velocity component (absorb energy, don't hard-stop)
        const outwardSpeed = cardVelocity.dot(constraintDirection);
        if (outwardSpeed > 0) {
          cardVelocity.addScaledVector(
            constraintDirection,
            -outwardSpeed * 0.8
          );
        }
      }
    }

    if (active && isMobile && !dragged) {
      const guardedX = THREE.MathUtils.clamp(
        cardPosition.x,
        -mobileHorizontalLimit,
        mobileHorizontalLimit
      );
      const edgeOverflow = cardPosition.x - guardedX;

      if (Math.abs(edgeOverflow) > 0.001) {
        cardVelocity.setX(cardVelocity.x - edgeOverflow * 28 * frameDelta);
        cardPosition.setX(
          THREE.MathUtils.lerp(
            cardPosition.x,
            guardedX,
            1 - Math.exp(-9 * frameDelta)
          )
        );
      }
    }

    const entranceEase = 1 - Math.pow(1 - entranceProgress.current, 3);
    if (cardFace.current) {
      cardFace.current.material.opacity = active ? entranceEase : 0;
    }
    if (cardClip.current) {
      cardClip.current.material.opacity = active ? entranceEase : 0;
    }
    if (cardClamp.current) {
      cardClamp.current.material.opacity = active ? entranceEase : 0;
    }

    if (card.current) {
      card.current.position.copy(cardPosition);
      card.current.position.y += (1 - entranceEase) * 0.32;
      card.current.scale.setScalar(0.86 + entranceEase * 0.14);
      card.current.visible = active;
      card.current.rotation.z = THREE.MathUtils.lerp(
        card.current.rotation.z,
        THREE.MathUtils.clamp(-cardVelocity.x * 0.055, -0.6, 0.6),
        1 - Math.exp(-5 * frameDelta)
      );
      card.current.rotation.y = THREE.MathUtils.lerp(
        card.current.rotation.y,
        THREE.MathUtils.clamp(cardVelocity.x * 0.035, -0.4, 0.4),
        1 - Math.exp(-4 * frameDelta)
      );
    }

    if (band.current) {
      band.current.visible = active;
      band.current.material.opacity = active ? entranceEase : 0;
      attachment.copy(cardPosition);
      attachment.set(
        attachment.x,
        attachment.y + ATTACHMENT_HEIGHT,
        attachment.z
      );
      curvePointOne.copy(attachment).lerp(anchor, 0.33);
      curvePointTwo.copy(attachment).lerp(anchor, 0.66);
      const slack = Math.max(0, ROPE_LENGTH - attachment.distanceTo(anchor));
      curvePointOne.set(
        curvePointOne.x,
        curvePointOne.y - slack * 0.2,
        curvePointOne.z
      );
      curvePointTwo.set(
        curvePointTwo.x,
        curvePointTwo.y - slack * 0.12,
        curvePointTwo.z
      );
      curve.points[0]!.copy(attachment);
      curve.points[1]!.copy(curvePointOne);
      curve.points[2]!.copy(curvePointTwo);
      curve.points[3]!.copy(anchor);
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    }
  });

  return (
    <>
      <group ref={card} position={[horizontalOffset + 0.65, 0.15, 0]}>
        <group
          scale={2.7}
          position={[0, -1.42, -0.05]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerUp={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            const captureTarget = e.target as unknown as {
              hasPointerCapture: (pointerId: number) => boolean;
              releasePointerCapture: (pointerId: number) => void;
            };
            if (captureTarget.hasPointerCapture(e.pointerId)) {
              captureTarget.releasePointerCapture(e.pointerId);
            }
            drag(false);
          }}
          onPointerCancel={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            const captureTarget = e.target as unknown as {
              hasPointerCapture: (pointerId: number) => boolean;
              releasePointerCapture: (pointerId: number) => void;
            };
            if (captureTarget.hasPointerCapture(e.pointerId)) {
              captureTarget.releasePointerCapture(e.pointerId);
            }
            drag(false);
          }}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
            if (!active || e.button !== 0) return;

            const nativeTarget = e.nativeEvent.target;
            if (
              nativeTarget instanceof Element &&
              nativeTarget.closest("a, button")
            ) {
              return;
            }

            e.stopPropagation();
            if (!isMobile && e.nativeEvent.cancelable) {
              e.nativeEvent.preventDefault();
            }
            const captureTarget = e.target as unknown as {
              setPointerCapture: (pointerId: number) => void;
            };
            captureTarget.setPointerCapture(e.pointerId);
            dragPlane.set(new THREE.Vector3(0, 0, 1), -cardPosition.z);
            dragStartPosition.copy(cardPosition);
            previousDragPosition.copy(cardPosition);
            drag(new THREE.Vector3().copy(e.point).sub(cardPosition));
          }}
        >
          <mesh
            ref={cardFace}
            dispose={null}
            geometry={nodes.card.geometry}
            material={cardMaterial}
            scale={[CARD_WIDTH_SCALE, 1, 1]}
          />
          <mesh
            ref={cardClip}
            dispose={null}
            geometry={nodes.clip.geometry}
            material={metalMaterial}
            material-roughness={0.3}
          />
          <mesh
            ref={cardClamp}
            dispose={null}
            geometry={nodes.clamp.geometry}
            material={metalMaterial}
          />
        </group>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[{ resolution: new THREE.Vector2(1000, 1000) }]}
          color="white"
          depthTest={false}
          opacity={0}
          map={bandTexture}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth * 0.22}
          transparent
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_MODEL_URL);
useTexture.preload("/lanyard/lanyard.png");
useTexture.preload(CARD_TEXTURE_URL);
