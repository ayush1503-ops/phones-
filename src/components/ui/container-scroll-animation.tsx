"use client";

import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.965, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [12, -12]);
  const copyY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -18]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-paper">
      <div className="container-x grid items-center gap-8 py-10 sm:py-14 lg:min-h-[calc(100svh-6.75rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-12 xl:gap-16">
        <Header translate={copyY} titleComponent={titleComponent} />
        <div className="relative mx-auto w-full max-w-[46rem] lg:max-w-none" style={{ perspective: "1200px" }}>
          <Card rotate={rotate} scale={scale} translateY={imageY}>
            {children}
          </Card>
        </div>
      </div>
    </section>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div style={{ y: translate }} className="relative z-10 order-1">
    {titleComponent}
  </motion.div>
);

export const Card = ({
  rotate,
  scale,
  translateY,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      y: translateY,
      transformStyle: "preserve-3d",
      boxShadow: "0 28px 60px rgba(45, 39, 27, 0.13), 0 3px 10px rgba(45, 39, 27, 0.06)",
    }}
    className="relative aspect-[1.05] w-full overflow-hidden rounded-[1.15rem] border border-[#ded8ca] bg-[#eae6dc] sm:aspect-[1.2] lg:aspect-[1.04]"
  >
    {children}
  </motion.div>
);
