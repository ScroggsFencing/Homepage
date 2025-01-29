import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { FeatureStepsDialog } from "./blocks/feature-steps-dialog";
import { useState, useEffect } from "react";
import { Phone, Mail, X } from "lucide-react";
import { QuoteFormSection } from "./blocks/quote-form-section";

const Hero = () => {
  const [showContact, setShowContact] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // Listen for hash changes and handle refresh
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setShowContact(hash === '#contact');
      setShowQuoteForm(hash === '#quote');
    };

    // Clear hash on refresh
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
      window.location.hash = '';
    }

    // Check initial hash
    handleHashChange();

    // Add listener
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleClose = () => {
    window.location.hash = '';
  };

  if (showQuoteForm) {
    return <QuoteFormSection />;
  }

  return (
    <div className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Animated Sky Background */}
      <div className="hero-sky animate-clouds" />
      
      {/* Fence Layer */}
      <div className="hero-fence" />
      
      {/* Optional dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32">
        {!showContact ? (
          <>
            <BlurFade>
              <div className="space-y-2 text-center">
                <h1 className="font-['Barlow_Semi_Condensed'] text-5xl md:text-7xl font-bold tracking-tight mb-2 text-white uppercase drop-shadow-lg">
                  Panhandle's Premier
                </h1>
                <div className="flex justify-center">
                  <h1 className="font-['Barlow_Semi_Condensed'] text-4xl md:text-6xl font-semibold tracking-wider text-amber-500 uppercase border-t-4 border-amber-500 pt-2 inline-block drop-shadow-md bg-slate-900/50 px-4 py-1 rounded-sm">
                    Fencing Contractor
                  </h1>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={0.5}>
              <p className="font-['Barlow_Semi_Condensed'] text-xl md:text-2xl mb-8 max-w-2xl text-white mt-6 tracking-wide drop-shadow-md mx-auto">
                Serving Panhandle, Texas with professional fence installation and repair services. Quality craftsmanship and customer satisfaction guaranteed.
              </p>
            </BlurFade>
            <BlurFade delay={0.75}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg font-['Barlow_Semi_Condensed'] tracking-wide font-semibold bg-amber-500 hover:bg-amber-600 text-slate-900"
                  onClick={() => window.location.hash = '#quote'}
                >
                  Get Free Quote
                </Button>
                <FeatureStepsDialog>
                  <Button size="lg" variant="outline" className="text-lg font-['Barlow_Semi_Condensed'] tracking-wide font-semibold bg-slate-900/50 hover:bg-slate-900/60 text-white border-amber-500/70">
                    View Our Work
                  </Button>
                </FeatureStepsDialog>
              </div>
            </BlurFade>
          </>
        ) : (
          <div className="w-full max-w-lg mx-auto px-4">
            <div className="relative bg-slate-900/70 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl p-6 sm:p-8">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 sm:right-4 sm:top-4 text-white hover:bg-white/10"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
              </Button>

              <BlurFade>
                <h2 className="font-['Barlow_Semi_Condensed'] text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase drop-shadow-lg mb-8 text-center">
                  Contact Us
                </h2>
              </BlurFade>
              <div className="space-y-6">
                <BlurFade delay={0.5}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
                    <div className="bg-amber-500 text-slate-900 p-3 rounded-full">
                      <Phone className="w-6 h-6" />
                    </div>
                    <a href="tel:+1-806-555-0123" className="font-['Barlow_Semi_Condensed'] text-xl sm:text-2xl hover:text-amber-500 transition-colors">
                      (806) 555-0123
                    </a>
                  </div>
                </BlurFade>
                <BlurFade delay={0.75}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
                    <div className="bg-amber-500 text-slate-900 p-3 rounded-full">
                      <Mail className="w-6 h-6" />
                    </div>
                    <a href="mailto:scroggsfencing@yahoo.com" className="font-['Barlow_Semi_Condensed'] text-xl sm:text-2xl hover:text-amber-500 transition-colors break-all">
                      scroggsfencing@yahoo.com
                    </a>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;