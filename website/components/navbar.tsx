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
import { siteConfig } from "@/config/site";
import { TwitterIcon, DiscordIcon } from "@/components/icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  cn,
} from "@nextui-org/react";
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
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
            <div style={{ width: 20 }}></div>
          </NavbarBrand>
          <div className="hidden md:flex justify-start">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Assets</Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
              >
                <DropdownSection title="Unity" showDivider>
                  <DropdownItem
                    key="fpsengine"
                    description="15th Unity Awards Winner"
                  >
                    <Link
                      color="foreground"
                      showAnchorIcon
                      isExternal
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
                      color="foreground"
                      showAnchorIcon
                      isExternal
                      href={siteConfig.links.platformerengine}
                    >
                      Platformer Engine
                    </Link>
                  </DropdownItem>

                  <DropdownItem key="bullethellengine">
                    <Link
                      color="foreground"
                      showAnchorIcon
                      isExternal
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
                      color="foreground"
                      showAnchorIcon
                      isExternal
                      href={siteConfig.links.bullethellengine}
                    >
                      Inventory Pro Add-On
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="saveload" description="Latest release">
                    <Link
                      color="foreground"
                      showAnchorIcon
                      isExternal
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
                      color="foreground"
                      showAnchorIcon
                      isExternal
                      href={siteConfig.links.cowsinai}
                    >
                      Cowsins AI
                    </Link>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <div style={{ width: 15 }}></div>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Games</Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
              >
                <DropdownSection title="Involved In">
                  <DropdownItem
                    key="lilith"
                    onPress={openLilith}
                    description="In Development"
                  >
                    Lilith´s Game
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <div style={{ width: 15 }}></div>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Documentation</Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
              >
                <DropdownSection title="Unity" showDivider>
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

            <div style={{ width: 15 }}></div>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Tutorials</Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
              >
                <DropdownSection title="Unity" showDivider>
                  <DropdownItem key="tutorialschannel">
                    <Link
                      color="foreground"
                      showAnchorIcon
                      isExternal
                      href={siteConfig.links.youtube}
                    >
                      Tutorials Channel
                    </Link>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Community">
                  <DropdownItem key="ai" description="Created by Comrad Elmo">
                    <Link
                      color="foreground"
                      showAnchorIcon
                      isExternal
                      href={siteConfig.links.cowsinsaitutorial}
                    >
                      Cowsins AI
                    </Link>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <div style={{ width: 15 }}></div>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">Support</Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
                disabledKeys={["invpro"]}
              >
                <DropdownItem
                  key="fpsengine"
                  description="Recommended for Better Assistance"
                >
                  <Link
                    color="foreground"
                    showAnchorIcon
                    isExternal
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
                    color="foreground"
                    showAnchorIcon
                    isExternal
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
            <Tooltip showArrow={true} content="cowsinsgames@gmail.com">
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
              <Button variant="light" size="lg">
                Assets
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded"
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
            >
              <DropdownSection title="Unity" showDivider>
                <DropdownItem
                  key="fpsengine"
                  description="15th Unity Awards Winner"
                >
                  <Link
                    color="foreground"
                    showAnchorIcon
                    isExternal
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
                    color="foreground"
                    showAnchorIcon
                    isExternal
                    href={siteConfig.links.platformerengine}
                  >
                    Platformer Engine
                  </Link>
                </DropdownItem>
                <DropdownItem key="bullethellengine">
                  <Link
                    color="foreground"
                    showAnchorIcon
                    isExternal
                    href={siteConfig.links.bullethellengine}
                  >
                    Bullet Hell Engine
                  </Link>
                </DropdownItem>
                <DropdownItem key="inventoryaddon">
                  <Link
                    color="foreground"
                    showAnchorIcon
                    isExternal
                    href={siteConfig.links.bullethellengine}
                  >
                    Inventory Pro Add-On
                  </Link>
                </DropdownItem>
                <DropdownItem key="saveloadaddon">
                  <Link
                    color="foreground"
                    showAnchorIcon
                    isExternal
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
                    color="foreground"
                    showAnchorIcon
                    isExternal
                    href={siteConfig.links.cowsinai}
                  >
                    Cowsins AI
                  </Link>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <div style={{ width: 15 }}></div>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" size="lg">
                Documentation
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded"
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
            >
              <DropdownSection title="Unity" showDivider>
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

          <div style={{ width: 15 }}></div>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" size="lg">
                Tutorials
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded"
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
            >
              <DropdownSection title="Unity" showDivider>
                <DropdownItem key="fpsengine">
                  <Link
                    color="foreground"
                    showAnchorIcon
                    isExternal
                    href={siteConfig.links.youtube}
                  >
                    Tutorials Channel
                  </Link>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Community">
                <DropdownItem key="ai" description="Created by Comrad Elmo">
                  <Link
                    color="foreground"
                    showAnchorIcon
                    isExternal
                    href={siteConfig.links.cowsinsaitutorial}
                  >
                    Cowsins AI
                  </Link>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>

          <div style={{ width: 15 }}></div>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" size="lg">
                Support
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded"
              aria-label="Dropdown menu with description"
              disabledKeys={["invpro"]}
            >
              <DropdownItem
                key="fpsengine"
                description="Recommended for Better Assistance"
              >
                <Link
                  color="foreground"
                  showAnchorIcon
                  isExternal
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
                  color="foreground"
                  showAnchorIcon
                  isExternal
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
