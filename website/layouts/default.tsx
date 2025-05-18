
import { Navbar } from "@/components/navbar";

import { Head } from "./head";
import TutorialsModal from "@/components/TutorialsModal";
import { useDisclosure } from "@heroui/modal";


export default function DefaultLayout({
  children
}: {
  children: React.ReactNode;
}) {

    const tutorialsModal = useDisclosure();

  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar onTutorialsClick={tutorialsModal.onOpen} />
      <TutorialsModal isOpen={tutorialsModal.isOpen} onOpenChange={tutorialsModal.onOpenChange} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
    </div>
  );
}