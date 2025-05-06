import { useState, useEffect } from "react";
import Organization from "../components/Organization";
import PopularRecipes from "../components/PopularRecipes";
import FeatureSection from "./FeatureCard";

const images = [
  "https://i.ibb.co/dh9BLkb/1.jpg",
  "https://i.ibb.co/d4QNJ7KF/2.webp",
  "https://i.ibb.co/JRcyncct/3.webp",
];

export default function Home({ featureRef, popularRecipesRef, organizationRef }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section with Image Slider */}
      <div className="relative w-full h-screen overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              currentImage === index ? "opacity-100 scale-105" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}

        {/* Gradient Overlay & Hero Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center text-center px-6">
          <div className="max-w-4xl text-white p-10">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
              Welcome to <span className="text-yellow-400">Sigmoid Recipe</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md">
              Discover delicious, healthy recipes tailored for your diet. Save, explore, and cook with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Sections for Features, Popular Recipes, and Organization */}
      <div className="py-16 bg-gray-100">
        <div ref={featureRef} className="max-w-7xl mx-auto">
          <FeatureSection />
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div ref={popularRecipesRef} className="max-w-7xl mx-auto">
          <PopularRecipes />
        </div>
      </div>

      <div className="py-16 bg-gray-100">
        <div ref={organizationRef} className="max-w-7xl mx-auto">
          <Organization />
        </div>
      </div>
    </>
  );
}
