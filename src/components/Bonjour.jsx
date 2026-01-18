export default function Bonjour() {
  return (
    /* w-full makes it span the container; max-w sets a desktop limit */
    <div className="bonjour-container w-full max-w-4xl mx-auto px-4">
      <svg 
        viewBox="0 0 600 200"  // Tightened viewBox to remove dead space
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto block"
      >
        <text 
          x="50%" 
          y="50%" 
          textAnchor="middle" 
          dominantBaseline="middle" 
          className="bonjour-text"
          /* Note: SVG text size is relative to the viewBox, not the screen */
          
        >
          Bonjour
        </text>
      </svg>
    </div>
  );
}