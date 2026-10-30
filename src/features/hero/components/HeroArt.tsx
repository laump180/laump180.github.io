import heroRuins from '@/shared/assets/images/hero/hero-ruins.webp'
import heroRuins2x from '@/shared/assets/images/hero/hero-ruins@2x.webp'

/**
 * Ilustración del hero. En móvil va arriba y se funde hacia abajo;
 * en escritorio ocupa la derecha y se funde a negro hacia la izquierda.
 */
export function HeroArt() {
  return (
    <div
      aria-hidden
      className="relative h-64 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)] sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[64%] lg:[mask-image:linear-gradient(to_right,transparent,black_22%)]"
    >
      <img
        src={heroRuins}
        srcSet={`${heroRuins} 976w, ${heroRuins2x} 1952w`}
        sizes="(min-width: 1024px) 64vw, 100vw"
        alt=""
        width={976}
        height={376}
        fetchPriority="high"
        className="size-full object-cover object-[30%_center] lg:object-left"
      />
    </div>
  )
}
