import { resume } from './resume';
import defaultPhoto from '../assets/profile-placeholder.svg';

export function createResumeTemplate() {
  return {
    data: structuredClone(resume),
    profilePhoto: defaultPhoto,
  };
}
