"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion, query, where, orderBy } from "firebase/firestore";
import VisualPlayground from "@/components/VisualPlayground";
import { contests, Contest, ContestQuestion } from "@/data/contests";
import WarningModal from "@/components/WarningModal";

type ContestEntry = {
  id: string;
  userId: string;
  username: string;
  contestId: string;
  score: number;
  timeTaken: number; // in seconds
  disqualified: boolean;
  rewardClaimed: boolean;
  timestamp: number;
};

export default function ContestsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [loadingUser, setLoadingUser] = useState(true);

  // Contest Selection (default to first contest)
  const activeContest = contests[0];

  const [hasParticipated, setHasParticipated] = useState(false);
  const [userEntry, setUserEntry] = useState<ContestEntry | null>(null);
  const [leaderboard, setLeaderboard] = useState<ContestEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  // Active Contest State
  const [contestStarted, setContestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (!auth || !db) {
      setLoadingUser(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (!db) return;
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || "Unknown");
        }
        await fetchLeaderboardAndStatus(currentUser.uid);
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchLeaderboardAndStatus = async (uid: string) => {
    setLoadingLeaderboard(true);
    try {
      if (!db) return;
      const q = query(collection(db, "contest_entries"), where("contestId", "==", activeContest.id));
      const snapshot = await getDocs(q);
      const entries: ContestEntry[] = [];
      let foundUserEntry = null;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as ContestEntry;
        data.id = docSnap.id;
        entries.push(data);
        if (data.userId === uid) {
          foundUserEntry = data;
        }
      });

      // Sort: Score DESC, TimeTaken ASC
      entries.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.timeTaken - b.timeTaken;
      });

      setLeaderboard(entries);
      if (foundUserEntry) {
        setHasParticipated(true);
        setUserEntry(foundUserEntry);
      }
    } catch (e) {
      console.error("Error fetching leaderboard", e);
    }
    setLoadingLeaderboard(false);
  };

  // Anti-cheat tab switch listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && contestStarted) {
        handleDisqualify();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [contestStarted]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (contestStarted && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (contestStarted && timeLeft === 0) {
      handleContestSubmit(false); // Time up, submit normally
    }
    return () => clearInterval(interval);
  }, [contestStarted, timeLeft]);

  const handleStartContest = () => {
    const now = Date.now();
    if (now < activeContest.startTime) {
      alert("Contest has not started yet.");
      return;
    }
    if (now > activeContest.endTime) {
      alert("Contest has already ended.");
      return;
    }

    const confirmStart = window.confirm(
      "Are you ready to begin? \n\nRULES:\n1. You have exactly 10 minutes.\n2. Do NOT switch tabs or minimize the browser, or you will be instantly disqualified (Score = 0).\n\nClick OK to start the timer."
    );
    if (!confirmStart) return;

    setContestStarted(true);
    setStartTime(Date.now());
    setTimeLeft(activeContest.timeLimitMinutes * 60);
  };

  const handleDisqualify = async () => {
    setContestStarted(false);
    setWarningMessage("You have been disqualified for switching tabs or minimizing the browser.");
    await submitResult(0, true);
  };

  const calculateScore = () => {
    let score = 0;
    activeContest.questions.forEach((q, index) => {
      const answer = selectedAnswers[index];
      let isCorrect = false;

      if (q.type === "mcq") {
        if (answer === q.correctAnswerIndex) isCorrect = true;
      } else if (q.type === "circuit") {
        if (answer) {
          const expected = q.expectedProbs || {};
          isCorrect = true;
          const expectedLen = Object.keys(expected)[0]?.length || 0;
          const trimmedAnswer: Record<string, number> = {};
          if (expectedLen > 0) {
            for (const [k, v] of Object.entries(answer as Record<string, number>)) {
              const trimmedK = k.slice(-expectedLen);
              trimmedAnswer[trimmedK] = (trimmedAnswer[trimmedK] || 0) + v;
            }
          } else {
            Object.assign(trimmedAnswer, answer);
          }

          const keys = new Set([...Object.keys(expected), ...Object.keys(trimmedAnswer)]);
          for (const k of Array.from(keys)) {
            const exp = expected[k] || 0;
            const act = trimmedAnswer[k] || 0;
            if (Math.abs(exp - act) > 0.05) {
              isCorrect = false;
              break;
            }
          }
        }
      }

      if (isCorrect) {
        if (q.difficulty === "easy") score += 2;
        if (q.difficulty === "medium") score += 5;
        if (q.difficulty === "hard") score += 10;
      }
    });
    return score;
  };

  const handleContestSubmit = async (manual: boolean = true) => {
    if (manual) {
      const confirm = window.confirm("Are you sure you want to submit your answers?");
      if (!confirm) return;
    }
    setContestStarted(false);
    const score = calculateScore();
    await submitResult(score, false);
  };

  const submitResult = async (score: number, disqualified: boolean) => {
    if (!user) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // in seconds
    
    const entryId = `${activeContest.id}_${user.uid}`;
    const entryData: Omit<ContestEntry, "id"> = {
      userId: user.uid,
      username: username,
      contestId: activeContest.id,
      score: disqualified ? 0 : score,
      timeTaken: timeTaken,
      disqualified: disqualified,
      rewardClaimed: false,
      timestamp: Date.now()
    };

    try {
      if (!db) return;
      await setDoc(doc(db, "contest_entries", entryId), entryData);
      await fetchLeaderboardAndStatus(user.uid);
    } catch (e) {
      console.error("Error submitting contest", e);
    }
  };

  const getRankAndPayout = () => {
    if (!userEntry) return { rank: -1, payout: 0 };
    const rank = leaderboard.findIndex(e => e.userId === user?.uid) + 1;
    let payout = 0;
    if (rank >= 1 && rank <= 3) payout = 200;
    else if (rank >= 4 && rank <= 100) payout = 150;
    else if (rank >= 101 && rank <= 1000) payout = 100;
    else if (rank > 1000) payout = 50;

    return { rank, payout };
  };

  const claimReward = async () => {
    if (!user || !userEntry) return;
    const { payout } = getRankAndPayout();
    if (payout === 0) return;

    try {
      // Update entry
      if (!db) return;
      await updateDoc(doc(db, "contest_entries", userEntry.id), { rewardClaimed: true });
      // Update user rating
      if (!db) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const currentRating = userSnap.data().rating || 0;
        await updateDoc(userRef, {
          rating: currentRating + payout,
          ratingHistory: arrayUnion({
            reason: `Reward for ${activeContest.title} (Rank ${getRankAndPayout().rank})`,
            points: payout,
            timestamp: new Date().toISOString()
          })
        });
      }
      alert(`Successfully claimed ${payout} rating points!`);
      await fetchLeaderboardAndStatus(user.uid);
    } catch (e) {
      console.error("Error claiming reward", e);
    }
  };

  if (loadingUser || loadingLeaderboard) {
    return <div style={{ padding: "40px", color: "var(--text-primary)" }}>Loading...</div>;
  }

  if (!user) {
    return <div style={{ padding: "40px", color: "var(--text-primary)" }}>Please log in to participate in contests.</div>;
  }

  const now = Date.now();
  const contestEnded = now > activeContest.endTime;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {warningMessage && (
        <WarningModal message={warningMessage} onClose={() => setWarningMessage(null)} />
      )}

      {!contestStarted && !hasParticipated && (
        <div style={{ background: "var(--surface-primary)", padding: "32px", borderRadius: "16px", border: "1px solid var(--surface-border)" }}>
          <h1 style={{ color: "var(--accent-primary)", marginBottom: "16px" }}>{activeContest.title}</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>{activeContest.description}</p>
          
          <div style={{ marginBottom: "24px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
            <h3 style={{ marginBottom: "8px" }}>Rules & Scoring</h3>
            <ul style={{ color: "var(--text-secondary)", listStyle: "inside" }}>
              <li>Easy: +2 pts | Medium: +5 pts | Hard: +10 pts</li>
              <li>Time Limit: {activeContest.timeLimitMinutes} minutes</li>
              <li>Anti-Cheat: Switching tabs results in instant disqualification!</li>
            </ul>
          </div>

          {now < activeContest.startTime ? (
            <button disabled style={{ padding: "12px 24px", background: "var(--surface-border)", color: "#888", borderRadius: "8px", border: "none" }}>
              Contest starts at {new Date(activeContest.startTime).toLocaleString()}
            </button>
          ) : contestEnded ? (
            <button disabled style={{ padding: "12px 24px", background: "var(--surface-border)", color: "#888", borderRadius: "8px", border: "none" }}>
              Contest has ended
            </button>
          ) : (
            <button 
              onClick={handleStartContest}
              style={{ padding: "12px 24px", background: "var(--accent-primary)", color: "#000", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer" }}
            >
              Start Contest
            </button>
          )}
        </div>
      )}

      {contestStarted && (
        <div style={{ display: "flex", gap: "24px", height: "calc(100vh - 120px)" }}>
          {/* Question List Sidebar */}
          <div style={{ width: "250px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ padding: "16px", background: "var(--surface-primary)", borderRadius: "12px", border: "1px solid var(--surface-border)", textAlign: "center" }}>
              <h3 style={{ color: timeLeft && timeLeft < 60 ? "#ff4d4d" : "var(--text-primary)", margin: 0 }}>
                {Math.floor((timeLeft || 0) / 60)}:{((timeLeft || 0) % 60).toString().padStart(2, '0')}
              </h3>
            </div>
            
            {activeContest.questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                style={{
                  padding: "12px",
                  background: currentQuestionIndex === idx ? "var(--accent-primary)" : "var(--surface-primary)",
                  color: currentQuestionIndex === idx ? "#000" : "var(--text-primary)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                Question {idx + 1}
                <span style={{ float: "right", fontSize: "12px", opacity: 0.7 }}>
                  {q.difficulty === "easy" ? "2pt" : q.difficulty === "medium" ? "5pt" : "10pt"}
                </span>
              </button>
            ))}
            
            <button
              onClick={() => handleContestSubmit(true)}
              style={{ marginTop: "auto", padding: "12px", background: "#4caf50", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
            >
              Submit Contest
            </button>
          </div>

          {/* Question View */}
          <div style={{ flex: 1, background: "var(--surface-primary)", borderRadius: "16px", border: "1px solid var(--surface-border)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "24px", borderBottom: "1px solid var(--surface-border)" }}>
              <h2 style={{ margin: 0, color: "var(--text-primary)" }}>
                Question {currentQuestionIndex + 1}
                <span style={{ fontSize: "14px", marginLeft: "12px", color: "var(--accent-primary)", padding: "4px 8px", background: "rgba(0,255,255,0.1)", borderRadius: "4px" }}>
                  {activeContest.questions[currentQuestionIndex].difficulty.toUpperCase()}
                </span>
              </h2>
              <p style={{ marginTop: "16px", color: "var(--text-secondary)", fontSize: "18px" }}>
                {activeContest.questions[currentQuestionIndex].question}
              </p>
            </div>
            
            <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
              {activeContest.questions[currentQuestionIndex].type === "mcq" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {activeContest.questions[currentQuestionIndex].options?.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optIdx }))}
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        whiteSpace: "pre-wrap",
                        fontFamily: "monospace",
                        background: selectedAnswers[currentQuestionIndex] === optIdx ? "rgba(0, 255, 255, 0.1)" : "var(--bg-primary)",
                        border: `1px solid ${selectedAnswers[currentQuestionIndex] === optIdx ? "var(--accent-primary)" : "var(--surface-border)"}`,
                        color: "var(--text-primary)",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ height: "100%", minHeight: "400px" }}>
                  <VisualPlayground
                    arenaMode={true}
                    arenaProblemId={`contest-${currentQuestionIndex}`}
                    onSubmit={(probs) => setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: probs }))}
                    submitStatus={selectedAnswers[currentQuestionIndex] ? "success" : "idle"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard & Results */}
      {!contestStarted && hasParticipated && (
        <div>
          <div style={{ background: "var(--surface-primary)", padding: "32px", borderRadius: "16px", border: "1px solid var(--surface-border)", marginBottom: "32px", textAlign: "center" }}>
            <h2 style={{ color: "var(--text-primary)", marginBottom: "16px" }}>Your Performance</h2>
            {userEntry?.disqualified ? (
              <div style={{ color: "#ff4d4d", fontSize: "24px", fontWeight: "bold" }}>DISQUALIFIED</div>
            ) : (
              <div style={{ fontSize: "24px", color: "var(--accent-primary)" }}>Score: {userEntry?.score} pts</div>
            )}
            <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
              Time taken: {Math.floor((userEntry?.timeTaken || 0) / 60)}m {(userEntry?.timeTaken || 0) % 60}s
            </p>
            
            {contestEnded && !userEntry?.rewardClaimed && getRankAndPayout().payout > 0 && (
              <button 
                onClick={claimReward}
                style={{ marginTop: "24px", padding: "12px 32px", background: "#ff9800", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
              >
                Claim {getRankAndPayout().payout} Rating Points! (Rank {getRankAndPayout().rank})
              </button>
            )}
            {contestEnded && userEntry?.rewardClaimed && (
              <p style={{ color: "#4caf50", marginTop: "16px", fontWeight: "bold" }}>Reward Claimed!</p>
            )}
            {!contestEnded && (
              <p style={{ color: "var(--text-secondary)", marginTop: "16px" }}>
                Contest is still ongoing. You can claim your reward after the contest ends!
              </p>
            )}
          </div>

          <h2 style={{ color: "var(--text-primary)", marginBottom: "16px" }}>Leaderboard</h2>
          <div style={{ background: "var(--surface-primary)", borderRadius: "12px", border: "1px solid var(--surface-border)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "var(--text-primary)" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--surface-border)" }}>
                  <th style={{ padding: "16px", textAlign: "left" }}>Rank</th>
                  <th style={{ padding: "16px", textAlign: "left" }}>User</th>
                  <th style={{ padding: "16px", textAlign: "right" }}>Score</th>
                  <th style={{ padding: "16px", textAlign: "right" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={entry.id} style={{ borderBottom: "1px solid var(--surface-border)", background: entry.userId === user.uid ? "rgba(0, 255, 255, 0.05)" : "transparent" }}>
                    <td style={{ padding: "16px" }}>
                      {idx + 1 === 1 ? '🥇 ' : idx + 1 === 2 ? '🥈 ' : idx + 1 === 3 ? '🥉 ' : ''}
                      {idx + 1}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {entry.username} {entry.disqualified ? <span style={{ color: "#ff4d4d", fontSize: "12px", marginLeft: "8px" }}>(DQ)</span> : ""}
                    </td>
                    <td style={{ padding: "16px", textAlign: "right", fontWeight: "bold" }}>{entry.score}</td>
                    <td style={{ padding: "16px", textAlign: "right" }}>
                      {Math.floor(entry.timeTaken / 60)}:{(entry.timeTaken % 60).toString().padStart(2, '0')}
                    </td>
                  </tr>
                ))}
                {leaderboard.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
                      No participants yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
