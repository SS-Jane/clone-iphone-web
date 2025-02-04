import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { yellowImg } from "../utils";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [state, setState] = useState({
    size: 'small',
    model: {
      title: 'iPhone 15 Pro in Natural Titanium',
      color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
      img: yellowImg,
    },
  });

  const { size, model } = state;

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = useMemo(() => gsap.timeline(), []);

  useEffect(() => {
    const targetGroup = size === 'large' ? small : large;
    const targetRotation = size === 'large' ? smallRotation : largeRotation;
    const viewFrom = size === 'large' ? '#view1' : '#view2';
    const viewTo = size === 'large' ? '#view2' : '#view1';
    const transform = size === 'large' ? 'translateX(-100%)' : 'translateX(0)';

    animateWithGsapTimeline(tl, targetGroup, targetRotation, viewFrom, viewTo, {
      transform,
      duration: 2,
    });
  }, [size, smallRotation, largeRotation, tl]);

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 });
  }, []);

  const handleModelChange = (item) => {
    setState((prev) => ({ ...prev, model: item }));
  };

  const handleSizeChange = (value) => {
    setState((prev) => ({ ...prev, size: value }));
  };

  const modelViews = useMemo(() => [
    {
      index: 1,
      groupRef: small,
      gsapType: 'view1',
      controlRef: cameraControlSmall,
      setRotationState: setSmallRotation,
      item: model,
      size,
    },
    {
      index: 2,
      groupRef: large,
      gsapType: 'view2',
      controlRef: cameraControlLarge,
      setRotationState: setLargeRotation,
      item: model,
      size,
    },
  ], [model, size]);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {modelViews.map((props) => (
              <ModelView key={props.index} {...props} />
            ))}

            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => handleModelChange(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => handleSizeChange(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Model);