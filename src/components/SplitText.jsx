// SplitText.jsx
import { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

export default function SplitText({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      containerRef.current.style.visibility = "visible";

      const { words } = splitText(
        containerRef.current.querySelector("h1")
      );

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    });
  }, []);

  return (
    <div className="split-container" ref={containerRef}>
      <h1 className="split-heading">{text}</h1>
      <style>{`
        .split-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          text-align: left;
          visibility: hidden;
          font-size: 1.125rem;
          color: #facc15; /* Tailwind yellow-400 */
        }
        .split-word {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
