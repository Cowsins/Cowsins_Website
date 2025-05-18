export interface VideoItem {
  url: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const videos: VideoItem[] = [
  {
    url: "https://player.vimeo.com/video/1080985613",
    title: "Inventory Pro Add-On | Release Trailer",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/555555555",
    title: "TEST",
    category: "Inventory Pro Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/555555555",
    title: "New FPS Tutorial",
    category: "FPS Engine",
    level: "Intermediate",
  },
  {
    url: "https://player.vimeo.com/video/1080981970",
    title: "Save & Load Basics",
    category: "Save & Load Add-On",
    level: "Beginner",
  },
  {
    url: "https://player.vimeo.com/video/987654321",
    title: "Bullet Hell Patterns",
    category: "Bullet Hell Engine",
    level: "Advanced",
  },
  {
    url: "https://player.vimeo.com/video/444444444",
    title: "Platformer Mechanics",
    category: "Platformer Engine",
    level: "Intermediate",
  },
];
