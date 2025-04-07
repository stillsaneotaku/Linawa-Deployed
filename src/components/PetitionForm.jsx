import React, { useState, useEffect } from 'react';
import { auth, db, collection, addDoc } from "../firebase";
import styles from './PetitionForm.module.css';
import ReportIssues from './ReportIssues';
import InfoSection from './InfoSection';

const PetitionForm = () => {
  const [petitionTitle, setPetitionTitle] = useState("");
  const [petitionMessage, setPetitionMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState("petition");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      console.warn("No user is logged in");
    }
  }, []);

  const handleSubmitPetition = async (e) => {
    e.preventDefault();

    if (!petitionTitle || !userEmail || !petitionMessage) {
      alert("All fields are mandatory!");
      return;
    }

    try {
      await addDoc(collection(db, 'petitions'), {
        petitionTitle,
        petitionMessage,
        userEmail,
        createdAt: new Date(),
      });

      alert('Petition submitted successfully!');
      setPetitionTitle('');
      setPetitionMessage('');
    } catch (err) {
      console.error('Error submitting petition:', err);
      alert("Failed to submit petition!");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.sectionTitle}>
        <h1>Petition and Report Issue</h1>
        <p>
          Participate in democracy by signing petitions or reporting misconduct during the Philippine Elections.
        </p>
      </div>

      <div className={styles.tabToggle}>
        <button
          className={`${styles.tabButton} ${activeTab === "petition" ? styles.active : ""}`}
          onClick={() => setActiveTab("petition")}
        >
          Petition
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "report" ? styles.active : ""}`}
          onClick={() => setActiveTab("report")}
        >
          Report Issue
        </button>
      </div>

      <InfoSection selectedOption={activeTab === "petition" ? "File a Petition" : "Submit Report"} />

      {activeTab === "petition" && (
        <form onSubmit={handleSubmitPetition}>
          <div className={styles.inputGroup}>
            <label htmlFor="petitionTitle">Petition Title</label>
            <input
              id="petitionTitle"
              type="text"
              value={petitionTitle}
              onChange={(e) => setPetitionTitle(e.target.value)}
              placeholder="Enter petition title"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="petitionMessage">Message</label>
            <textarea
              id="petitionMessage"
              rows="8"
              value={petitionMessage}
              onChange={(e) => setPetitionMessage(e.target.value)}
              placeholder="Write your message here..."
            />
          </div>

          <button type="submit" className={styles.submitButton}>Submit Petition</button>
        </form>
      )}

      {activeTab === "report" && (
        <div className={styles.reportSection}>
          <p>Report tab is active</p>
          <ReportIssues />
        </div>
      )}
    </div>
  );
};

export default PetitionForm;
