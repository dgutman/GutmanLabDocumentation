export const siteTitle = "The Gutman Lab";
export const siteTagline =
  "Studying large data sets to advance biological research";

export const siteDescription =
  "Dr. David Gutman is an assistant professor of Biomedical Informatics at Emory University focused on understanding genomic bases of biological imaging.";

export const contact = {
  department: "Department of Biomedical Informatics",
  school: "Emory University School of Medicine",
  building: "PAIS Building",
  address: "36 Eagle Row, 5th Floor South",
  city: "Atlanta, GA 30322",
  phone: "(404) 712-9206",
  emailDisplay: "DGutman [at] emory [dot] edu",
};

/** No data is pulled from Google Scholar (no public API). Links only. */
export const googleScholar = {
  profileUrl:
    "https://scholar.google.com/citations?user=N6uWd_8AAAAJ&hl=en",
  libraryUrl:
    "https://scholar.google.com/scholar?scilib=1&hl=en&as_sdt=0,11",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/people/about/", label: "People" },
  { href: "/research/", label: "Research" },
  { href: "/publications/", label: "Publications" },
  { href: "/resources/", label: "Resources" },
  { href: "/blog/", label: "Lab Blog" },
] as const;

/** URL slug → fragment file basename under `research-areas__` */
export const researchAreas = [
  { slug: "cancer-informatics", title: "Cancer Informatics" },
  { slug: "clinical-informatics-2", title: "Clinical Informatics" },
  { slug: "computational-neuroscience", title: "Computational Neuroscience" },
  { slug: "digital-pathology", title: "Digital Pathology" },
  { slug: "neurogenomics", title: "NeuroGenomics" },
  { slug: "non-human-mri-analysis", title: "Non-human MRI Analysis" },
  { slug: "clinical-informatics", title: "Pathology image analysis" },
  { slug: "redcap", title: "REDCap" },
] as const;

export const homeHighlights = [
  {
    title: "Cancer Informatics",
    href: "/research/cancer-informatics/",
    blurb:
      "The goal of cancer informatics is to obtain and organize large amounts of data (histology, radiology, etc.) to formulate hypotheses about cancer development and guide diagnostic and prognostic decisions.",
    image:
      "https://web.archive.org/web/20200224105019im_/http://drgutman.org/dglab_wordpress/wp-content/uploads/2013/12/3.png",
  },
  {
    title: "Non-human MRI Analysis",
    href: "/research/non-human-mri-analysis/",
    blurb:
      "MRI from non-human models offers a unique perspective into neural functioning and complements experimental techniques not available in human specimens.",
    image:
      "https://web.archive.org/web/20200224105019im_/http://drgutman.org/dglab_wordpress/wp-content/uploads/2013/12/1.png",
  },
  {
    title: "NeuroGenomics",
    href: "/research/neurogenomics/",
    blurb:
      "In-silico methods to identify and measure brain features using radiological imaging to study pathological development.",
    image:
      "https://web.archive.org/web/20200224105019im_/http://drgutman.org/dglab_wordpress/wp-content/uploads/2013/12/2.png",
  },
] as const;

export const publicationSections = [
  {
    slug: "papers",
    title: "Peer reviewed journal articles",
    fragment: "publications__papers",
  },
  {
    slug: "presentations",
    title: "Presentations",
    fragment: "publications__presentations",
  },
  {
    slug: "chapters",
    title: "Book chapters",
    fragment: "publications__chapters",
  },
  {
    slug: "posters-abstracts",
    title: "Posters and abstracts",
    fragment: "publications__posters-abstracts",
  },
] as const;
