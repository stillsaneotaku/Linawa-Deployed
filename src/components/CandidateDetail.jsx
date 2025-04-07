import React from "react";
import { useParams, Link } from "react-router-dom";
import candidates from "./CandidatesData";
import styles from "./CandidateDetail.module.css";

const CandidateDetail = () => {
  const { name } = useParams();

  const candidate = candidates.find(
    (c) => c.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
  );

  if (!candidate) {
    return <p className="text-center mt-3">Candidate not found.</p>;
  }

  return (
    <>
      <h4 className={styles.pageTitle}>Candidate Information</h4>
      <div className={styles.pageContainer}>
        <div className={`${styles.candidateProfilePage} card`}>
          <img
            src={candidate.image}
            alt={candidate.name}
            className={`${styles.candidateImageFormat} card-img`}
          />
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>{candidate.name}</h5>
          </div>
          <div className={styles.tableInformation}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th colSpan="2" className={styles.tableTitle}>Personal Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.firstCol}>Party</td>
                  <td className={styles.secondCol}>{candidate.party}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Alliance</td>
                  <td className={styles.secondCol}>{candidate.alliance}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Position</td>
                  <td className={styles.secondCol}>{candidate.position}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Age</td>
                  <td className={styles.secondCol}>{candidate.age}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Hometown</td>
                  <td className={styles.secondCol}>{candidate.hometown}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Highest Educational Attainment</td>
                  <td className={styles.secondCol}>{candidate.education}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Professional Experience</td>
                  <td className={styles.secondCol}>{candidate.experience}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Previous Position</td>
                  <td className={styles.secondCol}>{candidate.previousPosition}</td>
                </tr>
                <tr>
                  <td className={styles.firstCol}>Achievements</td>
                  <td className={styles.secondCol}>{candidate.achievements}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.cardFooter}>
            <Link to="../pages/candidates" className="btn btn-primary">Return to Candidates</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateDetail;
