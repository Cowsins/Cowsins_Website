import { FaStar } from "react-icons/fa";
import { Card } from "@heroui/react";

import styles from "../styles/custom.module.css";
import { cards } from "../utils/cardsData";

const ReviewCard = ({ card }: { card: (typeof cards)[0] }) => {
  const starStyle = {
    color: "orange",
    marginRight: "5px",
  };

  const stars = Array.from({ length: 5 }, (v, i) => (
    <FaStar key={i} style={starStyle} />
  ));

  return (
    <Card
      className={`${styles.scrollerCard} ${styles.customCard}`}
      style={{
        padding: "20px",
        paddingTop: "20px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h4>{card.author}</h4>
        <div style={{ width: 10 }} />
        {stars}
      </div>

      <div style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
        {card.title}
      </div>
      <div
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "10px",
          opacity: "0.5",
        }}
      >
        {card.description}
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%",
          backgroundImage:
            "linear-gradient(to bottom, rgba(32, 28, 28, 0), rgba(32, 28, 28, 1))",
          pointerEvents: "none", // This ensures the gradient doesn't interfere with mouse events
        }}
       />
    </Card>
  );
};

export default ReviewCard;
