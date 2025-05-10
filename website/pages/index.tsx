import { title, subtitle } from "@/components/primitives";
import styles from "../styles/custom.module.css";
import DefaultLayout from "@/layouts/default";
import {Tabs, Tab, Alert, useDisclosure} from "@nextui-org/react";
import React from "react";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import CardScroller from "@/components/CardScroller";
import CowsinsAssets from "@/components/CowsinsAssets";
import CommunityAssets from "@/components/CommunityAssets";
import CowsinsAddons from "@/components/CowsinsAddons";
import GamesCarousel from "@/components/GamesCarousel";
import AssetDrawer from "@/components/AssetDrawer";
import FAQAccordion from "@/components/FAQAccordion";

export default function IndexPage() {
  const [selected, setSelected] = React.useState("All");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeAssetKey, setActiveAssetKey] = React.useState<string | null>(null);

  const getHeading = () => {
    switch (selected) {
      case "All":
        return "Discover All Assets";
      case "Cowsins_Assets":
        return "Discover Cowsins Assets";
      case "Cowsins_Add-Ons":
        return "Discover Official Cowsins Add-Ons";
      case "Community":
        return "Discover Community Add-Ons";
      default:
        return "";
    }
  };

  const handleCardClick = (key: string) => {
    setActiveAssetKey(key);
    onOpen();
  };
  
  return (
    <DefaultLayout>
      <AssetDrawer isOpen={isOpen} onClose={onClose} assetKey={activeAssetKey} />
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

        <AnimatePresence mode="wait">
          <motion.h3
            key={selected}
            className={title()}
            style={{ marginTop: 25 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {getHeading()}
          </motion.h3>
        </AnimatePresence>



        <div className="flex w-full flex-col max-w-[1000px]" 
          style={{
            marginTop: 25,
            marginBottom: 0,
            paddingBottom: 0,
            width: "100%",
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex w-full flex-col max-w-[1000px]"
              style={{
                marginTop: 25,
                marginBottom: 0,
                paddingBottom: 0,
                width: "100%",
              }}
            >
          <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected}>

            <Tab key="All" title="All Assets">
            <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="mx-auto grid grid-cols-8 gap-8"
                style={{
                  marginTop: 25,
                  marginBottom: 0,
                  paddingBottom: 0,
                  width: "100%",
                }}
              >
              <CowsinsAssets  onCardClick={handleCardClick}/>
              <CommunityAssets  onCardClick={handleCardClick}/>
              </motion.div>
            </Tab>

            <Tab key="Cowsins_Assets" title="Cowsins Assets">
            <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="mx-auto grid grid-cols-8 gap-8"
                style={{
                  marginTop: 25,
                  marginBottom: 0,
                  paddingBottom: 0,
                  width: "100%",
                }}
              >
            <CowsinsAssets onCardClick={handleCardClick}/>
            </motion.div>
            </Tab>

            <Tab key="Cowsins_Add-Ons" title="Cowsins Add-Ons">
            <Alert
                  color="primary"
                  title={`Official Add-Ons for Cowsins Packages`}
                />
                <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="mx-auto grid grid-cols-8 gap-8"
                style={{
                  marginTop: 25,
                  marginBottom: 0,
                  paddingBottom: 0,
                  width: "100%",
                }}
              >
              <CowsinsAddons onCardClick={handleCardClick}/>
              </motion.div>
            </Tab>
            <Tab key="Community" title="Community">
              <Alert
                  color="primary"
                  title={`Add-Ons made by members of the community for Cowsins Packages`}
                  />
             <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="mx-auto grid grid-cols-8 gap-8"
                style={{
                  marginTop: 25,
                  marginBottom: 0,
                  paddingBottom: 0,
                  width: "100%",
                }}
              >
              <CommunityAssets onCardClick={handleCardClick}/>
              </motion.div>
            </Tab>
          </Tabs>
          </motion.div>
        </div>
{/*
        <motion.h3
          className={title()}
          style={{ marginTop: 50, marginBottom: 50 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Games made with Cowsins Packages
        </motion.h3>
        <GamesCarousel/>
*/}   
        
        <motion.h3
          className={title()}
          style={{ marginTop: 50, marginBottom: 50 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Frequently Asked Questions
        </motion.h3>

        <FAQAccordion/>

      
        <motion.h3
          className={title()}
          style={{ marginTop: 50, marginBottom: 50 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Explore Customer Testimonials
        </motion.h3>

        <CardScroller/>
        <Footer/>
        
      </section>
    </DefaultLayout>
  );
}
