import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Youtube,
} from "lucide-react";
import Logo from "../../src/images/LoginLogo.png";

const Footer = () => {
  return (
    <div className="mt-20 bg-gradient-to-r from-[#06afff] to-[#071c34] text-white py-16 px-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        {/* Brand Section */}
        <div className="flex flex-col space-y-4">
          <img className="w-50" src={Logo} alt="Flow Domain Logo" />
          <p className="text-lg text-gray-200"></p>
        </div>

        {/* Product Section */}
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl font-bold">Product</h1>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="#" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Changelog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl font-bold">Resources</h1>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="#" className="hover:underline">
                Board View
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                List View
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Table View
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Priority
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl font-bold">Legal</h1>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Report Abuse
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl font-bold">Follow Us</h1>
          <div className="flex space-x-4">
            <a
              href="https://github.com/amitKhayargoli"
              className="hover:text-blue-400 transition"
            >
              <Github size={28} />
            </a>

            <a
              href="https://np.linkedin.com/"
              className="hover:text-blue-500 transition"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="https://www.instagram.com/amit_khayargoli10/"
              className="hover:text-pink-400 transition"
            >
              <Instagram size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-12 text-center text-gray-300 text-lg">
        © {new Date().getFullYear()} Flow Domain. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
