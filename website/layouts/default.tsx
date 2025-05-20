// DefaultLayout.tsx

import { Navbar } from "@/components/navbar";
import { Head } from "./head";
import TutorialsModal from "@/components/TutorialsModal";
import { useDisclosure } from "@heroui/modal";

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function DefaultLayout({
  children,
  meta,
  maxWidth = " mx-auto  max-w-7xl", // default value
}: {
  children: React.ReactNode;
  meta?: MetaProps;
  maxWidth?: string;
}) {
  const tutorialsModal = useDisclosure();

  return (
    <div className="relative flex flex-col h-screen">
      <Head {...meta} />
      <Navbar onTutorialsClick={tutorialsModal.onOpen} />
      <TutorialsModal
        isOpen={tutorialsModal.isOpen}
        onOpenChange={tutorialsModal.onOpenChange}
      />
      <main className={`container${maxWidth} px-6 flex-grow pt-16`}>
        {children}
      </main>
    </div>
  );
}
