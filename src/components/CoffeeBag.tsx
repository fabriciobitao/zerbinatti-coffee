"use client";

interface CoffeeBagProps {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}

export default function CoffeeBag({ size = "md", className = "" }: CoffeeBagProps) {
  const sizes = {
    sm: { wrapper: "w-[140px]", bag: "h-[180px]", top: "h-[30px]" },
    md: { wrapper: "w-[200px]", bag: "h-[260px]", top: "h-[40px]" },
    lg: { wrapper: "w-[260px]", bag: "h-[340px]", top: "h-[50px]" },
    hero: { wrapper: "w-[320px]", bag: "h-[420px]", top: "h-[60px]" },
  };

  const s = sizes[size];

  return (
    <div className={`${s.wrapper} ${className}`}>
      {/* Bag container with 3D perspective */}
      <div className="relative" style={{ perspective: "800px" }}>
        {/* Top fold / seal */}
        <div
          className={`relative mx-auto w-[85%] ${s.top} rounded-t-lg`}
          style={{
            background: "linear-gradient(180deg, #8B7355 0%, #A0896B 40%, #C4A67D 100%)",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {/* Fold lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-900/20" />
          <div className="absolute bottom-[30%] left-[10%] right-[10%] h-px bg-amber-900/10" />
          {/* Crimp pattern */}
          <div
            className="absolute top-0 left-0 right-0 h-[40%]"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(139,115,85,0.3) 4px, rgba(139,115,85,0.3) 5px)",
            }}
          />
        </div>

        {/* Main bag body */}
        <div
          className={`relative mx-auto w-full ${s.bag} overflow-hidden rounded-b-lg`}
          style={{
            background: "linear-gradient(135deg, #D4B896 0%, #C4A67D 25%, #B8956A 50%, #C4A67D 75%, #D4B896 100%)",
            boxShadow:
              "4px 4px 20px rgba(0,0,0,0.3), -2px 0 10px rgba(0,0,0,0.1), inset 2px 0 8px rgba(255,255,255,0.1), inset -3px 0 8px rgba(0,0,0,0.08)",
            transform: "rotateY(-3deg)",
          }}
        >
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Left edge shadow (depth) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[8%]"
            style={{
              background: "linear-gradient(90deg, rgba(0,0,0,0.12) 0%, transparent 100%)",
            }}
          />

          {/* Right edge highlight */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[5%]"
            style={{
              background: "linear-gradient(270deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
            }}
          />

          {/* Center highlight (volume) */}
          <div
            className="absolute top-0 bottom-0 left-[35%] w-[20%]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />

          {/* Label image */}
          <div className="absolute inset-[8%] flex items-center justify-center">
            <img
              src="/images/rotulo-500g.png"
              alt="Zerbinatti Caffè - 500g"
              className="h-full w-full object-contain drop-shadow-sm"
            />
          </div>

          {/* Bottom gusset shadow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[10%]"
            style={{
              background: "linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 100%)",
            }}
          />

          {/* Side crease lines */}
          <div
            className="absolute left-[6%] top-[5%] bottom-[5%] w-px"
            style={{ background: "rgba(0,0,0,0.06)" }}
          />
          <div
            className="absolute right-[6%] top-[5%] bottom-[5%] w-px"
            style={{ background: "rgba(0,0,0,0.04)" }}
          />
        </div>

        {/* Shadow underneath */}
        <div
          className="mx-auto mt-1 h-3 w-[90%] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
