import React from "react";
import teams from "./teams.png";
import ListView from "./listview.png";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="text-white px-20 lg:px-50 mb-40 gap-40 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row gap-30">
          <div className="rounded-lg flex flex-1 ">
            <img className="rounded-lg " src={ListView} alt="" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.8 }}
            className="flex flex-col justify-center gap-4 mr-20"
          >
            <h1 className="text-6xl font-black">Dedicated</h1>
            <span className="text-[#00a6ff] text-6xl font-bold">Listview</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row gap-40">
          <div className="rounded-lg flex flex-1 order-2">
            <img className="rounded-lg " src={teams} alt="" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.8 }}
            className="flex flex-col justify-center gap-4 order-1"
          >
            <h1 className="text-6xl font-black">Dedicated</h1>
            <span className="text-[#00a6ff] text-6xl font-bold">Teams</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
