import { useGSAP } from "@gsap/react";
import React, { useRef, useMemo } from "react";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, exploreVideo, explore2Img } from "../utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatureImage = ({ src, alt }) => (
  <div className="overflow-hidden flex-1 h-[50vh]">
    <img src={src} alt={alt} className="feature-video g_grow" />
  </div>
);

const FeatureText = ({ children }) => (
  <div className="flex-1 flex-center">
    <p className="feature-text g_text">{children}</p>
  </div>
);

const Features = () => {
  const videoRef = useRef();
  const animationConfig = useMemo(
    () => ({
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    }),
    []
  );

  useGSAP(() => {
    // Video animation
    gsap.to("#explore_video", {
      scrollTrigger: {
        trigger: "#explore_video",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => videoRef.current?.play(),
    });

    // Batch animations
    animateWithGsap("#features_title", animationConfig);
    animateWithGsap(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      { scrub: 5.5 }
    );
    animateWithGsap(".g_text", animationConfig);
  }, [animationConfig]);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in Titanium
            </h2>
          </div>

          <div className="flex-center flex-col sm:px-10 space-y-4">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="explore_video"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col w-full relative md:flex-row space-x-4">
              <div className="feature-video-container">
                <FeatureImage src={explore1Img} alt="titanium" />
              </div>
              <div className="feature-video-container">
                <FeatureImage src={explore2Img} alt="titanium 2" />
              </div>
          </div>
          </div>

          

            <div className="feature-text-container">
              <FeatureText>
                iPhone 15 Pro is{" "}
                <span className="text-white">
                  the first iPhone to feature an aerospace-grade titanium design
                </span>
                , using the same alloy that spacecrafts use for missions to
                Mars.
              </FeatureText>

              <FeatureText>
                Titanium has one of the best strength-to-weight ratios of any
                metal, making these our{" "}
                <span className="text-white">lightest Pro models ever.</span>
                You'll notice the difference every time you pick them up.
              </FeatureText>
            </div>
          
        </div>
      </div>
    </section>
  );
};

export default React.memo(Features);
