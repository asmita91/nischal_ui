import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleIssueApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
import empathy from "../images/empathy.jpg";
import om from "../images/om.png";

const SingleIssue = () => {
  const [issue, setIssue] = useState(null);
  const { issueId } = useParams();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await getSingleIssueApi(issueId);
        setIssue(response.data.issue);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching issue details");
      }
    };

    fetchIssue();
    const handleScroll = () => {
      const heading = document.getElementById("fixed-heading");
      const waveSection = document.querySelector(".wave-section");

      if (window.scrollY > waveSection.offsetHeight) {
        heading.style.position = "relative";
        heading.style.top = "0";
        heading.style.transform = "translate(-50%, 0)";
      } else {
        heading.style.position = "fixed";
        heading.style.top = "25%";
        heading.style.transform = "translate(-50%, -50%)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [issueId]);

  if (!issue) {
    return <div>Loading...</div>;
  }

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeVideoId = getYoutubeVideoId(issue.youtubeUrl);

  return (
    <div>
      <AnimatedWave />
      <Typography
        id="fixed-heading"
        variant="h4"
        component="div"
        style={styles.fixedHeading}
      >
        Details
      </Typography>
      <div style={styles.additionalInfoContainer}>
        <div style={styles.infoTextSection}>
          <h2 style={styles.textSectionH2}>{issue.issueName}</h2>
          <p>{issue.issueDescription}</p>

          <div style={styles.additionalContent}>
            <img src={om} alt="om image" style={styles.longImage} />
            <div style={styles.imageCaption}>{issue.stat}</div>
          </div>
        </div>
        <div style={styles.infoImageSection}>
          <img
            src={issue.issueImageUrl}
            alt="Counseling"
            style={styles.infoImage}
          />
        </div>
      </div>

      <div className="details-section">
        <h3>What is it?</h3>
        <p>
          When experiencing depression, a person often feels sadness,
          hopelessness, and a loss of interest in activities they once enjoyed.
          They may also experience fatigue, difficulty concentrating, changes in
          appetite or sleep patterns, and feelings of worthlessness or excessive
          guilt.
        </p>
      </div>

      <div
        className="youtube-video-container"
        style={styles.youtubeVideoContainer}
      >
        {youtubeVideoId && (
          <iframe
            className="iframe"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          ></iframe>
        )}
      </div>

      <div style={styles.container}>
        <div style={styles.imageSection}>
          <div style={styles.imageWrapper}>
            <img src={empathy} alt="Wellness" style={styles.wellnessImage} />
            <div style={styles.imageCaption}>#Lets Grow Together</div>
          </div>
        </div>
        <div style={styles.textSection}>
          <h1 style={styles.textSectionH1}>
            Ready To Embark On The Journey Of Wellness?
          </h1>
          <p style={styles.textSectionP}>
            Start your mental transformation with our experienced counselors and
            therapists today. Get to be in your ultimate inner peace and lasting
            well-being with our programs, tailored specially to your health
            needs.
          </p>
          <button style={styles.getStartedBtn}>Get Started →</button>
        </div>
      </div>
      <style jsx>{`
        .issue-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 30px;
        }

        .issue-content {
          flex: 1;
          margin-right: 20px;
        }

        .additional-content {
          display: flex;
          align-items: center;
          margin-top: 20px;
        }

        .long-image {
          width: 50%;
          border-radius: 8px;
          margin-right: 10px;
          max-height: 80px;
        }

        .issue-image {
          flex: 1.5;
        }

        .image {
          max-height: 200px;
          object-fit: contain;
          width: 100%;
          border-radius: 5px;
        }

        .stats {
          background-color: #ffeb3b;
          padding: 10px;
          border-radius: 5px;
        }

        .book-session-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ff5722;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        }

        .book-session-button:hover {
          background-color: #e64a19;
        }

        .details-section {
          margin: 30px 40px 0 40px;
        }

        .iframe {
          width: 100%;
          height: 315px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    maxWidth: "1200px",
    margin: "20px auto", // Center the container with equal margins
  },
  textSection: {
    flex: 2.5,
    paddingLeft: "20px",
  },
  textSectionH2: {
    fontSize: "2rem",
    marginBottom: "20px",
    marginRight: "10px",

    textAlign: "right", // Indent the text to the right
  },
  textSectionH1: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  textSectionP: {
    fontSize: "1.1rem",
    marginBottom: "20px",
  },
  textSectionPa: {
    fontSize: "1.1rem",
    marginBottom: "20px",
  },
  getStartedBtn: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#000",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  imageSection: {
    flex: 1,
    textAlign: "center",
  },
  imageWrapper: {
    display: "inline-block",
    textAlign: "center",
  },
  wellnessImage: {
    width: "100%", // Reduce the size of the image
    borderRadius: "8px",
  },
  imageCaption: {
    backgroundColor: "#f7d072",
    padding: "10px 0",
    marginTop: "10px",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "100%", // Match the width of the image
    textAlign: "center",
    margin: "0 auto",
  },
  additionalInfoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    maxWidth: "1200px",
    marginTop: "-50px",
    margin: "20px auto", // Center the container with equal margins
  },
  infoTextSection: {
    flex: 2,
    paddingRight: "10px",
  },
  infoImageSection: {
    flex: 1,
    textAlign: "center",
  },
  youtubeVideoContainer: {
    margin: "0px 40px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
  },

  fixedHeading: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    color: "white",
  },
  infoImage: {
    width: "100%",
    borderRadius: "8px",
  },
  additionalContent: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  longImage: {
    width: "50%",
    borderRadius: "8px",
    maxHeight: "80px",
    marginRight: "20px",
  },
  imageCaption: {
    backgroundColor: "#F7E98D",
    padding: "15px",
    borderRadius: "5px",
    fontSize: "1rem",
    textAlign: "center",
    width: "100%",
    marginRight: "15px",
  },
};

export default SingleIssue;
