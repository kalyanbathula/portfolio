import React from 'react';

interface TimelineItem {
  type: 'education' | 'experience';
  title: string;
  organization: string;
  date: string;
  location?: string;
  description?: string;
  skills?: string[];
}

const educationItems: TimelineItem[] = [
  {
    type: 'education',
    title: 'Secondary Education',
    organization: 'Winfiled High School',
    date: 'Mar 2018 - May 2019',
    description:'',
    skills: []
  },
  {
    type: 'education',
    title: '12th standard',
    organization: 'Krishnaveni Junior College',
    date: 'Jun 2019 - Nov 2021 ',
    description: '',
    skills: []
  },
  {
    type: 'education',
    title: 'Bachelors in Computer Scence',
    organization: 'Chaitanya Bharathi Institute of Technology',
    date: 'Dec 2021 - May 2025',
    description: 'Currently pursuing my Bachelors in Computer Science at Chaitanya Bharathi Institute of Technology. I have taken courses in Data Structures, Algorithms, Web Development, and Software Engineering. I have also been involved in various coding competitions and hackathons.',
    skills: ['']
  }
];

const experienceItems: TimelineItem[] = [
  {
    "type": "experience",
    "title": "Backend Developer",
    "organization": "KisanLink",
    "date": "Sep 2023 - Present · 4 months",
    "location": "Hyderabad, India · Remote",
    "description": "Working on KisanLink, a platform that connects farmers with technology solutions, and also contributed to the Amrti site, focused on organic products. Developed backend services using Node.js and Express.js, integrated with MongoDB. Implemented the RAG Chatbot powered by DataStax vector databases and Astra DB for advanced data management. Focused on optimizing backend performance and ensuring scalability for high traffic scenarios, leveraging AWS infrastructure.",
    "skills": ["Node.js", "Express.js", "AWS", "MongoDB", "RAG Chatbot", "DataStax", "Astra DB", "Backend Development", "API Integration", "Scalability Optimization"]
  }
];
const TimelineItem: React.FC<{ item: TimelineItem }> = ({ item }) => (
  <div className="mb-8 relative">
    <div className="absolute top-0 left-0 w-2 h-full bg-gray-200 dark:bg-gray-700" />
    <div className="ml-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="absolute left-0 top-4 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{item.organization}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500">{item.date}</p>
      {item.location && (
        <p className="text-sm text-gray-500 dark:text-gray-500">{item.location}</p>
      )}
      {item.description && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
      )}
      {item.skills && (
        <div className="mt-2 flex flex-wrap gap-2">
          {item.skills.map((skill, index) => (
            <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Timeline: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Timeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Experience</h2>
          {experienceItems.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Education</h2>
          {educationItems.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;