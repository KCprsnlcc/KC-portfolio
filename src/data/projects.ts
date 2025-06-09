export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  liveUrl?: string;
  images: string[];
}

// Define the featured project
export const featuredProject: Project = {
  id: 2,
  title: 'PilarEaseDJO',
  description: 'A Django web application integrating emotion analysis, sentiment-aware dashboards, user authentication, chatbot responses, and tweet classification. This emotional platform was designed to enhance student support services through AI-powered sentiment analysis and interactive data visualization. The system provides administrators with real-time insights into student feedback and emotional trends, enabling more responsive and personalized support.',
  tags: ['Django', 'Python', 'Sentiment Analysis', 'NLP', 'Web App', 'Data Visualization', 'Authentication', 'NLTK', 'PostgreSQL'],
  github: 'https://github.com/KCprsnlcc/PilarEaseDJO',
  liveUrl: 'https://pilarease-demo.netlify.app',
  images: [
    '/images/projects/pilareasedjo.jpg',
    '/images/projects/pilareasedjo-1.jpg',
    '/images/projects/pilareasedjo-2.jpg',
    '/images/projects/pilareasedjo-3.jpg',
    '/images/projects/pilareasedjo-4.jpg'
  ]
};

export const projects: Project[] = [
  {
    id: 7,
    title: 'Job Tracker',
    description: 'A modern web application where users can track job applications, manage related tasks, and view insightful analytics to optimize their job search strategy.',
    tags: ['React', 'TypeScript', 'Supabase', 'Analytics', 'Job Search', 'Task Management'],
    github: 'https://github.com/KCprsnlcc/job-tracker',
    liveUrl: 'https://job-tracker-two-phi.vercel.app/',
    images: [
      '/images/projects/job-tracker.jpg',
      '/images/projects/job-tracker-1.jpg',
      '/images/projects/job-tracker-2.jpg'
    ]
  },
  {
    id: 8,
    title: 'Disaster Alert Aggregator PH',
    description: 'A real-time disaster alert aggregator for the Philippines, collecting information from official government sources including PAGASA and PHIVOLCS. Categorizes alerts by severity and type, displays them through a React + TypeScript frontend with real-time updates.',
    tags: ['React', 'TypeScript', 'Supabase', 'Web Scraping', 'API', 'Real-time', 'Disaster Management'],
    github: 'https://github.com/KCprsnlcc/disaster-alert-aggregator-ph',
    liveUrl: 'https://disaster-alert-aggregator-ph.vercel.app/',
    images: [
      '/images/projects/disaster-alert.jpg',
      '/images/projects/disaster-alert-1.jpg',
      '/images/projects/disaster-alert-2.jpg'
    ]
  },
  {
    id: 6,
    title: 'AI Chatbot',
    description: 'AI-powered chatbot using TensorFlow.js for intent recognition, running entirely in the browser with no server-side dependencies.',
    tags: ['TensorFlow.js', 'NLP', 'Front-end', 'Chatbot', 'Typescript', 'React'],
    github: 'https://github.com/KCprsnlcc/chatbot-app',
    liveUrl: 'https://chatbot-app-beryl-six.vercel.app/',
    images: [
      '/images/projects/ai-chatbot.jpg',
      '/images/projects/ai-chatbot-1.jpg',
      '/images/projects/ai-chatbot-2.jpg'
    ]
  },
  {
    id: 5,
    title: 'DTR Calculator',
    description: 'A productivity tool for recording daily time logs, computing deductions, and summarizing attendance-based performance.',
    tags: ['Productivity', 'Time Management', 'Python', 'Calculator', 'Tkinter'],
    github: 'https://github.com/KCprsnlcc/DTR-Calculator',
    liveUrl: 'https://github.com/KCprsnlcc/DTR-Calculator/releases',
    images: [
      '/images/projects/dtr-calculator.jpg',
      '/images/projects/dtr-calculator-1.jpg',
      '/images/projects/dtr-calculator-2.jpg'
    ]
  },
  {
    id: 9,
    title: 'Markdown Previewer',
    description: 'A powerful, feature-rich markdown editor and previewer. Features include live markdown preview, document management, cloud sync and file operations',
    tags: ['React', 'TypeScript', 'Supabase', 'Markdown', 'Mantine UI', 'Cloud Sync'],
    github: 'https://github.com/KCprsnlcc/markdown-previewer',
    liveUrl: 'https://markdown-previewer-ecru-omega.vercel.app/',
    images: [
      '/images/projects/markdown-previewer.jpg',
      '/images/projects/markdown-previewer-1.jpg',
      '/images/projects/markdown-previewer-2.jpg'
    ]
  },
  {
    id: 3,
    title: 'File Manager',
    description: 'A basic cross-platform file manager built with PySide6. Supports file browsing, search, image preview, and basic file operations.',
    tags: ['File Manager', 'Desktop App', 'Python', 'PySide6', 'File Management'],
    github: 'https://github.com/KCprsnlcc/File-Manager',
    liveUrl: 'https://github.com/KCprsnlcc/File-Manager/releases',
    images: [
      '/images/projects/filemanager.jpg',
      '/images/projects/filemanager-1.jpg',
      '/images/projects/filemanager-2.jpg'
    ]
  },
  {
    id: 1,
    title: 'AI-Forecast',
    description: 'A Python-based platform that applies time-series models such as ARIMA and Prophet to generate transaction forecasts, model artifacts, and visual analytics.',
    tags: ['Python', 'Time-Series', 'PySide6', 'ARIMA', 'Prophet', 'Data Analytics'],
    github: 'https://github.com/KCprsnlcc/AI-Forecast',
    liveUrl: 'https://github.com/KCprsnlcc/AI-Forecast/releases',
    images: [
      '/images/projects/ai-forecast.jpg',
      '/images/projects/ai-forecast-1.jpg',
      '/images/projects/ai-forecast-2.jpg'
    ]
  },
  {
    id: 4,
    title: 'Webcam Emotion Music Player',
    description: 'An experimental project that classifies facial emotions from webcam input and matches them with curated music tracks.',
    tags: ['Computer Vision', 'Emotion Analysis', 'Python', 'OpenCV', 'MediaPipe'],
    github: 'https://github.com/KCprsnlcc/WebcamEmotionMusicPlayer',
    liveUrl: 'https://github.com/KCprsnlcc/WebcamEmotionMusicPlayer/releases',
    images: [
      '/images/projects/webcam-emotion.jpg',
      '/images/projects/webcam-emotion-1.jpg',
      '/images/projects/webcam-emotion-2.jpg'
    ]
  }
]; 