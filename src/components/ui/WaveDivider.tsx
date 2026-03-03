interface WaveDividerProps {
  /** Fill color of the wave shape (should match the section below) */
  fill?: string
  /** Background color behind the wave (should match the section above) */
  bg?: string
  /** Flip the wave vertically */
  flip?: boolean
  className?: string
}

/**
 * Smooth SVG wave that creates a organic transition between two sections.
 * Place it at the boundary between sections.
 *
 *   <WaveDivider fill="#5F3C20" bg="#E4E1D8" />
 *   — renders a wave whose "fill" color rises up into the bg-colored section above.
 */
export default function WaveDivider({ fill = '#5F3C20', bg = '#E4E1D8', flip = false, className = '' }: WaveDividerProps) {
  return (
    <div
      className={`relative overflow-hidden leading-none ${className}`}
      style={{ background: bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-12 sm:h-16 lg:h-20"
        style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      >
        {/* First wave layer — slightly transparent for depth */}
        <path
          d="M0,36 C200,72 400,0 600,36 C800,72 1000,10 1200,40 C1310,55 1380,30 1440,36 L1440,72 L0,72 Z"
          fill={fill}
          fillOpacity="0.35"
        />
        {/* Second wave layer — solid, slightly offset for a layered look */}
        <path
          d="M0,48 C180,20 360,64 540,44 C720,24 900,60 1080,44 C1260,28 1360,52 1440,48 L1440,72 L0,72 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
