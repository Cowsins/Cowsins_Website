import { Logo } from "./icons";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-4 text-gray-600 text-sm">
      <Logo />
      <p style={{ marginTop: 30 }}>&copy; 2024 Cowsins. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
