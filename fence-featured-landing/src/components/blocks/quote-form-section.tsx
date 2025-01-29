import React from "react";
import { QuoteForm } from "@/components/ui/quote-form";
import { BlurFade } from "@/components/ui/blur-fade";

export function QuoteFormSection() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/fence.png')] bg-cover bg-center" />

      {/* Content */}
      <div className="relative w-full py-32">
        <BlurFade>
          <QuoteForm />
        </BlurFade>
      </div>
    </div>
  );
} 