export const resume = {
  name: 'Alex Morgan',
  title: 'Software Engineer',
  contact: {
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/alex-morgan-demo',
  },
  about: [
    '5+ years building full-stack web applications — modern backends, React frontends, and REST APIs shipped to production.',
    'Own features end-to-end: design mockups → responsive UI → database design → deployment, with testing built in.',
    'Built CRMs, site builders, and marketing sites for clients across different industries.',
    'Agile practitioner — ship iteratively with stakeholders, not in a vacuum.',
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'State University',
      period: '2015 – 2019',
    },
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'Acme Tech',
      period: '2022 – Present',
      description:
        'Product engineering team building web applications for business clients.',
      highlights: [
        'Developed scalable web application features from design specs, ensuring responsive and user-friendly interfaces.',
        'Diagnosed and resolved system issues, improving application performance and reliability.',
        'Maintained client software projects, ensuring quality and timely updates.',
        'Collaborated with designers and product managers to deliver features on schedule.',
        'Built internal tools that reduced manual workflows for the operations team.',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Nova Digital',
      period: '2020 – 2022',
      description:
        'Digital agency focused on client websites and internal business tools.',
      highlights: [
        'Designed and developed custom websites using React, delivering fast, SEO-friendly experiences.',
        'Translated design mockups into responsive, mobile-first layouts with clean HTML, CSS, and JavaScript.',
        'Built and maintained an internal CRM platform including user management and workflow features.',
        'Implemented backend logic, database structures, and RESTful APIs to connect front-end interfaces.',
        'Collaborated with stakeholders to gather requirements and deploy updates that improved usability.',
      ],
    },
  ],
  skills: [
    'JavaScript',
    'React',
    'Node.js',
    'TypeScript',
    'HTML & CSS',
    'REST APIs',
    'SQL',
    'Git',
    'Agile',
    'Testing',
    'Docker',
    'CI/CD',
  ],
  certificates: [
    {
      name: 'Web Development Bootcamp',
      period: '2019',
      note: 'Certificate of Completion',
    },
    {
      name: 'Cloud Computing Fundamentals',
      period: '2020',
      note: 'Certificate of Completion',
    },
  ],
  languages: [
    { name: 'English', level: 'Full Professional Proficiency' },
    { name: 'Spanish', level: 'Professional Working Proficiency' },
  ],
  projects: [
    {
      name: 'Resume Builder',
      description:
        'A resume site with a live editor, theme customization, and one-click PDF export.',
      linkEnabled: true,
      url: '/editor',
      highlights: [
        'Built with React and Vite, with client-side routing for the public resume and editor views.',
        'Live preview editor for profile, experience, skills, and other resume sections.',
        'PDF export from the rendered resume layout using html-to-image and jsPDF.',
        'Deployable as a static site on Netlify with SPA redirects.',
      ],
    },
  ],
};
