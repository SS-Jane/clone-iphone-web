# 🚀 3D Model Viewer with GSAP Animations

A **React + Three.js** project featuring a **3D iPhone model viewer** with smooth GSAP animations and interactive controls.

## Table of Contents
- [Overview](#overview)
- [🎮 Features](#%F0%9F%8E%AE-features)
- [🛠️ Tech Stack](#%F0%9F%9B%A0%EF%B8%8F-tech-stack)
- [🚀 Installation & Setup](#%F0%9F%9A%80-installation--setup)
- [🏠 Project Structure](#%F0%9F%8F%A0-project-structure)
- [Components](#components)
  - [Model](#model-component)
  - [ModelView](#modelview-component)
  - [VideoCarousel](#videocarousel-component)
- [🎥 Screenshots](#%F0%9F%8E%A5-screenshots)
- [💌 License](#%F0%9F%92%8C-license)

## Overview
This project showcases an interactive 3D model viewer and a video carousel. Users can explore different 3D models, change their sizes, and interact with a seamless video playback experience.

## 🎮 Features
- **3D Model Rendering** with `@react-three/fiber` and `@react-three/drei`
- **Smooth GSAP Animations** (`@gsap/react`)
- **Interactive Orbit Controls** for camera movement
- **Dynamic Model Switching** with different colors and sizes
- **Lazy Loading & Suspense** for optimized performance

## 🛠️ Tech Stack
- **React** (with Vite or CRA)
- **Three.js** (`@react-three/fiber`)
- **GSAP** (`@gsap/react` for animations)
- **Tailwind CSS** (for styling)

## 🚀 Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/SS-Jane/clone-iphone-web.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the project:**
   ```bash
   npm run dev  # For Vite
   ```

## 🏠 Project Structure
```
🗂 src
 ├── components    # Reusable React components
 │   ├── Features.jsx
 │   ├── Footer.jsx
 │   ├── Hero.jsx
 │   ├── Highlights.jsx
 │   ├── HowItWorks.jsx
 │   ├── IPhone.jsx
 │   ├── Lights.jsx
 │   ├── Loader.jsx
 │   ├── Model.jsx
 │   ├── ModelView.jsx
 │   ├── Navbar.jsx
 │   └── VideoCarousel.jsx
 ├── utils         # Utility functions and constants
 │   ├── animations.js
 │   └── index.js
 ├── assets        # Images, icons, and static files
 ├── models        
 │   └── scene.glb
 ├── App.jsx        # Main application file
 ├── main.jsx      # Entry point
 └── index.css      # Global styles
```

## Components

### Model Component
The `Model` component serves as the main controller for rendering 3D models. It allows users to select different colors and sizes for the displayed model.

#### Features:
- Uses `gsap` for animations.
- Controls size and color changes for the 3D model.
- Utilizes React Three Fiber for 3D rendering.

#### Props:
- None (State is managed internally)

#### How it Works:
- Uses state to manage the selected size and color.
- Uses `gsap` for smooth transitions between different models.
- Renders the `ModelView` component for displaying the 3D model.

---

### ModelView Component
The `ModelView` component is responsible for rendering and controlling individual 3D model views.

#### Features:
- Uses `Three.js` and `React Three Fiber` to render the 3D object.
- Provides orbit controls for user interaction.
- Handles camera positioning and lighting.

#### Props:
- `index`: Identifier for the model instance.
- `groupRef`: Reference for model groups.
- `gsapType`: Animation identifier.
- `controlRef`: Reference for camera controls.
- `setRotationState`: State setter for tracking model rotation.
- `size`: Current selected size.
- `item`: Object containing model details.

#### How it Works:
- Uses `PerspectiveCamera` for 3D rendering.
- Provides `OrbitControls` for user interaction.
- Renders the `IPhone` component wrapped in `Suspense` for loading optimization.

---

### VideoCarousel Component
The `VideoCarousel` component handles the interactive video playback experience.

#### Features:
- Scroll-triggered animations using `GSAP`.
- Plays videos sequentially, with progress indicators.
- Supports pause, play, and replay functionality.

#### Props:
- None (Manages state internally)

#### How it Works:
- Uses a state object to track video playback progress and interactions.
- Uses `GSAP` to animate video transitions and progress indicators.
- Handles video events such as `onEnded`, `onPlay`, and `onLoadedMetadata`.

## 🎥 Screenshots
Add screenshots here showcasing the application in action.


## 💌 License
This project is open-source and available under the [MIT License](LICENSE).

---
🔹 **Built with ❤️ by SS-Jane**  
Build this project step by step with our detailed tutorial on [JavaScript Mastery](https://www.youtube.com/@javascriptmastery/videos). Join the JSM family!
