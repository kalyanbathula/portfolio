import React from 'react';
import ProjectCard from './ProjectCard';

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  stars: number;
  forks: number;
  lastUpdated: string;
}

const projects: Omit<ProjectCardProps, 'stars' | 'forks' | 'lastUpdated'>[] = [
    {
      "title": "German Traffic Sign Classifier",
      "description": "A Machine Learning model using CNNs to classify 20 unique traffic sign classes from a dataset of 10,000+ images. Accuracy was evaluated using a confusion matrix.",
      "technologies": ["Python", "TensorFlow", "Keras", "CNN"],
      "githubLink": "https://github.com/kalyanbathula/German_Traffic_Sign_Classifier",
      "liveLink": "N/A"
    },
    {
      "title": "Tours Management System (Backend)",
      "description": "A backend system for managing tour bookings with features like user authentication, JWT-based authorization, tour reservations, reviews, and admin controls. APIs were built using Node.js and Express, with MongoDB for data storage and AWS EC2 for deployment.",
      "technologies": ["Node.js", "Express", "MongoDB", "JWT", "AWS EC2"],
      "githubLink": "https://github.com/kalyanbathula/Tours-APIS",
      "liveLink": "N/A"
    },
    {
      "title": "Auto-Completion System",
      "description": "An efficient auto-completion system using a trie data structure to manage word completions. Allows users to add, search, and retrieve word suggestions quickly.",
      "technologies": ["C++", "Trie Data Structure"],
      "githubLink": "https://github.com/yourusername/auto-completion-system",
      "liveLink": "N/A"
    },
    {
      "title": "Quick Sort Analysis",
      "description": "Optimized the Quick Sort algorithm by implementing tail recursion optimization and handling overflow and underflow cases. Analyzed its performance in comparison to other sorting algorithms like Merge Sort and Heap Sort, focusing on improving memory efficiency and preventing stack overflow in recursive calls.",
      "technologies": ["C++", "Algorithm Optimization", "Tail Recursion", "Sorting Algorithms"],
      "githubLink": "https://github.com/kalyanbathula/quick-sort-analysis",
      "liveLink": "N/A"
    }
    
];

const ProjectsDisplay: React.FC = () => {
  return (
    <div className="rounded-lg shadow-md md:col-span-2 lg:col-span-3">
      <div className="p-4">
        <h2 className="text-xl font-bold">Featured Projects</h2>
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            {...project} 
            stars={0} 
            forks={0} 
            lastUpdated={new Date().toISOString()}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsDisplay;