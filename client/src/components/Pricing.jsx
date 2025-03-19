import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import HomeNav from "./HomeNav";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const tiers = [
    {
      name: "Free",
      price: isYearly ? "0" : "0",
      description: "Perfect for individuals and small teams getting started",
      features: [
        "Up to 20 projects",
        "Basic task management",
        "10 team members",
        "Priority Support",
      ],
      notIncluded: [
        "Advanced analytics",
        "Email support",
        "Team collaboration",
        "Unlimited storage",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Basic",
      price: isYearly ? "89" : "9",
      description: "Ideal for growing teams and organizations",
      features: [
        "Unlimited projects",
        "Advanced task management",
        "Up to 50 team members",

        "Priority email support",
        "Advanced analytics",
        "Custom fields",
      ],
      notIncluded: ["24/7 phone support", "Custom integrations"],
      cta: "Start Trial",
      popular: true,
    },
    {
      name: "Pro",
      price: isYearly ? "189" : "19",
      description: "For large teams requiring advanced features",
      features: [
        "Everything in Basic",
        "Unlimited team members",
        "Unlimited storage",
        "24/7 phone support",
        "Custom integrations",
        "Advanced security",
        "API access",
        "Custom branding",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 p-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-[#D3E4FD] sm:text-5xl mb-4">
                  Choose your perfect plan
                </h1>
                <p className="text-xl text-[#33C3F0] max-w-2xl mx-auto">
                  Start for free, upgrade as you grow. All plans come with a
                  14-day trial.
                </p>
              </motion.div>

              <div className="mt-8 flex justify-center items-center space-x-3  text-2xl   ">
                <span className="text-[#D3E4FD]">Monthly</span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`custom-gradient relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EAEDB] focus:ring-offset-2 focus:ring-offset-[#221F26] ${
                    isYearly ? "bg-[#1EAEDB]" : "bg-[#403E43]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isYearly ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-[#D3E4FD] text-2xl">
                  Yearly <span className="text-[#fff]">(Save 20%)</span>
                </span>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-12 "
            >
              {tiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  variants={childVariants}
                  whileHover={{
                    y: -10,

                    transition: { duration: 0.2 },
                  }}
                  className={`relative rounded-2xl custom-gradient p-8 shadow-lg transition-all duration-200 text-2xl ${
                    tier.popular
                      ? "ring-2 ring-[#1EAEDB] scale-105 lg:scale-110"
                      : "hover:shadow-[0_0_25px_rgba(30,174,219,0.1)]"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#1EAEDB] px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#D3E4FD] ">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-[#33C3F0] text-2xl">
                      {tier.description}
                    </p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold text-[#1EAEDB]">
                        ${tier.price}
                      </span>
                      <span className="ml-1 text-[#33C3F0]">/month</span>
                    </div>
                  </div>

                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-[#D3E4FD] text-xl font-bold"
                      >
                        <Check className="h-5 w-5 text-[#0FA0CE] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-gray-800 text-lg font-bold"
                      >
                        <X className="h-5 w-5 text-[#f1f1f1] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate("/login")}
                    className={`w-full py-4 rounded-lg ${
                      tier.popular
                        ? "bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white"
                        : "bg-[#070707] text-[#D3E4FD] hover:border-[#1EAEDB]"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Pricing;
