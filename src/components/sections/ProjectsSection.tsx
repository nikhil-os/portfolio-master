// src/components/sections/ProjectsSection.tsx
"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const USER_PROJECTS: Project[] = [
  {
    id: "proj-rentx",
    title: "RentX",
    description:
      "A modern full-stack rental platform to rent anything—from bikes and electronics to accessories—featuring Firebase OTP verification, Razorpay integration, Cloudinary uploads, and a dynamic MERN + Next.js architecture.",
    image: "/rentx.png",
    dataAiHint: "multi-category rental platform for products and accessories",
    tags: [
      "MERN",
      "MongoDB",
      "Express.js",
      "Next.js",
      "Firebase OTP",
      "Cloudinary",
      "Razorpay",
      "Render",
    ],
    category: ["Full-Stack", "Web"],
    liveLink:
      "https://rentx-git-master-nikhil-sahus-projects-0bc03434.vercel.app?_vercel_share=2F8wTeRZ42rFIqFyVCkH21jlUt4dSu2w",
    repoLink: "https://github.com/nikhil-os/rentx",
  },
  {
    id: "proj-tripbozo",
    title: "tripbozo",
    description:
      "Full‑stack Travel Utility SaaS delivering country‑verified essentials without signup; built with Next.js frontend, Django REST, Redis sessions, Celery QR code generation, and deployed on Vercel & Render.",
    image: "/tripbozo.png",
    dataAiHint: "travel utility saas",
    tags: ["Next.js", "Django", "PostgreSQL", "Redis", "Celery", "QR Code"],
    category: ["Full-Stack", "Web"],
    liveLink: "https://tripbozo.com",
    repoLink: "https://github.com/nikhil-os/tripbozofrontend",
  },
  {
    id: "proj-scratch",
    title: "Scratch – Full-Stack E-Commerce Platform",
    description:
      "Full-featured e‑commerce with secure auth, product management, dynamic cart, and Razorpay payments for a smooth end‑to‑end shopping experience.",
    image: "/scratch.png",
    dataAiHint:
      "full-stack e-commerce platform with payments and cloud image uploads",
    tags: [
      "MERN",
      "MongoDB",
      "Express.js",
      "Next.js",
      "Tailwind CSS",
      "Razorpay",
      "Cloudinary",
    ],
    category: ["Full-Stack", "Web"],
    liveLink: "https://e-commerce-frontend-omega-seven.vercel.app/",
    repoLink: "https://github.com/nikhil-os/e-commerce-frontend",
  },
  {
    id: "proj-treesh",
    title: "Treesh",
    description: "A modern scalable social media platform with a Tinder-style swipe matchmaking system, real-time messaging via Socket.IO, live video streaming using VideoSDK, stories, and a powerful admin panel.",
    image: "/treesh.png",
    dataAiHint: "modern social media platform with real-time chat, video streaming and admin panel",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Socket.IO", "VideoSDK", "Zod", "TanStack Query"],
    category: ["Full-Stack", "Web"],
    repoLink: "https://github.com/nikhil-os/Treesh",
  },
  {
    id: "proj-movie-ocean",
    title: "Movie Ocean",
    description: "A premium cinematic movie streaming platform featuring a dedicated admin panel, direct browser-to-AWS S3 pre-signed media uploads, CloudFront CDN integration, and live Razorpay payments.",
    image: "/movie-ocean.png",
    dataAiHint: "movie streaming platform with admin panel and s3 uploads",
    tags: ["Next.js", "AWS S3", "CloudFront", "Razorpay", "Vercel"],
    category: ["Full-Stack", "Web"],
    liveLink: "https://play.google.com/store/apps/details?id=com.webtimemovieocean.app",
    repoLink: "https://github.com/nikhil-os/Source-Code",
  },
  {
    id: "proj-ai-interview-coach",
    title: "AI Interview Coach",
    description: "An AI-powered interview preparation platform providing automated coaching with a sleek split-screen video/chat interface, handling real-time AI context gracefully.",
    image: "/ai-interview-coach.png",
    dataAiHint: "AI interview coach application with video and chat",
    tags: ["Python", "AI", "Web", "Render", "Pydantic"],
    category: ["Full-Stack", "Web"],
    repoLink: "https://github.com/nikhil-os/Ai-interview-coach",
  },
  {
    id: "proj-manyeyes",
    title: "ManyEyes",
    description: "A secure remote camera monitoring application for Android, featuring real-time device status (battery/network), live location tracking maps, and an SOS emergency feature.",
    image: "/manyeyes.png",
    dataAiHint: "remote camera monitoring android application",
    tags: ["Kotlin", "Android", "Live Location", "Camera Streaming", "Mobile"],
    category: ["Mobile"],
    repoLink: "https://github.com/nikhil-os/ManyEyesFull",
  },
];

const filterCategories = ["All", "Web", "Full-Stack", "Mobile"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? USER_PROJECTS
      : USER_PROJECTS.filter((project) =>
          project.category.includes(activeFilter)
        );

  return (
    <section id="projects" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 gradient-text">
          My Work
        </h2>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-12">
          {filterCategories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-4 py-2 text-sm sm:text-base transition-all duration-300 ${activeFilter === category ? "bg-primary text-primary-foreground shadow-lg" : "border-primary text-primary hover:bg-primary/10"}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mt-8 text-lg"
          >
            No projects found for this category. More coming soon!
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
