import { useCallback } from "react";
import Particles from "@tsparticles/react";

export default function ParticleBackground() {
  const particlesInit = useCallback((engine) => {
    console.log("Particles Engine Initialized:", engine); // Optional logging for debugging
  }, []);

  const particlesLoaded = useCallback((container) => {
    console.log("Particles Loaded:", container); // Check if loaded properly
  }, []);

  const options = {
    background: {
      color: { value: "#1e1e1e" },
    },
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: "#4e9af1" },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
      opacity: { value: 0.5 },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
    fpsLimit: 120,
  };

  return (
    <Particles id="particles" init={particlesInit} loaded={particlesLoaded} options={options} />
  );
}
