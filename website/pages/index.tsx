import { title, subtitle } from "@/components/primitives";
import styles from "../styles/custom.module.css";
import DefaultLayout from "@/layouts/default";
import { Button, Card, CardHeader, Image, CardFooter } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Logo } from "@/components/icons";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cards } from "../utils/cardsData"; 

const CardScroller = () => {
  
  const starStyle = {
    color: "orange",
    marginRight: "5px",
  };

  const stars = Array.from({ length: 5 }, (v, i) => (
    <FaStar key={i} style={starStyle} />
  ));

  return (
    <div className={styles.scrollerContainer}>
      <div className={styles.scroller}>
        {/* Duplicate cards to create a looping effect */}
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`${styles.scrollerCard} ${styles.customCard}`}
            style={{
              padding: "20px",
              paddingTop: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h4>{card.author}</h4>
              <div style={{ width: 10 }}></div>
              {stars}
            </div>

            <div style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              {card.title}
            </div>
            <div
              style={{
                whiteSpace: "pre-wrap",
                marginTop: "10px",
                opacity: "0.5",
              }}
            >
              {card.description}
            </div>

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                backgroundImage:
                  "linear-gradient(to bottom, rgba(32, 28, 28, 0), rgba(32, 28, 28, 1))",
                pointerEvents: "none", // This ensures the gradient doesn't interfere with mouse events
              }}
            ></div>
          </Card>
        ))}
        {/* Duplicate cards to create a looping effect */}
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`${styles.scrollerCard} ${styles.customCard}`}
            style={{
              padding: "20px",
              paddingTop: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h4>{card.author}</h4>
              <div style={{ width: 10 }}></div>
              {stars}
            </div>

            <div style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              {card.title}
            </div>
            <div
              style={{
                whiteSpace: "pre-wrap",
                marginTop: "10px",
                opacity: "0.5",
              }}
            >
              {card.description}
            </div>

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                backgroundImage:
                  "linear-gradient(to bottom, rgba(32, 28, 28, 0), rgba(32, 28, 28, 1))",
                pointerEvents: "none", // This ensures the gradient doesn't interfere with mouse events
              }}
            ></div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default function IndexPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <motion.div
          className={styles.backgroundContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video className={styles.backgroundVideo} autoPlay muted loop>
            <source src="Website2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.gradientOverlay}></div>
          <div className={styles.content}>
            <motion.div
              className="inline-block max-w-lg text-center justify-center mt-50"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className={title()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className={title({ color: "violet" })}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Award
                </motion.span>
                &nbsp;Winning
                <br />
                Unity Development Assets
              </motion.h1>
              <motion.h2
                className={subtitle({ class: "mt-4" })}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Cowsins helps Unity game developers all over the world to create
                their Dream Games
              </motion.h2>
            </motion.div>
          </div>
        </motion.div>

        <motion.h3
          className={title()}
          style={{ marginTop: 25 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Discover the Assets
        </motion.h3>
        <div
          className="max-w-[2000px] gap-1 grid grid-cols-12 grid-rows-2 px-6"
          style={{ marginTop: 50, marginBottom: 0, paddingBottom: 0 }}
        >
          <motion.div
            onClick={() => window.open(siteConfig.links.fpsengine, "_blank")}
            className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full w-full">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Best Seller
                </p>
                <h4 className="text-white font-medium text-large">
                  FPS Engine
                </h4>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="fps-engine.webp"
              />
              <Image
                removeWrapper
                alt="Card background"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                src="FPS_Engine_Logo_White.webp"
                width="80%"
              />
              <Image
                removeWrapper
                alt="Top right corner image"
                className="absolute top-0 right-0 m-5 z-20 pointer-events-none"
                src="Best-Development-Tool-Nomination-on-dark-background-_1_.webp"
                style={{ width: "15%", borderRadius: "0" }}
              />
            </Card>
          </motion.div>
          <motion.div
            onClick={() =>
              window.open(siteConfig.links.platformerengine, "_blank")
            }
            className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full w-full">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Latest Release
                </p>
                <h4 className="text-white font-medium text-large">
                  Platformer Engine
                </h4>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="2d-engine.webp"
              />
              <Image
                removeWrapper
                alt="Card background"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                src="PlatformerEngine.webp"
                width="80%"
              />
            </Card>
          </motion.div>

          <motion.div
            onClick={() =>
              window.open(siteConfig.links.bullethellengine, "_blank")
            }
            className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full w-full">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <h4 className="text-white font-medium text-large">
                  Bullet Hell Engine
                </h4>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="BulletHellEngine.webp"
              />
              <Image
                removeWrapper
                alt="Card background"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                src="BulletHellEngineLogo.webp"
                width="80%"
              />
            </Card>
          </motion.div>
        </div>
        <motion.h3
          className={title()}
          style={{ marginTop: isMobile ? 25 : -250, textAlign: "center" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1 }}
        >
          Community Packages
        </motion.h3>

        <motion.div
          onClick={() =>
            window.open(siteConfig.links.cowsinai, "_blank")
          }
          className="max-w-[900px] gap-2 grid grid-rows-2 px-8 cursor-pointer"
          style={{ marginTop: 25, textAlign: "center" }}
          whileHover={{ scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            isFooterBlurred
            className="w-full h-[250px] col-span-12 sm:col-span-7 relative overflow-hidden group cursor-pointer"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                FPS Engine Add-On
              </p>
              <h4 className="text-white/90 font-medium text-xl">Cowsins AI</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://public-files.gumroad.com/kjjbk86jfi1iif5t05zmxpirsu5s"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">
                    Created by Comrad Elmo
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Get Add-On
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.h3
          className={title()}
          style={{ marginTop: -200, textAlign: "center" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Explore Customer Testimonials
        </motion.h3>

        <CardScroller />

        <footer className="flex flex-col items-center justify-center py-4 text-gray-600 text-sm">
          <Logo />
          <p style={{ marginTop: 30 }}>
            &copy; 2024 Cowsins. All rights reserved.
          </p>
        </footer>
      </section>
    </DefaultLayout>
  );
}
