import * as THREE from "three";
import {
  ATTACHMENT_HEIGHT,
  CARD_RESTING_X_OFFSET,
  CARD_RESTING_Y,
} from "./constants";

export function createBandPhysicsState(horizontalOffset: number) {
  const raycaster = new THREE.Raycaster();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const dragPoint = new THREE.Vector3();
  const anchor = new THREE.Vector3(horizontalOffset, 6.3, 0);
  const cardPosition = new THREE.Vector3(
    horizontalOffset + CARD_RESTING_X_OFFSET,
    CARD_RESTING_Y,
    0
  );
  const cardVelocity = new THREE.Vector3();
  const previousDragPosition = cardPosition.clone();
  const dragStartPosition = cardPosition.clone();
  const attachment = new THREE.Vector3();
  const attachmentLocal = new THREE.Vector3(0, ATTACHMENT_HEIGHT, -0.05);
  const attachmentOffset = new THREE.Vector3();
  const constraintDirection = new THREE.Vector3();
  const nextPosition = new THREE.Vector3();
  const curvePointOne = new THREE.Vector3();
  const curvePointTwo = new THREE.Vector3();

  return {
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
  };
}
