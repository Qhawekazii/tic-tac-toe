import { useEffect, useRef } from "react";

// How the network looks. Tweak these to change the vibe.
const DOT_COUNT = 70;
const LINK_DISTANCE = 140; // dots closer than this get a line between them
const SPEED = 0.35;
const PINK = "255, 46, 151";
const BLUE = "41, 211, 255";

// A full-screen <canvas> behind the app that draws floating dots
// connected by glowing lines, like a network map.
export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    // make the canvas the same size as the window
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // create the dots at random positions, moving in random directions
    const dots = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * SPEED * 2,
        dy: (Math.random() - 0.5) * SPEED * 2,
        color: i % 2 === 0 ? PINK : BLUE,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // lines: the closer two dots are, the brighter the line
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const distance = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (distance < LINK_DISTANCE) {
            const opacity = 1 - distance / LINK_DISTANCE;
            ctx.strokeStyle = `rgba(${dots[i].color}, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const dot of dots) {
        ctx.fillStyle = `rgb(${dot.color})`;
        ctx.shadowColor = `rgb(${dot.color})`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function moveDots() {
      for (const dot of dots) {
        dot.x += dot.dx;
        dot.y += dot.dy;
        // bounce off the edges of the screen
        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
      }
    }

    function loop() {
      moveDots();
      draw();
      animationId = requestAnimationFrame(loop);
    }

    // respect people who turned off animations in their system settings
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      draw();
    } else {
      loop();
    }

    // clean up when the component goes away
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-bg" aria-hidden="true" />;
}
