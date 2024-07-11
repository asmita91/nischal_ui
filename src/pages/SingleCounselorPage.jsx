import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createReviewApi,
  getReviewsApi,
  getSingleCounselorApi,
} from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
import Modal from 'react-modal';


const SingleArticle = () => {
  const [counselor, setCounselor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const { counselorId } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchCounselor = async () => {
      try {
        const response = await getSingleCounselorApi(counselorId);
        setCounselor(response.data.counselor);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching counselor details");
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await getReviewsApi(counselorId);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching reviews");
      }
    };

    fetchCounselor();
    fetchReviews();
  }, [counselorId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditReview = (review) => {
    setNewReview({ rating: review.rating, comment: review.comment });
    setEditingReviewId(review._id);
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/counselor/review/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data.message);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error(error);
      toast.error("Error deleting review");
    }
  };

  const handleReviewSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      toast.error("You need to be logged in to submit a review");
      return;
    }

    try {
      const reviewData = {
        userId: user._id,
        rating: newReview.rating,
        comment: newReview.comment,
        counselorId: counselorId,
      };

      let response;
      if (editingReviewId) {
        response = await axios.put(
          `http://localhost:5000/api/counselor/review/${editingReviewId}`,
          reviewData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        response = await createReviewApi(reviewData, token);
      }

      toast.success(response.data.message);
      setReviews((prevReviews) => {
        if (editingReviewId) {
          return prevReviews.map((review) =>
            review._id === editingReviewId ? response.data.review : review
          );
        }
        return [response.data.review, ...prevReviews];
      });
      setNewReview({ rating: 0, comment: "" });
      setEditingReviewId(null);
    } catch (error) {
      console.error(error);
      toast.error("Error submitting review");
    }
  };

  if (!counselor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AnimatedWave />
      <div style={styles.contentContainer}>
        <div style={styles.counselorDetails}>
          <div style={styles.counselorText}>
            <div style={styles.counselorNameContainer}>
              <h2 style={styles.counselorName}>
                Hi, I’m{" "}
                <span style={styles.counselorNameBlue}>
                  {counselor.counselorName}
                </span>
                .
              </h2>
            </div>
            <h3 style={styles.counselorPosition}>
              {counselor.counselorPosition}
            </h3>
            <p>{counselor.counselorDescription}</p>
            <blockquote style={styles.counselorQuote}>
              "True healing begins when we allow ourselves to be vulnerable and
              embrace the journey towards self-discovery and growth."
            </blockquote>
          </div>

          <div style={styles.counselorImage}>
            <img
              src={counselor.counselorImageUrl}
              alt={counselor.counselorName}
              style={styles.image}
            />
            <button style={styles.consultButton}>Consult Now →</button>
          </div>
        </div>

        <div style={styles.extraDetails}>
          <div className="dotted-line" style={styles.dottedLine}></div>
          <ExtraDetail title="Expertise" content={counselor.expertise} />
          <ExtraDetail title="Approach" content={counselor.approach} />
          <ExtraDetail
            title="Holistic Philosophy"
            content={counselor.philosophy}
          />
          <ExtraDetail
            title="Educational Degree"
            content={counselor.educationalDegree}
          />
        </div>

        <div style={styles.reviewsContainer}>
          <h3>What Customers Say</h3>
          {reviews.map((review) => (
            <div key={review._id} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                {review.user && (
                  <img
                    src={review.user.profileImageUrl || "default-profile.png"}
                    alt={`${review.user.firstName} ${review.user.lastName}`}
                    style={styles.reviewAvatar}
                  />
                )}
                <div style={styles.reviewUserInfo}>
                  <strong>
                    {review.user
                      ? `${review.user.firstName} ${review.user.lastName}`
                      : "Anonymous"}
                  </strong>
                </div>
                <div style={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
              <div style={styles.reviewFooter}>
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                {review.user &&
                  review.user._id ===
                    JSON.parse(localStorage.getItem("user"))._id && (
                    <div style={styles.reviewActions}>
                      <button
                        onClick={() => handleEditReview(review)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
          <button onClick={openModal} style={styles.addReviewButton}>
            Add Review
          </button>
          {/* <div style={styles.reviewForm}>
            <h4>Leave a Review</h4>
            <input
              type="number"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              style={styles.ratingInput}
            />
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              style={styles.commentInput}
            />
            <button onClick={handleReviewSubmit} style={styles.submitButton}>
              Submit Review
            </button>
          </div> */}

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Add Review"
            style={modalStyles}
          >
            <h2>Add Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div style={styles.starRating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={32}
                    onClick={() =>
                      setNewReview({ ...newReview, rating: i + 1 })
                    }
                    color={i < newReview.rating ? "#ffc107" : "#e4e5e9"}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                style={styles.commentInput}
                placeholder="Write your review here..."
              />
              <button type="submit" style={styles.submitButton}>
                Submit Review
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const ExtraDetail = ({ title, content }) => {
  return (
    <div className="detail-item" style={styles.detailItem}>
      <div style={styles.iconContainer}>
        <span style={styles.icon}>•</span>
      </div>
      <div style={styles.textContainer}>
        <h4 style={styles.detailTitle}>{title}:</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

// CSS in JS
const styles = {
  contentContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0px 20px 20px 20px",
  },
  counselorDetails: {
    display: "flex",
    alignItems: "flex-start",
    margin: "10px 0",
    padding: "10px 0",
    flexWrap: "wrap",
  },
  counselorText: {
    flex: "2 1 60%",
    lineHeight: "1.6",
    fontSize: "16px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  counselorNameContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  counselorName: {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
    textAlign: "center",
  },
  counselorNameBlue: {
    color: "blue",
  },
  counselorPosition: {
    color: "blue",
    fontSize: "20px",
    marginTop: "10px",
  },
  counselorQuote: {
    fontStyle: "italic",
    color: "#555",
    marginTop: "5px",
  },
  consultButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "50%",
    alignSelf: "center",
  },
  counselorImage: {
    flex: "1 1 30%",
    textAlign: "center",
    marginTop: "10px",
    alignSelf: "flex-start",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  extraDetails: {
    marginTop: "30px",
    position: "relative",
  },
  dottedLine: {
    position: "absolute",
    left: "14px", // Adjusted to align with the dots
    top: "0",
    width: "2px",
    background:
      "linear-gradient(to bottom, #007bff 0%, #007bff 50%, transparent 50%, transparent 100%)",
    backgroundSize: "2px 10px",
    zIndex: "-1",
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "20px",
    position: "relative",
  },
  iconContainer: {
    marginRight: "10px",
  },
  icon: {
    fontSize: "20px",
    color: "#007bff",
  },
  textContainer: {
    flex: 1,
  },
  detailTitle: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  reviewsContainer: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  reviewCard: {
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  reviewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  reviewAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  reviewUserInfo: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  reviewRating: {
    display: "flex",
    alignItems: "center",
  },
  reviewFooter: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  reviewActions: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  reviewForm: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  ratingInput: {
    width: "50px",
    padding: "5px",
    marginRight: "10px",
  },
  commentInput: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  submitButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default SingleArticle;
