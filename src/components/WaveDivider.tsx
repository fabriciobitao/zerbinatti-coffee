interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
}

export default function WaveDivider({ topColor, bottomColor }: WaveDividerProps) {
  return (
    <div className="relative -mb-px -mt-px" style={{ backgroundColor: bottomColor }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: "clamp(60px, 8vw, 120px)" }}
      >
        <path
          d="M0,0 L0,40 C240,110 480,20 720,70 C960,120 1200,30 1440,60 L1440,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
}
