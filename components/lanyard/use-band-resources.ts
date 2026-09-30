"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { CARD_MODEL_URL, CARD_TEXTURE_URL } from "./constants";
import { createCardTexture } from "./card-texture";

export function useBandResources() {
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
  const cardTexture = useMemo(
    () => createCardTexture(sourceCardTexture),
    [sourceCardTexture]
  );
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

  return { nodes, bandTexture, cardMaterial, metalMaterial };
}

useGLTF.preload(CARD_MODEL_URL);
useTexture.preload("/lanyard/lanyard.png");
useTexture.preload(CARD_TEXTURE_URL);
