import { GitHub, Launch, LinkedIn } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  SiSvelte,
  SiPython,
  SiCss3,
  SiFirebase,
  SiFlutter,
} from "react-icons/si";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { useSnackbar } from "notistack";
import lightsOut from "./lights-out.png";
import reactColors from "./react-colors.png";
import emailjs from "@emailjs/browser";

const EducationSection = () => {
  return (
    <Box id="education" py={8} bgcolor="#f5f5f5">
      <Container>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          style={{ marginBottom: "30px", marginTop: "30px" }}
        >
          Education
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} p={3} style={{ padding: "30px" }}>
              <Typography variant="h5" component="div" gutterBottom>
                Bachelors in Computer Applications
              </Typography>
              <Divider style={{ marginBottom: "30px", marginTop: "30px" }} />
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
                style={{ marginBottom: "30px" }}
              >
                K. P. B. Hinduja College
              </Typography>
              <Typography
                variant="body1"
                paragraph
                style={{ marginBottom: "30px" }}
              >
                The Bachelor of Computer Applications (BCA) is an undergraduate
                program that provides a strong foundation in computer science
                and applications. It covers various aspects of computer science,
                including programming languages, algorithms, data structures,
                database management, software development, and computer
                networks.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Course Duration : 2020 - 2023
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} p={3} style={{ padding: "30px" }}>
              <Typography variant="h5" component="div" gutterBottom>
                Masters in Computer Applications
              </Typography>
              <Divider style={{ marginBottom: "30px", marginTop: "30px" }} />
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
                style={{ marginBottom: "30px" }}
              >
                Amity University Mumbai
              </Typography>
              <Typography
                variant="body1"
                paragraph
                style={{ marginBottom: "30px" }}
              >
                The Master of Computer Applications (MCA) is a postgraduate
                program that focuses on advanced concepts in computer science,
                including software development, database management, computer
                networks, and more. It equips students with both theoretical
                knowledge and practical skills.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Course Duration : 2023 - 2025
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const skillsData = [
  { language: "JavaScript", expertise: 85, icon: <SiSvelte /> },
  { language: "React", expertise: 85, icon: <FaReact /> },
  { language: "Node.js", expertise: 65, icon: <FaNodeJs /> },
  { language: "HTML/CSS", expertise: 95, icon: <SiCss3 /> },
  { language: "Python", expertise: 65, icon: <SiPython /> },
  { language: "Flutter", expertise: 60, icon: <SiFlutter /> },
  { language: "Firebase", expertise: 70, icon: <SiFirebase /> },
  { language: "Svelte.js", expertise: 55, icon: <SiSvelte /> },
  // Add more skills as needed
];

const SkillsSection = () => {
  return (
    <Box id="skills" py={8} bgcolor="#f5f5f5">
      <Container>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          style={{ marginBottom: "30px" }}
        >
          Skills
        </Typography>
        <Grid container spacing={2}>
          {skillsData.map((skill, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box mb={1} display="flex" alignItems="center">
                    {skill.icon}
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      ml={1}
                    >
                      {skill.language}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.expertise}
                    sx={{ width: "100%" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [description, setDescription] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      description: description,
    };

    const templateParams = {
      to_name: "Mohsin Memon",
      from_name: data.name,
      message_html: `Email: ${data.email}<br/>Message: ${data.description}`,
    };
    setLoading(true);
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        function (response) {
          setLoading(false);
          enqueueSnackbar(`Message Sent Successfully !`, {
            variant: "success",
          });
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          setLoading(false);
          enqueueSnackbar(`FAILED... ${err}`, {
            variant: "error",
          });
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <Box id="contact" py={8} bgcolor="#f5f5f5">
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          style={{ marginBottom: "30px" }}
        >
          Contact Form
        </Typography>
        <Card>
          {loading ? <LinearProgress style={{ marginBottom: "20px" }} /> : ""}
          <CardContent>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    variant="outlined"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Your Message"
                    variant="outlined"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={sendEmail}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        <Alert severity="info">
          Didn't add form validation in any part of the Website due to the
          deadline being short
        </Alert>
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Social Links
              </Typography>
              <Divider />
              <Box
                display="flex"
                justifyContent="center"
                style={{
                  widht: "100%",
                  marginTop: "20px",
                  marginBottom: "-10px",
                }}
              >
                <IconButton
                  href="https://github.com/imohsinx"
                  target="_blank"
                  rel="noopener"
                  style={{ color: "black" }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/mohsin-memon-98256924a/"
                  target="_blank"
                  rel="noopener"
                  color="primary"
                >
                  <LinkedIn />
                </IconButton>
              </Box>
              {/* Add more social links as needed */}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

const projectsData = [
  {
    title: "React Colors App",
    description:
      "A clone of websites like Flat UI Colors and Material UI Colors. One of the projects built while doing Modern React Bootcamp course Online, this app helps you find and sort your colors and copy them with just a click of a button.",
    imageUrl: reactColors,
    websiteLink: "https://colors-app-six.vercel.app",
    githubLink: "https://github.com/imohsinx/colors-app",
  },
  {
    title: "Lights Out Game",
    description:
      "Lights out is a classic game built with react where your goal is to toggle all of the lights off on the board. Clicking on a cell will toggle itself and four of its surrounding cells as well , also built while doing an online course",
    imageUrl: lightsOut,
    websiteLink: "https://lights-out-three.vercel.app",
    githubLink: "https://github.com/imohsinx/lights_out",
  },
  // Add more projects as needed
];

const ProjectsSection = () => {
  return (
    <Box id="projects" py={8} bgcolor="#f5f5f5">
      <Container>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          style={{ marginBottom: "30px" }}
        >
          Projects
        </Typography>
        <Grid container spacing={3}>
          {projectsData.map((project, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt={project.title}
                  height="300"
                  image={project.imageUrl}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {project.description}
                  </Typography>
                  <IconButton
                    href={project.websiteLink}
                    target="_blank"
                    rel="noopener"
                    color="primary"
                  >
                    <Launch />
                  </IconButton>
                  <IconButton
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener"
                    style={{ color: "black" }}
                  >
                    <GitHub />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Alert severity="info">
          I have various other projects aswell , but i need to sort them out and
          fix some bugs on them , they are not presentable at the moment !
        </Alert>
      </Container>
    </Box>
  );
};

function Resume() {
  return (
    <div>
      <EducationSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <ContactSection />
    </div>
  );
}

export default Resume;
