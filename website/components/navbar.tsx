import {
  Button,
  Link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Tooltip,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import NextLink from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { TwitterIcon, DiscordIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openCowsinsAIDocs = () => {
    window.open("https://cowsins-ai.gitbook.io/cowsins-ai", "_blank");
  };

  const openFPSEngineDocs = () => {
    window.open(
      "https://cowsinss-organization.gitbook.io/fps-engine-documentation",
      "_blank",
    );
  };

  const openLilith = () => {
    window.open(
      "https://store.steampowered.com/app/3236340/Liliths_Game/",
      "_blank",
    );
  };

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Offline Documentation
              </ModalHeader>
              <ModalBody>
                <p>
                  {" "}
                  You can find the documentation for this package in the
                  included files.
                </p>
                <p className="opacity-50">
                  Public online documentation for this package is currently
                  being developed and will be available soon.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
            </NextLink>
            <div style={{ width: 20 }} />
          </NavbarBrand>
          <div className="hidden md:flex justify-start">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Assets</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
                variant="faded"
              >
                <DropdownSection showDivider title="Unity">
                  <DropdownItem
                    key="fpsengine"
                    description="15th Unity Awards Winner"
                  >
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.fpsengine}
                    >
                      FPS Engine
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key="platformerengine"
                    description="Latest release"
                  >
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.platformerengine}
                    >
                      Platformer Engine
                    </Link>
                  </DropdownItem>

                  <DropdownItem key="bullethellengine">
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.bullethellengine}
                    >
                      Bullet Hell Engine
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key="inventoryproaddon"
                    description="Latest Release"
                  >
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.bullethellengine}
                    >
                      Inventory Pro Add-On
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="saveload" description="Latest release">
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.platformerengine}
                    >
                      Save & Load Add-On
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key="inspector"
                    description="Coming Soon"
                    style={{ opacity: 0.5 }}
                  >
                    Cowins Inspector
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Community">
                  <DropdownItem key="ai" description="Created by Comrad Elmo">
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.cowsinai}
                    >
                      Cowsins AI
                    </Link>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <div style={{ width: 15 }} />

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Games</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
                variant="faded"
              >
                <DropdownSection title="Involved In">
                  <DropdownItem
                    key="lilith"
                    description="In Development"
                    onPress={openLilith}
                  >
                    Lilith´s Game
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <div style={{ width: 15 }} />

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Documentation</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
                variant="faded"
              >
                <DropdownSection showDivider title="Unity">
                  <DropdownItem key="fpsengine" onPress={openFPSEngineDocs}>
                    FPS Engine
                  </DropdownItem>
                  <DropdownItem key="platformerengine" onPress={onOpen}>
                    Platformer Engine
                  </DropdownItem>
                  <DropdownItem key="bullethellengine" onPress={onOpen}>
                    Bullet Hell Engine
                  </DropdownItem>
                  <DropdownItem
                    key="inventoryProAddOn"
                    onPress={openFPSEngineDocs}
                  >
                    Inventory Pro Add-On
                  </DropdownItem>
                  <DropdownItem
                    key="saveloadadadon"
                    onPress={openFPSEngineDocs}
                  >
                    Save & Load Add-On
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Community">
                  <DropdownItem
                    key="ai"
                    description="Created by Comrad Elmo"
                    onPress={openCowsinsAIDocs}
                  >
                    Cowsins AI
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <div style={{ width: 15 }} />

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Tutorials</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
                variant="faded"
              >
                <DropdownSection showDivider title="Unity">
                  <DropdownItem key="tutorialschannel">
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.youtube}
                    >
                      Tutorials Channel
                    </Link>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Community">
                  <DropdownItem key="ai" description="Created by Comrad Elmo">
                    <Link
                      isExternal
                      showAnchorIcon
                      color="foreground"
                      href={siteConfig.links.cowsinsaitutorial}
                    >
                      Cowsins AI
                    </Link>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <div style={{ width: 15 }} />

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Support</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
                variant="faded"
              >
                <DropdownItem
                  key="fpsengine"
                  description="Recommended for Better Assistance"
                >
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.discord}
                  >
                    Discord
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="platformerengine"
                  description="Please include your Order/Invoice ID"
                  href="mailto:cowsinsgames@gmail.com"
                >
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href="mailto:cowsinsgames@gmail.com"
                  >
                    Email
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal href={siteConfig.links.twitter}>
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link isExternal href={siteConfig.links.discord}>
              <DiscordIcon className="text-default-500" />
            </Link>
          </NavbarItem>

          <NavbarItem className="hidden md:flex">
            <Tooltip content="cowsinsgames@gmail.com" showArrow={true}>
              <Button
                isExternal
                as={Link}
                className="text-sm font-normal text-default-600 bg-default-100"
                href="mailto:cowsinsgames@gmail.com"
                variant="flat"
              >
                Contact
              </Button>
            </Tooltip>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" variant="light">
                Assets
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
              variant="faded"
            >
              <DropdownSection showDivider title="Unity">
                <DropdownItem
                  key="fpsengine"
                  description="15th Unity Awards Winner"
                >
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.fpsengine}
                  >
                    FPS Engine
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="platformerengine"
                  description="Latest release"
                >
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.platformerengine}
                  >
                    Platformer Engine
                  </Link>
                </DropdownItem>
                <DropdownItem key="bullethellengine">
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.bullethellengine}
                  >
                    Bullet Hell Engine
                  </Link>
                </DropdownItem>
                <DropdownItem key="inventoryaddon">
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.bullethellengine}
                  >
                    Inventory Pro Add-On
                  </Link>
                </DropdownItem>
                <DropdownItem key="saveloadaddon">
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.bullethellengine}
                  >
                    Save & Load Add-On
                  </Link>
                </DropdownItem>
                <DropdownItem key="invpro" description="Coming Soon">
                  Cowsins Inspector
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Community">
                <DropdownItem key="ai" description="Created by Comrad Elmo">
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.cowsinai}
                  >
                    Cowsins AI
                  </Link>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <div style={{ width: 15 }} />

          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" variant="light">
                Documentation
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
              variant="faded"
            >
              <DropdownSection showDivider title="Unity">
                <DropdownItem key="fpsengine" onPress={openFPSEngineDocs}>
                  FPS Engine
                </DropdownItem>
                <DropdownItem key="platformerengine" onPress={onOpen}>
                  Platformer Engine
                </DropdownItem>
                <DropdownItem key="bullethellengine" onPress={onOpen}>
                  Bullet Hell Engine
                </DropdownItem>
                <DropdownItem key="fpsengine" onPress={openFPSEngineDocs}>
                  Inventory Pro Add-On
                </DropdownItem>
                <DropdownItem key="fpsengine" onPress={openFPSEngineDocs}>
                  Save & Load Add-On
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Community">
                <DropdownItem
                  key="ai"
                  description="Created by Comrad Elmo"
                  onPress={openCowsinsAIDocs}
                >
                  Cowsins AI
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>

          <div style={{ width: 15 }} />

          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" variant="light">
                Tutorials
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
              variant="faded"
            >
              <DropdownSection showDivider title="Unity">
                <DropdownItem key="fpsengine">
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.youtube}
                  >
                    Tutorials Channel
                  </Link>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Community">
                <DropdownItem key="ai" description="Created by Comrad Elmo">
                  <Link
                    isExternal
                    showAnchorIcon
                    color="foreground"
                    href={siteConfig.links.cowsinsaitutorial}
                  >
                    Cowsins AI
                  </Link>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>

          <div style={{ width: 15 }} />

          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" variant="light">
                Support
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
              variant="faded"
            >
              <DropdownItem
                key="fpsengine"
                description="Recommended for Better Assistance"
              >
                <Link
                  isExternal
                  showAnchorIcon
                  color="foreground"
                  href={siteConfig.links.discord}
                >
                  Discord
                </Link>
              </DropdownItem>
              <DropdownItem
                key="platformerengine"
                description="Please include your Order/Invoice ID"
                href="mailto:cowsinsgames@gmail.com"
              >
                <Link
                  isExternal
                  showAnchorIcon
                  color="foreground"
                  href="mailto:cowsinsgames@gmail.com"
                >
                  Email
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
