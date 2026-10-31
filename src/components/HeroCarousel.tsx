import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type CityLabelTone = "dark" | "yellow";

type CitySlide = {
  src: string;
  city: string;
  labelTone: CityLabelTone;
};

const slides: CitySlide[] = [
  { src: "/placeholder.svg", city: "Sarajevo", labelTone: "dark" },
  { src: "/placeholder.svg", city: "Banja Luka", labelTone: "yellow" },
  { src: "/placeholder.svg", city: "Tuzla", labelTone: "dark" },
  { src: "/placeholder.svg", city: "Zenica", labelTone: "dark" },
  { src: "/placeholder.svg", city: "Bihać", labelTone: "dark" },
  { src: "/placeholder.svg", city: "Bijeljina", labelTone: "dark" },
  { src: "/placeholder.svg", city: "Brčko", labelTone: "dark" },
  { src: "/placeholder.svg", city: "Trebinje", labelTone: "dark" },
  { src: "/placeholder.svg", city: "Smetovi", labelTone: "dark" },
];

type HeroCarouselProps = {
  className?: string;
  onToneChange?: (tone: CityLabelTone) => void;
};

export const HeroCarousel = ({ className = "", onToneChange }: HeroCarouselProps) => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      onSwiper={(swiper) => onToneChange?.(slides[swiper.realIndex]?.labelTone || "dark")}
      onSlideChange={(swiper) => onToneChange?.(slides[swiper.realIndex]?.labelTone || "dark")}
      className={`absolute inset-0 w-full h-full ${className}`}
    >
      {slides.map((s) => (
        <SwiperSlide key={s.city}>
          <img
            src={s.src}
            alt={`${s.city}, Bosna i Hercegovina`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className={`absolute bottom-4 right-4 z-10 rounded-full px-4 py-1.5 text-sm font-bold shadow-md backdrop-blur-md ${
              s.labelTone === "yellow" ? "bg-foreground/90 text-gold" : "bg-card/90 text-foreground"
            }`}
          >
            {s.city}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
