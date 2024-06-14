import { title, subtitle } from "@/components/primitives";
import styles from '../styles/custom.module.css';
import DefaultLayout from "@/layouts/default";
import { Button, Card, CardHeader, Image, CardFooter } from "@nextui-org/react";
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { Logo } from "@/components/icons";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const CardScroller = () => {
  const cards = [
    {author:"BiofrostStudio", title: "Great asset!", description: "Easy to use and understand. Developer responds very quickly on discord!" },
    {author:"Crygrace", title: "community is super helpful!", description: "it really is just drag and drop or just use the blank scene i have started many projects but i may actually complete one with this assets a lot of useful stuff! " },
    {author:"Codegit_09", title: "Fantastic", description: "If you want to make an FPS game in Unity, then this is a GREAT starting point, super simple to use and full of features. Did I say the author releases new features all the time and provides good support. 10/10" },
    {author:"Florecod000", title: "Amazing for New and Experienced Devs", description: "This asset is amazing for creating fps games, with a little unity knowledge, you can make some great fps games with this asset. I highly recommend purchasing this! " },
    {author:"Zexar98", title: "The best!", description: "Amazing job guys" },
    {author:"Thanhnhatff", title: "Very good", description: "easy to customize everything, easy to learn, worth the money" },
    {author:"AbstractAdz", title: "For any Devs who wants to make a FPS game... BUY IT!", description: "Lemme tell you, it has everything, movement, customisable weapons, etc, everything you need for your FPS game! Plus you can sell your game with this Asset the Creator told me so! Speaking of the Creator, My word... They are awesome!" },
    {author:"Reyespaz2005", title: "Really good, and really simple", description: "It's powerful, and very easy to use. Honestly I couldn't be happier with my purchase!" },
    {author:"ShinigamiYato", title: "BUY IT", description: "had this asset for about a year now and kinds forgot about it and just went back to developing smth with it and bro I forgot how nice this asset Is. clear development code is very easy to understand and very easy to build up on. ive tried a lot of a" },
    {author:"Brusn", title: "Wow - what an asset! Very clear/clean setup, yet tons of features.", description: "Grabbed it in the sale. Played with it for a day, have already got a prototype game running. Very clean setup and examples, things are easy to find, yet *many* features in there.  You've done a great job making this one, I can see why you're getting accolades for it. Easily worth it at full price." },
    {author:"Artifexwastaken", title: "This asset is hella juicy", description: "The Discord server has some nice guys and the support is fantastic and fast, It is really good to get started with game dev if you don't come from a software background. You have no requirement to write a single line of code unless you want to.  Completly Deserving of The Best Developer Tool award this year." },
    {author:"Prundev", title: "Best current FPS solution", description: "Was looking for an implementation of an FPS solution and after considering different options both paid and free, I discovered this asset while voting for the Unity awards where this asset also won Unity Best Development Tool 2023 award!" },
    {author:"JeppiLee", title: "Super strong FPS asset. Amazing support!", description: "Great documentation. Great access to community and incredible support." },
    {author:"Johnisawesome96", title: "This is amazing!", description: "It can be a little intimidating, as with anything. But this asset has incredible support and is a powerful tool.  " },
    {author:"Hrohibil", title: "Best FPS asset", description: "Search no more friends - If you really want to make that dream FPS game. Here is your chance. " },
    {author:"PapaSherbs", title: "Incredibly well fleshed out", description: "Well fleshed out with consistent updates. Easy to understand and implement. Great FPS controller" },
    {author:"StunkGames", title: "The best asset with the best and helpful discord", description: "Amazing " },
  ];
  const starStyle = {
    color: 'orange',
    marginRight: '5px', 
  };

  const stars = Array.from({ length: 5 }, (v, i) => (
    <FaStar key={i} style={starStyle} />
  ));

  return (
    <div className={styles.scrollerContainer}>
      <div className={styles.scroller}>
        {/* Duplicate cards to create a looping effect */}
        {cards.map((card, index) => (
         <Card key={index} className={`${styles.scrollerCard} ${styles.customCard}`} style={{ padding: "20px", paddingTop: "20px", position: "relative" }}>
         <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
           <h4>{card.author}</h4>
           <div style={{ width: 10 }}></div>
           {stars}
         </div>
         
         <div style={{ whiteSpace: 'pre-wrap', marginTop: "10px" }}>{card.title}</div>
         <div style={{ whiteSpace: 'pre-wrap', marginTop: "10px", opacity: "0.5" }}>{card.description}</div>
       
         {/* Gradient overlay */}
         <div style={{
           position: "absolute",
           bottom: 0,
           left: 0,
           width: "100%",
           height: "50%",
           backgroundImage: "linear-gradient(to bottom, rgba(32, 28, 28, 0), rgba(32, 28, 28, 1))",
           pointerEvents: "none"  // This ensures the gradient doesn't interfere with mouse events
         }}></div>
       </Card>
       
        ))}
        {/* Duplicate cards to create a looping effect */}
        {cards.map((card, index) => (
         <Card key={index} className={`${styles.scrollerCard} ${styles.customCard}`} style={{ padding: "20px", paddingTop: "20px", position: "relative" }}>
         <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
           <h4>{card.author}</h4>
           <div style={{ width: 10 }}></div>
           {stars}
         </div>
         
         <div style={{ whiteSpace: 'pre-wrap', marginTop: "10px" }}>{card.title}</div>
         <div style={{ whiteSpace: 'pre-wrap', marginTop: "10px", opacity: "0.5" }}>{card.description}</div>
       
         {/* Gradient overlay */}
         <div style={{
           position: "absolute",
           bottom: 0,
           left: 0,
           width: "100%",
           height: "50%",
           backgroundImage: "linear-gradient(to bottom, rgba(32, 28, 28, 0), rgba(32, 28, 28, 1))",
           pointerEvents: "none"  // This ensures the gradient doesn't interfere with mouse events
         }}></div>
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <motion.div className={styles.backgroundContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
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
              &nbsp;Winning<br />
              Game Development Assets
            </motion.h1>
            <motion.h2 
              className={subtitle({ class: "mt-4" })} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
            >
              Cowsins helps Unity game developers all over the world to create their Dream Games
            </motion.h2>
          </motion.div>

          </div>
        </motion.div>

        <motion.h3 className={title()} style={{ marginTop: 25 }} initial={{ opacity: 0, y: 20  }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>Discover the Assets</motion.h3>
        <div className="max-w-[2000px] gap-1 grid grid-cols-12 grid-rows-2 px-6" style={{ marginTop: 50, marginBottom: 0, paddingBottom: 0}}>
        <motion.div onClick={() => window.open(siteConfig.links.fpsengine, '_blank')}className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"whileHover={{ scale: 0.95 }}transition={{ duration: .4 }}>
        <Card className="h-full w-full">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Best Seller</p>
              <h4 className="text-white font-medium text-large">FPS Engine</h4>
            </CardHeader>
            <Image isZoomed removeWrapper alt="Card background" className="z-0 w-full h-full object-cover" src="fps-engine.png" />
            <Image removeWrapper alt="Card background" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" src="FPS_Engine_Logo_White.png" width="80%" />
            <Image removeWrapper alt="Top right corner image" className="absolute top-0 right-0 m-5 z-20 pointer-events-none" src="Best Development Tool Nomination on dark background (1).png" style={{ width: '10%', borderRadius: '0' }} />
          </Card>
          </motion.div>
          <motion.div onClick={() => window.open(siteConfig.links.platformerengine, '_blank')}className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"   whileHover={{ scale: 0.95 }} transition={{ duration: .4  }}>
            <Card className="h-full w-full">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Latest Release</p>
                <h4 className="text-white font-medium text-large">Platformer Engine</h4>
              </CardHeader>
              <Image isZoomed removeWrapper alt="Card background" className="z-0 w-full h-full object-cover" src="2d-engine.png" />
              <Image removeWrapper alt="Card background" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" src="PlatformerEngine.png" width="80%" />
            </Card>
          </motion.div>

          <motion.div onClick={() => window.open(siteConfig.links.bullethellengine, '_blank')}className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer" 
               whileHover={{ scale: 0.95 }}transition={{ duration: .4  }}>
          <Card className="h-full w-full">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <h4 className="text-white font-medium text-large">Bullet Hell Engine</h4>
            </CardHeader>
            <Image isZoomed removeWrapper alt="Card background" className="z-0 w-full h-full object-cover" src="BulletHellEngine.png" />
            <Image removeWrapper alt="Card background" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" src="BulletHellEngineLogo.png" width="80%" />
          </Card>
   
        </motion.div>

        </div>
        <motion.h3  className={title()}  style={{ marginTop: isMobile ? 25 : -250, textAlign:"center" }} 
        initial={{ opacity: 0, y: 20  }} animate={{ opacity: 0.5, y: 0 }} transition={{ delay: 1 }}>Community Packages</motion.h3>

        <motion.div 
          onClick={() => window.open(siteConfig.links.bullethellengine, '_blank')} 
          className="max-w-[900px] gap-2 grid grid-rows-2 px-8 cursor-pointer"  
          style={{ marginTop: 25, textAlign: "center" }}
          whileHover={{ scale: 0.95 }} 
          transition={{ duration: 0.4 }}
        >
          <Card isFooterBlurred className="w-full h-[250px] col-span-12 sm:col-span-7 relative overflow-hidden group cursor-pointer">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">FPS Engine Add-On</p>
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
                  <p className="text-tiny text-white/60">Created by Comrad Elmo</p>
                </div>
              </div>
              <Button radius="full" size="sm">Get Add-On</Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.h3 className={title()}  style={{ marginTop: -175, textAlign:"center" }}  initial={{ opacity: 0, y: 20  }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>Explore Customer Testimonials</motion.h3>

        <CardScroller />

        <footer className="flex flex-col items-center justify-center py-4 text-gray-600 text-sm">
          <Logo /> 
          <p style={{marginTop: 30}}>&copy; 2024 Cowsins. All rights reserved.</p>
        </footer>
      </section>
    </DefaultLayout>
  );
}