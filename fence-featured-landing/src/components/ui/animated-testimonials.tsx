import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
}

export function AnimatedTestimonials({ testimonials }: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="relative overflow-hidden rounded-lg bg-background p-8">
        <div
          className={cn(
            "transition-opacity duration-500",
            isAnimating ? "opacity-0" : "opacity-100"
          )}
        >
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl font-medium text-foreground mb-8">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="font-semibold text-foreground">
                {testimonials[currentIndex].name}
              </div>
              <div className="text-sm text-muted-foreground">
                {testimonials[currentIndex].designation}
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
} 