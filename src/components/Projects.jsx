import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Ecommerce Admin",
    url: "https://ecommerce-admin-navy.vercel.app/",
    image:
      "https://i.postimg.cc/7hCXpcQD/ecommerce-admin-navy-vercel-app-75d297e0-df5c-47e4-a033-5c5bedba3205.png",
    description: "Manage your shop.",
  },
  {
    title: "Ecommerce Shop",
    url: "https://ecommerce-store-ten-theta.vercel.app/",
    image:
      "https://i.postimg.cc/gjbcvQ5j/ecommerce-store-ten-theta-vercel-app.png",
    description: "buy clothes, shoes, and other things.",
  },
  {
    title: "Link Shortener",
    url: "https://github.com/zhanik228/docker-lara-task",
    image: "../projects/s.png",
    description: "Laravel API to shorten your links.",
  },
];

const Project = (props) => {
  const { project, highlited } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlited ? 0.7 : 0.4);
  }, [highlited]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color={"black"} transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY={"top"}
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlited={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
