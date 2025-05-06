import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Organization = () => {
  return (
    <div id="organization-section" className="bg-gray-50 text-gray-900 py-24 px-6">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 uppercase">
          Our Organization
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
      </div>

      {/* Content Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-xl shadow-md transition-all hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">📍 Contact Us</h3>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Address:</span> <br />
            2nd Floor, Tower-2, SJR I PARK, Rd Number 9, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066
          </p>
          <p className="mt-3">
            <span className="font-semibold text-gray-700">Phone:</span> 090354 51437
          </p>
          <p className="mt-3">
            <span className="font-semibold text-gray-700">Email:</span> <br />
            <a href="mailto:marketing@sigmoid.com" className="text-blue-500 hover:underline">
              marketing@sigmoid.com
            </a>
            <br />
            <a href="mailto:careers@sigmoid.com" className="text-blue-500 hover:underline">
              careers@sigmoid.com
            </a>
            <br />
            <a href="mailto:bgv@sigmoidanalytics.com" className="text-blue-500 hover:underline">
              bgv@sigmoidanalytics.com
            </a>
          </p>
          <p className="mt-3">
            <span className="font-semibold text-gray-700">Working Hours:</span> Mon-Fri, Open 24 Hours
          </p>

          {/* Social Media Links */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-blue-600">🔗 Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/SigmoidAnalytics" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl hover:bg-blue-400 transition-all">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/lifeatsigmoid/" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-500 text-white text-xl hover:bg-pink-400 transition-all">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/channel/UC6AQE2QqPdmB3Cw3WPrJ8yA" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white text-xl hover:bg-red-400 transition-all">
                <FaYoutube />
              </a>
              <a href="https://x.com/sigmoidinc?mx=2" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-400 text-white text-xl hover:bg-blue-300 transition-all">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
          <iframe
            title="Organization Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8455228631506!2d77.72411337356816!3d12.981730414659172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae12399a155bdd%3A0x7e09d0317d42a4b4!2sSigmoid!5e0!3m2!1sen!2sin!4v1740059702677!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Organization;
