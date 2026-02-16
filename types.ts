
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  features?: string[]; // Added for bullet points in cards
  color?: string;    // Added for themed borders/glows
}

export interface RoadmapItem {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export type DeviceType = 'mobile' | 'laptop' | 'both';

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  image: string;
  mobileImage?: string;
  tags: string[];
  deviceType?: DeviceType;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}
