"use client";

import { useEffect } from "react";
import { extend, type ThreeElement, type ThreeEvent } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { CARD_WIDTH_SCALE } from "./constants";
import type { BandProps } from "./lanyard-types";
import { useBandState } from "./use-band-state";
import { useBandFrame } from "./use-band-frame";
import { useBandResources } from "./use-band-resources";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

export function Band({
  active = true,
  gravityY,
  isMobile = false,
  lanyardWidth = 1,
  horizontalOffset = 0,
}: BandProps) {
  const state = useBandState(horizontalOffset);
  const {
    band,
    card,
    cardFace,
    cardClip,
    cardClamp,
    dragged,
    drag,
    hovered,
    hover,
    dragPlane,
    cardPosition,
    dragStartPosition,
    previousDragPosition,
  } = state;
  const { nodes, bandTexture, cardMaterial, metalMaterial } =
    useBandResources();
  useBandFrame(
    { active, gravityY, isMobile, lanyardWidth, horizontalOffset },
    state
  );
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
  }, [dragged, drag]);

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
