import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const CustomerReviews = [
  {
    id: 1,
    name: "Amit Khayargoli",
    avatar:
      "https://web.rupa.ai/wp-content/uploads/2023/06/GVS_A_positive_facial_expression_for_a_professional_profile_pic_e4c6acb9-1780-4deb-8def-ecb80f197f08.png",
    rating: 5,
    date: "2024-02-15",
    category: "Product Quality",
    text: "This is totally a game changer. Working on projects has never been more seamless like this before.",
  },
  {
    id: 2,
    name: "James Doe",
    avatar:
      "https://img.freepik.com/free-photo/confident-businessman-smiling_107420-84734.jpg",
    rating: 4,
    date: "2024-02-14",
    category: "User Experience",
    text: "Very intuitive and user-friendly interface. The learning curve was minimal, and I was able to get started right away.",
  },
  {
    id: 3,
    name: "Michael Scott",
    avatar:
      "https://img.freepik.com/free-photo/business-man-by-skyscraper_1303-13655.jpg?semt=ais_hybrid",
    rating: 5,
    date: "2024-02-13",
    category: "Customer Service",
    text: "The customer experience of this web app is impressive.",
  },
  {
    id: 4,
    name: "Michael Scott Jr.",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 4,
    date: "2024-02-12",
    category: "Product Quality",
    text: "High-quality product that delivers on its promises. The attention to detail is evident in every aspect.",
  },
  {
    id: 5,
    name: "Emily Blunt",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    date: "2024-02-11",
    category: "Value",
    text: "Excellent value for money. The features and quality justify the investment completely.",
  },
  {
    id: 6,
    name: "Sheldon Cooper",
    avatar: "https://i.pravatar.cc/150?img=6",
    rating: 4,
    date: "2024-02-10",
    category: "Innovation",
    text: "Innovative features that set this product apart from competitors. Really impressed with the forward-thinking approach.",
  },
];

const Reviews = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.5 }}
      className="min-h-screen bg-gray-50 px-4 py-12 mb-20 custom-gradient"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl text-white font-semibold mb-2">
            Customer Feedback
          </h2>
          <h1 className=" font-bold mb-4 text-[#06afff] text-5xl">
            What Our Customers Say
          </h1>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CustomerReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#1d1f21] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 "
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <div className="flex mt-1">{renderStars(review.rating)}</div>
                </div>
              </div>
              <p className="text-sm text-white mb-2">{review.category}</p>
              <p className="text-white leading-relaxed">{review.text}</p>
              <div className="mt-4 text-sm text-gray-400">
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reviews;
