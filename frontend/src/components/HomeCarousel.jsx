// // import React from "react";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";

// // export default function MyCarousel() {
// //   const settings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3000,
// //     responsive: [
// //       {
// //         breakpoint: 768,
// //         settings: { slidesToShow: 1 },
// //       },
// //       {
// //         breakpoint: 1024,
// //         settings: { slidesToShow: 2 },
// //       },
// //     ],
// //   };

// //   return (
// //     <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
// //       <Slider {...settings}>
// //         <div>
// //           <h3>1</h3>
// //         </div>
// //         <div>
// //           <h3>2</h3>
// //         </div>
// //         <div>
// //           <h3>3</h3>
// //         </div>
// //         <div>
// //           <h3>4</h3>
// //         </div>
// //         <div>
// //           <h3>5</h3>
// //         </div>
// //         <div>
// //           <h3>6</h3>
// //         </div>
// //       </Slider>
// //     </div>
// //   );
// // }









// // src/components/MyCarousel.jsx
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function HomeCarousel() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: false,
//     arrows: true, // optional: hides arrows for a clean look
//         // responsive: [
//         //   {
//         //     breakpoint: 768,
//         //     settings: { slidesToShow: 1 },
//         //   },
//         //   {
//         //     breakpoint: 1024,
//         //     settings: { slidesToShow: 2 },
//         //   },
//         // ],
//   };

//   const slides = [
//     {
//       imageUrl:
//         "https://www.cvoice24.com/media/imgAll/2022September/Sunniya-Madrasha-2412101427.jpg",
//       alt: "Slide 1",
//     },
//     {
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/commons/8/82/%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE%E0%A6%B0_%E0%A6%8F%E0%A6%95%E0%A6%BE%E0%A6%A1%E0%A7%87%E0%A6%AE%E0%A6%BF%E0%A6%95_%E0%A6%AD%E0%A6%AC%E0%A6%A8.jpg",
//       alt: "Slide 2",
//     },
//     {
//       imageUrl:
//         "https://shorhewafi.tamimss.com/wp-content/uploads/2023/11/baitus-salam.jpg",
//       alt: "Slide 3",
//     },
//   ];

//   return (
//     <div style={{ width: "100%", overflow: "hidden", margin: "auto" }}>
//       <Slider {...settings}>
//         {slides.map((s, idx) => (
//           <div key={idx}>
//             <img
//               src={s.imageUrl}
//               alt={s.alt}
//               style={{
//                 width: "100%",
//                 height: "100vh", // change this to '100vh' 80vh for full viewport height
//                 objectFit: "cover",
//                 cursor: "pointer",
//               }}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }





































// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function HomeCarousel() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: false,
//     arrows: false,
//   };

//   const slides = [
//     {
//       imageUrl:
//         "https://www.cvoice24.com/media/imgAll/2022September/Sunniya-Madrasha-2412101427.jpg",
//       alt: "Slide 1",
//       caption: "সুন্নিয়া মাদ্রাসা",
//     },
//     {
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/commons/8/82/%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE%E0%A6%B0_%E0%A6%8F%E0%A6%95%E0%A6%BE%E0%A6%A1%E0%A7%87%E0%A6%AE%E0%A6%BF%E0%A6%95_%E0%A6%AD%E0%A6%AC%E0%A6%A8.jpg",
//       alt: "Slide 2",
//       caption: "মাদ্রাসার একাডেমিক ভবন",
//     },
//     {
//       imageUrl:
//         "https://shorhewafi.tamimss.com/wp-content/uploads/2023/11/baitus-salam.jpg",
//       alt: "Slide 3",
//       caption: "বায়তুস সালাম মাদ্রাসা",
//     },
//   ];

//   return (
//     <div className="w-full overflow-hidden">
//       <Slider {...settings}>
//         {slides.map((s, idx) => (
//           <div key={idx} className="relative w-full h-screen">
//             {/* Background Image */}
//             <img
//               src={s.imageUrl}
//               alt={s.alt}
//               className="w-full h-full object-cover"
//             />

//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

//             {/* Text Overlay (optional) */}
//             <div className="absolute bottom-10 left-10 text-white">
//               <h2 className="text-3xl font-bold drop-shadow-lg">{s.caption}</h2>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
























import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    arrows: false,
    // fade: true, // Smooth fade transition
  };

  const slides = [
    {
      imageUrl:
        "https://www.cvoice24.com/media/imgAll/2022September/Sunniya-Madrasha-2412101427.jpg",
      title: "সুন্নিয়া মাদ্রাসা",
      subtitle: "আলোর পথে ইসলামি শিক্ষা",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/82/%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE%E0%A6%B0_%E0%A6%8F%E0%A6%95%E0%A6%BE%E0%A6%A1%E0%A7%87%E0%A6%AE%E0%A6%BF%E0%A6%95_%E0%A6%AD%E0%A6%AC%E0%A6%A8.jpg",
      title: "একাডেমিক ভবন",
      subtitle: "জ্ঞান ও অনুশাসনের মিলনক্ষেত্র",
    },
    {
      imageUrl:
        "https://shorhewafi.tamimss.com/wp-content/uploads/2023/11/baitus-salam.jpg",
      title: "বায়তুস সালাম মাদ্রাসা",
      subtitle: "আদর্শ শিক্ষার আধুনিক পরিবেশ",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((s, idx) => (
          <div key={idx} className="relative w-full h-[calc(100vh-56px)]">
            {/* Background Image */}
            <img
              src={s.imageUrl}
              alt={s.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Text Content */}
            <div className="absolute bottom-20 left-12 md:left-20 text-white">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)] animate-fadeInUp">
                {s.title}
              </h2>
              <p className="mt-4 text-lg md:text-2xl font-light opacity-90 animate-fadeInUp delay-200">
                {s.subtitle}
              </p>

              <button className="mt-6 px-6 py-3 cursor-pointer bg-white/10 border border-white/40 backdrop-blur-md hover:bg-white/20 transition-all rounded-lg text-white font-medium">
                আরও জানুন →
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
