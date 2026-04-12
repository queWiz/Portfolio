"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    // Widened camera angle slightly to fit the massive shape
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    
    // FIX 2: Shift the 3D object to the right in 3D Space, NOT HTML Space!
    group.position.set(2.5, 0, 0); 
    group.scale.set(1.8, 1.8, 1.8); 
    scene.add(group);

    const CREAM = 0xf5f0e8;
    const GREEN = 0x86efac;
    const LAVENDER = 0xc4b5fd;
    const AMBER = 0xfbbf24;

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 16),
      new THREE.MeshBasicMaterial({ color: CREAM, wireframe: true, transparent: true, opacity: 0.25 })
    );
    group.add(core);

    const moonData =[
      { col: GREEN, r: 0.18, orb: 1.5, speed: 0.7, phase: 0 },
      { col: LAVENDER, r: 0.14, orb: 2.1, speed: 0.45, phase: 2.1 },
      { col: AMBER, r: 0.12, orb: 2.6, speed: 0.3, phase: 4.2 },
      { col: CREAM, r: 0.09, orb: 1.8, speed: 1.1, phase: 1.0 },
    ];

    const moons = moonData.map((d) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.r, 12, 12),
        new THREE.MeshBasicMaterial({ color: d.col })
      );
      group.add(mesh);
      return { mesh, ...d, angle: d.phase };
    });

    const ringTilts: number[] = [];[1.5, 2.1, 2.6, 1.8].forEach((rad, i) => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(rad - 0.008, rad + 0.008, 64),
        new THREE.MeshBasicMaterial({
          color:[GREEN, LAVENDER, AMBER, CREAM][i],
          transparent: true, opacity: 0.15, side: THREE.DoubleSide,
        })
      );
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
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);

    let t = 0;
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.006; // Slightly slower, more majestic rotation
      group.rotation.y = t * 0.15;
      group.rotation.x = Math.sin(t * 0.3) * 0.12;
      
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
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
      renderer.dispose();
    };
  },[]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}