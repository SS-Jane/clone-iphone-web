import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  
  const [videoState, setVideoState] = useState({
    isEnd: false,
    isPlaying: false,
    videoId: 0,
    isLastVideo: false,
  });

  const [loadedVideos, setLoadedVideos] = useState(new Set()); // Prevent duplicates

  const { isPlaying, videoId, isLastVideo } = videoState;

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to("#slider", {
        x: `${-100 * videoId}%`,
        duration: 2,
        ease: "power2.inOut",
      });

      gsap.to("#video", {
        scrollTrigger: {
          trigger: "#video",
          toggleActions: "restart none none none",
        },
        onComplete: () => setVideoState((prev) => ({ ...prev, isPlaying: true })),
      });
    });

    return () => ctx.revert(); // Cleanup GSAP animations
  }, [videoId]);

  useEffect(() => {
    if (loadedVideos.size > 3) {
      const videoElement = videoRef.current[videoId];
      isPlaying ? videoElement?.play() : videoElement?.pause();
    }
  }, [videoId, isPlaying, loadedVideos]);

  const handleLoadedMetadata = (i, e) => {
    setLoadedVideos((prev) => new Set([...prev, e])); // Prevent duplicate updates
  };

  useEffect(() => {
    const span = videoSpanRef.current[videoId];
    if (!span) return;

    let currentProgress = 0;
    const anim = gsap.to(span, {
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);
        if (progress !== currentProgress) {
          currentProgress = progress;

          gsap.to(videoDivRef.current[videoId], { width: window.innerWidth < 1200 ? "10vw" : "4vw" });
          gsap.to(span, { width: `${currentProgress}%`, backgroundColor: "white" });
        }
      },
      onComplete: () => {
        if (isPlaying) {
          gsap.to(videoDivRef.current[videoId], { width: "12px" });
          gsap.to(span, { backgroundColor: "#afafaf" });
        }
      },
    });

    const animUpdate = () => {
      anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
    };

    isPlaying ? gsap.ticker.add(animUpdate) : gsap.ticker.remove(animUpdate);

    return () => gsap.ticker.remove(animUpdate); // Cleanup
  }, [videoId, isPlaying]);

  const handleProcess = (type, i) => {
    const actions = {
      "video-end": () => setVideoState((prev) => ({ ...prev, videoId: i + 1 })),
      "video-last": () => setVideoState((prev) => ({ ...prev, isLastVideo: true })),
      "video-reset": () => setVideoState({ isEnd: false, isPlaying: false, videoId: 0, isLastVideo: false }),
      "play": () => setVideoState((prev) => ({ ...prev, isPlaying: true })),
      "pause": () => setVideoState((prev) => ({ ...prev, isPlaying: false })),
    };
    actions[type]?.();
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() => (i !== hightlightsSlides.length - 1 ? handleProcess("video-end", i) : handleProcess("video-last"))}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">{text}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
              <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />
            </span>
          ))}
        </div>
        <button className="control-btn" onClick={() => handleProcess(isLastVideo ? "video-reset" : isPlaying ? "pause" : "play")}>
          <img src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg} alt={isLastVideo ? "replay" : isPlaying ? "pause" : "play"} />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
