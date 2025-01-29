import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "Thank you for your amazing hard work. We ABSOLUTLEY LOVE IT. It is beautiful.",
    name: "Kristi W",
    designation: "Home Owner in Amarillo"
  },
  {
    quote:
      "We absolutely love our new fence! If you are looking for someone to build or replace your fence, I highly recommend Scroggs Fencing. David is a perfectionist! You won't be disappointed.",
    name: "Belinda P",
    designation: "Homeowner in Panhandle"
  },
  {
    quote:
      "Best fence contractor in the Panhandle area. Their team was courteous, efficient, and the final result is exactly what we wanted.",
    name: "John Mitchell",
    designation: "Commercial Property Manager"
  },
  {
    quote:
      "Awesome job, I highly recommend. You are always there when you say you are going to be there and you do things right the first time. Thanks again.",
    name: "Harley H",
    designation: "Local Business Owner"
  },
  {
    quote:
      "David built us a high quality, beautiful fence. I would highly recommend him.",
    name: "Wally N",
    designation: "Residential Client"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-['Barlow_Semi_Condensed'] tracking-wide">
          What Our Clients Say
        </h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
} 