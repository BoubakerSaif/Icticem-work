import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createVisit, updateVisit } from "../redux/Slices/visitSlice";

const AddNewVisit = () => {
  const [visitData, setVisitData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const handleChange = (e) => {
    setVisitData({ ...visitData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(createVisit(visitData));
  };
  console.log(visitData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <h5> "Add Visit"</h5>
        <MDBCardBody>
          <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
            <div className="col-md-12">
              <MDBInput
                onChange={handleChange}
                placeholder="Enter Title"
                type="text"
                name="title"
                className="mb-4"
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                onChange={handleChange}
                placeholder="Enter Description"
                type="textarea"
                name="description"
                className="mb-4"
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                onChange={handleChange}
                placeholder="Enter imageUrl"
                type="text"
                name="imageUrl"
                className="mb-4"
                required
              />
            </div>

            <div className="col-md-12">
              <MDBBtn color="primary" type="submit">
                Add
              </MDBBtn>
              <MDBBtn color="secondary">Clear</MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddNewVisit;
