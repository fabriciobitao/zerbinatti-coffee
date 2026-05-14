import CinemaShell from "@/components/cinema/CinemaShell";
import Hero from "@/components/cinema/Hero";
import Manifesto from "@/components/cinema/Manifesto";
import Linhagem from "@/components/cinema/Linhagem";
import Mapa from "@/components/cinema/Mapa";
import Notas from "@/components/cinema/Notas";
import Outro from "@/components/cinema/Outro";

export default function CinemaPage() {
  return (
    <CinemaShell>
      <Hero />
      <Manifesto />
      <Linhagem />
      <Mapa />
      <Notas />
      <Outro />
    </CinemaShell>
  );
}
