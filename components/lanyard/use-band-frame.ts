"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  CARD_RESTING_X_OFFSET,
  CARD_RESTING_Y,
  MOBILE_VIEWPORT_EDGE_MARGIN,
  CARD_ENTRANCE_DURATION,
  ROPE_LENGTH,
} from "./constants";
import type { BandProps } from "./lanyard-types";
import type { useBandState } from "./use-band-state";

export function useBandFrame(
  { active, gravityY, isMobile, horizontalOffset }: Required<BandProps>,
  bandState: ReturnType<typeof useBandState>
) {
  const {
    raycaster,
    dragPlane,
    dragPoint,
    anchor,
    cardPosition,
    cardVelocity,
    previousDragPosition,
    dragStartPosition,
    attachment,
    attachmentLocal,
    attachmentOffset,
    constraintDirection,
    nextPosition,
    curvePointOne,
    curvePointTwo,
    band: bandRef,
    card: cardRef,
    cardFace: cardFaceRef,
    cardClip: cardClipRef,
    cardClamp: cardClampRef,
    entranceProgress: entranceProgressRef,
    curve,
    dragged,
    hovered,
  } = bandState;
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
      entranceProgressRef.current = 0;
    } else {
      entranceProgressRef.current = Math.min(
        1,
        entranceProgressRef.current + frameDelta / CARD_ENTRANCE_DURATION
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
      // Keep the cardRef gently alive when idle, so it does not look frozen.
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

      // Dampen z-axis to slowly return cardRef to plane
      cardVelocity.setZ(cardVelocity.z * Math.exp(-2.5 * frameDelta));

      cardPosition.addScaledVector(cardVelocity, frameDelta);

      attachmentOffset
        .copy(attachmentLocal)
        .multiply(cardRef.current.scale)
        .applyQuaternion(cardRef.current.quaternion);
      attachment.copy(cardPosition).add(attachmentOffset);
      constraintDirection.copy(attachment).sub(anchor);
      const distance = constraintDirection.length();

      if (distance > ROPE_LENGTH) {
        constraintDirection.multiplyScalar(1 / distance);
        const excess = distance - ROPE_LENGTH;

        // Calculate the constrained position (reuse nextPosition as temp)
        nextPosition
          .copy(anchor)
          .addScaledVector(constraintDirection, ROPE_LENGTH)
          .sub(attachmentOffset);

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

    const entranceEase = 1 - Math.pow(1 - entranceProgressRef.current, 3);
    if (cardFaceRef.current) {
      cardFaceRef.current.material.opacity = active ? entranceEase : 0;
      const brightness = THREE.MathUtils.damp(
        cardFaceRef.current.material.color.r,
        hovered ? 1 : 0.94,
        8,
        frameDelta
      );
      cardFaceRef.current.material.color.setRGB(
        brightness,
        brightness,
        brightness
      );
    }
    if (cardClipRef.current) {
      cardClipRef.current.material.opacity = active ? entranceEase : 0;
    }
    if (cardClampRef.current) {
      cardClampRef.current.material.opacity = active ? entranceEase : 0;
    }

    if (cardRef.current) {
      cardRef.current.position.copy(cardPosition);
      cardRef.current.position.y += (1 - entranceEase) * 0.32;
      cardRef.current.scale.setScalar(0.86 + entranceEase * 0.14);
      cardRef.current.visible = active;
      cardRef.current.rotation.z = THREE.MathUtils.lerp(
        cardRef.current.rotation.z,
        THREE.MathUtils.clamp(-cardVelocity.x * 0.055, -0.6, 0.6),
        1 - Math.exp(-5 * frameDelta)
      );
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        THREE.MathUtils.clamp(cardVelocity.x * 0.035, -0.4, 0.4),
        1 - Math.exp(-4 * frameDelta)
      );
    }

    if (bandRef.current) {
      bandRef.current.visible = active;
      bandRef.current.material.opacity = active ? entranceEase : 0;
      // Resolve the connector after this frame's rotation, scale and entrance motion.
      cardRef.current.localToWorld(attachment.copy(attachmentLocal));
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
      bandRef.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    }
  });
}
