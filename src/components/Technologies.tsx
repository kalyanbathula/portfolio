import React from 'react';
import { 
  Code,
  Cloud,
  Zap,
  Server,
  Database,
  Container,
  Brain,
  FileCode,
  Table,
  MessageSquare,
  GitCommit,
  Terminal,
  Bot,
  FileJson,
  Atom,
  Palette,
  Globe,
  BarChart,
  GitBranch,
  Github,
  Rocket,
  Flame, // Assuming Flame icon for Firebase
  Activity,
  Link
} from 'lucide-react';

const skills = [
    { icon: <Code />, name: "Algorithms" },
    { icon: <Cloud />, name: "AWS" },
    { icon: <Zap />, name: "Spring Boot" },
    { icon: <Server />, name: "Node.js" },
    { icon: <Zap />, name: "Express.js" },
    { icon: <Flame />, name: "Firebase" }, // Added Firebase
    { icon: <Activity />, name: "Deep Learning" }, // Added Deep Learning
    { icon: <Database />, name: "MongoDB" },
    { icon: <Container />, name: "Docker" },
    { icon: <Brain />, name: "Machine Learning" },
    { icon: <FileCode />, name: "C++" },
    { icon: <FileCode />, name: "Java" },
    { icon: <FileCode />, name: "python" },
    { icon: <Table />, name: "MySQL" },
    { icon: <MessageSquare />, name: "Message Queues" },
    { icon: <GitCommit />, name: "Git" },
    { icon: <Terminal />, name: "VS Code" },
    { icon: <Bot />, name: "OpenAI" }
];

const Technologies: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-3 transition-all duration-300 hover:shadow-xl flex-grow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Technologies</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <li 
            key={index}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 transform"
          >
            <div className="text-gray-600 dark:text-gray-300 mb-2">
              {React.cloneElement(skill.icon, { size: 24 })}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Technologies;
