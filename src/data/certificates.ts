export interface Certificate {
  id: number;
  title: string;
  image: string;
  issuer: string;
  date: string;
}

// Sample certificate data - replace with your actual certificates
export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Basics of Machine Learning Algorithms",
    image: "images/certificates/certificate1.png",
    issuer: "UniAthena",
    date: "April 2025"
  },
  {
    id: 2,
    title: "Navigating Cybersecurity Landscape: A Roadmap for Beginners",
    image: "images/certificates/certificate2.png",
    issuer: "ExpertsAcademy",
    date: "March 2025"
  },
  {
    id: 3,
    title: "Mastering Digital Marketing in an AI World",
    image: "images/certificates/certificate5.png",
    issuer: "Xaltius",
    date: "March 2025"
  },
  {
    id: 4,
    title: "Art of AI: Its Integration to Teaching Pedagogies and Responsible Use",
    image: "images/certificates/certificate3.png",
    issuer: "Zep Research",
    date: "March 2025"
  },
  {
    id: 5,
    title: "AI-Powered Marketing - Unlocking the Future of Smarter Strategies",
    image: "images/certificates/certificate6.png",
    issuer: "Ariva Academy",
    date: "March 2025"
  }
]; 