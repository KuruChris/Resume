export function createContentEditor(data, onDataChange) {
  return {
    setName: (name) => onDataChange({ ...data, name }),
    setTitle: (title) => onDataChange({ ...data, title }),
    setContact: (field, value) => onDataChange({
      ...data,
      contact: { ...data.contact, [field]: value },
    }),
    updateContactLink: (index, patch) => onDataChange({
      ...data,
      contact: {
        ...data.contact,
        links: (data.contact.links || []).map((link, i) => (
          i === index ? { ...link, ...patch } : link
        )),
      },
    }),
    addContactLink: () => onDataChange({
      ...data,
      contact: {
        ...data.contact,
        links: [...(data.contact.links || []), { label: '', url: '' }],
      },
    }),
    removeContactLink: (index) => onDataChange({
      ...data,
      contact: {
        ...data.contact,
        links: (data.contact.links || []).filter((_, i) => i !== index),
      },
    }),
    setAboutItem: (index, value) => onDataChange({
      ...data,
      about: data.about.map((item, i) => (i === index ? value : item)),
    }),
    setSkill: (index, value) => onDataChange({
      ...data,
      skills: data.skills.map((skill, i) => (i === index ? value : skill)),
    }),
    addSkill: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      onDataChange({
        ...data,
        skills: [...data.skills, trimmed],
      });
    },
    updateEducation: (index, patch) => onDataChange({
      ...data,
      education: data.education.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateCertificate: (index, patch) => onDataChange({
      ...data,
      certificates: data.certificates.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateLanguage: (index, patch) => onDataChange({
      ...data,
      languages: data.languages.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateReference: (index, patch) => onDataChange({
      ...data,
      references: (data.references || []).map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateExperience: (index, patch) => onDataChange({
      ...data,
      experience: data.experience.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    setExperienceHighlight: (jobIndex, highlightIndex, value) => onDataChange({
      ...data,
      experience: data.experience.map((job, i) => {
        if (i !== jobIndex) return job;
        return {
          ...job,
          highlights: job.highlights.map((item, hi) => (hi === highlightIndex ? value : item)),
        };
      }),
    }),
    updateProject: (index, patch) => onDataChange({
      ...data,
      projects: (data.projects || []).map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    setProjectHighlight: (projectIndex, highlightIndex, value) => onDataChange({
      ...data,
      projects: (data.projects || []).map((project, i) => {
        if (i !== projectIndex) return project;
        return {
          ...project,
          highlights: (project.highlights || []).map((item, hi) => (hi === highlightIndex ? value : item)),
        };
      }),
    }),
  };
}

export const noopContentEditor = {
  setName: () => {},
  setTitle: () => {},
  setContact: () => {},
  updateContactLink: () => {},
  addContactLink: () => {},
  removeContactLink: () => {},
  setAboutItem: () => {},
  setSkill: () => {},
  addSkill: () => {},
  updateEducation: () => {},
  updateCertificate: () => {},
  updateLanguage: () => {},
  updateReference: () => {},
  updateExperience: () => {},
  setExperienceHighlight: () => {},
  updateProject: () => {},
  setProjectHighlight: () => {},
};
