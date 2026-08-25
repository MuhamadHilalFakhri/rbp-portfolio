"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
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

const CARD_MODEL_URL = "/lanyard/card.glb";
const ATTACHMENT_HEIGHT = 1.72;
const ROPE_LENGTH = 4.45;

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

interface LanyardProps {
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
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  lanyardWidth = 1,
  horizontalOffset = 0,
  eventSource,
  className = "",
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative z-0 flex h-full w-full items-center justify-center select-none ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <Canvas
        camera={{ position, fov }}
        dpr={1}
        {...(eventSource
          ? { eventSource: eventSource as RefObject<HTMLElement> }
          : {})}
        events={(store) => {
          const eventManager = createPointerEvents(store);

          return {
            ...eventManager,
            compute: (event, state) => {
              const bounds =
                eventSource?.current?.getBoundingClientRect() ??
                state.gl.domElement.getBoundingClientRect();
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
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: "pan-y" }}
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
          gravityY={gravity[1]}
          horizontalOffset={isMobile ? 0 : horizontalOffset}
          isMobile={isMobile}
          lanyardWidth={lanyardWidth}
        />
      </Canvas>
    </div>
  );
}

interface BandProps {
  gravityY: number;
  isMobile?: boolean;
  lanyardWidth?: number;
  horizontalOffset?: number;
}

function Band({
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
  const [raycaster] = useState(() => new THREE.Raycaster());
  const [dragPlane] = useState(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  );
  const [dragPoint] = useState(() => new THREE.Vector3());
  const [anchor] = useState(() => new THREE.Vector3(horizontalOffset, 6.3, 0));
  const [cardPosition] = useState(
    () => new THREE.Vector3(horizontalOffset + 0.65, 0.15, 0)
  );
  const [cardVelocity] = useState(() => new THREE.Vector3());
  const [previousDragPosition] = useState(() => cardPosition.clone());
  const [attachment] = useState(() => new THREE.Vector3());
  const [constraintDirection] = useState(() => new THREE.Vector3());
  const [nextPosition] = useState(() => new THREE.Vector3());
  const [curvePointOne] = useState(() => new THREE.Vector3());
  const [curvePointTwo] = useState(() => new THREE.Vector3());
  const sourceBandTexture = useTexture("/lanyard/lanyard.png");
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
  useEffect(() => () => bandTexture.dispose(), [bandTexture]);

  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? "grabbing"
        : "grab"
      : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const frameDelta = Math.min(delta, 1 / 30);
    anchor.set(horizontalOffset, 6.3, 0);

    if (dragged && typeof dragged !== "boolean") {
      raycaster.setFromCamera(state.pointer, state.camera);
      if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
        nextPosition.copy(dragPoint).sub(dragged);
        cardVelocity
          .copy(nextPosition)
          .sub(previousDragPosition)
          .divideScalar(Math.max(frameDelta, 0.001))
          .multiplyScalar(0.55)
          .clampLength(0, 18);
        cardPosition.copy(nextPosition);
        previousDragPosition.copy(nextPosition);
      }
    } else {
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

    if (card.current) {
      card.current.position.copy(cardPosition);
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
            const captureTarget = e.nativeEvent.currentTarget;
            if (
              captureTarget instanceof Element &&
              captureTarget.hasPointerCapture(e.pointerId)
            ) {
              captureTarget.releasePointerCapture(e.pointerId);
            }
            drag(false);
          }}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
            const nativeTarget = e.nativeEvent.target;
            if (
              nativeTarget instanceof Element &&
              nativeTarget.closest("a, button")
            ) {
              return;
            }

            e.stopPropagation();
            const captureTarget = e.nativeEvent.currentTarget;
            if (captureTarget instanceof Element) {
              captureTarget.setPointerCapture(e.pointerId);
            }
            dragPlane.set(new THREE.Vector3(0, 0, 1), -cardPosition.z);
            previousDragPosition.copy(cardPosition);
            drag(new THREE.Vector3().copy(e.point).sub(cardPosition));
          }}
        >
          <mesh
            geometry={nodes.card.geometry}
            material={materials.base}
            material-metalness={0.1}
            material-roughness={0.55}
          />
          <mesh
            geometry={nodes.clip.geometry}
            material={materials.metal}
            material-roughness={0.3}
          />
          <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[{ resolution: new THREE.Vector2(1000, 1000) }]}
          color="white"
          depthTest={false}
          map={bandTexture}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth * 0.22}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_MODEL_URL);
useTexture.preload("/lanyard/lanyard.png");
