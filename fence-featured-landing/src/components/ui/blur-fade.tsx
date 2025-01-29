"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, useInView } from "framer-motion";
import React, { useRef } from "react";

interface BlurFadeProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(10px)", y: 20 }
      }
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}