import React from "react";
import HomeNav from "../components/HomeNav";
import sc from "../images/sc.png";
import Footer from "./footer";

const List = ({ version, date, description, features, img }) => {
  return (
    <div className="text-white flex flex-col gap-2 py-20 border-b-[0.5px] border-b-gray-500  ">
      <img src={img} alt="" />

      <h1 className="text-3xl font-bold">{version}</h1>
      <h1 className="text-xl text-gray-400">{date}</h1>
      <h1 className="text-xl">{description}</h1>

      <ul className="text-lg px-8">
        {features.map((feature, index) => (
          <li className="list-disc" key={index}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
const Changelog = () => {
  const changelogData = [
    {
      version: "v1.0.0",
      date: "Jan 9, 2025",
      description: "We have some quick updates for the latest version ",
      features: [
        "Added light and dark themes",
        "Added Sidebar component for navigation",
        "Responsive Design",
      ],
      img: sc,
    },

    {
      version: "v1.0.1",
      date: "Jan 14, 2025",
      description: "Created the initial version of BoardView Component",
      features: ["Added Board View Feature"],
    },

    {
      version: "v1.0.2",
      date: "Jan 16 2025",
      description: "Created the initial versions of ListView and TableView",
      features: ["Added Tasks to ListView", "Added Tasks to TableView"],
    },

    {
      version: "v1.0.3",
      date: "Jan 18, 2025",
      description: "Improved BoardView",
      features: ["Added the Drag and Drop to update task status"],
    },

    {
      version: "v1.0.4",
      date: "Jan 25, 2025",
      description: "Increased BoardView functionality",
      features: ["Added update task details"],
    },
    {
      version: "v1.0.5",
      date: "Jan 28, 2025",
      description: "Added the Projects page",
      features: ["Projects page searching feature"],
    },

    {
      version: "v1.0.6",
      date: "Feb 3, 2025",
      description: "Added the User dashboard",
      features: ["Responsive user dashboard feature"],
    },

    {
      version: "v1.0.7",
      date: "Feb 4, 2025",
      description: "Added priority lists",
      features: ["Filtering the tasks according to projects"],
    },

    {
      version: "v1.0.8",
      date: "Feb 10, 2025",
      description: "Added Admin Projects page",
      features: ["Managing projects through Admin"],
    },
    {
      version: "v1.0.9",
      date: "Feb 18, 2025",
      description: "Added Admin Blogs page",
      features: ["Blogs creation and editing by Admin"],
    },

    {
      version: "v1.1.0",
      date: "Feb 25, 2025",
      description: "Added invitation links",
      features: ["Users can invite new users through the invitation links"],
    },
  ];

  return (
    <>
      <HomeNav></HomeNav>
      <div className="min-h-[100vh] w-full bg-black flex flex-col">
        <h1 className="text-white text-center text-3xl md:text-6xl font-bold mt-10">
          Changelog
        </h1>
        <div className="flex w-full h-full mt-5 flex-col px-10 xl:px-40">
          {changelogData.map((data, index) => (
            <List
              key={index}
              version={data.version}
              date={data.date}
              description={data.description}
              features={data.features}
              img={data.img}
            />
          ))}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Changelog;
