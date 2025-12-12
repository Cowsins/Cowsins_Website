import { Accordion, AccordionItem, Button } from "@heroui/react";

import { siteConfig } from "@/config/site";

import { DiscordIcon } from "./icons";

const FAQAccordion = () => {
  return (
    <Accordion variant="splitted">
      <AccordionItem
        key="2"
        aria-label="Support FAQ"
        title="Where can I get support if I need help?"
      >
        At Cowsins, we want to offer the best experience for all members of our
        community. If you ever need assistance or run into any issues, don&apos;t
        hesitate to contact us via Discord or email. Discord is the preferred
        method for quicker responses. If you reach out via email, please be sure
        to include your Order/Invoice ID for faster support.
        <br />
        <br />
        <a href={siteConfig.links.discord}>
          <Button>
            <DiscordIcon className="text-default-500" />
            Discord
          </Button>
        </a>
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Publishing FAQ"
        title="Can I create and publish games using Cowsins Packages?"
      >
        Yes, absolutely! Cowsins Assets are designed to empower game developers
        to create amazing games. You&apos;re free to use the assets in your projects
        and publish your games commercially on any platform of your choice.
        Please note that for licensing and copyright purposes, you should only
        distribute your games, not the individual assets.
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Credit FAQ"
        title="Do I need to credit Cowsins in my game?"
      >
        Credit is not required, but it is always appreciated! If you&apos;d like to
        acknowledge Cowsins or the specific packages you&apos;ve used in your game,
        we&apos;d be grateful for the mention.
      </AccordionItem>
    </Accordion>
  );
};

export default FAQAccordion;
