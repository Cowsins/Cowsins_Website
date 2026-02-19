import React from "react";

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, size = 16 }) => {
  const clamped = Math.max(0, Math.min(rating, max));
  const full = Math.round(clamped);
  const stars = Array.from({ length: max }, (_, i) => (i < full ? "★" : "☆"));

  return (
    <div
      aria-label={`Rating: ${rating} out of ${max}`}
      style={{ fontSize: size, color: "#f59e0b", lineHeight: 1 }}
    >
      {stars.join(" ")}
    </div>
  );
};

export default StarRating;
