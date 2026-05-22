import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component } from "react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

class WebGLBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("WebGL unavailable, using CSS particle fallback.", error);
  }

  render() {
    if (this.state.failed) {
      return <ParticleFallback />;
    }

    return this.props.children;
  }
}

function Network() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const pointer = useRef(new THREE.Vector3(0, 0, 0));
  const { mouse, viewport } = useThree();

  const particles = useMemo(() => {
    return Array.from({ length: 58 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 11,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 2,
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.002,
      ),
    }));
  }, []);

  const pointPositions = useMemo(() => new Float32Array(particles.length * 3), [particles.length]);
  const linePositions = useMemo(() => new Float32Array(particles.length * particles.length * 3), [particles.length]);

  useFrame(({ clock }) => {
    pointer.current.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0);
    let lineIndex = 0;

    particles.forEach((particle, index) => {
      const drift = Math.sin(clock.elapsedTime * 0.35 + index) * 0.0008;
      particle.position.add(particle.velocity);
      particle.position.x += drift;

      if (particle.position.x > 5.8) particle.position.x = -5.8;
      if (particle.position.x < -5.8) particle.position.x = 5.8;
      if (particle.position.y > 3.4) particle.position.y = -3.4;
      if (particle.position.y < -3.4) particle.position.y = 3.4;

      const pointerDistance = particle.position.distanceTo(pointer.current);
      if (pointerDistance < 1.8) {
        particle.position.lerp(pointer.current, -0.004);
      }

      pointPositions[index * 3] = particle.position.x;
      pointPositions[index * 3 + 1] = particle.position.y;
      pointPositions[index * 3 + 2] = particle.position.z;
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        if (particles[i].position.distanceTo(particles[j].position) < 1.25) {
          linePositions[lineIndex++] = particles[i].position.x;
          linePositions[lineIndex++] = particles[i].position.y;
          linePositions[lineIndex++] = particles[i].position.z;
          linePositions[lineIndex++] = particles[j].position.x;
          linePositions[lineIndex++] = particles[j].position.y;
          linePositions[lineIndex++] = particles[j].position.z;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length} array={pointPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#00e5cc" size={0.035} transparent opacity={0.92} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00e5cc" transparent opacity={0.18} />
      </lineSegments>
    </>
  );
}

export default function HeroParticleNetwork() {
  return (
    <div className="hero-particles" aria-hidden="true">
      <WebGLBoundary>
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.75]}>
          <Network />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}

function ParticleFallback() {
  return (
    <div className="particle-fallback">
      {Array.from({ length: 26 }, (_, index) => (
        <span key={index} style={{ "--i": index }} />
      ))}
    </div>
  );
}
