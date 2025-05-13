export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  duration: string;
  description: string;
  image: string;
}

// Experience data
export const experiences: Experience[] = [
  {
    id: 1,
    title: "Computer Programmer",
    company: "Department of Health (Philippines)",
    location: "Upper Calarian, Zamboanga City, Philippines",
    type: "Internship",
    period: "Dec 2024 - Apr 2025",
    duration: "5 mos",
    description: "Enhanced the Employee Management System (EMS) with Django, developed a DTR Calculator using Python, modernized legacy PHP modules, and provided IT support across departments.",
    image: "images/experiences/doh_internship.jpg"
  }
]; 