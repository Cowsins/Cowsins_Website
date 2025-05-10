import { FaStar } from "react-icons/fa";

import { Logo } from "./icons";

const StarRating = () => (
  <>
    {Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} style={{ color: "orange", marginRight: "5px" }} />
    ))}
  </>
);

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-4 text-gray-600 text-sm">
      <Logo />
      <p style={{ marginTop: 30 }}>&copy; 2024 Cowsins. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
