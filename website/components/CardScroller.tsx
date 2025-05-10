import { cards } from "../utils/cardsData";
import ReviewCard from "../components/ReviewCard";
import styles from "../styles/custom.module.css";

const CardScroller = () => {
  return (
    <div className={styles.scrollerContainer}>
      <div className={styles.scroller}>
        {/* Duplicate cards to create a looping effect */}
        {cards.map((card, index) => (
          <ReviewCard key={index} card={card} />
        ))}
        
        {/* Duplicate cards to create a looping effect */}
        {cards.map((card, index) => (
          <ReviewCard key={index + cards.length} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardScroller;
