export interface GreetingRequest {
  recipientName: string;
  relationship: 'client' | 'partner' | 'employee' | 'general';
  tone: 'professional' | 'warm' | 'poetic';
}

export interface GeneratedGreeting {
  title: string;
  message: string;
}

export interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
}