import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  increment,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./MockElection.module.css"; // ✅ Fixed import

const CandidatesPolling = () => {
  const [candidates, setCandidates] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchCandidates = async () => {
    const candidatesCollection = collection(db, "candidates");
    const candidatesSnapshot = await getDocs(candidatesCollection);
    const candidatesList = candidatesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCandidates(candidatesList);
    setLoading(false);
  };

  const fetchUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserVotes(user.uid);
      } else {
        setUser(null);
      }
    });
  };

  const fetchUserVotes = async (userId) => {
    const voteDoc = doc(db, "votes", userId);
    const docSnap = await getDoc(voteDoc);
    if (docSnap.exists()) {
      setUserVotes(docSnap.data().selectedCandidates);
    } else {
      setUserVotes([]);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      if (userVotes.length < 12 && !userVotes.includes(candidateId)) {
        const updatedVotes = [...userVotes, candidateId];
        const voteDocRef = doc(db, "votes", user.uid);
        const voteDocSnap = await getDoc(voteDocRef);

        if (voteDocSnap.exists()) {
          await updateDoc(voteDocRef, {
            selectedCandidates: updatedVotes,
          });
        } else {
          await setDoc(voteDocRef, {
            selectedCandidates: updatedVotes,
          });
        }

        const candidateDocRef = doc(db, "candidates", candidateId);
        await updateDoc(candidateDocRef, {
          voteCount: increment(1),
        });

        setUserVotes(updatedVotes);
      } else {
        alert("You can vote for up to 12 candidates only.");
      }
    } catch (error) {
      console.error("Error adding vote: ", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchUser();
  }, [user]);

  return (
    <div className={styles.mockElectionContainer}>
      <h1 className={styles.pageTitle}>Senatorial Candidates</h1>
      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <div className={styles.candidatesList}>
          {candidates.map((candidate) => (
            <div key={candidate.id} className={styles.candidateCard}>
              <div className={styles.candidateInfo}>
                <div className={styles.checkIcon}>
                  {userVotes.includes(candidate.id) && <FaCheckCircle />}
                </div>
                <h2>{candidate.name}</h2>
              </div>
              <div className={styles.voteSection}>
                {userVotes.includes(candidate.id) ? (
                  <p>Votes: {candidate.voteCount}</p>
                ) : (
                  <button
                    onClick={() => handleVote(candidate.id)}
                    className={styles.voteBtn}
                    disabled={userVotes.includes(candidate.id)}
                  >
                    Vote
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidatesPolling;
