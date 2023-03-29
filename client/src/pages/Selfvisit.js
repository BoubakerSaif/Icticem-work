import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { getVisit } from "../redux/Slices/visitSlice";

const VisitPage = () => {
  const dispatch = useDispatch();
  const { visit } = useSelector((state) => state.visit); 
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getVisit(id));
    }
  }, [id]);

  return (
    <>
      <MDBContainer>
        {visit && ( 
          <MDBCard className="mb-3 mt-2">
            <MDBCardImage
              position="top"
              style={{ width: "100%", maxHeight: "600px" }}
              src={visit.imageFile}
              alt={visit.title}
            />
            <MDBCardBody>
              <h3>{visit.title}</h3>
              <span>
                <p className="text-start tourName">
                  Created By: {visit.name}
                </p>
              </span>
              <div style={{ float: "left" }}>
                <span className="text-start">
                  {visit &&
                    visit.tags &&
                    visit.tags.map((item) => `#${item} `)}
                </span>
              </div>
              <br />
              <MDBCardText className="text-start mt-2">
                <MDBIcon
                  style={{ float: "left", margin: "5px" }}
                  far
                  icon="calendar-alt"
                  size="lg"
                />
                <small className="text-muted">
                  {moment(visit.createdAt).fromNow()}
                </small>
              </MDBCardText>
              {visit.description && ( 
                <MDBCardText className="lead mb-0 text-start">
                  {visit.description}
                </MDBCardText>
              )}
            </MDBCardBody>
          </MDBCard>
        )}
      </MDBContainer>
    </>
  );
};

export default VisitPage;


