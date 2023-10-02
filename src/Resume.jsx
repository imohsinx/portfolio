import { GitHub, Launch, LinkedIn } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
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
import { useForm } from "react-hook-form";

const EducationSection = () => {
  return (
    <Box id="education" py={8} bgcolor="#f5f5f5">
      <Divider>
        <Chip
          label="Education"
          variant="contained"
          style={{
            marginBottom: "50px",
            marginTop: "30px",
            fontSize: "34px",
            width: "100%",
            heigh: "100%",
            padding: "30px",
            backgroundColor: "#ddd",
            letterSpacing: "0.5px",
            color: "#000",
            border: "1px dashed grey",
          }}
        />
      </Divider>

      <Container>
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
      <Divider>
        <Chip
          label="Skills"
          variant="contained"
          style={{
            marginBottom: "50px",
            marginTop: "30px",
            fontSize: "34px",
            width: "100%",
            heigh: "100%",
            padding: "30px",
            backgroundColor: "#ddd",
            color: "#000",
            border: "1px dashed grey",
            letterSpacing: "0.75px",
          }}
        />
      </Divider>
      <Container>
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
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const validate = (data) => {
    const { name, email, description } = data;

    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!name || !nameRegex.test(name)) {
      return "Name is required and should only contain letters and spaces";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return "Email is required and should be in the format 'example@example.com'";
    }

    const descriptionRegex = /^[a-zA-Z0-9\s.,!?]*$/;
    if (
      !description ||
      description.length > 200 ||
      !descriptionRegex.test(description)
    ) {
      return "Description is required, cannot exceed 200 characters, and should not contain special characters";
    }

    return null;
  };

  const onSubmit = (data) => {
    const error = validate(data);
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    const { name, email, description } = data;

    const templateParams = {
      to_name: "Mohsin Memon",
      from_name: name,
      message_html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4CAF50;">New Message From ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${description}</p>
        </div>
      `,
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
      <Divider>
        <Chip
          label="Contact Form"
          variant="contained"
          style={{
            marginBottom: "50px",
            marginTop: "30px",
            fontSize: "34px",
            width: "100%",
            heigh: "100%",
            padding: "30px",
            backgroundColor: "#ddd",
            color: "#000",
            letterSpacing: "0.5px",
            border: "1px dashed grey",
          }}
        />
      </Divider>
      <Container maxWidth="md">
        <Card>
          {loading ? <LinearProgress style={{ marginBottom: "20px" }} /> : ""}
          <CardContent>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    required
                    {...register("name")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    variant="outlined"
                    required
                    {...register("email")}
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
                    {...register("description")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                textAlign="center"
              >
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
                  style={{ color: "#0177B5" }}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
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
      <Divider>
        <Chip
          label="Projects"
          variant="contained"
          style={{
            marginBottom: "50px",
            marginTop: "30px",
            fontSize: "34px",
            width: "100%",
            heigh: "100%",
            padding: "30px",
            backgroundColor: "#ddd",
            color: "#000",
            border: "1px dashed grey",
            letterSpacing: "0.75px",
          }}
        />
      </Divider>
      <Container>
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
          fix some bugs on them , they are not presentable at the moment
        </Alert>
      </Container>
    </Box>
  );
};

function Resume() {
  return (
    <div>
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export default Resume;
