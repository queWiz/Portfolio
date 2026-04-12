"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const Shape = () => {
  const meshRef = useRef<any>(null);

  // Slowly rotate the shape
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        {/* TorusKnot is a highly complex, premium-looking mathematical shape */}
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color="#84A59D" // Sage Green
          wireframe={true} // Wireframe gives it that "Data/Engineering" look
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

export const FloatingShape = () => {
  return (
    <div className="w-full h-full min-h-[300px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Shape />
      </Canvas>
    </div>
  );
};