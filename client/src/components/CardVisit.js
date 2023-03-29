import { updateVisit, deleteVisit } from "../redux/Slices/visitSlice";
import { FaThumbsUp, FaComment, FaEdit, FaTrash } from "react-icons/fa";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import RatingStars from "react-rating-stars-component";

const CardVisit = ({
  imageFile,
  description = "",
  title,
  _id,
  name,
  likes,
  comments = [],
  rating,
  onSubmitComment = () => {},
  onSelectCard = () => {},
  onUpdateCard = () => {},
  onDeleteCard = () => {},
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [numLikes, setNumLikes] = useState(likes);
  const [selectedRating, setSelectedRating] = useState(rating);
  const dispatch = useDispatch();
  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLikeClick = () => {
    setNumLikes(numLikes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        author: "Anonymous",
        text: newComment.trim(),
        date: new Date().toLocaleString(),
        rating: selectedRating,
      };
      const updatedComments = [...comments, newCommentObj];
      onSubmitComment(updatedComments);
      setNewComment("");
    }
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleUpdateCard = () => {
    dispatch(
      updateVisit({
        _id,
        title,
        imageFile,
        description,
        numLikes,
        comments,
        rating: selectedRating,
      })
    );
  };

  const handleDeleteCard = () => {
    console.log(_id);
    dispatch(deleteVisit({ id: _id }));
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <RatingStars
                value={selectedRating}
                onChange={handleRatingChange}
              />
            </div>
            <div>
              <FaThumbsUp className="me-2" onClick={handleLikeClick} />
              <span>{numLikes}</span>
            </div>
          </div>
          <MDBCardText className="text-start">
            {showDescription ? description : description.slice(0, 50) + "..."}
            <span
              className="fw-bold ms-2"
              style={{ cursor: "pointer" }}
              onClick={handleToggleDescription}
            >
              {showDescription ? "Read less" : "Read more"}
            </span>
          </MDBCardText>
          <MDBBtn
            className="me-2"
            color="primary"
            onClick={handleToggleComments}
          >
            <FaComment className="me-2" />
            {comments.length} Comments
          </MDBBtn>
          <MDBBtn color="warning" onClick={onSelectCard}>
            <FaEdit className="me-2" />
            Edit
          </MDBBtn>

          <MDBBtn color="danger" onClick={handleDeleteCard}>
            <FaTrash className="me-2" />
            Delete
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      {showComments && (
        <MDBCard className="mt-2" style={{ maxWidth: "20rem" }}>
          <MDBCardBody>
            <MDBCardTitle className="text-start">Comments</MDBCardTitle>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="my-3">
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">{comment.author}</div>
                    <div>{comment.date}</div>
                  </div>
                  <div>{comment.text}</div>
                  <div>
                    Rating:{" "}
                    <RatingStars
                      value={comment.rating}
                      edit={false}
                      size={20}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>No comments yet.</div>
            )}
            <form onSubmit={handleCommentSubmit} className="my-3">
              <MDBInput
                label="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                outline
                size="sm"
              />
              <div className="d-flex justify-content-between">
                <RatingStars
                  value={selectedRating}
                  onChange={handleRatingChange}
                />
                <MDBBtn color="primary" size="sm" type="submit">
                  Submit
                </MDBBtn>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      )}
    </MDBCardGroup>
  );
};

export default CardVisit;
