// import React, { useEffect, useRef, useState } from "react";
// import videoThumbnail from "../images/Rectangle 116.png";
// import image1 from "../images/Rectangle 123.png";
// import image2 from "../images/Rectangle 124.png";
// import image3 from "../images/Rectangle 125.png";
// import image4 from "../images/Rectangle 128.png";

// const styles = {
//   app: {
//     display: "flex",
//     width: "100%",
//     minHeight: "100vh",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//     boxSizing: "border-box",
//   },
//   leftSide: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     flex: "1 1 60%",
//     padding: "20px",
//     boxSizing: "border-box",
//   },
//   sections: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     alignItems: "stretch",
//   },
//   section: {
//     textAlign: "center",
//     padding: "10px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     boxSizing: "border-box",
//     flex: "1",
//   },
//   text: {
//     marginBottom: "10px",
//   },
//   images: {
//     display: "grid",
//     gap: "10px",
//     gridTemplateColumns: "1fr", // Default to single column
//   },
//   image: {
//     width: "100%",
//     height: "auto",
//     borderRadius: "8px",
//   },
//   imageFullWidth: {
//     width: "100%",
//     height: "auto",
//     borderRadius: "8px",
//   },
//   hashtag: {
//     marginTop: "20px",
//     fontSize: "1.2em",
//     color: "#f0c419",
//     textAlign: "center",
//   },
//   rightSide: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flex: "1 1 40%",
//     padding: "20px",
//     boxSizing: "border-box",
//   },
//   videoSection: {
//     textAlign: "center",
//   },
//   videoContainer: {
//     position: "relative",
//     display: "inline-block",
//   },
//   videoImage: {
//     width: "100%",
//     maxWidth: "300px",
//     height: "auto",
//     borderRadius: "8px",
//   },
//   playButton: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     color: "white",
//     border: "none",
//     borderRadius: "50%",
//     padding: "10px",
//     cursor: "pointer",
//   },
//   playButtonHover: {
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },
// };

// // Media query styles
// const mediaStyles = `
//   @media (max-width: 768px) {
//     .app {
//       flex-direction: column;
//       height: auto;
//       padding: 10px;
//     }
//     .leftSide, .rightSide {
//       width: 100%;
//     }
//     .sections {
//       flex-direction: column;
//     }
//     .section {
//       flex: 1 1 100%;
//       margin-right: 0;
//       margin-bottom: 20px;
//     }
//     .imageFullWidth {
//       width: 100%;
//     }
//   }
// `;

// function App() {
//   const videoSectionRef = useRef(null);
//   const [sectionHeight, setSectionHeight] = useState(0);

//   useEffect(() => {
//     if (videoSectionRef.current) {
//       setSectionHeight(videoSectionRef.current.clientHeight);
//     }
//   }, []);

//   return (
//     <>
//       <style>{mediaStyles}</style>
//       <div style={styles.app} className="app">
//         <div style={styles.leftSide} className="leftSide">
//           <div style={styles.sections} className="sections">
//             <Section
//               title="10+"
//               subtitle="years of Experience"
//               images={[image1, image4]}
//               isFirstSection={true}
//               sectionHeight={sectionHeight}
//             />
//             <Section
//               title="7000+"
//               subtitle="empowered Clients"
//               images={[image2]}
//               sectionHeight={sectionHeight}
//             />
//             <Section
//               title="150"
//               subtitle="Expert Collaborations"
//               images={[image3]}
//               sectionHeight={sectionHeight}
//             />
//           </div>
//           <div style={styles.hashtag}>#TherapyWorks</div>
//         </div>
//         <div style={styles.rightSide} className="rightSide">
//           <div ref={videoSectionRef}>
//             <VideoSection />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function Section({ title, subtitle, images, isFirstSection, sectionHeight }) {
//   return (
//     <div
//       style={{
//         ...styles.section,
//         height: sectionHeight ? sectionHeight : "auto",
//       }}
//       className="section"
//     >
//       <div style={styles.text}>
//         <h2>{title}</h2>
//         <p>{subtitle}</p>
//       </div>
//       <div
//         style={{
//           ...styles.images,
//           gridTemplateColumns: isFirstSection ? "1fr" : "1fr",
//           gridTemplateRows: isFirstSection ? "repeat(2, auto)" : "1fr",
//         }}
//       >
//         {images.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt={subtitle}
//             style={styles.imageFullWidth}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function VideoSection() {
//   const [isHover, setIsHover] = useState(false);

//   return (
//     <div style={styles.videoSection}>
//       <div style={styles.videoContainer}>
//         <img
//           src={videoThumbnail}
//           alt="Therapy Session"
//           style={styles.videoImage}
//         />
//         <button
//           style={{
//             ...styles.playButton,
//             ...(isHover ? styles.playButtonHover : {}),
//           }}
//           onMouseEnter={() => setIsHover(true)}
//           onMouseLeave={() => setIsHover(false)}
//         >
//           Play
//         </button>
//       </div>
//       <p>
//         Welcome to Mann Ko Bhawana. Join us on our transformative journey
//         towards lasting peace.
//       </p>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useRef, useState } from "react";
import videoThumbnail from "../images/Rectangle 116.png";
import image1 from "../images/Rectangle 123.png";
import image2 from "../images/Rectangle 124.png";
import image3 from "../images/Rectangle 125.png";
import image4 from "../images/Rectangle 128.png";

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1200px",
    minHeight: "400px",
  },
  contentContainer: {
    display: "flex",
    width: "100%",
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 1 70%",
    padding: "20px",
    boxSizing: "border-box",
  },
  sections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "stretch",
  },
  section: {
    textAlign: "center",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    flex: "1",
  },
  text: {
    marginBottom: "10px",
  },
  images: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "1fr",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  imageFullWidth: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  hashtag: {
    marginTop: "20px",
    fontSize: "1.2em",
    color: "#f0c419",
    textAlign: "center",
  },
  rightSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 30%",
    padding: "20px",
    boxSizing: "border-box",
  },
  videoSection: {
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  videoContainer: {
    position: "relative",
    display: "inline-block",
    width: "100%",
    height: "100%",
  },
  videoImage: {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    borderRadius: "8px",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
  },
  playButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  benefitsSection: {
    textAlign: "center",
    marginTop: "40px",
  },
  benefitsTitle: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  benefitsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  benefit: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    flex: "1",
  },
  benefitIcon: {
    width: "50px",
    height: "50px",
    marginBottom: "10px",
  },
};

// Media query styles
const mediaStyles = `
  @media (max-width: 768px) {
    .app {
      padding: 10px;
    }
    .container {
      flex-direction: column;
    }
    .contentContainer {
      flex-direction: column;
    }
    .leftSide, .rightSide {
      width: 100%;
    }
    .sections {
      flex-direction: column;
    }
    .section {
      flex: 1 1 100%;
      margin-bottom: 20px;
    }
    .imageFullWidth {
      width: 100%;
    }
    .benefitsContainer {
      flex-direction: column;
    }
    .benefit {
      margin-bottom: 20px;
    }
  }
`;

function App() {
  const videoSectionRef = useRef(null);
  const sectionsRef = useRef([]);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const heights = sectionsRef.current.map((ref) => ref.clientHeight);
    if (videoSectionRef.current) {
      heights.push(videoSectionRef.current.clientHeight);
    }
    setMaxHeight(Math.max(...heights));
  }, []);

  return (
    <>
      <style>{mediaStyles}</style>
      <div style={styles.app} className="app">
        <div style={styles.container} className="container">
          <div style={styles.contentContainer}>
            <div style={styles.leftSide} className="leftSide">
              <div style={styles.sections} className="sections">
                <Section
                  title="10+"
                  subtitle="years of Experience"
                  images={[image1, image4]}
                  isFirstSection={true}
                  maxHeight={maxHeight}
                  ref={(el) => (sectionsRef.current[0] = el)}
                />
                <Section
                  title="7000+"
                  subtitle="empowered Clients"
                  images={[image2]}
                  maxHeight={maxHeight}
                  ref={(el) => (sectionsRef.current[1] = el)}
                />
                <Section
                  title="150"
                  subtitle="Expert Collaborations"
                  images={[image3]}
                  maxHeight={maxHeight}
                  ref={(el) => (sectionsRef.current[2] = el)}
                />
              </div>
              <div style={styles.hashtag}>#TherapyWorks</div>
            </div>
            <div style={styles.rightSide} className="rightSide">
              <div ref={videoSectionRef} style={{ height: maxHeight }}>
                <VideoSection />
              </div>
            </div>
          </div>
          <BenefitsSection />
        </div>
      </div>
    </>
  );
}

const Section = React.forwardRef(
  ({ title, subtitle, images, isFirstSection, maxHeight }, ref) => (
    <div
      style={{ ...styles.section, height: maxHeight }}
      className="section"
      ref={ref}
    >
      <div style={styles.text}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div
        style={{
          ...styles.images,
          gridTemplateColumns: isFirstSection ? "1fr" : "1fr",
          gridTemplateRows: isFirstSection ? "repeat(2, auto)" : "1fr",
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={subtitle}
            style={styles.imageFullWidth}
          />
        ))}
      </div>
    </div>
  )
);

function VideoSection() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={styles.videoSection}>
      <div style={styles.videoContainer}>
        <img
          src={videoThumbnail}
          alt="Therapy Session"
          style={styles.videoImage}
        />
        <button
          style={{
            ...styles.playButton,
            ...(isHover ? styles.playButtonHover : {}),
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          Play
        </button>
      </div>
      <p>
        Welcome to Mann Ko Bhawana. Join us on our transformative journey
        towards lasting peace.
      </p>
    </div>
  );
}

function BenefitsSection() {
  return (
    <div style={styles.benefitsSection}>
      <h2 style={styles.benefitsTitle}>What Will You Get?</h2>
      <div style={styles.benefitsContainer}>
        <div style={styles.benefit}>
          <img
            src={""}
            alt="Improved Mental Health"
            style={styles.benefitIcon}
          />
          <h3>Improved Mental Health</h3>
          <p>
            Experience improved mental health with our award-winning support.
          </p>
        </div>
        <div style={styles.benefit}>
          <img
            src={""}
            alt="Better Personal Relation"
            style={styles.benefitIcon}
          />
          <h3>Better Personal Relation</h3>
          <p>
            You will experience improved personal relationships through
            accessible and effective mental health support.
          </p>
        </div>
        <div style={styles.benefit}>
          <img
            src={""}
            alt="Enhanced Productivity"
            style={styles.benefitIcon}
          />
          <h3>Enhanced Productivity</h3>
          <p>
            Boost your productivity by experiencing effective and personalized
            mental health support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
