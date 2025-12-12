import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
};

const StarRating = ({ rating }: StarRatingProps) => {
  const starStyle = {
    color: "orange",
    marginRight: "5px",
  };

  const stars = Array.from({ length: 5 }, (v, i) => (
    <FaStar key={i} color={i < rating ? "orange" : "gray"} style={starStyle} />
  ));

  return <div style={{ display: "inline-flex" }}>{stars}</div>;
};

export default StarRating;
