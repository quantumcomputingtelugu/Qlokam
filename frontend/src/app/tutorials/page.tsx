/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import VisualPlayground from "@/components/VisualPlayground";
import { tutorialSessions, getAllTutorials } from "@/data/tutorials";
import AdBanner from "@/components/AdBanner";

export default function TutorialsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [activeTab, setActiveTab] = useState<"lesson" | "quiz" | "practice">(
    "lesson",
  );
  const [activeTutorialId, setActiveTutorialId] = useState(1);
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCourseId, setActiveCourseId] = useState(tutorialSessions[0].id);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>(
    {},
  );
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [activeQuizSubset, setActiveQuizSubset] = useState<number[]>([]);
  const [quizAttemptsData, setQuizAttemptsData] = useState<
    Record<
      number,
      { count: number; date: string; seenQuestionIndices: number[] }
    >
  >({});

  const [rating, setRating] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
  const [dailyLoginToast, setDailyLoginToast] = useState(false);

  const [adLoading, setAdLoading] = useState<"hint" | "skip" | null>(null);
  const [hintUnlocked, setHintUnlocked] = useState(false);

  const [showSimulatedAd, setShowSimulatedAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);

  const allTutorials = getAllTutorials();
  const activeTutorial =
    allTutorials.find((t) => t.id === activeTutorialId) || allTutorials[0];
  const isCompleted = completedTutorials.includes(activeTutorial.id);

  const handleTabChange = (tab: "lesson" | "quiz" | "practice") => {
    setActiveTab(tab);
    setQuizStarted(false);
    setSelectedAnswers({});
    setShowQuizResults(false);
    setCurrentQuizIndex(0);
    setQuizScore(null);
  };

  const handleQuizOptionSelect = (qIndex: number, optIndex: number) => {
    if (showQuizResults) return; // prevent changing after submitted
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleStartQuiz = () => {
    if (!activeTutorial.quizzes) return;

    const today = new Date().toISOString().split("T")[0];
    const attemptData = quizAttemptsData[activeTutorial.id] || {
      count: 0,
      date: today,
      seenQuestionIndices: [],
    };

    let currentCount = attemptData.count;
    let currentSeen = attemptData.seenQuestionIndices;
    if (attemptData.date !== today) {
      currentCount = 0;
      currentSeen = [];
    }

    if (currentCount >= 3) {
      alert("You have reached the daily limit of 3 attempts for this quiz.");
      return;
    }

    let subset: number[] = [];
    const mcqIndices = activeTutorial.quizzes
      .map((q, i) => (q.type === "mcq" || !q.type ? i : -1))
      .filter((i) => i !== -1);
    const circuitIndices = activeTutorial.quizzes
      .map((q, i) => (q.type === "circuit" ? i : -1))
      .filter((i) => i !== -1);

    if (
      mcqIndices.length >= 2 &&
      circuitIndices.length >= 3 &&
      activeTutorial.id === 107
    ) {
      // Pick 2 MCQs
      const shuffledMcq = [...mcqIndices].sort(() => 0.5 - Math.random());
      // Pick 3 Circuit
      const shuffledCircuit = [...circuitIndices].sort(
        () => 0.5 - Math.random(),
      );

      subset = [
        ...shuffledMcq.slice(0, 2),
        ...shuffledCircuit.slice(0, 3),
      ].sort(() => 0.5 - Math.random());
    } else {
      const availableIndices = activeTutorial.quizzes
        .map((_, i) => i)
        .filter((i) => !currentSeen.includes(i));
      if (availableIndices.length >= 5) {
        const shuffled = [...availableIndices].sort(() => 0.5 - Math.random());
        subset = shuffled.slice(0, 5);
      } else {
        const allShuffled = activeTutorial.quizzes
          .map((_, i) => i)
          .sort(() => 0.5 - Math.random());
        subset = allShuffled.slice(0, 5);
      }
    }

    setActiveQuizSubset(subset);
    setQuizStarted(true);
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setShowQuizResults(false);
    setQuizScore(null);
  };

  const handleQuizSubmit = async () => {
    if (!user || !db || !activeTutorial.quizzes) return;

    // Calculate score
    let score = 0;
    activeQuizSubset.forEach((qIndex) => {
      const q = activeTutorial.quizzes![qIndex];
      const answer = selectedAnswers[qIndex];
      if (q.type === "circuit") {
        if (answer) {
          const expected = q.expectedProbs || {};
          let isCorrect = true;
          
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

          const keys = new Set([
            ...Object.keys(expected),
            ...Object.keys(trimmedAnswer),
          ]);
          for (const k of Array.from(keys)) {
            const exp = expected[k] || 0;
            const act = trimmedAnswer[k] || 0;
            if (Math.abs(exp - act) > 0.05) {
              isCorrect = false;
              break;
            }
          }
          if (isCorrect) score++;
        }
      } else {
        if (answer === q.correctAnswerIndex) {
          score++;
        }
      }
    });

    setQuizScore(score);
    setShowQuizResults(true);

    // Update attempts
    const today = new Date().toISOString().split("T")[0];
    const attemptData = quizAttemptsData[activeTutorial.id] || {
      count: 0,
      date: today,
      seenQuestionIndices: [],
    };

    let currentCount = attemptData.date === today ? attemptData.count : 0;
    let currentSeen =
      attemptData.date === today ? attemptData.seenQuestionIndices : [];

    const newAttemptsData = {
      ...quizAttemptsData,
      [activeTutorial.id]: {
        count: currentCount + 1,
        date: today,
        seenQuestionIndices: [...currentSeen, ...activeQuizSubset],
      },
    };

    setQuizAttemptsData(newAttemptsData);

    let updatedRating = rating;
    let earnedThisTime = 0;

    // Award point if perfect score
    if (score === 5 && activeTutorial.pointsAward) {
      if (!completedTutorials.includes(activeTutorialId)) {
        updatedRating += activeTutorial.pointsAward;
        earnedThisTime = activeTutorial.pointsAward;
        setRating(updatedRating);
        setEarnedPoints(earnedThisTime);
      }
    } else {
      setEarnedPoints(0);
    }

    const newCompleted =
      score === 5 && !completedTutorials.includes(activeTutorialId)
        ? [...completedTutorials, activeTutorialId]
        : completedTutorials;
    setCompletedTutorials(newCompleted);

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          quizAttemptsData: newAttemptsData,
          completedTutorials: newCompleted,
          ...(earnedThisTime > 0 && {
            rating: updatedRating,
            ratingHistory: arrayUnion({
              reason: `Perfect Score on ${activeTutorial.title}`,
              points: earnedThisTime,
              timestamp: new Date().toISOString(),
            }),
          }),
        },
        { merge: true },
      );
    } catch (e) {
      console.error("Error saving quiz attempt", e);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSimulatedAd && adCountdown > 0) {
      timer = setTimeout(() => {
        setAdCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showSimulatedAd, adCountdown]);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleWatchAd = () => {
    setShowSimulatedAd(true);
  };

  useEffect(() => {
    if (!auth) {
      setLoadingUser(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          if (!db) return;
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.completedTutorials)
              setCompletedTutorials(data.completedTutorials);
            if (data.rating) setRating(data.rating);
            if (data.badges) setBadges(data.badges);
            if (data.quizAttemptsData)
              setQuizAttemptsData(data.quizAttemptsData);

            // Daily login bonus: +1 rating once per day
            const today = new Date().toISOString().split("T")[0];
            if (data.lastLoginDate !== today) {
              const newRating = (data.rating || 0) + 1;
              await setDoc(docRef, {
                lastLoginDate: today,
                rating: newRating,
                ratingHistory: arrayUnion({
                  reason: "Daily Login",
                  points: 1,
                  timestamp: new Date().toISOString(),
                }),
              }, { merge: true });
              setRating(newRating);
              setDailyLoginToast(true);
              setTimeout(() => setDailyLoginToast(false), 3500);
            }
          }
        } catch (e) {
          console.error("Error fetching progress", e);
        }
      } else {
        setCompletedTutorials([]);
        setRating(0);
        setBadges([]);
        setQuizAttemptsData({});
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkComplete = async () => {
    if (!user || !db || completedTutorials.includes(activeTutorialId)) return;
    setSaving(true);
    const newCompleted = [...completedTutorials, activeTutorialId];

    let updatedRating = rating;
    let updatedBadges = [...badges];
    let newlyEarnedBadge = null;

    // Check if a course (session) was completed
    const activeSession = tutorialSessions.find((s) => s.id === activeCourseId);
    if (activeSession && activeSession.badge) {
      // flatten to get all modules in session
      const flatten = (modules: any[]): any[] => {
        return modules.reduce((acc, module) => {
          acc.push(module);
          if (module.subModules) acc.push(...flatten(module.subModules));
          return acc;
        }, []);
      };
      const sessionModules = flatten(activeSession.modules);
      const allCompleted = sessionModules.every((m) =>
        newCompleted.includes(m.id),
      );

      // Assume one badge per session completion
      if (allCompleted) {
        updatedBadges.push(activeSession.badge);
        newlyEarnedBadge = activeSession.badge;
      }
    }

    if (activeTutorial.isFinalTest) {
      if (activeTutorial.pointsAward)
        updatedRating += activeTutorial.pointsAward;
    }

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          completedTutorials: newCompleted,
          ...(newlyEarnedBadge && { badges: updatedBadges }),
          ...(activeTutorial.isFinalTest && {
            rating: updatedRating,
            ...(activeTutorial.pointsAward && {
              ratingHistory: arrayUnion({
                reason: `Completed Module: ${activeTutorial.title}`,
                points: activeTutorial.pointsAward,
                timestamp: new Date().toISOString(),
              }),
            }),
          }),
        },
        { merge: true },
      );

      setCompletedTutorials(newCompleted);
      if (newlyEarnedBadge) {
        setBadges(updatedBadges);
        setEarnedBadge(newlyEarnedBadge);
      }
      if (activeTutorial.isFinalTest) {
        setRating(updatedRating);
        setEarnedPoints(activeTutorial.pointsAward || null);
      }
    } catch (e) {
      console.error("Error saving progress", e);
    }
    setSaving(false);
  };

  return (
    <div
      className="container responsive-flex"
      style={{
        paddingTop: "24px",
        display: "flex",
        gap: "24px",
        height: "calc(100vh - 100px)",
        width: "100%",
      }}
    >
      {/* Left Panel: Tutorial List */}
      <div
        className={`glass-panel responsive-sidebar ${isSidebarOpen ? "open" : "closed"}`}
        style={{
          width: isSidebarOpen ? "350px" : "60px",
          flexShrink: 0,
          padding: isSidebarOpen ? "20px" : "20px 10px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          transition: "width 0.3s ease, padding 0.3s ease, transform 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          {isSidebarOpen && (
            <h2
              style={{
                fontSize: "20px",
                color: "var(--accent-primary)",
                margin: 0,
              }}
            >
              Quantum Courses
            </h2>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "20px",
              padding: 0,
            }}
          >
            {isSidebarOpen ? "✖" : "▶"}
          </button>
        </div>

        {isSidebarOpen && (
          <>
            {/* Horizontal Scroll for Courses */}
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "8px",
                paddingBottom: "12px",
                marginBottom: "16px",
                borderBottom: "1px solid var(--surface-border)",
              }}
            >
              {tutorialSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    setActiveCourseId(session.id);
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    whiteSpace: "nowrap",
                    background:
                      activeCourseId === session.id
                        ? "var(--accent-primary)"
                        : "rgba(255,255,255,0.05)",
                    color:
                      activeCourseId === session.id
                        ? "#000"
                        : "var(--text-secondary)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight:
                      activeCourseId === session.id ? "bold" : "normal",
                    fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                >
                  {session.sessionName}
                </button>
              ))}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {tutorialSessions
                .find((s) => s.id === activeCourseId)
                ?.modules.map((tutorial, moduleIndex) => {
                  const isActive =
                    activeTutorialId === tutorial.id ||
                    tutorial.subModules?.some((s) => s.id === activeTutorialId);
                  const completed = completedTutorials.includes(tutorial.id);

                  return (
                    <div
                      key={tutorial.id}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        onClick={() => {
                          if (
                            tutorial.prerequisiteId &&
                            !completedTutorials.includes(
                              tutorial.prerequisiteId,
                            )
                          ) {
                            alert(
                              "🔒 Locked: Please achieve a perfect score (5/5) on the prerequisite quiz to unlock this module.",
                            );
                            return;
                          }

                          if (
                            tutorial.subModules &&
                            tutorial.subModules.length > 0
                          ) {
                            // Only expand/collapse the dropdown if it has submodules
                            setExpandedModules((prev) =>
                              prev.includes(tutorial.id)
                                ? prev.filter((x) => x !== tutorial.id)
                                : [...prev, tutorial.id],
                            );
                          } else {
                            // Standard module with no submodules
                            setActiveTutorialId(tutorial.id);
                            setActiveTab("lesson");
                            setSelectedAnswers({});
                            setShowQuizResults(false);

                            setExpandedModules((prev) =>
                              prev.includes(tutorial.id)
                                ? prev.filter((x) => x !== tutorial.id)
                                : [...prev, tutorial.id],
                            );

                            if (
                              typeof window !== "undefined" &&
                              window.innerWidth <= 768
                            ) {
                              setIsSidebarOpen(false);
                            }
                          }
                        }}
                        style={{
                          padding: "16px",
                          background:
                            tutorial.subModules &&
                            tutorial.subModules.length > 0
                              ? expandedModules.includes(tutorial.id)
                                ? "rgba(192, 132, 252, 0.15)"
                                : "rgba(255,255,255,0.03)"
                              : isActive
                                ? "rgba(69, 243, 255, 0.1)"
                                : "rgba(255,255,255,0.03)",
                          border: `1px solid ${
                            tutorial.subModules &&
                            tutorial.subModules.length > 0
                              ? expandedModules.includes(tutorial.id)
                                ? "#c084fc"
                                : "var(--surface-border)"
                              : isActive
                                ? "var(--accent-primary)"
                                : "var(--surface-border)"
                          }`,
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        className="tutorial-card"
                      >
                        <div className="flex-between" style={{ flex: 1 }}>
                          <h4
                            style={{
                              fontSize: "15px",
                              margin: 0,
                              color:
                                tutorial.prerequisiteId &&
                                !completedTutorials.includes(
                                  tutorial.prerequisiteId,
                                )
                                  ? "var(--text-disabled, #666)"
                                  : tutorial.isFinalTest
                                    ? "#d29922"
                                    : "var(--text-primary)",
                            }}
                          >
                            {tutorial.prerequisiteId &&
                              !completedTutorials.includes(
                                tutorial.prerequisiteId,
                              ) &&
                              "🔒 "}
                            {tutorial.isFinalTest
                              ? "🏆 "
                              : `${moduleIndex + 1}. `}
                            {tutorial.title}
                          </h4>
                          {completed && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "var(--success)",
                              }}
                            >
                              ✔
                            </span>
                          )}
                        </div>
                      </div>

                      {tutorial.subModules &&
                        tutorial.subModules.length > 0 &&
                        expandedModules.includes(tutorial.id) && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              paddingLeft: "16px",
                              borderLeft: "2px solid rgba(255,255,255,0.1)",
                              marginLeft: "8px",
                            }}
                          >
                            {tutorial.subModules.map((subModule, index) => {
                              const subCompleted = completedTutorials.includes(
                                subModule.id,
                              );
                              const isSubActive =
                                activeTutorialId === subModule.id;
                              return (
                                <div
                                  key={subModule.id}
                                  onClick={() => {
                                    if (
                                      subModule.prerequisiteId &&
                                      !completedTutorials.includes(
                                        subModule.prerequisiteId,
                                      )
                                    ) {
                                      alert(
                                        "🔒 Locked: Please achieve a perfect score (5/5) on the prerequisite quiz to unlock this module.",
                                      );
                                      return;
                                    }
                                    setActiveTutorialId(subModule.id);
                                    setActiveTab("lesson");
                                    setSelectedAnswers({});
                                    setShowQuizResults(false);
                                    if (
                                      typeof window !== "undefined" &&
                                      window.innerWidth <= 768
                                    ) {
                                      setIsSidebarOpen(false);
                                    }
                                  }}
                                  style={{
                                    padding: "12px 16px",
                                    background: isSubActive
                                      ? "rgba(69, 243, 255, 0.1)"
                                      : "rgba(255,255,255,0.02)",
                                    border: `1px solid ${isSubActive ? "var(--accent-primary)" : "transparent"}`,
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                  }}
                                  className="tutorial-card"
                                >
                                  <div className="flex-between">
                                    <h4
                                      style={{
                                        fontSize: "14px",
                                        margin: 0,
                                        color:
                                          subModule.prerequisiteId &&
                                          !completedTutorials.includes(
                                            subModule.prerequisiteId,
                                          )
                                            ? "var(--text-disabled, #666)"
                                            : "var(--text-secondary)",
                                      }}
                                    >
                                      {subModule.prerequisiteId &&
                                        !completedTutorials.includes(
                                          subModule.prerequisiteId,
                                        ) &&
                                        "🔒 "}
                                      {index + 1}. {subModule.title}
                                    </h4>
                                    {subCompleted && (
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "var(--success)",
                                        }}
                                      >
                                        ✔
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  );
                })}
            </div>

            <div style={{ marginTop: "auto", paddingTop: "24px" }}>
              <AdBanner dataAdSlot="tutorials_sidebar" />
            </div>
          </>
        )}
      </div>

      {/* Right Panel: Content Area */}
      <div
        className="glass-panel responsive-content"
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--surface-border)",
            padding: "0 24px",
            alignItems: "center",
          }}
        >
          <button
            className="mobile-sidebar-toggle"
            onClick={() => setIsSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontSize: "24px",
              marginRight: "16px",
            }}
          >
            ☰
          </button>
          {(["lesson", "practice"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              style={{
                padding: "16px 24px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color:
                  activeTab === tab
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                borderBottom:
                  activeTab === tab
                    ? "2px solid var(--accent-primary)"
                    : "2px solid transparent",
                fontWeight: activeTab === tab ? 600 : 400,
                fontSize: "16px",
                textTransform: "capitalize",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div
          style={{
            padding: "32px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "24px",
              color: "var(--text-primary)",
            }}
          >
            {activeTutorial.title}
          </h1>

          {activeTab === "lesson" ? (
            <div
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                fontSize: "16px",
              }}
            >
              {activeTutorial.lessonContent}
              {activeTutorial.quizzes && activeTutorial.quizzes.length > 0 && (
                <div
                  style={{
                    marginTop: "48px",
                    paddingTop: "32px",
                    borderTop: "1px solid var(--surface-border)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "24px",
                      marginBottom: "24px",
                      color: "var(--text-primary)",
                    }}
                  >
                    Knowledge Check
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "32px",
                    }}
                  >
                    {!quizStarted && !showQuizResults && (
                      <div
                        style={{
                          padding: "24px",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "12px",
                          border: "1px solid var(--surface-border)",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "20px",
                            color: "var(--text-primary)",
                            marginBottom: "16px",
                          }}
                        >
                          Quiz Rules
                        </h4>
                        <ul
                          style={{
                            color: "var(--text-secondary)",
                            marginBottom: "24px",
                            paddingLeft: "20px",
                            lineHeight: "1.6",
                          }}
                        >
                          <li>
                            You must answer all 5 questions correctly to earn
                            points.
                          </li>
                          <li>
                            You can attempt this quiz up to 3 times per day.
                          </li>
                        </ul>

                        {(() => {
                          if (!user) {
                            return (
                              <div
                                style={{
                                  padding: "16px",
                                  background: "rgba(255, 255, 255, 0.05)",
                                  border: "1px solid var(--surface-border)",
                                  borderRadius: "8px",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                🔒 Please sign in to take this quiz and save
                                your progress.
                              </div>
                            );
                          }
                          if (
                            activeTutorial.prerequisiteId &&
                            !completedTutorials.includes(
                              activeTutorial.prerequisiteId,
                            )
                          ) {
                            return (
                              <div
                                style={{
                                  padding: "16px",
                                  background: "rgba(248, 175, 73, 0.1)",
                                  border: "1px solid var(--warning)",
                                  borderRadius: "8px",
                                  color: "var(--warning)",
                                  marginTop: "16px",
                                }}
                              >
                                🔒 You must complete the quiz for the previous
                                topic before you can take this quiz.
                              </div>
                            );
                          }
                          const today = new Date().toISOString().split("T")[0];
                          const attemptData =
                            quizAttemptsData[activeTutorial.id];
                          const currentCount =
                            attemptData?.date === today ? attemptData.count : 0;

                          if (completedTutorials.includes(activeTutorialId)) {
                            return (
                              <div
                                style={{
                                  padding: "16px",
                                  background: "rgba(69, 243, 255, 0.1)",
                                  border: "1px solid var(--accent-primary)",
                                  borderRadius: "8px",
                                  color: "var(--accent-primary)",
                                }}
                              >
                                You have already completed this quiz. No further attempts are permitted.
                              </div>
                            );
                          } else if (currentCount >= 3) {
                            return (
                              <div
                                style={{
                                  padding: "16px",
                                  background: "rgba(248, 81, 73, 0.1)",
                                  border: "1px solid var(--error)",
                                  borderRadius: "8px",
                                  color: "var(--error)",
                                }}
                              >
                                You have reached the daily limit of 3 attempts.
                                Please come back tomorrow!
                              </div>
                            );
                          } else {
                            return (
                              <>
                                <p
                                  style={{
                                    color: "var(--accent-primary)",
                                    marginBottom: "16px",
                                  }}
                                >
                                  Remaining attempts today: {3 - currentCount}
                                </p>
                                <button
                                  className="btn-primary"
                                  onClick={handleStartQuiz}
                                  style={{ padding: "12px 32px" }}
                                >
                                  Start Quiz
                                </button>
                              </>
                            );
                          }
                        })()}
                      </div>
                    )}

                    {quizStarted &&
                      !showQuizResults &&
                      activeQuizSubset.length > 0 && (
                        <div
                          style={{
                            padding: "24px",
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "12px",
                            border: "1px solid var(--surface-border)",
                          }}
                        >
                          <h4
                            style={{
                              fontSize: "18px",
                              color: "var(--text-primary)",
                              marginBottom: "16px",
                            }}
                          >
                            Question {currentQuizIndex + 1} of{" "}
                            {activeQuizSubset.length}:{" "}
                            {
                              activeTutorial.quizzes[
                                activeQuizSubset[currentQuizIndex]
                              ].question
                            }
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                          >
                            {activeTutorial.quizzes[
                              activeQuizSubset[currentQuizIndex]
                            ].type === "circuit" ? (
                              <div
                                style={{
                                  border: "1px solid var(--surface-border)",
                                  borderRadius: "12px",
                                  padding: "16px",
                                  background: "var(--bg-color)",
                                }}
                              >
                                {activeTutorial.quizzes[
                                  activeQuizSubset[currentQuizIndex]
                                ].expectedOutputsText && (
                                  <p
                                    style={{
                                      color: "var(--warning)",
                                      fontWeight: "bold",
                                      marginBottom: "16px",
                                    }}
                                  >
                                    {
                                      activeTutorial.quizzes[
                                        activeQuizSubset[currentQuizIndex]
                                      ].expectedOutputsText
                                    }
                                  </p>
                                )}
                                <VisualPlayground
                                  arenaMode={true}
                                  arenaProblemId={
                                    "quiz-" + activeQuizSubset[currentQuizIndex]
                                  }
                                  onSubmit={(probs) =>
                                    setSelectedAnswers((prev) => ({
                                      ...prev,
                                      [activeQuizSubset[currentQuizIndex]]:
                                        probs,
                                    }))
                                  }
                                  submitStatus={
                                    selectedAnswers[
                                      activeQuizSubset[currentQuizIndex]
                                    ]
                                      ? "success"
                                      : "idle"
                                  }
                                />
                                {selectedAnswers[
                                  activeQuizSubset[currentQuizIndex]
                                ] && (
                                  <p
                                    style={{
                                      color: "var(--success)",
                                      marginTop: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Answer recorded! You can move to the next
                                    question.
                                  </p>
                                )}
                              </div>
                            ) : (
                              activeTutorial.quizzes[
                                activeQuizSubset[currentQuizIndex]
                              ].options?.map((opt, optIndex) => {
                                const qIndex =
                                  activeQuizSubset[currentQuizIndex];
                                const isSelected =
                                  selectedAnswers[qIndex] === optIndex;
                                let btnBorder =
                                  "1px solid var(--surface-border)";
                                let btnBg = isSelected
                                  ? "rgba(69, 243, 255, 0.1)"
                                  : "transparent";
                                let btnColor = isSelected
                                  ? "var(--accent-primary)"
                                  : "var(--text-secondary)";

                                return (
                                  <button
                                    key={optIndex}
                                    onClick={() =>
                                      handleQuizOptionSelect(qIndex, optIndex)
                                    }
                                    style={{
                                      padding: "16px",
                                      textAlign: "left",
                                      background: btnBg,
                                      border: btnBorder,
                                      color: btnColor,
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      transition: "all 0.2s",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {opt}
                                  </button>
                                );
                              })
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "24px",
                            }}
                          >
                            <button
                              className="btn-secondary"
                              disabled={currentQuizIndex === 0}
                              onClick={() =>
                                setCurrentQuizIndex((prev) => prev - 1)
                              }
                              style={{ padding: "8px 16px" }}
                            >
                              Previous
                            </button>
                            {currentQuizIndex < activeQuizSubset.length - 1 ? (
                              <button
                                className="btn-primary"
                                disabled={
                                  selectedAnswers[
                                    activeQuizSubset[currentQuizIndex]
                                  ] === undefined
                                }
                                onClick={() =>
                                  setCurrentQuizIndex((prev) => prev + 1)
                                }
                                style={{ padding: "8px 16px" }}
                              >
                                Next
                              </button>
                            ) : (
                              <button
                                className="btn-primary"
                                disabled={
                                  Object.keys(selectedAnswers).length <
                                  activeQuizSubset.length
                                }
                                onClick={handleQuizSubmit}
                                style={{ padding: "8px 16px" }}
                              >
                                Submit Answers
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                    {showQuizResults && (
                      <div
                        style={{
                          padding: "24px",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "12px",
                          border: "1px solid var(--surface-border)",
                          textAlign: "center",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "24px",
                            marginBottom: "16px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Quiz Complete!
                        </h3>
                        <div
                          style={{
                            fontSize: "48px",
                            color:
                              quizScore === activeQuizSubset.length
                                ? "var(--success)"
                                : "var(--accent-primary)",
                            marginBottom: "16px",
                          }}
                        >
                          {quizScore} / {activeQuizSubset.length}
                        </div>
                        {quizScore === activeQuizSubset.length ? (
                          <p
                            style={{
                              color: "var(--success)",
                              marginBottom: "24px",
                            }}
                          >
                            Perfect score! You earned points!
                          </p>
                        ) : (
                          <p
                            style={{
                              color: "var(--text-secondary)",
                              marginBottom: "24px",
                            }}
                          >
                            Good try! You need a perfect score to earn points.
                          </p>
                        )}
                        <div
                          style={{
                            display: "flex",
                            gap: "16px",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            className="btn-secondary"
                            onClick={() => {
                              setQuizStarted(false);
                              setShowQuizResults(false);
                            }}
                            style={{ padding: "8px 16px" }}
                          >
                            Return to Quiz Menu
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!activeTutorial.quizzes && (
                <div
                  style={{
                    marginTop: "48px",
                    padding: "24px",
                    background: "rgba(69, 243, 255, 0.05)",
                    border: "1px solid rgba(69, 243, 255, 0.2)",
                    borderRadius: "12px",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 16px 0",
                      color: "var(--accent-primary)",
                    }}
                  >
                    Finished reading?
                  </h4>
                  <p style={{ margin: "0 0 16px 0" }}>
                    Jump straight to practice and try it out!
                  </p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <button
                      className="btn-primary"
                      onClick={() => handleTabChange("practice")}
                      style={{ padding: "8px 16px" }}
                    >
                      Go to Practice
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {loadingUser ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "40px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Loading...
                </div>
              ) : !user ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "64px",
                    padding: "40px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "12px",
                    border: "1px dashed var(--surface-border)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "24px",
                      color: "var(--text-primary)",
                      marginBottom: "16px",
                    }}
                  >
                    Practice is Locked
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "24px",
                      maxWidth: "400px",
                      margin: "0 auto 24px",
                    }}
                  >
                    Sign in with Google to unlock interactive circuit building,
                    save your progress, and track your learning journey!
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <div
                    style={{
                      marginBottom: "24px",
                      padding: "16px",
                      background: "rgba(63, 185, 80, 0.1)",
                      border: "1px solid rgba(63, 185, 80, 0.3)",
                      borderRadius: "8px",
                    }}
                  >
                    <h4
                      style={{ margin: "0 0 8px 0", color: "var(--success)" }}
                    >
                      Goal
                    </h4>
                    <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                      {activeTutorial.practiceGoal}
                    </p>
                  </div>

                  {/* The Interactive Editor */}
                  <div
                    style={{
                      flex: 1,
                      minHeight: "500px",
                      marginBottom: "24px",
                      border: "1px solid var(--surface-border)",
                      borderRadius: "8px",
                      overflow: "visible",
                      padding: "16px",
                    }}
                  >
                    <VisualPlayground />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Simulated Ad Modal */}
      {showSimulatedAd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "24px",
              textAlign: "center",
              maxWidth: "600px",
              width: "100%",
              animation: "scaleIn 0.3s ease-out",
              position: "relative",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              Sponsored Message
            </h2>

            <div
              style={{
                background: "#000",
                width: "100%",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                marginBottom: "24px",
                border: "1px solid var(--surface-border)",
                overflow: "hidden",
              }}
            >
              <img
                src="/quantum_hardware_bg_1782555897437.png"
                alt="Ad Placeholder"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Video Ad Playing...
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "var(--text-secondary)" }}>
                Reward in {adCountdown}s
              </span>
              <button
                className="btn-secondary"
                disabled={adCountdown > 0}
                onClick={() => {
                  setHintUnlocked(true);
                  setShowSimulatedAd(false);
                  setAdCountdown(5);
                }}
                style={{
                  padding: "8px 24px",
                  opacity: adCountdown > 0 ? 0.5 : 1,
                }}
              >
                {adCountdown > 0 ? "Wait..." : "Skip & Get Reward"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gamification Modal */}
      {earnedBadge && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "48px",
              textAlign: "center",
              maxWidth: "500px",
              animation: "scaleIn 0.3s ease-out",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                color: "#d29922",
                marginBottom: "16px",
              }}
            >
              Course Completed!
            </h2>
            <div style={{ fontSize: "64px", margin: "24px 0" }}>
              {earnedBadge.split(" ")[0]}
            </div>
            <h3
              style={{
                fontSize: "24px",
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}
            >
              {earnedBadge.substring(earnedBadge.indexOf(" ") + 1)}
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
              You earned{" "}
              <strong style={{ color: "#d29922" }}>
                +{earnedPoints} Arena Points
              </strong>
              ! Keep up the great work!
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setEarnedBadge(null);
                setEarnedPoints(null);
              }}
              style={{ padding: "12px 32px" }}
            >
              Awesome!
            </button>
          </div>
        </div>
      )}

      {/* Daily Login Bonus Toast */}
      {dailyLoginToast && (
        <div style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          background: "linear-gradient(135deg, #d29922, #f0c060)",
          color: "#000",
          padding: "14px 24px",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0 4px 24px rgba(210,153,34,0.5)",
          zIndex: 99999,
          animation: "scaleIn 0.3s ease-out",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          🌟 +1 Daily Login Bonus!
        </div>
      )}
    </div>
  );
}
