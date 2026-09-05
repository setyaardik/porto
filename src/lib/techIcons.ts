import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiVite,
  SiFlutter,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiDjango,
  SiGo,
  SiDocker,
  SiFigma,
  SiRedux,
  SiGithub,
} from 'react-icons/si'
import { Braces, KeyRound } from 'lucide-react'

type IconType = React.ComponentType<{ size?: number | string; className?: string }>

export const TECH_ICONS: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Node.js': SiNodedotjs,
  'Tailwind CSS': SiTailwindcss,
  Vite: SiVite,
  Flutter: SiFlutter,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Prisma: SiPrisma,
  Django: SiDjango,
  Go: SiGo,
  Docker: SiDocker,
  Figma: SiFigma,
  Redux: SiRedux,
  GitHub: SiGithub,
  Git: SiGithub,
  'REST API': Braces,
  'JWT Auth': KeyRound,
}