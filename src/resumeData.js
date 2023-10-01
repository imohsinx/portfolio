import {
    BiLogoBehance,
    BiLogoYoutube,
    BiLogoLinkedin,
    BiLogoGithub,
    BiSolidBank
  } from "react-icons/bi";
  
  import { CgWebsite } from "react-icons/cg"; 
  import { PiNumberFiveBold } from "react-icons/pi";
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default {
    name: "Shihab Raafat",
    job: "React Front-End Developer",
    birthday: "11 April 1999",
    email: "shihabraafat7@gmail.com",
    phone: "+20 155-598-9677",
  
    socials: {
      Behance: {
        link: "https://www.behance.net/shihabraafat",
        text: "shihabraafat",
        icon: <BiLogoBehance />,
      },
      Youtube: {
        link: "https://www.youtube.com/channel/UC9vOkdgeXy1l3FcjnY4mAwg",
        text: "@shihab_raafat",
        icon: <BiLogoYoutube />,
      },
      LinkedIn: {
        link: "https://www.linkedin.com/in/shihab-raafat/",
        text: "shihab-raafat",
        icon: <BiLogoLinkedin />,
      },
      Github: {
        link: "https://github.com/ShihabRaafatTechnology",
        text: "ShihabRaafatTechnology",
        icon: <BiLogoGithub />,
      },
      Khamsat: {
        link: "https://khamsat.com/user/shihab_raafat",
        text: "shihab_raafat",
        icon: <PiNumberFiveBold />,
      },
    },
    about:
      "I’m an innovative Frontend Developer with a good experience about 1 year in building and maintaining Single Page Application using React.js, Redux and I’m passionate about workability, learning and I'm a experienced in C#, OOP, Databases , Design Pattern (MVC), Node.js and other skills in Computer Vision, Speech Recognition, Face Recognition and seeking to learn more to get an experience and increase my knowledge stack to build stable and high scalable system with strong information technology professional with a bachelor’s degree in EL Shorouk University",
    experiences: [
      {
        title: "frontend developer - khamsat",
        date: "2020 - present",
        description:
          "Support clients requirements, Create websites to improve and increase client professionalism",
      },
      {
        title: "frontend developer - national bank of egypt",
        date: "2022 - present",
        description:
          "Design and modification of the bank's website and some of the department's internal websites",
      },
    ],
    educations: [
      {
        title: "el-shorouk academy",
        date: "sep 2017 - may 2021",
        description: "cumulative grade: distinction with honors",
      },
      {
        title: "GoDaddy",
        date: "2021 - 2021",
        description: "start and grow online",
      },
      {
        title: "FreeCodeCamp",
        date: "2023 - present",
        description: "i'm learning MERN stack",
      },
    ],
    services: [
      {
        title: "web development",
        describe:
          "I have been working on web development for 4 years.",
        icon: <CgWebsite />,
      },
      {
        title: "banking advice",
        describe:
          "I am working in the National Bank of Egypt for more than two years.",
        icon: <BiSolidBank />,
      },
    ],
    skills: [{
      title: "front-end",
      description: ["React JS", "JavaScript", "TypeScript", "Material UI", "SEO"]
    },{
      title: "back-end",
      description: ["Node JS"]
    },{
      title: "database",
      description: ["MongoDB"]
    },{
      title: "source control",
      description: ["Git", "GitHub"]
    }],
  };
  