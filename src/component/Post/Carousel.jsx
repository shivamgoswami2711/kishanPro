import React, { useEffect, useRef, useState } from "react";
const ImageCarousel = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState();
    const carouselItemsRef = useRef([]);
    useEffect(() => {
        if (images && images[0]) {
            carouselItemsRef.current = carouselItemsRef.current.slice(0, images.length);
            setSelectedImageIndex(0);
            setSelectedImage(images[0]);
        }
    }, [images]);
    const handleSelectedImageChange = (newIdx) => {
        var _a;
        if (images && images.length > 0) {
            setSelectedImage(images[newIdx]);
            setSelectedImageIndex(newIdx);
            if (carouselItemsRef === null || carouselItemsRef === void 0 ? void 0 : carouselItemsRef.current[newIdx]) {
                (_a = carouselItemsRef === null || carouselItemsRef === void 0 ? void 0 : carouselItemsRef.current[newIdx]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                    inline: "center",
                    behavior: "smooth"
                });
            }
        }
    };
    return (
        <div className="carousel-container">
            <div
                className="selected-image"
                style={{ backgroundImage: `url(${selectedImage?.url})` }}
            />
            <div className="carousel">
                <div className="carousel__images">
                    {images &&
                        images.map((image, idx) => (
                            <div
                                onClick={() => handleSelectedImageChange(idx)}
                                style={{ backgroundImage: `url(${image.url})` }}
                                key={image.id}
                                className={`carousel__image ${selectedImageIndex === idx && "carousel__image-selected"
                                    }`}
                                ref={(el) => (carouselItemsRef.current[idx] = el)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
export default ImageCarousel;