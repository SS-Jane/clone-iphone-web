import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const links = [
  { text: "Watch the film", img: watchImg, alt: "Watch" },
  { text: "Watch the event", img: rightImg, alt: "Right" }
];

const Highlights = () => {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 }
      );
      gsap.fromTo(
        ".link",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.25 }
      );
    });

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full lg:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>

          <div className="flex flex-wrap items-end gap-5">
            {links.map(({ text, img, alt }) => (
              <p key={text} className="link flex items-center">
                {text}
                <img src={img} alt={alt} className="ml-2" />
              </p>
            ))}
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
