import { Hero, type HeroProps } from "@/components/ui/animated-hero"

function HeroDemo(props: HeroProps) {
  return (
    <div className="block">
      <Hero {...props} />
    </div>
  );
}

export { HeroDemo };
