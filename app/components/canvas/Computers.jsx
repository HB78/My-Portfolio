"use client";
import { OrbitControls, Preload, SpotLight, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* //on commence par créer la lumière */}
      <hemisphereLight intensity={0.15} groundColor="black" />

      {/* //on crée ensuite le point lumineux qu'il y a sur l'écran du pc */}
      <pointLight intensity={1} />

      {/* //la lumière principale */}
      <SpotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        //on change la scale car le pc est trop gros et prends tout l'écran
        scale={isMobile ? 0.5 : 0.65}
        position={isMobile ? [0, -3, -1] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

//Maintenant il faut mettre toute la logique du component computer dans un canvas
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  //On fait un use effect pour checker si on est en format mobile ou non
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    //soit c'est false soit c'est 500px
    setIsMobile(mediaQuery.matches);

    //une fonction qui met à jour au fur et à mesure des changements le state isMobile
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    //on joue la fonction au fur et à mesure de l'evenement change

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    //Quand on est plus dans le format mobile on arrete la fonction
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      //cela re-render le pc à chaque fois qu'il y a des changements
      frameloop="demand"
      shadows
      //c'est qui va définirla partie du pc que l'on va regarder
      //axes x y z
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* //pour bouger le pc à gauche et à droite */}
        <OrbitControls
          enableZoom={false}
          //on définit l'axe autour duquel aura le droit de tourner le pc
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
