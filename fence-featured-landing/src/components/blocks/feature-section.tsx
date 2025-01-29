import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  title: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({ 
  features, 
  title,
  autoPlayInterval = 6000,
  imageHeight = "h-[400px]"
}: FeatureStepsProps) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!autoPlayInterval) return

    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % features.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [features.length, autoPlayInterval])

  return (
    <div className="relative overflow-hidden bg-slate-900 py-3 sm:py-5 rounded-lg">
      <div className="mx-auto max-w-2xl px-3">
        <div className="mx-auto max-w-2xl text-center mb-3 sm:mb-5">
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white font-['Barlow_Semi_Condensed']">
            {title}
          </h2>
        </div>
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {/* Project Info */}
            <div className="flex flex-col gap-2">
              {features.map((feature, index) => (
                <div
                  key={feature.step}
                  className={cn(
                    "relative cursor-pointer rounded-lg p-2 sm:p-3 transition-all duration-300 border",
                    activeStep === index
                      ? "bg-amber-500 text-slate-900 border-amber-400 scale-[1.02]"
                      : "hover:bg-white/5 text-white border-white/10"
                  )}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium font-['Barlow_Semi_Condensed']">{feature.step}</span>
                    <div className="h-px flex-1 bg-current opacity-20" />
                  </div>
                  <h3 className="mt-1.5 text-sm sm:text-base font-bold font-['Barlow_Semi_Condensed']">{feature.title}</h3>
                  <p className="mt-0.5 text-xs opacity-90 font-['Barlow_Semi_Condensed']">{feature.content}</p>
                </div>
              ))}
            </div>
            {/* Project Image */}
            <div className={cn("relative flex items-center justify-center", imageHeight)}>
              {features.map((feature, index) => (
                <div
                  key={feature.image}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300 flex items-center justify-center p-2",
                    activeStep === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="max-w-full h-full rounded-lg shadow-xl object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 