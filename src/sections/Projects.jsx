import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
const projects = [
  {
    title: "E-Commerce Platform",
    description:
       "A responsive e-commerce web application featuring product browsing, category filtering, shopping cart functionality, and an intuitive user experience built with React.",
    image: "/projects/project1.png",
    tags: ["HTML", "CSS", "JS", "React" , "React Router"],
    link: "https://e-commerce-pi-self.vercel.app/",
    github: "https://github.com/shaw-ankit/E-COMMERCE-",
  },
  {
    title: "Image Generator",
    description:
     "An image generation application that creates images from text prompts using the Unsplash API, featuring a responsive React-based interface.",
    image: "/projects/project2.png",
    tags: ["HTML", "CSS", "JS", "React","unsplash api"],
    link: "https://search-image-mocha.vercel.app",
    github: "https://github.com/shaw-ankit/Search-Image",
  },
  {
    title: "Weather Forecast App",
    description:
       "A weather application that provides real-time weather conditions, temperature, humidity, and forecast information using a weather API.",
    image: "/projects/project3.png",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://weather-forecast-nine-ivory.vercel.app",
    github: "https://github.com/shaw-ankit/Weather-Forecast",
  },
  {
    title: "To Do App",
    description:
      "A task management application that allows users to create, update, delete, and organize daily tasks with a clean and responsive user interface.",
    image: "/projects/project4.png",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://crud-app-pi-jade.vercel.app",
    github: "https://github.com/shaw-ankit/Crud-app",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-fluid-section relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-fluid-heading font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group card-container glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    aria-label={`View live demo of ${project.title}`}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    aria-label={`View GitHub repository for ${project.title}`}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="w-5 h-5 
                  text-muted-foreground group-hover:text-primary
                   group-hover:translate-x-1 
                   group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton>
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};
