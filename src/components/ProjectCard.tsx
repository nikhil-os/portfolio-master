// src/components/ProjectCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        y: -8,
        boxShadow: "0 0 25px hsl(var(--primary))"
      }}
      className="group relative overflow-hidden rounded-xl shadow-2xl w-[30%] h-[60%"
    >
      <Card className="h-full flex flex-col border-2 border-transparent group-hover:border-primary transition-colors duration-300 bg-card/70 backdrop-blur-sm">
        
        {/* ✅ Fixed Image Block */}
        <div className="relative w-full aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
            data-ai-hint={project.dataAiHint}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
        </div>

        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground mt-1 h-12 overflow-hidden">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs sm:text-sm bg-primary/20 text-primary border-primary/30">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex space-x-2">
            {project.liveLink && (
              <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-4 w-4" />Live
                </Link>
              </Button>
            )}
            {project.repoLink && (
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
                <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1.5 h-4 w-4" /> Source
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
