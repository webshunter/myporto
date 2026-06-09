/** GROQ: ambil _id dokumen portofolio asli (bukan dokumen kosong "homepage") */
export const PORTFOLIO_CANONICAL_ID_QUERY = `
  *[_type == "portofolio" && _id != "homepage" && _id != "drafts.homepage"]
    | order(_createdAt asc)[0]._id
`

export const portfolioFields = `
  name,
  headtitle,
  email,
  github,
  'foto': image.asset->url,
  description,
  location,
  linkcv,
  language,
  'experience': experience[]->{
    name,
    position,
    startDate,
    endDate,
    details
  },
  'education': education[]->{
    name,
    startDate,
    endDate,
    graduate,
    education
  },
  'services': services[]->{
    name,
    icon,
    skill
  },
  'skills': skills[]->{
    name,
    prosentase
  },
  'project': project[]->{
    name,
    'icon': icon.asset->url,
    details
  }
`
