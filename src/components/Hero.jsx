import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";

function Hero() {
  const mediaQuery = window.matchMedia("(max-width : 760 px)");
  const [videoSrc, setVideoSrc] = useState(
    mediaQuery.matches ? smallHeroVideo : heroVideo
  ); //setup videoSrc by window size

  useEffect(() => {
    const handleVideoSrcSet = (e) => {
      setVideoSrc(e.matches ? smallHeroVideo : heroVideo);
    };

    mediaQuery.addEventListener("change", handleVideoSrcSet);
    return () => mediaQuery.removeEventListener("change", handleVideoSrcSet);
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to("#hero", {
        opacity: 1,
        delay: 2,
      });

      gsap.to("#cta", {
        opacity: 1,
        y: -50,
        delay: 2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/ month or $999</p>
      </div>
    </section>
  );
}

export default Hero;
