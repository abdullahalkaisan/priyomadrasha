// src/components/FeaturesSection.jsx
import "animate.css";

import { Search, CheckCircle, FileText, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "সহজ সার্চ ব্যবস্থা",
      description:
        "বাংলাদেশের সব মাদ্রাসা এক জায়গায় — নাম, এলাকা, ধরণ অনুযায়ী খুঁজে নিন আপনার উপযুক্ত মাদ্রাসা।",
      icon: <Search className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "যাচাইকৃত তথ্য",
      description:
        "প্রতিটি মাদ্রাসার তথ্য, যোগাযোগ, এবং অনুমোদন যাচাই করা ও নিয়মিত আপডেট হয়।",
      icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    },
    {
      title: "অনলাইন আবেদন",
      description:
        "আপনার পছন্দের মাদ্রাসায় অনলাইনে আবেদন করুন — ঘরে বসেই ভর্তি প্রক্রিয়া সম্পন্ন করুন।",
      icon: <FileText className="w-10 h-10 text-indigo-500" />,
    },
    {
      title: "শিক্ষার্থী নির্দেশনা",
      description:
        "আমাদের গাইডলাইন ও পরামর্শের মাধ্যমে সঠিক সিদ্ধান্ত নিতে সহায়তা পান।",
      icon: <Users className="w-10 h-10 text-yellow-500" />,
    },
  ];

  // bg-gradient-to-b from-white to-teal-50 
  // py-20
  return (
    <section className=" pb-20 pt-10 text-gray-800 ">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          আপনার মাদ্রাসা খুঁজুন সহজে
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          ভর্তি প্রক্রিয়া এখন আরও সহজ, দ্রুত ও নির্ভরযোগ্য
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-white  rounded-2xl cursor-pointer shadow-md hover:shadow-md border border-gray-100 transition-all duration-300 p-8 text-center hover:-translate-y-1"
          >
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-gradient-to-tr from-blue-50 to-gray-50">
                {f.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
