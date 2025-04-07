import React, { useState } from "react";
// STYLE
import styles from "./CandidatesProfile.module.css";
// ROUTING
import { Link } from "react-router-dom";
// DATA
import candidates from "./CandidatesData";

const CandidatesProfile = () => {
  const [sortOption, setSortOption] = useState("Alphabetical");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParty, setSelectedParty] = useState("All");
  const [selectedAlliance, setSelectedAlliance] = useState("All");

  // Extract unique parties and alliances for filter dropdowns
  const uniqueParties = ["All", ...new Set(candidates.map((c) => c.party))];
  const uniqueAlliances = [
    "All",
    ...new Set(candidates.map((c) => c.alliance)),
  ];

  // Filter candidates by search term, party, and alliance
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedParty === "All" || candidate.party === selectedParty) &&
      (selectedAlliance === "All" || candidate.alliance === selectedAlliance)
  );

  // Function to handle sorting
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortOption === "Alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "Party") {
      return a.party.localeCompare(b.party);
    } else if (sortOption === "Alliance") {
      return a.alliance.localeCompare(b.alliance);
    }
    return 0;
  });

  // Define party-based class names
  const partyColors = {
    Independent: "Independent",
    PDP: "PDP",
    Nacionalista: "Nacionalista",
    Makabayan: "Makabayan",
    NPC: "NPC",
    PLM: "PLM",
    Lakas: "Lakas",
  };

  // Define alliance-based class names
  const allianceColors = {
    "Alyansa para sa Bagong Pilipinas": "Alyansa",
    KiBam: "KiBam",
    "Oposisyon ng Bayan": "Oposisyon",
    "Partido Demokratiko Pilipino": "PDP",
    "Riding-in-tandem Team": "Riding",
    "-": "None",
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.searchArea}>
          <form className={styles.dFlex} role="search">
            <input
              className={styles.formControl}
              type="search"
              placeholder="search candidate..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className={styles.filterText}>Sort by:</div>
          <select
            className={styles.formSelect}
            aria-label="Sort candidates"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Alphabetical">Alphabetical</option>
            <option value="Party">Party</option>
            <option value="Alliance">Alliance</option>
          </select>

          <div className={styles.filterText}>Party:</div>
          <select
            className={styles.formSelect}
            aria-label="Filter by party"
            value={selectedParty}
            onChange={(e) => setSelectedParty(e.target.value)}
          >
            {uniqueParties.map((party, index) => (
              <option key={index} value={party}>
                {party}
              </option>
            ))}
          </select>

          <div className={styles.filterText}>Alliance:</div>
          <select
            className={styles.formSelect}
            aria-label="Filter by alliance"
            value={selectedAlliance}
            onChange={(e) => setSelectedAlliance(e.target.value)}
          >
            {uniqueAlliances.map((alliance, index) => (
              <option key={index} value={alliance}>
                {alliance}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className={styles.cardContainer}>
        <div className="row">
          {sortedCandidates.length > 0 ? (
            sortedCandidates.map((candidate, index) => (
              <div className="col-md-2 mb-5" key={index}>
                <Link
                  to={`/pages/candidate-profiles/${encodeURIComponent(
                    candidate.name
                  )}`}
                  className={styles.cardLink}
                >
                  <div className={`${styles.card} ${styles[partyColors[candidate.party]]  ?? ""}`}>
                    <img
                      src={candidate.image}
                      className={styles.cardImgBottom}
                      alt={candidate.name}
                    />
                    <div className={styles.cardBody}>
                      <h5 className={styles.cardTitle}>{candidate.name}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li
                        className={styles.listGroupItemTop}>
                        <span className={styles.roundedPill}>
                          {candidate.party}
                        </span>
                      </li>
                      <li
                        className={styles.listGroupItemBot}>
                        <span className={styles.roundedPill}>
                          {candidate.alliance}
                        </span>
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="noCandidatesContainer">
              <p className="noCandidates">No candidates found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidatesProfile;
