import { resume } from './resume';
import defaultPhoto from '../assets/profile.jpeg';

export function createResumeTemplate() {
  return {
    data: structuredClone(resume),
    profilePhoto: defaultPhoto,
  };
}
