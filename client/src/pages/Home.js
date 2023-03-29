import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getVisits } from "../redux/Slices/visitSlice";
import CardVisit from "../components/CardVisit";

const Home = () => {
  const { AllVisits, loading } = useSelector((state) => state.visit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVisits());
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {!AllVisits || AllVisits.length === 0 ? (
          <MDBTypography className="text-center mb-0" tag="h2">
            No visits Found
          </MDBTypography>
        ) : (
          <>
            <MDBCol>
              <MDBContainer>
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                  {AllVisits?.map((visit, index) => (
                    <CardVisit key={index} {...visit} />
                  ))}
                </MDBRow>
              </MDBContainer>
            </MDBCol>
          </>
        )}
      </MDBRow>
    </div>
  );
};

export default Home;
