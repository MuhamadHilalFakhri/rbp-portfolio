"use client";

import { useRef, useState } from "react";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { createBandPhysicsState } from "./band-physics-state";

export function useBandState(horizontalOffset: number) {
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
  const [physics] = useState(() => createBandPhysicsState(horizontalOffset));
  const entranceProgress = useRef(0);
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

  return {
    ...physics,
    band,
    card,
    cardFace,
    cardClip,
    cardClamp,
    entranceProgress,
    curve,
    dragged,
    drag,
    hovered,
    hover,
  };
}
