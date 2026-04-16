interface SectionFadeProps {
  topColor: string;
  bottomColor: string;
}

export default function SectionFade({ topColor, bottomColor }: SectionFadeProps) {
  return (
    <div
      className="-mb-px -mt-px"
      style={{
        height: "clamp(80px, 10vw, 160px)",
        background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`,
      }}
    />
  );
}
