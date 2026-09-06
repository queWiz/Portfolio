"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    // --- INTEGRATED STARFIELD (Vanilla Three.js — Replaces R3F / Drei / Maath) ---
    const starCount = isMobile ? 600 : 1500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 3.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf5f0e8,
      size: isMobile ? 0.018 : 0.022,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- CELESTIAL ORBITAL KINEMATICS ---
    const group = new THREE.Group();
    if (isMobile) {
      group.position.set(0, 0.5, -1.5);
      group.scale.set(1.2, 1.2, 1.2);
    } else {
      group.position.set(2.4, 0, 0);
      group.scale.set(1.8, 1.8, 1.8);
    }
    scene.add(group);

    const CREAM = 0xf5f0e8;
    const GREEN = 0x86efac;
    const LAVENDER = 0xc4b5fd;
    const AMBER = 0xfbbf24;

    const coreGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: CREAM,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.15 : 0.25,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const moonData = [
      { col: GREEN, r: 0.18, orb: 1.5, speed: 0.7, phase: 0 },
      { col: LAVENDER, r: 0.14, orb: 2.1, speed: 0.45, phase: 2.1 },
      { col: AMBER, r: 0.12, orb: 2.6, speed: 0.3, phase: 4.2 },
      { col: CREAM, r: 0.09, orb: 1.8, speed: 1.1, phase: 1.0 },
    ];

    const moonGeometries: THREE.SphereGeometry[] = [];
    const moonMaterials: THREE.MeshBasicMaterial[] = [];
    const moons = moonData.map((d) => {
      const geo = new THREE.SphereGeometry(d.r, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: d.col });
      moonGeometries.push(geo);
      moonMaterials.push(mat);
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);
      return { mesh, ...d, angle: d.phase };
    });

    const ringTilts: number[] = [];
    const ringGeometries: THREE.RingGeometry[] = [];
    const ringMaterials: THREE.MeshBasicMaterial[] = [];
    [1.5, 2.1, 2.6, 1.8].forEach((rad, i) => {
      const geo = new THREE.RingGeometry(rad - 0.008, rad + 0.008, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: [GREEN, LAVENDER, AMBER, CREAM][i],
        transparent: true,
        opacity: isMobile ? 0.08 : 0.15,
        side: THREE.DoubleSide,
      });
      ringGeometries.push(geo);
      ringMaterials.push(mat);
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = 0.3 + i * 0.15;
      group.add(ring);
      ringTilts.push(ring.rotation.x);
    });

    // Handle full-screen resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const mobileCheck = width < 768;
      if (mobileCheck) {
        group.position.set(0, 0.5, -1.5);
        group.scale.set(1.2, 1.2, 1.2);
      } else {
        group.position.set(2.4, 0, 0);
        group.scale.set(1.8, 1.8, 1.8);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let t = 0;
    let raf: number;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        raf = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      if (!isVisible) return;
      raf = requestAnimationFrame(animate);
      t += 0.006;
      group.rotation.y = t * 0.15;
      group.rotation.x = Math.sin(t * 0.3) * 0.12;

      // Subtle starfield rotation
      starField.rotation.y = t * 0.02;
      starField.rotation.x = t * 0.01;

      moons.forEach((m, i) => {
        m.angle += m.speed * 0.008;
        const tilt = ringTilts[i];
        m.mesh.position.x = Math.cos(m.angle) * m.orb;
        m.mesh.position.y = Math.sin(m.angle) * m.orb * Math.sin(tilt);
        m.mesh.position.z = Math.sin(m.angle) * m.orb * Math.cos(tilt);
        m.mesh.scale.setScalar(1 + 0.08 * Math.sin(t * 2 + i));
      });

      core.rotation.y = t * 0.4;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(raf);

      // Thorough disposal of WebGL resources
      starGeo.dispose();
      starMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      moonGeometries.forEach((g) => g.dispose());
      moonMaterials.forEach((m) => m.dispose());
      ringGeometries.forEach((g) => g.dispose());
      ringMaterials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}