// "use client"
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

//fonction qui va préparé en amont la logique autour du globe
//on importe le gltf et on le fixe à l'écran avant de le travailler dans la fonction EarthCanvas
const Earth = () => {
  //on utilise cette méthode pour importer le model 3D téléchargé
  const earth = useGLTF("./planet/scene.gltf");

  return (
    //scene est le nom du gltf qui est situé dans le dossier public
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

//fonction dans laquelle se trouve toute la logique intéractive du globe
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        //le fov va rendre le globe beaucoup plus large, en gros cela va le grossir
        fov: 48,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* //OrbitControls permet a l'utilisateur de jouer avec le globe */}
        <OrbitControls
          //ici auto rotate est a true par défaut
          autoRotate
          enableZoom={false}
          //cela contextualise la manière dont la rotation se fait
          maxPolarAngle= {Math.PI/2}
          minPolarAngle= {Math.PI/2}
        />
        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
