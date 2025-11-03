// src/components/Footer.jsx
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 text-gray-300 py-12 ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            প্রিয় মাদ্রাসা
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            আলোর পথে ইসলামি শিক্ষা, আধুনিক প্রযুক্তির সাথে। জ্ঞান, নৈতিকতা ও
            নেতৃত্বের মিলনস্থল।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">দ্রুত লিংক</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                আমাদের সম্পর্কে
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                ভর্তি তথ্য
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                পাঠ্যক্রম
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                যোগাযোগ
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">রিসোর্স</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                নিউজ ও ইভেন্ট
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                শিক্ষক পরিচিতি
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                ছাত্র কার্যক্রম
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            আমাদের সাথে থাকুন
          </h3>
          <div className="flex space-x-4 text-xl">
            <a
              href=""
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              {/* <FaFacebookF /> */}
              <Facebook />
            </a>
            <a
              href=""
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              {/* <FaTwitter /> */}
              <Twitter />
            </a>
            <a
              href=""
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              {/* <FaInstagram /> */}
              <Instagram />
            </a>
            <a
              href=""
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              {/* <FaYoutube /> */}
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-900 mt-10"></div>

      {/* Bottom */}
      <div className="text-center mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} প্রিয় মাদ্রাসা | সর্বস্বত্ব সংরক্ষিত
      </div>
    </footer>
  );
}
