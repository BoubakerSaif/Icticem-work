import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBBadge,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createVisit, updateVisit } from "../redux/Slices/visitSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddNewVisit = () => {
  const [visitData, setVisitData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, loading, userVisits } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = visitData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleVisit = userVisits.find((visit) => visit._id === id);
      console.log(singleVisit);
      setVisitData({ ...singleVisit });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description) {
      const updatedVisitData = { ...visitData, name: user?.result?.name };

      if (!id) {
        dispatch(createVisit({ updatedVisitData, navigate, toast }));
      } else {
        dispatch(updateVisit({ id, updatedVisitData, toast, navigate }));
      }

      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setVisitData({ ...visitData, [name]: value });
  };

  const handleAddTag = (tag) => {
    if (tag && tag.trim() !== "") {
      setTagErrMsg(null);
      setVisitData({ ...visitData, tags: [...visitData.tags, tag] });
    } else {
      setTagErrMsg("Tag cannot be empty");
    }
  };

  const handleDeleteTag = (deleteTag) => {
    setVisitData({
      ...visitData,
      tags: visitData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setVisitData({ title: "", description: "", tags: [] });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Visit" : "Add Visit"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="mb-4"
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Description"
                type="textarea"
                value={description || ""}
                name="description"
                onChange={onInputChange}
                className="mb-4"
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Link"
                type="text"
                value={visitData.link || ""}
                name="link"
                onChange={onInputChange}
                className="mb-4"
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Tags"
                type="text"
                name="tags"
                onChange={(e) => handleAddTag(e.target.value)}
                value={visitData.tags.join(",")}
                className="mb-4"
                required
              />
              {tagErrMsg && <MDBBadge color="danger">{tagErrMsg}</MDBBadge>}
              {visitData.tags.map((tag, index) => (
                <MDBBadge
                  key={index}
                  color="primary"
                  className="me-2 mb-2"
                  pill
                  onClick={() => handleDeleteTag(tag)}
                >
                  {tag}
                </MDBBadge>
              ))}
            </div>
            <div className="col-md-12">
              <MDBBtn color="primary" type="submit">
                {id ? "Update" : "Add"}
              </MDBBtn>
              <MDBBtn color="secondary" onClick={handleClear}>
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddNewVisit;
