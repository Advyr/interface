"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center">
    {children}
  </motion.div>
);

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 2px 6px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.06), 0 32px 48px rgba(0,0,0,0.04)",
      }}
      className="max-w-7xl -mt-12 mx-auto h-[30rem] md:h-[45rem] w-full border border-white/80 bg-white rounded-[20px] shadow-xl"
    >
      {/* IMPORTANT: relative + h-full w-full so children can fill */}
      <div className="relative h-full w-full overflow-hidden rounded-[16px] border border-slate-200/60 bg-gray-50 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
