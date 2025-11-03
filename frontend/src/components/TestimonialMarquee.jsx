// // src/components/TestimonialMarquee.jsx
// import { Info } from "lucide-react";
// import Marquee from "react-fast-marquee";
// // import { FaQuoteLeft } from "react-icons/fa";

// export default function TestimonialMarquee() {
//   const testimonials = [
//     {
//       name: "মাওলানা আবদুল্লাহ বিন ইউসুফ",
//       title: "প্রধান শিক্ষক",
//       image: "https://randomuser.me/api/portraits/men/75.jpg",
//       quote:
//         "সুন্নিয়া মাদ্রাসা তরুণ প্রজন্মকে ইসলামি মূল্যবোধ ও আধুনিক শিক্ষার সমন্বয়ে গড়ে তুলছে।",
//     },
//     {
//       name: "আহমাদ হুসাইন",
//       title: "ছাত্র প্রতিনিধি",
//       image: "https://randomuser.me/api/portraits/men/76.jpg",
//       quote:
//         "এখানকার শিক্ষকরা অত্যন্ত সহানুভূতিশীল এবং জ্ঞানী। আমি এখানে শিক্ষা গ্রহণ করে গর্বিত।",
//     },
//     {
//       name: "শাইখা নুসরাত জাহান",
//       title: "ছাত্রী",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//       quote:
//         "মাদ্রাসার পরিবেশ শান্তিপূর্ণ ও অনুপ্রেরণাদায়ক। ইসলামি ও আধুনিক জ্ঞানের চমৎকার সমন্বয়।",
//     },
//     {
//       name: "মাওলানা সাঈদ রহমান",
//       title: "শিক্ষক",
//       image: "https://randomuser.me/api/portraits/men/77.jpg",
//       quote:
//         "শিক্ষার্থীদের জন্য এটি আদর্শ স্থান — ধর্ম, বিজ্ঞান, এবং চরিত্র গঠনের মেলবন্ধন।",
//     },
//   ];

//   return (
//     <section className="bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 py-16 text-white">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
//           🌟 শিক্ষার্থীদের মতামত 🌟
//         </h2>
//         <p className="text-gray-400 mt-2 text-lg">
//           আমাদের শিক্ষার্থীদের অভিজ্ঞতা জানুন
//         </p>
//       </div>

//       {/* Marquee */}
//       <Marquee
//         gradient={true}
//         gradientColor={[10, 10, 10]}
//         speed={50}
//         pauseOnHover
//       >
//         {testimonials.map((t, idx) => (
//           <div
//             key={idx}
//             className="bg-white/10 backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-all duration-300 rounded-2xl p-6 mx-6 w-80 flex-shrink-0 shadow-lg"
//           >
//             <Info className="text-yellow-400 text-2xl mb-3 opacity-80" />
//             <p className="text-gray-200 text-sm leading-relaxed mb-6">
//               “{t.quote}”
//             </p>
//             <div className="flex items-center gap-4">
//               <img
//                 src={t.image}
//                 alt={t.name}
//                 className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
//               />
//               <div>
//                 <h4 className="font-semibold text-white text-sm">{t.name}</h4>
//                 <p className="text-gray-400 text-xs">{t.title}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Marquee>
//     </section>
//   );
// }




















// src/components/TestimonialMarqueeLight.jsx
import { Quote } from "lucide-react";
import Marquee from "react-fast-marquee";

export default function TestimonialMarqueeLight() {
  const testimonials = [
    {
      name: "মাওলানা আবদুল্লাহ বিন ইউসুফ",
      title: "প্রধান শিক্ষক",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote:
        "সুন্নিয়া মাদ্রাসা ইসলামি মূল্যবোধ ও আধুনিক শিক্ষার চমৎকার সমন্বয় করেছে। এখানে ছাত্রদের জন্য একটি অনুপ্রেরণামূলক পরিবেশ রয়েছে।",
    },
    {
      name: "আহমাদ হুসাইন",
      title: "ছাত্র প্রতিনিধি",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      quote:
        "শিক্ষকগণ সবসময় সহযোগিতামূলক এবং আন্তরিক। মাদ্রাসার প্রতিটি দিন আমার জন্য শেখার নতুন অভিজ্ঞতা।",
    },
    {
      name: "নুসরাত জাহান",
      title: "ছাত্রী",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "এখানকার পরিবেশ অত্যন্ত শান্তিপূর্ণ এবং শিক্ষা গ্রহণের উপযুক্ত। আমি সত্যিই আনন্দিত।",
    },
    {
      name: "মাওলানা সাঈদ রহমান",
      title: "শিক্ষক",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      quote:
        "ধর্মীয় শিক্ষা ও আধুনিক জ্ঞানের মিলন ঘটিয়ে শিক্ষার্থীদের জীবনের জন্য প্রস্তুত করা হচ্ছে।",
    },
    {
      name: "মাওলানা আবদুল্লাহ বিন ইউসুফ",
      title: "প্রধান শিক্ষক",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote:
        "সুন্নিয়া মাদ্রাসা ইসলামি মূল্যবোধ ও আধুনিক শিক্ষার চমৎকার সমন্বয় করেছে। এখানে ছাত্রদের জন্য একটি অনুপ্রেরণামূলক পরিবেশ রয়েছে।",
    },
    {
      name: "আহমাদ হুসাইন",
      title: "ছাত্র প্রতিনিধি",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      quote:
        "শিক্ষকগণ সবসময় সহযোগিতামূলক এবং আন্তরিক। মাদ্রাসার প্রতিটি দিন আমার জন্য শেখার নতুন অভিজ্ঞতা।",
    },
    {
      name: "নুসরাত জাহান",
      title: "ছাত্রী",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "এখানকার পরিবেশ অত্যন্ত শান্তিপূর্ণ এবং শিক্ষা গ্রহণের উপযুক্ত। আমি সত্যিই আনন্দিত।",
    },
    {
      name: "মাওলানা সাঈদ রহমান",
      title: "শিক্ষক",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      quote:
        "ধর্মীয় শিক্ষা ও আধুনিক জ্ঞানের মিলন ঘটিয়ে শিক্ষার্থীদের জীবনের জন্য প্রস্তুত করা হচ্ছে।",
    },
  ];
// bg-gradient-to-b from-white to-teal-50 
  return (
    <section className="py-16 text-gray-800">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          শিক্ষার্থীদের মতামত
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          আমাদের শিক্ষার্থীদের অভিজ্ঞতা জানুন
        </p>
      </div>

    <div className="flex flex-col gap-6">
      {/* Marquee */}
      <Marquee
        gradient={true}
        gradientColor={[255, 255, 255]}
        speed={50}
        // pauseOnHover
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl  transition-all duration-300 p-6 mx-3 w-80 flex-shrink-0 border border-gray-200"
          >
            <Quote className="text-teal-500 text-2xl mb-3 opacity-80" />
            <p className="text-gray-700 line-clamp-2 text-sm leading-relaxed mb-6">
              “{t.quote}”
            </p>
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {t.name}
                </h4>
                <p className="text-gray-500 text-xs">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>

      <Marquee
        gradient={true}
        gradientColor={[255, 255, 255]}
        speed={50}
        // pauseOnHover
        direction="right"
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl  transition-all duration-300 p-6 mx-3 w-80 flex-shrink-0 border border-gray-200"
          >
            <Quote className="text-teal-500 text-2xl mb-3 opacity-80" />
            <p className="text-gray-700 line-clamp-2 text-sm leading-relaxed mb-6">
              “{t.quote}”
            </p>
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {t.name}
                </h4>
                <p className="text-gray-500 text-xs">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>

    </section>
  );
}
