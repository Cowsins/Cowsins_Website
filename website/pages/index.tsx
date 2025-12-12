import { Tabs, Tab, Alert } from "@heroui/react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import CardScroller from "@/components/CardScroller";
import CowsinsAssets from "@/components/CowsinsAssets";
import CommunityAssets from "@/components/CommunityAssets";
import CowsinsAddons from "@/components/CowsinsAddons";
import FAQAccordion from "@/components/FAQAccordion";

import Footer from "../components/Footer";
import styles from "../styles/custom.module.css";

export default function IndexPage() {
  const [selected, setSelected] = React.useState("All");

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

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.backgroundContainer}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <video autoPlay loop muted className={styles.backgroundVideo}>
            <source src="Website2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.gradientOverlay} />
          <div className={styles.content}>
            <motion.div
              animate={{ y: 0 }}
              className="inline-block max-w-lg text-center justify-center mt-50"
              initial={{ y: 20 }}
              transition={{ duration: 1 }}
            >
              <img
                src="/Best-Development-Tool-Nomination-on-dark-background-_1_.webp"
                alt="Award nomination"
                className="mx-auto mb-7 w-24 max-w-full h-auto"
              />
              <motion.h1
                animate={{ scale: 1 }}
                className={title()}
                initial={{ scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  animate={{ scale: 1 }}
                  className={title({ color: "violet" })}
                  initial={{ scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  Award
                </motion.span>
                &nbsp;Winning
                <br />
                Unity Development Assets
              </motion.h1>
              <motion.h2
                animate={{ opacity: 1 }}
                className={subtitle({ class: "mt-4" })}
                initial={{ opacity: 0 }}
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
            animate={{ opacity: 1, y: 0 }}
            className={title()}
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
            style={{ marginTop: 25 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {getHeading()}
          </motion.h3>
        </AnimatePresence>

        <div
          className="flex w-full flex-col max-w-[1000px]"
          style={{
            marginTop: 25,
            marginBottom: 0,
            paddingBottom: 0,
            width: "100%",
          }}
        >
          <motion.div
            animate={{ opacity: 1 }}
            className="flex w-full flex-col max-w-[1000px]"
            initial={{ opacity: 0 }}
            style={{
              marginTop: 25,
              marginBottom: 0,
              paddingBottom: 0,
              width: "100%",
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Tabs
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key="All" title="All Assets">
                <motion.div
                  key={selected}
                  animate={{ opacity: 1 }}
                  className="mx-auto grid grid-cols-8 gap-8"
                  initial={{ opacity: 0 }}
                  style={{
                    marginTop: 25,
                    marginBottom: 0,
                    paddingBottom: 0,
                    width: "100%",
                  }}
                  transition={{ duration: 1, delay: 0.1 }}
                >
                  <CowsinsAssets />
                  <CommunityAssets />
                </motion.div>
              </Tab>

              <Tab key="Cowsins_Assets" title="Cowsins Assets">
                <motion.div
                  key={selected}
                  animate={{ opacity: 1 }}
                  className="mx-auto grid grid-cols-8 gap-8"
                  initial={{ opacity: 0 }}
                  style={{
                    marginTop: 25,
                    marginBottom: 0,
                    paddingBottom: 0,
                    width: "100%",
                  }}
                  transition={{ duration: 1, delay: 0.1 }}
                >
                  <CowsinsAssets />
                </motion.div>
              </Tab>

              <Tab key="Cowsins_Add-Ons" title="Cowsins Add-Ons">
                <Alert
                  color="primary"
                  title={`Official Add-Ons for Cowsins Packages`}
                />
                <motion.div
                  key={selected}
                  animate={{ opacity: 1 }}
                  className="mx-auto grid grid-cols-8 gap-8"
                  initial={{ opacity: 0 }}
                  style={{
                    marginTop: 25,
                    marginBottom: 0,
                    paddingBottom: 0,
                    width: "100%",
                  }}
                  transition={{ duration: 1, delay: 0.1 }}
                >
                  <CowsinsAddons />
                </motion.div>
              </Tab>
              <Tab key="Community" title="Community">
                <Alert
                  color="primary"
                  title={`Add-Ons made by members of the community for Cowsins Packages`}
                />
                <motion.div
                  key={selected}
                  animate={{ opacity: 1 }}
                  className="mx-auto grid grid-cols-8 gap-8"
                  initial={{ opacity: 0 }}
                  style={{
                    marginTop: 25,
                    marginBottom: 0,
                    paddingBottom: 0,
                    width: "100%",
                  }}
                  transition={{ duration: 1, delay: 0.1 }}
                >
                  <CommunityAssets />
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
          animate={{ opacity: 1, y: 0 }}
          className={title()}
          initial={{ opacity: 0, y: 20 }}
          style={{ marginTop: 50, marginBottom: 50 }}
          transition={{ delay: 1 }}
        >
          Frequently Asked Questions
        </motion.h3>

        <FAQAccordion />

        <motion.h3
          animate={{ opacity: 1, y: 0 }}
          className={title()}
          initial={{ opacity: 0, y: 20 }}
          style={{ marginTop: 50, marginBottom: 50 }}
          transition={{ delay: 1 }}
        >
          Explore Customer Testimonials
        </motion.h3>

        <CardScroller />
        <Footer />
      </section>
    </DefaultLayout>
  );
}
