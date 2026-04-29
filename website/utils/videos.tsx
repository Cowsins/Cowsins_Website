export type VideoProvider = "vimeo" | "youtube";

export type VideoItem = {
  url: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  provider?: VideoProvider;
};

export const parseVideoUrl = (
  url: string
  const vimeo = url.match(
    /(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/
  );
  if (vimeo) return { provider: "vimeo", id: vimeo[1] };

  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  if (youtube) {
    const timestampMatch = url.match(/[?&]t=(\d+s?)/);
    const timestamp = timestampMatch ? timestampMatch[1] : undefined;
    return { provider: "youtube", id: youtube[1], timestamp };
  }

  return null;
};

export const getThumbnailUrl = (
  provider: VideoProvider,
  id: string
): string => {
  if (provider === "youtube")
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return `https://vumbnail.com/${id}.jpg`;
};

export const videos: VideoItem[] = [
  // FPS ENGINE
  {
    url: "https://youtu.be/OykOx8CgEMc",
    title: "How to Add Weapons in FPS Engine | FPS Engine 1.3",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=PyAywKlqKrY",
    title: "How to Import FPS Engine in Unity 6 ( URP ) | Unity Tutorial",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=aXW34tlzNGE",
    title: "How to Import FPS Engine in Unity 6 ( Built-In Render Pipeline )",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=kyJFwmcs-6Q",
    title: "How to Import FPS Engine in Unity 6 ( HDRP ) | Unity Tutorial",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/bopNm-g5uwc",
    title: "How to Import FPS Engine to URP / HDRP",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/0UXrm3-1rlE",
    title: "Easily Create your DREAM Game with FPS Engine - Installation + First Steps Guide",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/RBM_jEIO79k",
    title: "How to Export a Weapon from Blender to FPS Engine",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=akpdlovMQNk&t",
    title: "FPS Engine Arms Retargeting Tutorial (Step-by-Step)",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1094068445",
    title: "How to add Attachments in FPS Engine >1.3.8",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085954742",
    title: "Working with Attachments in FPS Engine [DEPRECATED <1.3.7]",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=I3i_D8td2og",
    title: "ENEMIES & DAMAGE - FPS ENGINE 0.9.7 TUTORIAL",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/FgODah72e1E",
    title: "ADDING VARIABLES TO CUSTOM INSPECTORS IN FPS ENGINE",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/4zN0Gygf6ao",
    title: "How to use weapons In FPS Engine: Adding Weapon Pickeables & Initial Weapons",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/OJ6uPo66Ams",
    title: "Custom Shot Methods in FPS Engine",
    category: "FPS Engine",
    level: "Intermediate",
  },
  {
    url: "https://youtu.be/90xvcOutTM4",
    title: "Add Camera Animations in FPS ENGINE 1.3.5!",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/CSXHtHAxSPI",
    title: "How to add Custom Interactables in FPS Engine - Unity Tutorial",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=zds12ZK_ctU",
    title: "How to add Touch Input Controls in FPS Engine ( Make Mobile Phone Games with FPS Engine )",
    category: "FPS Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=fMe68sQpVNw",
    title: "How to add New Layers in FPS Engine ( Footsteps, Impact Effects, Bullet Holes )",
    category: "FPS Engine",
    level: "Beginner",
  },
  // INVENTORY PRO ADD-ON
  {
    url: "https://player.vimeo.com/video/1085636055",
    title: "How to Import Inventory Pro Add-On for FPS Engine",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085634928",
    title: "Inventory Pro Add-On Walkthrough | Inventory Pro Add-On for FPS Engine",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085635552",
    title: "Chests & Inventory Designer | Inventory Pro Add-On for FPS Engine",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085632287",
    title: "Crafting & Recipes | Inventory Pro Add-On for FPS Engine",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085633941",
    title: "Shops & Purchasable Items | Inventory Pro Add-On for FPS Engine",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085633166",
    title: "How to make Custom Items | Inventory Pro Add-On for FPS Engine",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085630202",
    title: "Limited Ammo Weapons | Inventory Pro Add-On",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },

  // SAVE & LOAD ADD-ON
  {
    url: "https://player.vimeo.com/video/1085636822",
    title: "How to Import Save & Load Add-On for FPS Engine",
    category: "Save & Load Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085639504",
    title: "Using the Save & Load Editor Tool | Save & Load Pro Add-On for FPS Engine",
    category: "Save & Load Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1085638413",
    title: "Save Custom Data ( Simple Method ) | Save & Load Add-On for FPS Engine",
    category: "Save & Load Add-On",
    level: "Intermediate",
  },
  {
    url: "https://player.vimeo.com/video/1085637775",
    title: "Save & Load Custom Data ( Advanced Method ) | Save & Load Add-On for FPS Engine",
    category: "Save & Load Add-On",
    level: "Advanced",
  },
  {
    url: "https://player.vimeo.com/video/1085638973",
    title: "Saving Custom Instantiated Objects | Save & Load Add-On for FPS Engine",
    category: "Save & Load Add-On",
    level: "Beginner",
  },
  // PLATFORMER ENGINE
  {
    url: "https://www.youtube.com/watch?v=z04Yk9i44yU",
    title: "Easily Create your DREAM Game with Platformer Engine Installation + First Steps Guide",
    category: "Platformer Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=6rfx9Lp7lOU&feature=youtu.be",
    title: "Changing Character Sprites + Anims | Platformer Engine Tutorial",
    category: "Platformer Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=i8evQmWYjXk",
    title: "Adding New Weapons, Adding New Ammo Types & Weapon Pick Ups | Platformer Engine",
    category: "Platformer Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=wyIYp0_El7k",
    title: "Level Selection Menu in Unity | Platformer Engine",
    category: "Platformer Engine",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/1106211679",
    title: "Switching 3d Characters in Platformer Engine",
    category: "Platformer Engine",
    level: "Beginner",
  },

  // BULLET HELL ENGINE
  {
    url: "https://www.youtube.com/watch?v=up7aJOdmgH4",
    title: "Pattern System & How to Create Patterns in Bullet Hell Engine",
    category: "Bullet Hell Engine",
    level: "Beginner",
  },
  {
    url: "https://www.youtube.com/watch?v=nnk3IphqvA4",
    title: "How to Create Custom Image Patterns in Bullet Hell Engine",
    category: "Bullet Hell Engine",
    level: "Beginner",
  },

  // LEGS + IKS ADD-ON
  {
    url: "https://www.youtube.com/watch?v=RJO6kbpjazY&t=4s",
    title: "Adding Legs & IKs to a FPS game with FPS engine",
    category: "Legs + IKs Add-On",
    level: "Beginner",
  },

  // OMNISAVE
  {
    url: "https://youtu.be/nN3x3izIMZI",
    title: "How to Save & Load your Game in Unity: Getting Started with OmniSave",
    category: "OmniSave",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/jnDutHWmfko",
    title: "Save & Load in Unity with NO CODE: OmniSave Tutorial",
    category: "OmniSave",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/SNASEY6eZeY",
    title: "Working with Events in OmniSave: API #2",
    category: "OmniSave",
    level: "Intermediate",
  },
  {
    url: "https://youtu.be/f4mLVD6hrVs",
    title: "Take Full Control of your Save System with OmniSave: API #1 Introduction",
    category: "OmniSave",
    level: "Intermediate",
  },
  {
    url: "https://youtu.be/B3FU0Iodff0",
    title: "Global VS Scene VS Metadata: Persistence Scopes in OmniSave",
    category: "OmniSave",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/4SNndZbg75g",
    title: "Persisting Spawned & Destroyed Objects in OmniSave: How to Save & Load your game in Unity",
    category: "OmniSave",
    level: "Beginner",
  },
  {
    url: "https://youtu.be/4JVdPmROf7U",
    title: "How to Import OmniSave in Unity",
    category: "OmniSave",
    level: "Beginner",
  },
];