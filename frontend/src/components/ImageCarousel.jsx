import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderCarouselItems = () => {
    return images.map((image) => {
      return (
        <Carousel.Item
          key={image}
          style={{
            WebkitBackfaceVisibility: "visible",
            backfaceVisibility: "visible",
          }}>
          <img
            className="d-block img-fluid"
            src={image}
            alt="Image slide"
            style={{ borderRadius: 10 }}
          />
        </Carousel.Item>
      );
    });
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      nextLabel={""}
      prevLabel={""}
      indicators={false}>
      {renderCarouselItems()}
    </Carousel>
  );
};
