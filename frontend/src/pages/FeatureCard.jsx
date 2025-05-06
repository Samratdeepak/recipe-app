import { FaSearch, FaHeart, FaUtensils, FaDownload, FaStar } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => (
  <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
    <div className="flex justify-center items-center mb-4">
      <div className="p-4 bg-gray-100 rounded-full shadow-md">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 text-center">{title}</h3>
    <p className="text-gray-600 text-sm text-center mt-2">{description}</p>
  </div>
);

const FeatureSection = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center text-center px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Elevate Your Cooking Experience
      </h1>
      <p className="text-lg text-gray-700 max-w-xl leading-relaxed">
        Discover smart features designed to enhance your culinary journey.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 max-w-5xl">
        <FeatureCard
          icon={<FaSearch className="text-blue-500 text-3xl" />}
          title="Find Recipes Instantly"
          description="Enter ingredients and get instant recommendations."
        />
        <FeatureCard
          icon={<FaHeart className="text-red-500 text-3xl" />}
          title="Save Your Favorites"
          description="Keep track of recipes you love and revisit anytime."
        />
        <FeatureCard
          icon={<FaUtensils className="text-green-500 text-3xl" />}
          title="Nutrition Insights"
          description="Get detailed nutritional data for each recipe."
        />
        <FeatureCard
          icon={<FaDownload className="text-purple-500 text-3xl" />}
          title="Download Recipes"
          description="Save recipes offline and print them easily."
        />
        <FeatureCard
          icon={<FaStar className="text-yellow-500 text-3xl" />}
          title="Rate & Review"
          description="Share feedback and rate your favorite recipes."
        />
      </div>
    </div>
  );
};

export default FeatureSection;
