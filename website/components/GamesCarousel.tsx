import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const cards = [
  {
    title: "Voidside",
    author: "Spacecorn",
    background:
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2246740/header.jpg?t=1745159629",
    link: "https://store.steampowered.com/app/2246740/Voidside/",
  },
  {
    title: "High Fructose",
    author: "Chazak Games",
    background:
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2506550/header.jpg?t=1744123320",
    link: "https://store.steampowered.com/app/2506550/High_Fructose/",
  },
  {
    title: "Dreadfire",
    author: "Ryan Cho",
    background:
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1872410/header.jpg?t=1743738313",
    link: "https://store.steampowered.com/app/1872410/Dreadfire/",
  },
  {
    title: "Unannounced Title",
    author: "DrakonFox",
    background:
      "https://media.discordapp.net/attachments/1040388933764251708/1293149645098455102/image.png?ex=681a8534&is=681933b4&hm=fd80afec85eea52fdf06e949441a1a63d4aac17282657c74439009e3a127127c&=&format=webp&quality=lossless",
    link: "https://store.steampowered.com/app/1872410/Dreadfire/",
  },
];

const GamesCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [x, setX] = useState(0);
  const requestRef = useRef<number>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const speed = isHovered ? 0.05 : 0.25;

  const animate = () => {
    setX((prev) => {
      const next = prev - speed;
      if (next <= -(cards.length * 200)) {
        return 0;
      }
      return next;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isHovered]);

  return (
    <div
      className="w-full h-[350px] overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIndex(null);
      }}
    >
      <div className="pointer-events-none absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div className="flex gap-4 absolute" style={{ x }}>
        {cards.concat(cards).map((card, index) => {
          const isCardHovered = hoveredIndex === index;
          return (
            <a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative min-w-[480px] h-[310px] rounded-xl overflow-hidden text-white text-xl bg-cover bg-center flex items-center justify-center transition-transform duration-300"
              style={{ backgroundImage: `url(${card.background})` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10 bg-black bg-opacity-60 p-4 rounded text-center">
                <div className="text-2xl font-bold">{card.title}</div>
                <div className="text-sm mt-2 text-gray-300">{card.author}</div>
              </div>
            </a>
          );
        })}
      </motion.div>
    </div>
  );
};

export default GamesCarousel;
