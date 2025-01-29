import { Shield, Wrench, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Materials",
    description: "We use only the highest quality materials for lasting durability",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Our experienced team ensures professional installation every time",
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "We complete projects on schedule and within budget",
  },
  {
    icon: Award,
    title: "Satisfaction Guaranteed",
    description: "Your satisfaction is our top priority on every project",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-foreground/80">
            We deliver excellence in every fence we build
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;