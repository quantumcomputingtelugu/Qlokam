import React from "react";
import VisualPlayground from "@/components/VisualPlayground";

export type QuizQuestion = {
  type?: "mcq" | "circuit";
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  expectedProbs?: Record<string, number>;
  expectedOutputsText?: string; // Text to show what wires we are taking as output, e.g., "Output: Measure q0 and q1"
  explanation?: string;
};

export type TutorialModule = {
  id: number; // Unique ID across ALL modules
  title: string;
  description: string;
  difficulty: string;
  lessonContent: React.ReactNode;
  practiceGoal: string;
  quizzes?: QuizQuestion[];
  isFinalTest?: boolean;
  badgeAward?: string;
  pointsAward?: number;
  prerequisiteId?: number;
  subModules?: TutorialModule[];
};

const MatrixMultiplication = ({
  equation,
  matrixContent,
  resultContent,
  inputContent = (
    <>
      α<br />β
    </>
  ),
  resultColor = "var(--accent-primary)",
}: {
  equation: string;
  matrixContent: React.ReactNode;
  resultContent: React.ReactNode;
  inputContent?: React.ReactNode;
  resultColor?: string;
}) => (
  <div
    style={{
      marginTop: "16px",
      padding: "12px",
      background: "rgba(0,0,0,0.2)",
      borderRadius: "8px",
      fontSize: "14px",
      color: "var(--text-secondary)",
      fontFamily: "monospace",
    }}
  >
    <div
      style={{ marginBottom: "12px" }}
      dangerouslySetInnerHTML={{ __html: equation }}
    ></div>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          display: "inline-block",
          position: "relative",
          padding: "0 8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            borderLeft: "1px solid var(--text-secondary)",
            borderTop: "1px solid var(--text-secondary)",
            borderBottom: "1px solid var(--text-secondary)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            borderRight: "1px solid var(--text-secondary)",
            borderTop: "1px solid var(--text-secondary)",
            borderBottom: "1px solid var(--text-secondary)",
          }}
        ></div>
        {matrixContent}
      </div>
      <span>&times;</span>
      <div
        style={{
          display: "inline-block",
          position: "relative",
          padding: "0 8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            borderLeft: "1px solid var(--text-secondary)",
            borderTop: "1px solid var(--text-secondary)",
            borderBottom: "1px solid var(--text-secondary)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            borderRight: "1px solid var(--text-secondary)",
            borderTop: "1px solid var(--text-secondary)",
            borderBottom: "1px solid var(--text-secondary)",
          }}
        ></div>
        {inputContent}
      </div>
      <span>=</span>
      <div
        style={{
          display: "inline-block",
          position: "relative",
          padding: "0 8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            borderLeft: `1px solid ${resultColor}`,
            borderTop: `1px solid ${resultColor}`,
            borderBottom: `1px solid ${resultColor}`,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            borderRight: `1px solid ${resultColor}`,
            borderTop: `1px solid ${resultColor}`,
            borderBottom: `1px solid ${resultColor}`,
          }}
        ></div>
        <span style={{ color: resultColor }}>{resultContent}</span>
      </div>
    </div>
  </div>
);

export interface TutorialSession {
  id: string; // e.g. "course-basics"
  sessionName: string;
  badge?: "Easy" | "Medium" | "Hard" | "Very Hard" | "Master";
  modules: TutorialModule[];
}

export const tutorialSessions: TutorialSession[] = [
  {
    id: "course-basics",
    sessionName: "Quantum Computing Basics",
    badge: "Easy",
    modules: [
      {
        id: 1,
        title: "Introduction to Quantum Computing",
        description:
          "Learn the fundamentals of quantum bits, superposition, and how they differ from classical bits.",
        difficulty: "Beginner",
        lessonContent: (
          <>
            <p
              style={{
                marginBottom: "16px",
                fontSize: "18px",
                color: "var(--text-secondary)",
              }}
            >
              Welcome to the first module in{" "}
              <strong>Quantum Computing Basics</strong>! In this module, we will
              explore what makes a quantum computer so fundamentally different
              from the classical computers we use every day.
            </p>

            <h3
              style={{
                fontSize: "20px",
                color: "var(--text-primary)",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              What&apos;s Inside This Module
            </h3>

            <ul
              style={{
                paddingLeft: "20px",
                marginBottom: "32px",
                color: "var(--text-secondary)",
              }}
            >
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  What is quantum computing:
                </strong>{" "}
                The fundamental unit of quantum information, capable of
                superposition.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Use cases:
                </strong>{" "}
                Real world applications of quantum computing.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Myths about Quantum Computing:
                </strong>{" "}
                We separate the science fiction from the science fact.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Quiz:
                </strong>{" "}
                Test your knowledge of everything in this module!
              </li>
            </ul>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "24px",
                borderRadius: "12px",
                borderLeft: "4px solid var(--accent-primary)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                How to navigate
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                }}
              >
                In the sidebar to your left, simply click on this lesson button
                to reveal subtopics. You can navigate freely between these
                subtopics to learn at your own pace!
              </p>
            </div>
          </>
        ),
        practiceGoal:
          "Review the module overview and continue to the subtopics.",
        subModules: [
          {
            id: 2,
            title: "What is quantum computing",
            description:
              "Learn the fundamentals of quantum bits and superposition.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  Quantum computing is a way of performing computations using
                  the laws of quantum mechanics—the branch of physics that
                  describes how nature behaves at extremely small scales, such
                  as atoms and subatomic particles.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  The quantum world often behaves in ways that seem strange from
                  our everyday point of view. Many quantum phenomena do not
                  match our common sense because our intuition is built from
                  experiences in the large, everyday world. Nevertheless, these
                  phenomena are real and have been verified through countless
                  experiments.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  Quantum computers are fundamentally different from the
                  computers, smartphones, and other electronic devices that we
                  use today. To understand quantum computing, we first need to
                  understand how ordinary computers store information.
                </p>

                {/* Visual Info: Classical Bit vs Qubit */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Classical Bit
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "8px",
                          background: "#333",
                          border: "2px solid #555",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#888",
                        }}
                      >
                        0
                      </div>
                      <span style={{ color: "var(--text-secondary)" }}>OR</span>
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "8px",
                          background: "var(--accent-primary)",
                          border: "2px solid var(--accent-secondary)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#fff",
                          boxShadow: "0 0 15px var(--accent-primary)",
                        }}
                      >
                        1
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Strictly one state at a time.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      background: "var(--surface-border)",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Quantum Bit (Qubit)
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #333 0%, var(--accent-primary) 100%)",
                          border: "2px solid var(--accent-secondary)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#fff",
                          boxShadow: "0 0 20px var(--accent-primary)",
                        }}
                      >
                        0 & 1
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Can exist in a complex combination of both states
                      (Superposition).
                    </p>
                  </div>
                </div>

                <p style={{ marginBottom: "16px" }}>
                  In classical computers, information is stored using bits. A
                  bit can have only one of two possible values: 0 or 1. In
                  electronic circuits, these values are usually represented by
                  different voltage levels. For example, a low voltage may
                  represent 0, while a higher voltage may represent 1.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  So, in simple terms, a classical bit always exists in exactly
                  one state at any moment: either 0 or 1.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  Quantum computers use quantum bits, or qubits, instead of
                  classical bits. A qubit can be realized using various quantum
                  systems, such as:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    the spin of an electron,
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    the ground and excited energy states of an atom, or
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    the polarization states of photons.
                  </li>
                </ul>
                <p style={{ marginBottom: "16px" }}>
                  At first glance, this may not seem very different from
                  classical bits. However, quantum systems behave in ways that
                  are fundamentally different from classical systems.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  Measuring a classical bit is relatively straightforward. We
                  can easily measure the voltage in a circuit using suitable
                  instruments without significantly disturbing the system. In
                  contrast, quantum systems are extremely small and delicate. At
                  these microscopic scales, quantum effects dominate, physical
                  processes occur extremely rapidly, and even the finite speed
                  of light can become important when describing interactions and
                  information transfer accurately.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  Moreover, unlike in classical systems, the act of measuring a
                  quantum system can itself disturb the system being measured.
                  This makes observing and controlling quantum systems a
                  challenging task.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  Interestingly, this sensitivity is both a challenge and an
                  opportunity. On one hand, quantum states can be easily
                  disturbed by their surroundings, making it difficult to build
                  reliable quantum computers. On the other hand, this same
                  quantum behavior gives rise to remarkable phenomena such as
                  superposition and entanglement, which provide quantum
                  computers with capabilities beyond those of classical
                  computers for certain problems.
                </p>
              </>
            ),
            practiceGoal:
              "Read through the foundational concepts of quantum computing.",
          },

          {
            id: 3,
            title: "Use cases",
            description:
              "Explore the real-world applications of quantum computers.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "16px",
                    marginBottom: "16px",
                  }}
                >
                  1. Drug Discovery and Chemistry
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  A drug molecule might interact with millions of atoms inside
                  the human body. Simulating all these interactions on classical
                  computers can take enormous time.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  A quantum computer can model molecules using the rules of
                  quantum mechanics themselves.
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Example</strong>
                </p>
                <p style={{ marginBottom: "8px" }}>
                  Suppose scientists want to develop a new drug for cancer.
                  Instead of:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    Synthesizing thousands of chemicals in a laboratory,
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    Testing them one by one,
                  </li>
                </ul>
                <p style={{ marginBottom: "16px" }}>
                  they could first simulate molecular behavior on a quantum
                  computer and identify the most promising candidates.
                </p>

                {/* Visual Info: Drug Discovery */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Laboratory Testing
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "40px",
                          background: "#e74c3c",
                          borderRadius: "10px",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "20px",
                          height: "40px",
                          background: "#3498db",
                          borderRadius: "10px",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "20px",
                          height: "40px",
                          background: "#f1c40f",
                          borderRadius: "10px",
                        }}
                      ></div>
                      <div style={{ fontSize: "20px", color: "#888" }}>...</div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Synthesizing thousands of chemicals one by one.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      background: "var(--surface-border)",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Quantum Simulation
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "22px",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "var(--accent-primary)",
                            boxShadow: "0 0 10px var(--accent-primary)",
                          }}
                        ></div>
                        <div
                          style={{
                            position: "absolute",
                            top: "35px",
                            left: "5px",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "#3fb950",
                            boxShadow: "0 0 10px #3fb950",
                          }}
                        ></div>
                        <div
                          style={{
                            position: "absolute",
                            top: "35px",
                            left: "39px",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "#d29922",
                            boxShadow: "0 0 10px #d29922",
                          }}
                        ></div>
                        <div
                          style={{
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            width: "20px",
                            height: "2px",
                            background: "#fff",
                            transform: "rotate(50deg)",
                          }}
                        ></div>
                        <div
                          style={{
                            position: "absolute",
                            top: "15px",
                            left: "25px",
                            width: "20px",
                            height: "2px",
                            background: "#fff",
                            transform: "rotate(-50deg)",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Modeling molecular rules directly to find promising
                      candidates.
                    </p>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  2. Optimization: Finding the Best Answer Among Millions
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  Optimization means finding the best solution among countless
                  possibilities. Imagine a delivery company such as Swiggy or
                  Zomato.
                </p>
                <p style={{ marginBottom: "8px" }}>
                  Suppose 500 delivery partners must deliver 20,000 orders
                  across a city. Questions include:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    Which rider should deliver which order?
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    What route minimizes fuel consumption?
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    How can deliveries be completed fastest?
                  </li>
                </ul>
                <p style={{ marginBottom: "16px" }}>
                  A classical computer can solve this, but the problem becomes
                  increasingly difficult as the city grows. Quantum algorithms
                  may eventually explore many possible routes simultaneously and
                  identify better solutions.
                </p>

                {/* Visual Info: Optimization */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Classical Routing
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#888",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "30px",
                              height: "2px",
                              background: "#888",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#888",
                            }}
                          ></div>
                        </div>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          Checking route sequentially...
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Evaluates routes one by one.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      background: "var(--surface-border)",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Quantum Optimization
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "var(--accent-primary)",
                              boxShadow: "0 0 8px var(--accent-primary)",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "30px",
                              height: "2px",
                              background: "var(--accent-primary)",
                              boxShadow: "0 0 8px var(--accent-primary)",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "var(--accent-primary)",
                              boxShadow: "0 0 8px var(--accent-primary)",
                            }}
                          ></div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#3fb950",
                              boxShadow: "0 0 8px #3fb950",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "30px",
                              height: "2px",
                              background: "#3fb950",
                              boxShadow: "0 0 8px #3fb950",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#3fb950",
                              boxShadow: "0 0 8px #3fb950",
                            }}
                          ></div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#d29922",
                              boxShadow: "0 0 8px #d29922",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "30px",
                              height: "2px",
                              background: "#d29922",
                              boxShadow: "0 0 8px #d29922",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#d29922",
                              boxShadow: "0 0 8px #d29922",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Explores many possible routes simultaneously.
                    </p>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  3. Finance: Managing Money Smarter
                </h3>
                <p style={{ marginBottom: "8px" }}>
                  Suppose an investor has ₹10,00,000 and wants to invest in:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>stocks,</li>
                  <li style={{ marginBottom: "8px" }}>bonds,</li>
                  <li style={{ marginBottom: "8px" }}>commodities,</li>
                  <li style={{ marginBottom: "8px" }}>mutual funds.</li>
                </ul>
                <p style={{ marginBottom: "16px" }}>
                  The challenge is to maximize profit while minimizing risk. A
                  quantum computer could potentially evaluate a vast number of
                  investment combinations more efficiently.
                </p>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  4. Cryptography: The Security Challenge
                </h3>
                <p style={{ marginBottom: "8px" }}>
                  Most internet security today relies on mathematical problems
                  that are extremely difficult for classical computers. Examples
                  include:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>online banking,</li>
                  <li style={{ marginBottom: "8px" }}>secure messaging,</li>
                  <li style={{ marginBottom: "8px" }}>digital signatures.</li>
                </ul>
                <p style={{ marginBottom: "16px" }}>
                  A sufficiently powerful quantum computer running Shor&apos;s
                  Algorithm could solve some of these problems much faster.
                </p>

                {/* Visual Info: Cryptography */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Classical Hack
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div style={{ fontSize: "40px", color: "#888" }}>🔒</div>
                      <div
                        style={{
                          fontSize: "20px",
                          color: "#888",
                          marginLeft: "12px",
                        }}
                      >
                        ⏳ Years
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Would take millennia to guess the prime factors of a large
                      key.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      background: "var(--surface-border)",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Quantum Hack
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "40px",
                          textShadow: "0 0 15px var(--accent-primary)",
                        }}
                      >
                        🔓
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          color: "var(--accent-primary)",
                          marginLeft: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        ⚡ Faster
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Shor&apos;s Algorithm finds prime factors exponentially
                      faster.
                    </p>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  5. Artificial Intelligence and Machine Learning
                </h3>
                <p style={{ marginBottom: "8px" }}>
                  Machine learning often requires solving enormous optimization
                  problems. Suppose we want to train an AI model to recognize
                  diseases from medical images. Training may involve:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    millions or billions of parameters,
                  </li>
                  <li style={{ marginBottom: "8px" }}>enormous datasets,</li>
                  <li style={{ marginBottom: "8px" }}>
                    extensive computation.
                  </li>
                </ul>
                <p style={{ marginBottom: "16px" }}>
                  Researchers in Quantum Machine Learning are investigating
                  whether quantum systems can accelerate certain
                  machine-learning tasks.
                </p>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  And Many More...
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  The potential of quantum computing extends far beyond these
                  examples, with ongoing research poised to unlock new
                  possibilities across countless other industries.
                </p>
              </>
            ),
            practiceGoal:
              "Review the use cases and continue to the next lesson.",
          },
          {
            id: 4,
            title: "Myths about Quantum Computing",
            description:
              "Debunk common misconceptions about quantum computers and how they actually work.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  Quantum computing sounds like science fiction, which naturally
                  leads to many myths and misconceptions.
                </p>

                {/* MYTH 1 */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  Myth 1: "Quantum Computers Will Replace Classical Computers"
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  <strong>Reality:</strong> Quantum computers are
                  special-purpose machines. They are excellent for certain
                  problems, such as simulating molecules, optimization,
                  cryptography, and quantum physics simulations.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  But for everyday tasks like browsing the web, watching videos,
                  writing documents, and playing games, classical computers are
                  much more efficient.
                </p>

                {/* Visual Info: General vs Specialized */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Classical Computers
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div style={{ fontSize: "40px" }}>💻</div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      <strong>General-purpose workers</strong>. Great for
                      everyday tasks.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      background: "var(--surface-border)",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Quantum Computers
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "40px",
                          textShadow: "0 0 15px var(--accent-primary)",
                        }}
                      >
                        ⚛️
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      <strong>Highly specialized experts</strong>. Like a
                      surgeon—you wouldn&apos;t ask them to clean floors. Both
                      will work together!
                    </p>
                  </div>
                </div>

                {/* MYTH 2 */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  Myth 2: "Quantum Computers Try Every Possible Answer
                  Simultaneously"
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  <strong>Reality:</strong> Quantum computers use phenomena such
                  as superposition and interference. While a quantum system can
                  represent many possibilities simultaneously, measuring it
                  gives only <em>one</em> outcome.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  The real challenge is designing algorithms that amplify
                  correct answers and suppress wrong answers. This is why
                  quantum algorithm design is difficult.
                </p>

                {/* Visual Info: Interference */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Random Noise
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          alignItems: "flex-end",
                          height: "40px",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "10px",
                            background: "#888",
                            borderRadius: "3px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "35px",
                            background: "#888",
                            borderRadius: "3px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "15px",
                            background: "#888",
                            borderRadius: "3px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "40px",
                            background: "#888",
                            borderRadius: "3px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "20px",
                            background: "#888",
                            borderRadius: "3px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      If every singer in a band sings randomly, the result is
                      noise.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      background: "var(--surface-border)",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Constructive Interference
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          alignItems: "center",
                          height: "40px",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "10px",
                            background: "var(--accent-primary)",
                            borderRadius: "3px",
                            boxShadow: "0 0 5px var(--accent-primary)",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "25px",
                            background: "var(--accent-primary)",
                            borderRadius: "3px",
                            boxShadow: "0 0 5px var(--accent-primary)",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "40px",
                            background: "var(--accent-primary)",
                            borderRadius: "3px",
                            boxShadow: "0 0 8px var(--accent-primary)",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "25px",
                            background: "var(--accent-primary)",
                            borderRadius: "3px",
                            boxShadow: "0 0 5px var(--accent-primary)",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "10px",
                            background: "var(--accent-primary)",
                            borderRadius: "3px",
                            boxShadow: "0 0 5px var(--accent-primary)",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      If all singers coordinate, the desired melody becomes
                      louder!
                    </p>
                  </div>
                </div>

                {/* MYTH 3 */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  Myth 3: "Current Quantum Computers Can Already Break All
                  Encryption"
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  <strong>Reality:</strong> Today&apos;s quantum computers are
                  too small and noisy to break modern encryption schemes.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  Breaking widely used encryption such as the RSA Cryptosystem
                  would require large fault-tolerant quantum computers that do
                  not yet exist. However, governments and researchers are
                  preparing for the future by developing post-quantum
                  cryptography.
                </p>

                {/* Visual Info: Cryptography Timeline */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Today (NISQ Era)
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "30px",
                          filter: "grayscale(1) opacity(0.5)",
                        }}
                      >
                        🤖
                      </div>
                      <div
                        style={{
                          color: "#e74c3c",
                          marginLeft: "12px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Too small & noisy
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Cannot break modern RSA encryption.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      background: "var(--surface-border)",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Future
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        height: "60px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "30px",
                          textShadow: "0 0 10px #3fb950",
                        }}
                      >
                        🛡️
                      </div>
                      <div
                        style={{
                          color: "#3fb950",
                          marginLeft: "12px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Post-Quantum Crypto
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Preparing new encryptions before fault-tolerant QCs
                      arrive.
                    </p>
                  </div>
                </div>
              </>
            ),
            practiceGoal: "Review the myths and continue to the quiz.",
          },
          {
            id: 5,
            title: "Quiz",
            description:
              "Test your knowledge on the basics of quantum computing.",
            difficulty: "Beginner",
            isFinalTest: true,
            pointsAward: 1,
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  Ready to test what you&apos;ve learned? Answer the questions
                  below to complete this module!
                </p>
              </>
            ),
            practiceGoal: "Pass the quiz!",
            quizzes: [
              {
                question:
                  "Quantum computing performs computations using the laws of:",
                options: [
                  "Thermodynamics",
                  "Quantum Mechanics",
                  "Relativity",
                  "Electromagnetism",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Quantum computers leverage the principles of quantum mechanics, such as superposition and entanglement.",
              },
              {
                question: "A classical bit can have how many possible values?",
                options: ["One", "Two", "Three", "Infinite"],
                correctAnswerIndex: 1,
                explanation:
                  "A classical bit can only be 0 or 1, giving it exactly two possible values.",
              },
              {
                question: "A classical bit always exists in exactly:",
                options: [
                  "Two states simultaneously",
                  "One state at a time",
                  "Infinite states",
                  "No definite state",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "At any given moment, a classical bit is either exclusively 0 or exclusively 1.",
              },
              {
                question:
                  "Quantum computers use ______ instead of classical bits.",
                options: ["Bytes", "Transistors", "Qubits", "Registers"],
                correctAnswerIndex: 2,
                explanation:
                  "Quantum bits, or qubits, are the fundamental unit of information in quantum computing.",
              },
              {
                question:
                  "Which of the following is mentioned as a possible realization of a qubit?",
                options: [
                  "Electron spin",
                  "Magnetic tape",
                  "Hard disk sector",
                  "Capacitor voltage",
                ],
                correctAnswerIndex: 0,
                explanation:
                  "Qubits can be realized using physical quantum properties like the spin of an electron.",
              },
              {
                question:
                  "The ability of a qubit to exist in a complex combination of 0 and 1 is called:",
                options: [
                  "Entanglement",
                  "Superposition",
                  "Interference",
                  "Polarization",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Superposition allows a quantum system to exist in a complex combination of multiple states at the same time.",
              },
              {
                question:
                  "According to the passage, measuring a quantum system can:",
                options: [
                  "Leave the system unchanged",
                  "Disturb the system being measured",
                  "Increase its energy",
                  "Convert it into a classical bit",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Because quantum systems are incredibly delicate, the very act of measuring them can disturb their state.",
              },
              {
                question:
                  "In drug discovery, quantum computers can help scientists by:",
                options: [
                  "Replacing laboratories completely",
                  "Modeling molecular behavior",
                  "Manufacturing drugs automatically",
                  "Eliminating chemical synthesis",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Quantum computers can simulate molecular behavior using the laws of quantum mechanics natively.",
              },
              {
                question:
                  "In finance, a quantum computer could potentially evaluate:",
                options: [
                  "Only stock prices",
                  "A vast number of investment combinations",
                  "Only mutual funds",
                  "Only commodity markets",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Quantum optimization algorithms can evaluate vast numbers of investment combinations simultaneously.",
              },
              {
                question:
                  "According to the passage, today's internet security relies mainly on:",
                options: [
                  "Quantum algorithms",
                  "Mathematical problems difficult for classical computers",
                  "Artificial intelligence",
                  "Cloud computing",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Modern cryptography (like RSA) relies on the fact that classical computers struggle to factor large prime numbers.",
              },
              {
                question:
                  "Which algorithm is specifically mentioned as being capable of solving certain cryptographic problems faster?",
                options: [
                  "Grover's Algorithm",
                  "Dijkstra's Algorithm",
                  "Shor's Algorithm",
                  "Bellman's Algorithm",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "Shor's Algorithm is famous for its ability to find prime factors exponentially faster than classical algorithms.",
              },
              {
                question:
                  "According to the passage, current quantum computers are too ______ to break modern RSA encryption.",
                options: [
                  "expensive and large",
                  "small and noisy",
                  "slow and heavy",
                  "complex and unstable",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Today's 'NISQ' era quantum computers are too small and noisy to run Shor's Algorithm at scale.",
              },
              {
                question:
                  "The myth that quantum computers try every possible answer simultaneously is incorrect because measuring a quantum system gives:",
                options: [
                  "All possible outcomes",
                  "No outcome",
                  "Only one outcome",
                  "Infinite outcomes",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "Although a system can represent many possibilities, measurement collapses it to only one outcome.",
              },
              {
                question:
                  "The current era of quantum computing is referred to in the passage as the:",
                options: ["AI Era", "Classical Era", "NISQ Era", "Silicon Era"],
                correctAnswerIndex: 2,
                explanation:
                  "NISQ stands for Noisy Intermediate-Scale Quantum era, reflecting our current hardware limitations.",
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Qubits and its properties",
        description: "Introduction to Qubits and their fundamental properties.",
        difficulty: "Beginner",
        lessonContent: (
          <>
            <p
              style={{
                marginBottom: "16px",
                fontSize: "18px",
                color: "var(--text-secondary)",
              }}
            >
              Welcome to the <strong>Qubits and its properties</strong> topic!
              In this module, we will explore the fundamental building blocks of
              a quantum computer.
            </p>
            <h3
              style={{
                fontSize: "20px",
                color: "var(--text-primary)",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              What&apos;s Inside This Module
            </h3>
            <ul
              style={{
                paddingLeft: "20px",
                marginBottom: "32px",
                color: "var(--text-secondary)",
              }}
            >
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  What is Qubit:
                </strong>{" "}
                A deep dive into the quantum bit.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Superposition:
                </strong>{" "}
                The ability to be in multiple states simultaneously.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Measurement Collapse:
                </strong>{" "}
                How observing a quantum system changes its state.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Representation:
                </strong>{" "}
                How qubits are mathematically modeled.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Interference:
                </strong>{" "}
                The wavelike property of quantum states.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  No Cloning Theorem:
                </strong>{" "}
                Why you can't perfectly copy a qubit.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Coherence and Decoherence:
                </strong>{" "}
                The fragility of quantum information.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Bloch Sphere:
                </strong>{" "}
                A geometric visualization of a qubit.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Quiz:
                </strong>{" "}
                Test your knowledge on all these properties!
              </li>
            </ul>
          </>
        ),
        practiceGoal: "Understand the nature of a qubit and superposition.",
        subModules: [
          {
            id: 7,
            title: "What is Qubit",
            description:
              "Learn exactly what a qubit is, how it functions, and its physical realization.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px", fontSize: "18px" }}>
                  A <strong>qubit</strong> (short for quantum bit) is the basic
                  unit of information in a quantum computer, just as a bit is
                  the basic unit of information in a classical computer.
                </p>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "24px",
                    marginBottom: "16px",
                  }}
                >
                  The Classical Bit
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  A classical computer stores information using bits. A bit can
                  be only one of two values: <strong>0 or 1</strong>. Everything
                  in your laptop, from the text you type to the videos you
                  watch, is ultimately represented using billions of such bits.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  Think of a classical bit like a light switch: it is either
                  completely <strong>ON (1)</strong> or completely{" "}
                  <strong>OFF (0)</strong>. There is no in-between state.
                </p>

                {/* Visual: Classical Bit */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "24px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      background: "#333",
                      border: "2px solid #555",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#888",
                    }}
                  >
                    0
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "var(--text-secondary)",
                      fontWeight: "bold",
                    }}
                  >
                    OR
                  </div>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      background: "var(--accent-primary)",
                      border: "2px solid var(--accent-secondary)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#000",
                      boxShadow: "0 0 15px var(--accent-primary)",
                    }}
                  >
                    1
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  The Quantum Bit
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  A qubit, however, is not bound by this binary restriction. A
                  qubit can be:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>Exactly 0</li>
                  <li style={{ marginBottom: "8px" }}>Exactly 1</li>
                  <li
                    style={{
                      marginBottom: "8px",
                      color: "var(--accent-primary)",
                      fontWeight: "bold",
                    }}
                  >
                    A combination of both 0 and 1 simultaneously
                  </li>
                </ul>
                <p style={{ marginBottom: "16px" }}>
                  Physically, how do we make a qubit? Unlike a classical
                  transistor, a qubit is made using microscopic quantum systems.
                  For example:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "24px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    <strong>Superconducting circuits:</strong> Tiny loops of
                    metal cooled to near absolute zero where electrons flow
                    without resistance.
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <strong>Trapped Ions:</strong> Individual atoms held in
                    place by lasers and electromagnetic fields.
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <strong>Photons:</strong> Individual particles of light
                    whose polarization (horizontal or vertical) acts as the 0 or
                    1.
                  </li>
                </ul>
              </>
            ),
            practiceGoal:
              "Understand the fundamental difference between a classical bit and a qubit.",
          },
          {
            id: 8,
            title: "Superposition",
            description:
              "Dive deep into superposition and exponential scaling.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  The ability of a qubit to be in multiple states simultaneously
                  is known as <strong>Superposition</strong>. This is one of the
                  two core pillars of quantum mechanics (the other being
                  Entanglement).
                </p>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  The Spinning Coin Analogy
                </h3>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Imagine a classical coin resting on a table. It is either
                  Heads (1) or Tails (0). This is exactly how a classical bit
                  works.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Now, imagine tossing the coin into the air. While it is
                  spinning in the air, what state is it in? It is a blur of both
                  Heads and Tails. It isn't just Heads, and it isn't just
                  Tails—it's a <strong>superposition of both</strong>.
                </p>

                {/* Visual: Spinning Coin */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "24px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <style>{`
                    @keyframes spinCoin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
                  `}</style>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, #FFD700 0%, #FFA500 100%)",
                      boxShadow: "0 0 20px rgba(255,215,0,0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      animation: "spinCoin 1.5s linear infinite",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      H / T
                    </span>
                  </div>
                </div>

                <p style={{ marginBottom: "16px" }}>
                  Only when the coin lands (when we <strong>measure</strong> the
                  qubit) does it collapse into a definite state of either Heads
                  or Tails.
                </p>

                <div
                  style={{
                    padding: "24px",
                    background: "rgba(69, 243, 255, 0.1)",
                    borderLeft: "4px solid var(--accent-primary)",
                    borderRadius: "0 8px 8px 0",
                    marginTop: "32px",
                  }}
                >
                  <h4
                    style={{
                      color: "var(--accent-primary)",
                      margin: "0 0 12px 0",
                    }}
                  >
                    The Exponential Power of Superposition
                  </h4>
                  <p
                    style={{
                      margin: "0 0 12px 0",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Why is this important? Because a qubit can be in a
                    superposition, two qubits can represent 4 states
                    simultaneously, 3 qubits can represent 8 states, and{" "}
                    <strong>n qubits can represent 2^n states</strong>.
                  </p>
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                    If you have just 300 qubits in a state of superposition,
                    they can represent more states simultaneously than there are
                    atoms in the observable universe! This exponential scaling
                    allows quantum computers to analyze massive datasets and
                    complex systems all at once, something a classical computer
                    could never do.
                  </p>
                </div>
              </>
            ),
            practiceGoal: "Understand the concept of quantum superposition.",
          },
          {
            id: 10,
            title: "Measurement Collapse",
            description:
              "Understand how measuring a qubit forces it into a definite state.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Unlike classical systems where you can look at a bit without
                  changing it,{" "}
                  <strong>
                    measuring a qubit alters its state fundamentally
                  </strong>
                  . This is a core rule of quantum mechanics.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  When you observe or "measure" a qubit that is in a
                  superposition, you force it to make a decision. It instantly
                  "collapses" into one of the definite classical states—either
                  exactly 0 or exactly 1. You cannot measure a qubit and see the
                  superposition itself.
                </p>
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "24px",
                    marginBottom: "16px",
                  }}
                >
                  Probabilities, Not Certainties
                </h3>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Which state will it collapse into? You cannot know for sure.
                  The outcome is fundamentally probabilistic. The qubit has a
                  certain probability of collapsing to 0, and a certain
                  probability of collapsing to 1. For example, a qubit could be
                  in a state where it has a 90% chance of being 0 and a 10%
                  chance of being 1.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "24px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "32px",
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, rgba(69,243,255,0.5), rgba(139,92,246,0.5))",
                        boxShadow: "0 0 20px rgba(69,243,255,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "32px",
                        fontWeight: "bold",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "-25px",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Superposition
                      </span>
                      👁️
                    </div>
                    <div
                      style={{
                        fontSize: "32px",
                        color: "var(--accent-primary)",
                      }}
                    >
                      ➔
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 24px",
                          background: "#333",
                          borderRadius: "8px",
                          border: "2px solid #555",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <div>0</div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#888",
                            marginTop: "4px",
                          }}
                        >
                          (prob p)
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "8px 24px",
                          background: "var(--accent-primary)",
                          borderRadius: "8px",
                          border: "2px solid var(--accent-secondary)",
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        <div>1</div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(0,0,0,0.6)",
                            marginTop: "4px",
                          }}
                        >
                          (prob 1-p)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
            practiceGoal: "Learn about quantum measurement and probabilities.",
          },
          {
            id: 11,
            title: "Representation",
            description:
              "Learn how qubits are mathematically modeled using Dirac notation.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  To describe a qubit mathematically, we use a notation called{" "}
                  <strong>Dirac notation</strong> (or bra-ket notation),
                  invented by physicist Paul Dirac. It is the standard language
                  of quantum mechanics.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "32px 0",
                    padding: "32px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      fontWeight: "bold",
                      color: "var(--accent-primary)",
                      letterSpacing: "4px",
                      textShadow: "0 0 15px rgba(69,243,255,0.3)",
                    }}
                  >
                    |ψ⟩ = α|0⟩ + β|1⟩
                  </div>
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "24px",
                    marginBottom: "16px",
                  }}
                >
                  Breaking it Down
                </h3>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ marginBottom: "12px" }}>
                    <strong>|ψ⟩ (Ket Psi):</strong> This represents the overall
                    quantum state of our qubit.
                  </li>
                  <li style={{ marginBottom: "12px" }}>
                    <strong>|0⟩ and |1⟩:</strong> These are the base classical
                    states. Think of them as the X and Y axes on a graph.
                  </li>
                  <li style={{ marginBottom: "12px" }}>
                    <strong>α (Alpha) and β (Beta):</strong> These are called{" "}
                    <em>Probability Amplitudes</em>. They are complex numbers
                    (meaning they can involve imaginary numbers, like the square
                    root of -1). They determine how much of state |0⟩ and state
                    |1⟩ make up our superposition.
                  </li>
                </ul>
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    borderLeft: "4px solid #fff",
                    marginTop: "24px",
                  }}
                >
                  <h4 style={{ margin: "0 0 8px 0", color: "#fff" }}>
                    The Normalization Rule
                  </h4>
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                    Because probabilities must add up to 100% (or 1.0), the
                    amplitudes follow a strict mathematical rule: the absolute
                    square of α plus the absolute square of β must equal 1.{" "}
                    <br />
                    <br />
                    <strong>|α|² + |β|² = 1</strong>
                    <br />
                    <br />
                    |α|² is the probability of measuring 0, and |β|² is the
                    probability of measuring 1.
                  </p>
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  Matrix Representation
                </h3>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  In quantum mechanics, qubits can also be represented as{" "}
                  <strong>column vectors</strong> (a type of matrix with one
                  column). The base states |0⟩ and |1⟩ look like this:
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "32px",
                    flexWrap: "wrap",
                    marginBottom: "32px",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      minWidth: "150px",
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        color: "var(--text-secondary)",
                        marginBottom: "12px",
                      }}
                    >
                      |0⟩ ={" "}
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        padding: "0 12px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "8px",
                          borderLeft: "2px solid var(--text-primary)",
                          borderTop: "2px solid var(--text-primary)",
                          borderBottom: "2px solid var(--text-primary)",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: "8px",
                          borderRight: "2px solid var(--text-primary)",
                          borderTop: "2px solid var(--text-primary)",
                          borderBottom: "2px solid var(--text-primary)",
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: "24px",
                          lineHeight: "1.4",
                          color: "var(--text-primary)",
                        }}
                      >
                        1<br />0
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: "1",
                      minWidth: "150px",
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        color: "var(--accent-primary)",
                        marginBottom: "12px",
                      }}
                    >
                      |1⟩ ={" "}
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        padding: "0 12px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "8px",
                          borderLeft: "2px solid var(--accent-primary)",
                          borderTop: "2px solid var(--accent-primary)",
                          borderBottom: "2px solid var(--accent-primary)",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: "8px",
                          borderRight: "2px solid var(--accent-primary)",
                          borderTop: "2px solid var(--accent-primary)",
                          borderBottom: "2px solid var(--accent-primary)",
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: "24px",
                          lineHeight: "1.4",
                          color: "var(--accent-primary)",
                        }}
                      >
                        0<br />1
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
            practiceGoal:
              "Understand Dirac notation and probability amplitudes.",
          },
          {
            id: 12,
            title: "Interference",
            description:
              "Discover how quantum states can interfere with each other like waves.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Because qubits are defined by probability amplitudes (which
                  are complex numbers), they possess wavelike properties. Just
                  like ripples in a pond, these probability waves can exhibit{" "}
                  <strong>interference</strong>.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  In a classical computer, probabilities are always positive
                  numbers. In a quantum computer, probability amplitudes can be
                  negative or imaginary. This means they can cancel each other
                  out!
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "32px 0",
                    padding: "32px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "48px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: "var(--success)",
                          fontSize: "32px",
                          fontWeight: "bold",
                        }}
                      >
                        🌊 + 🌊 = 🏄
                      </div>
                      <h4
                        style={{
                          color: "var(--text-primary)",
                          marginTop: "16px",
                          marginBottom: "8px",
                        }}
                      >
                        Constructive Interference
                      </h4>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                          maxWidth: "200px",
                          margin: "0 auto",
                        }}
                      >
                        When the peaks of two waves align, they amplify each
                        other, making the outcome more likely.
                      </p>
                    </div>
                    <div
                      style={{
                        width: "1px",
                        height: "100px",
                        background: "var(--surface-border)",
                      }}
                    ></div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: "var(--error)",
                          fontSize: "32px",
                          fontWeight: "bold",
                        }}
                      >
                        🌊 + 📉 = ➖
                      </div>
                      <h4
                        style={{
                          color: "var(--text-primary)",
                          marginTop: "16px",
                          marginBottom: "8px",
                        }}
                      >
                        Destructive Interference
                      </h4>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                          maxWidth: "200px",
                          margin: "0 auto",
                        }}
                      >
                        When a peak aligns with a trough, they cancel each other
                        out, making the outcome impossible.
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <strong>How Quantum Algorithms Work:</strong> A quantum
                  algorithm (like Grover's Algorithm) is essentially a carefully
                  choreographed dance of interference. The algorithm is designed
                  to create <em>destructive interference</em> for all the wrong
                  answers, shrinking their probability to zero, while creating{" "}
                  <em>constructive interference</em> for the right answer,
                  boosting its probability to near 100%. When you finally
                  measure the system, the correct answer is the only one left
                  standing!
                </p>
              </>
            ),
            practiceGoal:
              "Learn how quantum algorithms use interference to find answers.",
          },
          {
            id: 13,
            title: "No Cloning Theorem",
            description: "Why you cannot copy a quantum state.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  In classical computing, copying data is trivial. You can
                  easily duplicate a file, backup a hard drive, or press CTRL+C
                  and CTRL+V to clone bits.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  However, quantum mechanics forbids this. The{" "}
                  <strong>No-Cloning Theorem</strong> states that it is
                  fundamentally impossible to create an identical copy of an
                  arbitrary unknown quantum state.
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "32px 0",
                    padding: "32px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "var(--accent-primary)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#000",
                          boxShadow: "0 0 15px var(--accent-primary)",
                        }}
                      >
                        |ψ⟩
                      </div>
                      <span
                        style={{
                          marginTop: "8px",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Original Qubit
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "32px",
                        color: "var(--error)",
                        fontWeight: "bold",
                      }}
                    >
                      ➔ ❌ ➔
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            background: "var(--accent-primary)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#000",
                            opacity: 0.3,
                            border: "2px dashed #000",
                          }}
                        >
                          |ψ⟩
                        </div>
                        <span
                          style={{ fontSize: "12px", color: "var(--error)" }}
                        >
                          Failed Copy
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            background: "var(--accent-primary)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#000",
                            opacity: 0.3,
                            border: "2px dashed #000",
                          }}
                        >
                          |ψ⟩
                        </div>
                        <span
                          style={{ fontSize: "12px", color: "var(--error)" }}
                        >
                          Failed Copy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "24px",
                    marginBottom: "16px",
                  }}
                >
                  Why is this a big deal?
                </h3>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  This theorem creates major hurdles for quantum computer
                  engineering, because you cannot simply backup a quantum
                  calculation if something goes wrong.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  However, it is a massive <em>advantage</em> for{" "}
                  <strong>Quantum Cryptography</strong>. Because quantum states
                  cannot be copied, an eavesdropper cannot intercept and copy a
                  quantum message without destroying or altering the original
                  state. If someone tries to spy on a quantum communication
                  channel, the laws of physics guarantee that the sender and
                  receiver will immediately know!
                </p>
              </>
            ),
            practiceGoal:
              "Understand the No-Cloning Theorem and its security implications.",
          },
          {
            id: 14,
            title: "Coherence and Decoherence",
            description: "The extreme fragility of quantum information.",
            difficulty: "Advanced",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <strong>Coherence</strong> refers to the pristine state where
                  qubits are undisturbed and maintain their delicate
                  superposition and phase relationships. A quantum computer can
                  only perform its calculations while it remains coherent.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <strong>Decoherence</strong> is the enemy of quantum
                  computing. It is the process by which a quantum system loses
                  its quantum behavior and reverts back to classical physics due
                  to interactions with the surrounding environment.
                </p>

                <div
                  style={{
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    margin: "32px 0",
                  }}
                >
                  <h4
                    style={{
                      color: "var(--text-primary)",
                      marginTop: 0,
                      marginBottom: "24px",
                      textAlign: "center",
                    }}
                  >
                    The Journey to Decoherence
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "40px",
                        right: "40px",
                        height: "4px",
                        background:
                          "linear-gradient(90deg, var(--accent-primary) 0%, rgba(255,255,255,0.1) 100%)",
                        zIndex: 0,
                        transform: "translateY(-50%)",
                      }}
                    ></div>

                    <div
                      style={{
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "#111",
                        padding: "10px",
                      }}
                    >
                      <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                        💎
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--accent-primary)",
                          fontWeight: "bold",
                        }}
                      >
                        Coherent Qubit
                      </span>
                    </div>

                    <div
                      style={{
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "#111",
                        padding: "10px",
                      }}
                    >
                      <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                        🌡️
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--warning)",
                          fontWeight: "bold",
                        }}
                      >
                        Heat / Noise
                      </span>
                    </div>

                    <div
                      style={{
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "#111",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "32px",
                          marginBottom: "8px",
                          filter: "grayscale(1)",
                        }}
                      >
                        🪨
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                          fontWeight: "bold",
                        }}
                      >
                        Classical Bit
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Qubits are incredibly sensitive. Even a stray photon, a tiny
                  fluctuation in temperature, or weak electromagnetic radiation
                  from nearby wires can cause decoherence.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  This is why many quantum computers use{" "}
                  <strong>Dilution Refrigerators</strong> to cool the quantum
                  chip down to around 0.015 Kelvin (colder than interstellar
                  space!). Researchers measure qubit quality using T1
                  (relaxation time) and T2 (dephasing time). Extending these
                  coherence times is the biggest hardware challenge in building
                  a large-scale quantum computer.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  If engineers can discover a highly stable, room-temperature
                  quantum building block—a &quot;quantum transistor&quot;—it
                  would revolutionize the industry. While quantum computers will
                  likely work alongside classical ones rather than replacing
                  them entirely, such a breakthrough would make classical
                  computers obsolete for a vast array of complex tasks.
                </p>
              </>
            ),
            practiceGoal:
              "Learn why quantum computers must be kept incredibly cold and isolated.",
          },
          {
            id: 15,
            title: "Bloch Sphere",
            description: "Visualize a qubit in 3D space.",
            difficulty: "Advanced",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  While a classical bit can only be represented as two points on
                  a line (0 or 1), a qubit is vastly more complex. To visualize
                  the pure state space of a qubit, physicists use a 3D geometric
                  model known as the <strong>Bloch Sphere</strong>.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "32px",
                    margin: "32px 0",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "center",
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      minWidth: "300px",
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 300 300"
                      style={{
                        maxWidth: "300px",
                        width: "100%",
                        filter: "drop-shadow(0 0 20px rgba(69,243,255,0.2))",
                      }}
                    >
                      <defs>
                        <radialGradient
                          id="sphereGrad"
                          cx="35%"
                          cy="35%"
                          r="65%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(255, 255, 255, 0.1)"
                          />
                          <stop
                            offset="60%"
                            stopColor="rgba(69, 243, 255, 0.05)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(69, 243, 255, 0.15)"
                          />
                        </radialGradient>
                        <marker
                          id="arrowhead-axis"
                          markerWidth="8"
                          markerHeight="6"
                          refX="7"
                          refY="3"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 8 3, 0 6"
                            fill="rgba(255,255,255,0.8)"
                          />
                        </marker>
                        <marker
                          id="arrowhead-vector"
                          markerWidth="8"
                          markerHeight="6"
                          refX="7"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 8 3, 0 6" fill="#45f3ff" />
                        </marker>
                      </defs>

                      {/* Back half of equator */}
                      <path
                        d="M 50 150 A 100 35 0 0 1 250 150"
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Sphere outline with gradient */}
                      <circle
                        cx="150"
                        cy="150"
                        r="100"
                        fill="url(#sphereGrad)"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="2"
                      />

                      {/* Front half of equator */}
                      <path
                        d="M 50 150 A 100 35 0 0 0 250 150"
                        fill="none"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Axes */}
                      {/* Z-axis */}
                      <line
                        x1="150"
                        y1="260"
                        x2="150"
                        y2="30"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1.5"
                        markerEnd="url(#arrowhead-axis)"
                      />

                      {/* Y-axis */}
                      <line
                        x1="150"
                        y1="150"
                        x2="280"
                        y2="150"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1.5"
                        markerEnd="url(#arrowhead-axis)"
                      />

                      {/* X-axis */}
                      <line
                        x1="150"
                        y1="150"
                        x2="45"
                        y2="200"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1.5"
                        markerEnd="url(#arrowhead-axis)"
                      />

                      {/* Projections */}
                      {/* Center to projection on equator */}
                      <line
                        x1="150"
                        y1="150"
                        x2="200"
                        y2="175"
                        stroke="rgba(69,243,255,0.4)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      {/* Vector tip to projection */}
                      <line
                        x1="200"
                        y1="80"
                        x2="200"
                        y2="175"
                        stroke="rgba(69,243,255,0.4)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />

                      {/* Angles */}
                      {/* Theta arc */}
                      <path
                        d="M 150 100 Q 165 100 175 115"
                        fill="none"
                        stroke="#45f3ff"
                        strokeWidth="1.5"
                      />
                      {/* Phi arc: from X-axis to projection */}
                      <path
                        d="M 85 180 Q 140 200 200 175"
                        fill="none"
                        stroke="#45f3ff"
                        strokeWidth="1.5"
                      />

                      {/* State Vector |ψ⟩ */}
                      <line
                        x1="150"
                        y1="150"
                        x2="200"
                        y2="80"
                        stroke="#45f3ff"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead-vector)"
                      />

                      {/* Labels */}
                      <text
                        x="160"
                        y="45"
                        fill="rgba(255,255,255,0.9)"
                        fontSize="20"
                        fontWeight="bold"
                      >
                        |0⟩
                      </text>
                      <text
                        x="160"
                        y="275"
                        fill="rgba(255,255,255,0.9)"
                        fontSize="20"
                        fontWeight="bold"
                      >
                        |1⟩
                      </text>
                      <text
                        x="210"
                        y="75"
                        fill="#45f3ff"
                        fontSize="20"
                        fontWeight="bold"
                      >
                        |ψ⟩
                      </text>

                      <text
                        x="160"
                        y="90"
                        fill="#45f3ff"
                        fontSize="20"
                        fontStyle="italic"
                        fontWeight="bold"
                      >
                        θ
                      </text>
                      <text
                        x="135"
                        y="195"
                        fill="#45f3ff"
                        fontSize="20"
                        fontStyle="italic"
                        fontWeight="bold"
                      >
                        φ
                      </text>

                      <text x="5" y="225" fill="#fff" fontSize="14">
                        |0⟩ + |1⟩
                      </text>
                      <line
                        x1="5"
                        y1="230"
                        x2="65"
                        y2="230"
                        stroke="#fff"
                        strokeWidth="1"
                      />
                      <text x="25" y="245" fill="#fff" fontSize="14">
                        √2
                      </text>

                      <text x="225" y="125" fill="#fff" fontSize="14">
                        |0⟩ + i|1⟩
                      </text>
                      <line
                        x1="225"
                        y1="130"
                        x2="295"
                        y2="130"
                        stroke="#fff"
                        strokeWidth="1"
                      />
                      <text x="250" y="145" fill="#fff" fontSize="14">
                        √2
                      </text>

                      {/* Dots */}
                      <circle cx="150" cy="50" r="5" fill="#4dabf7" />
                      <circle cx="150" cy="250" r="5" fill="#ff6b6b" />
                      <circle cx="200" cy="80" r="4" fill="#b026ff" />
                      <circle cx="70" cy="188" r="5" fill="#fff" />
                      <circle cx="250" cy="150" r="5" fill="#fff" />
                    </svg>
                  </div>

                  <div style={{ flex: "1", minWidth: "300px" }}>
                    <h3
                      style={{
                        fontSize: "20px",
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Navigating the Sphere
                    </h3>
                    <ul
                      style={{
                        paddingLeft: "20px",
                        marginBottom: "16px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <li style={{ marginBottom: "12px" }}>
                        <strong>The Poles:</strong> The absolute top of the
                        sphere represents the classical state{" "}
                        <strong>|0⟩</strong>. The absolute bottom represents the
                        state <strong>|1⟩</strong>.
                      </li>
                      <li style={{ marginBottom: "12px" }}>
                        <strong>The Surface:</strong> Any point on the surface
                        of the sphere represents a valid quantum state. The
                        arrow pointing from the center to the surface is the
                        state vector <strong>|ψ⟩</strong>.
                      </li>
                      <li style={{ marginBottom: "12px" }}>
                        <strong>The Equator:</strong> Points directly on the
                        equator represent an exact 50/50 superposition of |0⟩
                        and |1⟩ (often denoted as |+⟩ and |-⟩). They are
                        perfectly halfway between 0 and 1.
                      </li>
                    </ul>
                    <h3
                      style={{
                        fontSize: "20px",
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                        marginTop: "24px",
                      }}
                    >
                      Angular Representation (θ and φ)
                    </h3>
                    <p
                      style={{
                        marginBottom: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      A quantum state can be mathematically defined using two
                      angles on the sphere:
                    </p>
                    <ul
                      style={{
                        paddingLeft: "20px",
                        marginBottom: "16px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <li style={{ marginBottom: "12px" }}>
                        <strong>Theta (θ):</strong> The <em>polar angle</em>{" "}
                        measured from the North Pole (Z-axis). It determines the
                        probability of measuring 0 versus 1. Ranges from 0 to π.
                      </li>
                      <li style={{ marginBottom: "12px" }}>
                        <strong>Phi (φ):</strong> The <em>azimuthal angle</em>{" "}
                        measured around the equator (X-Y plane). It represents
                        the quantum phase. Ranges from 0 to 2π.
                      </li>
                    </ul>
                    <div
                      style={{
                        background: "#222",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        fontFamily: "monospace",
                        color: "var(--accent-primary)",
                        textAlign: "center",
                        marginBottom: "16px",
                      }}
                    >
                      |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
                    </div>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontStyle: "italic",
                        fontSize: "14px",
                      }}
                    >
                      Note: Applying a quantum gate (like an X-gate or H-gate)
                      mathematically alters θ and φ, effectively rotating this
                      arrow around the sphere!
                    </p>
                  </div>
                </div>
              </>
            ),
            practiceGoal: "Visualize the vast state space of a single qubit.",
          },
          {
            id: 9,
            title: "Quiz",
            prerequisiteId: 5,
            description: "Test your knowledge on qubits and superposition.",
            difficulty: "Beginner",
            isFinalTest: true,
            pointsAward: 1,
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  Ready to test what you&apos;ve learned? Answer the questions
                  below to complete this module!
                </p>
              </>
            ),
            practiceGoal: "Score a perfect 5/5 to earn a point!",
            quizzes: [
              // Easy
              {
                question:
                  "What is the fundamental difference between a classical bit and a qubit?",
                options: [
                  "A classical bit can hold more data.",
                  "A qubit can be 0, 1, or a combination of both simultaneously.",
                  "A classical bit processes information faster.",
                  "A qubit can only be exactly 0 or exactly 1.",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Unlike a classical bit which is strictly binary, a qubit can exist in a superposition of both states.",
              },
              {
                question:
                  "In the spinning coin analogy, what does the spinning coin represent?",
                options: [
                  "A measured qubit",
                  "A classical bit",
                  "A qubit in superposition",
                  "A qubit undergoing decoherence",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "A spinning coin is a blur of heads and tails, representing a qubit in superposition before it is measured.",
              },
              {
                question:
                  "What happens to a qubit in superposition when it is measured?",
                options: [
                  "It remains in superposition forever.",
                  "It turns into two separate qubits.",
                  "It instantly collapses into a definite state (0 or 1).",
                  "It clones itself.",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "Measuring a qubit forces it to make a decision and instantly collapse into a classical state.",
              },
              {
                question:
                  "Which part of the Bloch Sphere represents the classical state |1⟩?",
                options: [
                  "The absolute top (North Pole)",
                  "The absolute bottom (South Pole)",
                  "The exact center of the sphere",
                  "Anywhere on the equator",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "The South Pole of the Bloch sphere represents the state |1⟩, while the North Pole represents |0⟩.",
              },
              {
                question:
                  "What is the process called when a quantum system loses its quantum behavior due to environmental noise?",
                options: [
                  "Coherence",
                  "Superposition",
                  "Decoherence",
                  "Interference",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "Decoherence is when a qubit's delicate state is destroyed by interaction with the environment.",
              },
              // Medium
              {
                question:
                  "How many states can a system of n qubits represent simultaneously due to superposition?",
                options: ["2 × n", "n²", "2^n", "Infinite"],
                correctAnswerIndex: 2,
                explanation:
                  "Because of superposition, adding a qubit doubles the number of simultaneous states, leading to 2^n exponential growth.",
              },
              {
                question:
                  "In Dirac notation for a qubit (|ψ⟩ = α|0⟩ + β|1⟩), what do α and β represent?",
                options: [
                  "The physical coordinates of the qubit",
                  "Probability amplitudes that are complex numbers",
                  "The temperature of the quantum system",
                  "The number of photons",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "α and β are complex probability amplitudes that determine the superposition.",
              },
              {
                question:
                  "According to the Normalization Rule, what must the sum of the absolute squares of the amplitudes (|α|² + |β|²) equal?",
                options: ["0", "1", "2^n", "100"],
                correctAnswerIndex: 1,
                explanation:
                  "Because probabilities must add up to 100% (or 1), |α|² + |β|² must strictly equal 1.",
              },
              {
                question:
                  "Which wavelike property of qubits explains how quantum algorithms amplify the correct answer while canceling out wrong answers?",
                options: [
                  "No-Cloning Theorem",
                  "Decoherence",
                  "Interference",
                  "Measurement Collapse",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "Quantum algorithms use constructive and destructive interference to find the correct answer.",
              },
              {
                question:
                  "What do points directly on the equator of the Bloch Sphere represent?",
                options: [
                  "A definite state of exactly |0⟩",
                  "A definite state of exactly |1⟩",
                  "An exact 50/50 superposition of |0⟩ and |1⟩",
                  "A state that has fully decohered",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "The equator is halfway between the poles, representing states with equal probabilities for 0 and 1.",
              },
              // Hard
              {
                question:
                  "If a qubit's state is represented on the Bloch sphere with a polar angle (θ) of 45° and an azimuthal angle (φ) of 90°, what is its quantum state according to the formula |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩?",
                options: [
                  "cos(22.5°)|0⟩ + i sin(22.5°)|1⟩",
                  "cos(45°)|0⟩ + sin(45°)|1⟩",
                  "|0⟩ + i|1⟩ / √2",
                  "cos(22.5°)|0⟩ + sin(22.5°)|1⟩",
                ],
                correctAnswerIndex: 0,
                explanation:
                  "Substituting θ = 45° and φ = 90°: θ/2 = 22.5°, and e^(i90°) = i. Thus the state is cos(22.5°)|0⟩ + i sin(22.5°)|1⟩.",
              },
              {
                question:
                  "The No-Cloning Theorem forbids copying quantum states, which creates engineering hurdles but is a massive advantage for which field?",
                options: [
                  "Quantum Cryptography",
                  "Classical Data Storage",
                  "CPU Manufacturing",
                  "Operating Systems",
                ],
                correctAnswerIndex: 0,
                explanation:
                  "In Quantum Cryptography, the inability to copy a state means an eavesdropper cannot intercept data without alerting the sender.",
              },
              {
                question:
                  "Why are Dilution Refrigerators used to cool quantum chips to around 0.015 Kelvin?",
                options: [
                  "To speed up the clock rate of the processor",
                  "To prevent decoherence caused by heat and environmental noise",
                  "To make the qubits visible to the naked eye",
                  "To increase the electrical resistance of the wires",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Extreme cold is required to isolate qubits from environmental heat and noise, preventing decoherence.",
              },
              {
                question:
                  "In the angular representation of a qubit on the Bloch Sphere, what does the azimuthal angle (φ) represent?",
                options: [
                  "The probability of measuring 0",
                  "The quantum phase",
                  "The total energy of the qubit",
                  "The number of classical bits required to store the state",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "The azimuthal angle φ circles the equator and represents the relative quantum phase between the |0⟩ and |1⟩ states.",
              },
              {
                question:
                  "If a qubit's probability amplitude for state |0⟩ is α, what is the actual probability of measuring the qubit as 0?",
                options: ["α", "1 - α", "|α|²", "α / 2"],
                correctAnswerIndex: 2,
                explanation:
                  "The probability of measuring a state is the absolute square of its probability amplitude (|α|²).",
              },
              {
                question:
                  "In the angular representation of a qubit (θ and φ), what does the angle θ (theta) control?",
                options: [
                  "The probability of measuring |0⟩ vs |1⟩",
                  "The relative phase between |0⟩ and |1⟩",
                  "The speed of decoherence",
                  "The entanglement strength",
                ],
                correctAnswerIndex: 0,
                explanation:
                  "Theta (θ) determines the latitude on the Bloch sphere, which directly controls the probabilities of measuring |0⟩ or |1⟩.",
              },
              {
                question:
                  "If a qubit's probability amplitude for |0⟩ is 1/√2, what is the probability of measuring 0?",
                options: ["100%", "25%", "50%", "70.7%"],
                correctAnswerIndex: 2,
                explanation:
                  "The probability is the absolute square of the amplitude. (1/√2)² = 1/2, or 50%.",
              },
              {
                question:
                  "In the matrix representation of qubits, what does a column vector with 1 on top and 0 on the bottom represent?",
                options: [
                  "State |1⟩",
                  "State |0⟩",
                  "A qubit in superposition",
                  "A Pauli Gate",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "The column vector [1; 0] is the standard mathematical matrix representation of the base state |0⟩.",
              },
            ],
          },
        ],
      },
      {
        id: 16,
        title: "Quantum Gates",
        description: "Learn how we manipulate qubits to perform computations.",
        difficulty: "Beginner",
        lessonContent: (
          <>
            <p style={{ marginBottom: "16px" }}>
              Just as classical computers use logic gates (AND, OR, NOT) to
              manipulate bits, quantum computers use{" "}
              <strong>Quantum Gates</strong> to manipulate qubits.
            </p>
            <p style={{ marginBottom: "16px" }}>
              In this module, we will explore the fundamental gates used in
              quantum computing, how they rotate the state of a qubit on the
              Bloch sphere, and how they create complex phenomena like
              entanglement.
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "24px",
                borderRadius: "12px",
                borderLeft: "4px solid var(--accent-primary)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                Topics Covered
              </h4>
              <ul
                style={{
                  color: "var(--text-secondary)",
                  paddingLeft: "20px",
                  lineHeight: "1.6",
                }}
              >
                <li>What are gates?</li>
                <li>Single Qubit Gates</li>
                <li>Pauli Gates (X, Y, Z)</li>
                <li>Phase Gates (S, T)</li>
                <li>Rotation Gates (Rx, Ry, Rz)</li>
                <li>2-Qubit Gates (CNOT, SWAP)</li>
                <li>Entanglement</li>
              </ul>
            </div>
          </>
        ),
        practiceGoal:
          "Review the introduction and explore the subtopics in the sidebar.",
        subModules: [
          {
            id: 17,
            title: "What are gates?",
            description: "Understanding quantum gates as operations on qubits.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  A quantum gate is a basic quantum circuit operating on a small
                  number of qubits. They are the building blocks of quantum
                  algorithms.
                </p>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Mathematically, quantum gates are represented by{" "}
                  <strong>Unitary Matrices</strong>. Because they are unitary,
                  all quantum gates are reversible (except for measurement). If
                  you apply a gate, there is always a way to apply an inverse
                  gate to perfectly undo the operation.
                </p>

                {/* Visual Info: Classical vs Quantum Gate */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Classical Gate */}
                  <div
                    style={{
                      flex: "1",
                      minWidth: "250px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Classical Logic Gate (NOT)
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "var(--text-secondary)",
                        }}
                      >
                        0
                      </div>

                      <div
                        style={{
                          width: "20px",
                          height: "2px",
                          background: "var(--surface-border)",
                        }}
                      ></div>

                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "4px",
                          background: "#333",
                          border: "2px solid #555",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#888",
                          position: "relative",
                        }}
                      >
                        NOT
                        <div
                          style={{
                            position: "absolute",
                            right: "-12px",
                            top: "50%",
                            marginTop: "-4px",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            border: "2px solid #555",
                            background: "#333",
                          }}
                        ></div>
                      </div>

                      <div
                        style={{
                          width: "20px",
                          height: "2px",
                          background: "var(--surface-border)",
                          marginLeft: "8px",
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#888",
                        }}
                      >
                        1
                      </div>
                    </div>

                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                      Flips the state of a classical bit. It turns a 0 into a 1,
                      and a 1 into a 0.
                    </p>
                  </div>

                  {/* Quantum Gate */}
                  <div
                    style={{
                      flex: "1",
                      minWidth: "250px",
                      textAlign: "center",
                      borderLeft: "1px solid rgba(255,255,255,0.1)",
                      paddingLeft: "24px",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      Quantum Gate (X Gate)
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "var(--text-secondary)",
                        }}
                      >
                        |0⟩
                      </div>

                      <div
                        style={{
                          position: "relative",
                          width: "80px",
                          height: "60px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 12px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            right: 0,
                            height: "2px",
                            background: "var(--surface-border)",
                          }}
                        ></div>

                        <div
                          style={{
                            zIndex: 1,
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            background: "rgba(69,243,255,0.1)",
                            border: "2px solid var(--accent-primary)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "var(--accent-primary)",
                            boxShadow: "0 0 15px rgba(69,243,255,0.2)",
                          }}
                        >
                          X
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "var(--accent-primary)",
                        }}
                      >
                        |1⟩
                      </div>
                    </div>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                      The quantum equivalent of a NOT gate. It takes a qubit
                      from one state to another.
                    </p>
                  </div>
                </div>
              </>
            ),
            practiceGoal:
              "Understand the concept of a quantum gate and unitarity.",
          },
          {
            id: 18,
            title: "Single Qubit Gates",
            description: "Introduction to gates that act on a single qubit.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Single-qubit gates change the state of exactly one qubit at a
                  time. Because qubits are represented as points on the surface
                  of a sphere, any single-qubit gate mathematically corresponds
                  to a <strong>rotation</strong> of the state vector around the
                  X, Y, or Z axes.
                </p>

                {/* Visual Info: Airplane on a Globe */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    margin: "32px 0",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: "1", minWidth: "250px" }}>
                    <div
                      style={{
                        padding: "16px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "8px",
                        borderLeft: "4px solid #fff",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: "var(--text-secondary)",
                          lineHeight: "1.6",
                        }}
                      >
                        <strong>Analogy:</strong> Just as an airplane takes you
                        from one city to another on the surface of the Earth, a
                        single-qubit quantum gate takes a qubit from one point
                        to another on the surface of the Bloch sphere.
                        <br />
                        <br />
                        For example, the <strong>X gate</strong> is like flying
                        from the North Pole (state{" "}
                        <strong style={{ color: "var(--text-primary)" }}>
                          |0⟩
                        </strong>
                        ) directly to the South Pole (state{" "}
                        <strong style={{ color: "var(--accent-primary)" }}>
                          |1⟩
                        </strong>
                        )!
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "16px",
                    }}
                  >
                    {/* CSS representation of a globe/Bloch sphere with a path */}
                    <div
                      style={{
                        position: "relative",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "2px solid rgba(69,243,255,0.3)",
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(69,243,255,0.1), transparent)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Equator & Meridian */}
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "40px",
                          border: "1px dashed rgba(255,255,255,0.2)",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "40px",
                          border: "1px dashed rgba(255,255,255,0.2)",
                          borderRadius: "50%",
                        }}
                      ></div>

                      {/* North Pole |0> */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-24px",
                          color: "var(--text-secondary)",
                          fontWeight: "bold",
                        }}
                      >
                        |0⟩
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: "-4px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "var(--text-primary)",
                        }}
                      ></div>

                      {/* South Pole |1> */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-28px",
                          color: "var(--accent-primary)",
                          fontWeight: "bold",
                        }}
                      >
                        |1⟩
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-4px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "var(--accent-primary)",
                          boxShadow: "0 0 10px var(--accent-primary)",
                        }}
                      ></div>

                      {/* Flight Path Arc */}
                      <div
                        style={{
                          position: "absolute",
                          left: "-20px",
                          width: "80px",
                          height: "120px",
                          borderLeft: "3px dashed var(--accent-primary)",
                          borderTopLeftRadius: "100px",
                          borderBottomLeftRadius: "100px",
                          borderTop: "transparent",
                          borderBottom: "transparent",
                          opacity: 0.8,
                        }}
                      >
                        {/* Airplane marker (using a triangle) */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "-8.5px",
                            marginTop: "-6px",
                            width: "0",
                            height: "0",
                            borderTop: "6px solid transparent",
                            borderBottom: "6px solid transparent",
                            borderTopWidth: "8px",
                            borderRight: "14px solid var(--accent-primary)",
                            transform: "rotate(-90deg)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  The <strong>Hadamard Gate (H)</strong> is one of the most
                  important quantum gates. It is responsible for putting a qubit
                  into an equal superposition of |0⟩ and |1⟩. Geometrically, it
                  represents a 180-degree rotation around a diagonal axis
                  exactly halfway between the X and Z axes!
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    margin: "32px 0",
                  }}
                >
                  {/* H Gate */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          Hadamard (H) Gate
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Maps |0⟩ to |+⟩ = (|0⟩ + |1⟩)/√2 and |1⟩ to |-⟩ = (|0⟩
                          - |1⟩)/√2. Applying it twice returns the qubit to its
                          original state.
                        </p>
                        <MatrixMultiplication
                          equation="H|0⟩ = |+⟩"
                          matrixContent={
                            <>
                              1/√2 &nbsp; 1/√2
                              <br />
                              1/√2 &nbsp; -1/√2
                            </>
                          }
                          resultContent={
                            <>
                              1/√2
                              <br />
                              1/√2
                            </>
                          }
                          resultColor="#00E5FF"
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "#00E5FF",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>H =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid #00E5FF",
                                borderTop: "2px solid #00E5FF",
                                borderBottom: "2px solid #00E5FF",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid #00E5FF",
                                borderTop: "2px solid #00E5FF",
                                borderBottom: "2px solid #00E5FF",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "16px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              1/√2 &nbsp; 1/√2
                              <br />
                              1/√2 &nbsp; -1/√2
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    marginBottom: "24px",
                    color: "var(--text-secondary)",
                  }}
                >
                  All single-qubit gates share a set of fundamental mathematical
                  properties that dictate how quantum information behaves.
                  Understanding these rules is crucial for building quantum
                  algorithms!
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                    marginBottom: "32px",
                  }}
                >
                  {/* Unitarity */}
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--accent-primary)",
                        marginBottom: "12px",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>U</span> Unitarity
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--text-secondary)",
                        lineHeight: "1.6",
                      }}
                    >
                      Quantum gates are represented by{" "}
                      <strong>Unitary Matrices</strong> (U<sup>†</sup>U = I).
                      This essentially means they preserve the length (norm) of
                      the quantum state vector.
                    </p>
                  </div>

                  {/* Probability Preservation */}
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h4
                      style={{
                        color: "#ff6b6b",
                        marginBottom: "12px",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>%</span> Probability
                      Preservation
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--text-secondary)",
                        lineHeight: "1.6",
                      }}
                    >
                      Because gates are unitary, the total sum of the
                      probabilities of all possible outcomes always remains
                      exactly 1 (100%). You never "lose" or "gain" probability
                      during a gate operation.
                    </p>
                  </div>

                  {/* Reversibility */}
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h4
                      style={{
                        color: "#4CAF50",
                        marginBottom: "12px",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>↺</span> Reversibility
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--text-secondary)",
                        lineHeight: "1.6",
                      }}
                    >
                      Every quantum gate is perfectly reversible. If you apply a
                      gate to a state, you can always apply its inverse (U
                      <sup>†</sup>) to completely undo the operation and get the
                      original state back.
                    </p>
                  </div>

                  {/* Linearity */}
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h4
                      style={{
                        color: "#ffb84d",
                        marginBottom: "12px",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>∑</span> Linearity
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--text-secondary)",
                        lineHeight: "1.6",
                      }}
                    >
                      Gates act linearly on superpositions. Applying a gate to
                      (α|0⟩ + β|1⟩) is the exact same as applying it to |0⟩,
                      applying it to |1⟩, and then adding those results
                      together: α(U|0⟩) + β(U|1⟩).
                    </p>
                  </div>

                  {/* Hermitian */}
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h4
                      style={{
                        color: "#9c27b0",
                        marginBottom: "12px",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>H</span> Hermitian
                      (Some Gates)
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--text-secondary)",
                        lineHeight: "1.6",
                      }}
                    >
                      Some gates (like the Pauli X, Y, Z and Hadamard) are their
                      own inverses. This property is called being{" "}
                      <strong>Hermitian</strong> (H = H<sup>†</sup>). Applying
                      them twice in a row does absolutely nothing!
                    </p>
                  </div>
                </div>
              </>
            ),
            practiceGoal:
              "Recognize that single-qubit gates are rotations on the Bloch sphere.",
          },
          {
            id: 19,
            title: "Pauli Gates",
            description: "The fundamental X, Y, and Z gates.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  The Pauli gates are the most fundamental single-qubit
                  operations. Geometrically, they correspond to{" "}
                  <strong>180-degree rotations</strong> around the X, Y, and Z
                  axes of the Bloch sphere.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    margin: "32px 0",
                  }}
                >
                  {/* Pauli X */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          Pauli-X (NOT Gate)
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the state 180° around the{" "}
                          <strong>X-axis</strong>. It flips |0⟩ to |1⟩ and |1⟩
                          to |0⟩, acting just like a classical NOT gate.
                        </p>
                        <MatrixMultiplication
                          equation="X(α|0⟩ + β|1⟩) = β|0⟩ + α|1⟩"
                          matrixContent={
                            <>
                              0 &nbsp; 1<br />1 &nbsp; 0
                            </>
                          }
                          resultContent={
                            <>
                              β<br />α
                            </>
                          }
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "var(--accent-primary)",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>X =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid var(--accent-primary)",
                                borderTop: "2px solid var(--accent-primary)",
                                borderBottom: "2px solid var(--accent-primary)",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid var(--accent-primary)",
                                borderTop: "2px solid var(--accent-primary)",
                                borderBottom: "2px solid var(--accent-primary)",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "20px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              0 &nbsp; 1<br />1 &nbsp; 0
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pauli Y */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          Pauli-Y
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the state 180° around the{" "}
                          <strong>Y-axis</strong>. It maps |0⟩ to i|1⟩ and |1⟩
                          to -i|0⟩, introducing complex phases.
                        </p>
                        <MatrixMultiplication
                          equation="Y(α|0⟩ + β|1⟩) = -iβ|0⟩ + iα|1⟩"
                          matrixContent={
                            <>
                              0 &nbsp; -i
                              <br />i &nbsp; &nbsp;0
                            </>
                          }
                          resultContent={
                            <>
                              -iβ
                              <br />
                              iα
                            </>
                          }
                          resultColor="#ff6b6b"
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "#ff6b6b",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>Y =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid #ff6b6b",
                                borderTop: "2px solid #ff6b6b",
                                borderBottom: "2px solid #ff6b6b",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid #ff6b6b",
                                borderTop: "2px solid #ff6b6b",
                                borderBottom: "2px solid #ff6b6b",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "20px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              0 &nbsp; -i
                              <br />i &nbsp; &nbsp;0
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pauli Z */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          Pauli-Z (Phase Flip)
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the state 180° around the{" "}
                          <strong>Z-axis</strong>. It leaves |0⟩ unchanged but
                          flips the sign of |1⟩ to -|1⟩ (changing the quantum
                          phase).
                        </p>
                        <MatrixMultiplication
                          equation="Z(α|0⟩ + β|1⟩) = α|0⟩ - β|1⟩"
                          matrixContent={
                            <>
                              1 &nbsp; &nbsp;0
                              <br />0 &nbsp; -1
                            </>
                          }
                          resultContent={
                            <>
                              α<br />
                              -β
                            </>
                          }
                          resultColor="#4CAF50"
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "#4CAF50",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>Z =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid #4CAF50",
                                borderTop: "2px solid #4CAF50",
                                borderBottom: "2px solid #4CAF50",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid #4CAF50",
                                borderTop: "2px solid #4CAF50",
                                borderBottom: "2px solid #4CAF50",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "20px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              1 &nbsp; &nbsp;0
                              <br />0 &nbsp; -1
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
            practiceGoal: "Learn the effects of the X, Y, and Z Pauli gates.",
          },
          {
            id: 20,
            title: "Phase Gates",
            description: "The S and T phase shift gates.",
            difficulty: "Beginner",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Phase gates rotate the state around the Z-axis by specific
                  fractions of a circle. Importantly, a rotation around the
                  Z-axis <strong>only affects the azimuthal angle (φ)</strong>,
                  leaving the probability of measuring |0⟩ or |1⟩ unchanged. It
                  only changes the quantum phase!
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    margin: "32px 0",
                  }}
                >
                  {/* S Gate */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          S Gate (Phase Gate)
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the state by <strong>90 degrees (π/2)</strong>{" "}
                          around the Z-axis. Applying it twice equals a Pauli-Z
                          gate.
                        </p>
                        <MatrixMultiplication
                          equation="S(α|0⟩ + β|1⟩) = α|0⟩ + iβ|1⟩"
                          matrixContent={
                            <>
                              1 &nbsp; 0<br />0 &nbsp; i
                            </>
                          }
                          resultContent={
                            <>
                              α<br />
                              iβ
                            </>
                          }
                          resultColor="#ffb84d"
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "#ffb84d",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>S =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid #ffb84d",
                                borderTop: "2px solid #ffb84d",
                                borderBottom: "2px solid #ffb84d",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid #ffb84d",
                                borderTop: "2px solid #ffb84d",
                                borderBottom: "2px solid #ffb84d",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "20px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              1 &nbsp; 0<br />0 &nbsp; i
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* T Gate */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          T Gate
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the state by <strong>45 degrees (π/4)</strong>{" "}
                          around the Z-axis. Applying it twice equals an S gate.
                        </p>
                        <MatrixMultiplication
                          equation="T(α|0⟩ + β|1⟩) = α|0⟩ + e<sup>iπ/4</sup>β|1⟩"
                          matrixContent={
                            <>
                              1 &nbsp; &nbsp;0
                              <br />0 &nbsp; e<sup>iπ/4</sup>
                            </>
                          }
                          resultContent={
                            <>
                              α<br />e<sup>iπ/4</sup>β
                            </>
                          }
                          resultColor="#ffb84d"
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "#ffb84d",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>T =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid #ffb84d",
                                borderTop: "2px solid #ffb84d",
                                borderBottom: "2px solid #ffb84d",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid #ffb84d",
                                borderTop: "2px solid #ffb84d",
                                borderBottom: "2px solid #ffb84d",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "20px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              1 &nbsp; &nbsp;0
                              <br />0 &nbsp; e<sup>iπ/4</sup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
            practiceGoal: "Understand fractional Z-axis rotations.",
          },
          {
            id: 21,
            title: "Rotation Gates",
            description: "Arbitrary angle rotations Rx, Ry, and Rz.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                  }}
                >
                  While Pauli and Phase gates represent fixed, predefined
                  rotations, <strong>Rotation Gates</strong> allow you to
                  specify a <strong>custom angle θ (theta)</strong> to rotate a
                  qubit by any arbitrary amount around the X, Y, or Z axes.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    margin: "32px 0",
                  }}
                >
                  {/* Rx Gate */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          Rx(θ)
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the qubit by angle θ around the{" "}
                          <strong>X-axis</strong>.
                        </p>
                        <MatrixMultiplication
                          equation="Rx(θ)(α|0⟩ + β|1⟩)"
                          matrixContent={
                            <>
                              cos(θ/2) &nbsp; -i sin(θ/2)
                              <br />
                              -i sin(θ/2) &nbsp; cos(θ/2)
                            </>
                          }
                          resultContent={
                            <>
                              α cos(θ/2) - iβ sin(θ/2)
                              <br />
                              -iα sin(θ/2) + β cos(θ/2)
                            </>
                          }
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "var(--accent-primary)",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>Rx =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid var(--accent-primary)",
                                borderTop: "2px solid var(--accent-primary)",
                                borderBottom: "2px solid var(--accent-primary)",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid var(--accent-primary)",
                                borderTop: "2px solid var(--accent-primary)",
                                borderBottom: "2px solid var(--accent-primary)",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "16px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              cos(θ/2) &nbsp; -i sin(θ/2)
                              <br />
                              -i sin(θ/2) &nbsp; cos(θ/2)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ry Gate */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          Ry(θ)
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the qubit by angle θ around the{" "}
                          <strong>Y-axis</strong>.
                        </p>
                        <MatrixMultiplication
                          equation="Ry(θ)(α|0⟩ + β|1⟩)"
                          matrixContent={
                            <>
                              cos(θ/2) &nbsp; -sin(θ/2)
                              <br />
                              sin(θ/2) &nbsp; cos(θ/2)
                            </>
                          }
                          resultContent={
                            <>
                              α cos(θ/2) - β sin(θ/2)
                              <br />α sin(θ/2) + β cos(θ/2)
                            </>
                          }
                          resultColor="#ff6b6b"
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "#ff6b6b",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>Ry =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid #ff6b6b",
                                borderTop: "2px solid #ff6b6b",
                                borderBottom: "2px solid #ff6b6b",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid #ff6b6b",
                                borderTop: "2px solid #ff6b6b",
                                borderBottom: "2px solid #ff6b6b",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "16px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              cos(θ/2) &nbsp; -sin(θ/2)
                              <br />
                              sin(θ/2) &nbsp; cos(θ/2)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rz Gate */}
                  <div
                    style={{
                      padding: "24px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: "2", minWidth: "200px" }}>
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            marginBottom: "8px",
                            fontSize: "18px",
                          }}
                        >
                          Rz(θ)
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-secondary)",
                            lineHeight: "1.6",
                          }}
                        >
                          Rotates the qubit by angle θ around the{" "}
                          <strong>Z-axis</strong>.
                        </p>
                        <MatrixMultiplication
                          equation="Rz(θ)(α|0⟩ + β|1⟩)"
                          matrixContent={
                            <>
                              e<sup>-iθ/2</sup> &nbsp; 0<br />0 &nbsp; e
                              <sup>iθ/2</sup>
                            </>
                          }
                          resultContent={
                            <>
                              α e<sup>-iθ/2</sup>
                              <br />β e<sup>iθ/2</sup>
                            </>
                          }
                          resultColor="#4CAF50"
                        />
                      </div>
                      <div
                        style={{
                          flex: "1",
                          minWidth: "150px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            color: "#4CAF50",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "12px" }}>Rz =</span>
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              padding: "0 12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderLeft: "2px solid #4CAF50",
                                borderTop: "2px solid #4CAF50",
                                borderBottom: "2px solid #4CAF50",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "8px",
                                borderRight: "2px solid #4CAF50",
                                borderTop: "2px solid #4CAF50",
                                borderBottom: "2px solid #4CAF50",
                              }}
                            ></div>
                            <div
                              style={{
                                fontSize: "16px",
                                lineHeight: "1.4",
                                textAlign: "center",
                              }}
                            >
                              e<sup>-iθ/2</sup> &nbsp; 0<br />0 &nbsp; e
                              <sup>iθ/2</sup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p
                  style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}
                >
                  These are essential for fine-tuning states in algorithms like
                  VQE (Variational Quantum Eigensolver).
                </p>
              </>
            ),
            practiceGoal: "Learn about continuous rotation gates.",
          },
          {
            id: 22,
            title: "2-Qubit Gates",
            description:
              "Operations that involve two qubits, like CNOT and SWAP.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    marginBottom: "24px",
                  }}
                >
                  <h3
                    style={{
                      color: "var(--accent-primary)",
                      marginBottom: "12px",
                    }}
                  >
                    The Tensor Product (⊗)
                  </h3>
                  <p style={{ marginBottom: "12px" }}>
                    Before we can operate on two qubits, we need to know how to
                    combine their states. In quantum computing, we combine
                    multiple qubits using the <strong>tensor product</strong>,
                    denoted by the ⊗ symbol.
                  </p>
                  <p style={{ marginBottom: "12px" }}>
                    If you have a qubit in state |0⟩ and another in state |1⟩,
                    their combined state is written as |0⟩ ⊗ |1⟩, or simply{" "}
                    <strong>|01⟩</strong>.
                  </p>
                  <p style={{ marginBottom: "12px" }}>
                    Mathematically, if a single qubit is a 2x1 column vector,
                    two qubits form a <strong>4x1</strong> column vector! The
                    four rows correspond to the probabilities of measuring |00⟩,
                    |01⟩, |10⟩, and |11⟩.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(0,0,0,0.2)",
                      padding: "12px",
                      borderRadius: "8px",
                      fontFamily: "monospace",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <div>|ψ⟩ =</div>
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        padding: "0 8px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "4px",
                          borderLeft: "1px solid var(--text-secondary)",
                          borderTop: "1px solid var(--text-secondary)",
                          borderBottom: "1px solid var(--text-secondary)",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: "4px",
                          borderRight: "1px solid var(--text-secondary)",
                          borderTop: "1px solid var(--text-secondary)",
                          borderBottom: "1px solid var(--text-secondary)",
                        }}
                      ></div>
                      α<sub>00</sub>
                      <br />α<sub>01</sub>
                      <br />α<sub>10</sub>
                      <br />α<sub>11</sub>
                    </div>
                  </div>
                  <p
                    style={{
                      marginTop: "12px",
                      fontSize: "0.9em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Because the state is a 4x1 vector, a gate that acts on two
                    qubits must be a <strong>4x4 matrix</strong>.
                  </p>
                </div>

                <p style={{ marginBottom: "16px" }}>
                  Two-qubit gates allow qubits to interact with each other. This
                  interaction is the basis of quantum computing power.
                </p>

                <h3
                  style={{
                    marginTop: "24px",
                    marginBottom: "12px",
                    color: "var(--text-primary)",
                  }}
                >
                  1. CNOT (Controlled-NOT) Gate
                </h3>
                <p style={{ marginBottom: "12px" }}>
                  The most famous 2-qubit gate. It has a <em>control</em> qubit
                  and a <em>target</em> qubit. If the control qubit is |1⟩, it
                  applies an X gate (NOT) to the target. If the control is |0⟩,
                  it does nothing.
                </p>
                <MatrixMultiplication
                  equation="CNOT|ψ⟩"
                  inputContent={
                    <>
                      α<br />β<br />γ<br />δ
                    </>
                  }
                  matrixContent={
                    <table
                      style={{ borderSpacing: "8px 4px", textAlign: "center" }}
                    >
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                  }
                  resultContent={
                    <>
                      α<br />β<br />δ<br />γ
                    </>
                  }
                  resultColor="#c084fc"
                />

                <h3
                  style={{
                    marginTop: "24px",
                    marginBottom: "12px",
                    color: "var(--text-primary)",
                  }}
                >
                  2. SWAP Gate
                </h3>
                <p style={{ marginBottom: "12px" }}>
                  The SWAP gate simply exchanges the states of two qubits. What
                  was in qubit 1 moves to qubit 2, and vice versa.
                </p>
                <MatrixMultiplication
                  equation="SWAP|ψ⟩"
                  inputContent={
                    <>
                      α<br />β<br />γ<br />δ
                    </>
                  }
                  matrixContent={
                    <table
                      style={{ borderSpacing: "8px 4px", textAlign: "center" }}
                    >
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  }
                  resultContent={
                    <>
                      α<br />γ<br />β<br />δ
                    </>
                  }
                  resultColor="#fbbf24"
                />

                <h3
                  style={{
                    marginTop: "24px",
                    marginBottom: "12px",
                    color: "var(--text-primary)",
                  }}
                >
                  3. CZ (Controlled-Z) Gate
                </h3>
                <p style={{ marginBottom: "12px" }}>
                  Applies a Z gate (phase flip) to the target qubit ONLY if the
                  control qubit is |1⟩. This is heavily used in creating graph
                  states and entanglement.
                </p>
                <MatrixMultiplication
                  equation="CZ|ψ⟩"
                  inputContent={
                    <>
                      α<br />β<br />γ<br />δ
                    </>
                  }
                  matrixContent={
                    <table
                      style={{ borderSpacing: "8px 4px", textAlign: "center" }}
                    >
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>-1</td>
                        </tr>
                      </tbody>
                    </table>
                  }
                  resultContent={
                    <>
                      α<br />β<br />γ<br />
                      -δ
                    </>
                  }
                  resultColor="#34d399"
                />
              </>
            ),
            practiceGoal:
              "Understand how qubits interact through controlled gates.",
          },
          {
            id: 23,
            title: "Entanglement",
            description: "Spooky action at a distance and Bell States.",
            difficulty: "Advanced",
            lessonContent: (
              <>
                <h3
                  style={{
                    color: "var(--accent-primary)",
                    marginBottom: "12px",
                  }}
                >
                  What is Entanglement?
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  Entanglement is a unique quantum phenomenon where the state of
                  two or more qubits becomes so perfectly correlated that they
                  cannot be described independently. Measuring one qubit
                  instantly determines the state of the other, no matter how far
                  apart they are in the universe! Einstein famously called this
                  "spooky action at a distance."
                </p>

                <h3
                  style={{
                    marginTop: "24px",
                    marginBottom: "12px",
                    color: "var(--text-primary)",
                  }}
                >
                  Creating a Bell State (Matrix Math)
                </h3>
                <p style={{ marginBottom: "12px" }}>
                  The most common entangled state is the{" "}
                  <strong>Bell State (Φ⁺)</strong>. We create it by starting
                  with two qubits in the |00⟩ state, applying a{" "}
                  <strong>Hadamard (H)</strong> gate to the first qubit, and
                  then a <strong>CNOT</strong> gate.
                </p>

                <div
                  style={{
                    padding: "16px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    marginBottom: "24px",
                  }}
                >
                  <h4
                    style={{
                      color: "var(--text-primary)",
                      marginBottom: "12px",
                    }}
                  >
                    Step 1: Hadamard on Qubit 1
                  </h4>
                  <p
                    style={{
                      marginBottom: "12px",
                      fontSize: "0.9em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Applying H to the first qubit changes the state from |00⟩ to
                    a superposition of |00⟩ and |10⟩.{" "}
                    <em>
                      (Note: We omit the normalization factor 1/√2 from the
                      matrices for visual simplicity)
                    </em>
                    .
                  </p>
                  <MatrixMultiplication
                    equation="(H ⊗ I)|00⟩"
                    inputContent={
                      <>
                        1<br />0<br />0<br />0
                      </>
                    }
                    matrixContent={
                      <table
                        style={{
                          borderSpacing: "8px 4px",
                          textAlign: "center",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>-1</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                            <td>-1</td>
                          </tr>
                        </tbody>
                      </table>
                    }
                    resultContent={
                      <>
                        1<br />0<br />1<br />0
                      </>
                    }
                    resultColor="#60a5fa"
                  />

                  <h4
                    style={{
                      marginTop: "24px",
                      color: "var(--text-primary)",
                      marginBottom: "12px",
                    }}
                  >
                    Step 2: CNOT on both
                  </h4>
                  <p
                    style={{
                      marginBottom: "12px",
                      fontSize: "0.9em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Now we apply the CNOT matrix to our new state vector. CNOT
                    flips the second qubit ONLY when the first qubit is 1.
                  </p>
                  <MatrixMultiplication
                    equation="CNOT|ψ⟩"
                    inputContent={
                      <>
                        1<br />0<br />1<br />0
                      </>
                    }
                    matrixContent={
                      <table
                        style={{
                          borderSpacing: "8px 4px",
                          textAlign: "center",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>1</td>
                          </tr>
                          <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                          </tr>
                        </tbody>
                      </table>
                    }
                    resultContent={
                      <>
                        1<br />0<br />0<br />1
                      </>
                    }
                    resultColor="#c084fc"
                  />
                  <p
                    style={{ marginTop: "16px", color: "var(--text-primary)" }}
                  >
                    <strong>Result:</strong> <code>1/√2 (|00⟩ + |11⟩)</code>.
                    The state |01⟩ and |10⟩ have 0 probability. The two qubits
                    are now perfectly entangled! If you measure Qubit 1 and get
                    '0', you know with 100% certainty that Qubit 2 is also '0'.
                  </p>
                </div>

                <h3
                  style={{
                    marginTop: "24px",
                    marginBottom: "12px",
                    color: "var(--text-primary)",
                  }}
                >
                  Why is it Useful?
                </h3>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                  }}
                >
                  <li style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "var(--text-primary)" }}>
                      Quantum Teleportation:
                    </strong>{" "}
                    Entanglement acts as the "wire" to instantly transfer
                    quantum information from one place to another.
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "var(--text-primary)" }}>
                      Quantum Cryptography (QKD):
                    </strong>{" "}
                    It allows for communication that is physically impossible to
                    intercept without alerting the sender and receiver.
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "var(--text-primary)" }}>
                      Superdense Coding:
                    </strong>{" "}
                    Allows you to send two classical bits of information (00,
                    01, 10, or 11) using only a single entangled qubit!
                  </li>
                </ul>
              </>
            ),
            practiceGoal: "Learn how to create an entangled pair of qubits.",
          },
          {
            id: 102,
            title: "Quantum Gates Quiz",
            description:
              "Test your mastery of single-qubit rotations, multi-qubit interactions, and entanglement!",
            difficulty: "Intermediate",
            isFinalTest: true,
            prerequisiteId: 9,
            pointsAward: 1,
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  Ready to test what you&apos;ve learned? Answer the questions
                  below to complete this module!
                </p>
              </>
            ),
            practiceGoal: "Pass the quiz!",
            quizzes: [
              {
                question: "What is the primary function of the Pauli-X gate?",
                options: [
                  "It flips the phase of the qubit.",
                  "It puts the qubit into a superposition.",
                  "It flips the computational basis states |0⟩ to |1⟩ and vice versa.",
                  "It exchanges the state of two qubits.",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "The Pauli-X gate acts as the quantum equivalent of the classical NOT gate, flipping |0⟩ to |1⟩ and |1⟩ to |0⟩.",
              },
              {
                question:
                  "Which gate rotates the state by 180 degrees (π radians) around the Z-axis?",
                options: [
                  "Hadamard Gate",
                  "Pauli-Z Gate",
                  "Pauli-Y Gate",
                  "S Gate",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "The Pauli-Z gate applies a 180-degree rotation around the Z-axis, effectively flipping the phase of the |1⟩ state.",
              },
              {
                question:
                  "What is the matrix representation of the Pauli-Y gate?",
                options: [
                  "[[0, 1], [1, 0]]",
                  "[[1, 0], [0, 1]]",
                  "[[0, -i], [i, 0]]",
                  "[[1, 0], [0, -1]]",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "The Pauli-Y gate matrix contains imaginary numbers: [[0, -i], [i, 0]].",
              },
              {
                question:
                  "Which gate is most commonly used to put a qubit initialized in |0⟩ into an equal superposition?",
                options: [
                  "Pauli-X Gate",
                  "Hadamard (H) Gate",
                  "CNOT Gate",
                  "T Gate",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "The Hadamard gate creates an equal superposition, transforming |0⟩ into 1/√2(|0⟩ + |1⟩).",
              },
              {
                question:
                  "When combining two qubits using the tensor product, what is the size of the resulting column vector?",
                options: ["2x1", "4x1", "4x4", "8x1"],
                correctAnswerIndex: 1,
                explanation:
                  "A single qubit is a 2x1 vector. The tensor product of two 2x1 vectors results in a 4x1 vector.",
              },
              {
                question:
                  "In a CNOT gate, what happens to the target qubit if the control qubit is in the |0⟩ state?",
                options: [
                  "It flips from |0⟩ to |1⟩.",
                  "It is put into superposition.",
                  "Nothing happens; it remains unchanged.",
                  "It becomes entangled.",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "The CNOT gate only applies the NOT operation to the target if the control qubit is strictly in the |1⟩ state.",
              },
              {
                question: "What does the SWAP gate do?",
                options: [
                  "It swaps the phase of a single qubit.",
                  "It exchanges the quantum states of two qubits.",
                  "It swaps the control and target roles of a CNOT gate.",
                  "It swaps a qubit with a classical bit.",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "The SWAP gate literally exchanges the states of two qubits. What was in qubit 1 moves to qubit 2, and vice versa.",
              },
              {
                question: 'What is "Entanglement"?',
                options: [
                  "When a qubit is in multiple states at once.",
                  "A phenomenon where two or more qubits become perfectly correlated.",
                  "The process of measuring a qubit.",
                  "When a quantum gate fails to execute properly.",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Entanglement is when qubits become so correlated that measuring one instantly determines the state of the other.",
              },
              {
                question:
                  "Applying the S gate (Phase gate) twice in a row is equivalent to applying which gate once?",
                options: ["Pauli-X", "Pauli-Y", "Pauli-Z", "Hadamard"],
                correctAnswerIndex: 2,
                explanation:
                  "The S gate is a 90-degree (π/2) rotation around Z. Two S gates equal 180 degrees, which is exactly what the Pauli-Z gate does.",
              },
              {
                question:
                  "The T gate rotates the quantum state around the Z-axis by what specific angle?",
                options: [
                  "180 degrees (π)",
                  "90 degrees (π/2)",
                  "45 degrees (π/4)",
                  "360 degrees (2π)",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "The T gate is sometimes called the π/4 gate because it applies a 45-degree phase rotation.",
              },
              {
                question:
                  "Which sequence of two gates is standard for creating a Bell State (entanglement) from the |00⟩ state?",
                options: [
                  "X gate then Y gate",
                  "Hadamard gate on Q1, then CNOT(control=Q1, target=Q2)",
                  "CNOT on both, then Hadamard on Q2",
                  "Z gate then S gate",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Applying H to the first qubit creates superposition, and the subsequent CNOT spreads that superposition to create entanglement.",
              },
              {
                question: "What is the function of the Identity (I) gate?",
                options: [
                  "It destroys the qubit.",
                  "It resets the qubit to |0⟩.",
                  "It leaves the qubit state completely unchanged.",
                  "It measures the qubit.",
                ],
                correctAnswerIndex: 2,
                explanation:
                  "The Identity matrix has 1s on the diagonal and 0s elsewhere. Multiplying any state by it returns the exact same state.",
              },
              {
                question:
                  'If you have a perfectly entangled Bell state (Φ⁺) and you measure the first qubit as a "1", what will you measure the second qubit as?',
                options: [
                  "0 (with 100% certainty)",
                  "1 (with 100% certainty)",
                  "It is a 50/50 chance",
                  "It depends on the phase",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "The Φ⁺ Bell state is 1/√2(|00⟩ + |11⟩). If the first qubit collapses to 1, the entire system collapses to |11⟩.",
              },
              {
                question:
                  "Which gate would you use if you want to rotate a qubit around the X-axis by an arbitrary custom angle (θ)?",
                options: ["Pauli-X", "Rx", "Ry", "Rz"],
                correctAnswerIndex: 1,
                explanation:
                  "The Rx(θ) gate allows you to define a specific, continuous angle of rotation around the X-axis.",
              },
              {
                question:
                  "In the context of entanglement usefulness, how many classical bits of information can be transmitted using a single entangled qubit in Superdense Coding?",
                options: ["1 bit", "2 bits", "3 bits", "4 bits"],
                correctAnswerIndex: 1,
                explanation:
                  "Superdense coding uses entanglement as a resource to pack 2 classical bits (00, 01, 10, or 11) into a single transmitted qubit.",
              },
            ],
          },
        ],
      },

      {
        id: 101,

        title: "Quantum Circuits",
        description:
          "Learn how quantum gates are combined into circuits to perform quantum computations.",
        difficulty: "Intermediate",
        lessonContent: (
          <>
            <p
              style={{
                marginBottom: "16px",
                fontSize: "18px",
                color: "var(--text-secondary)",
              }}
            >
              Welcome to <strong>Quantum Circuits</strong>! Now that you
              understand individual quantum gates, let's see how they are wired
              together to build powerful computations.
            </p>
            <h3
              style={{
                fontSize: "20px",
                color: "var(--text-primary)",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              What's Inside This Module
            </h3>
            <ul
              style={{
                paddingLeft: "20px",
                marginBottom: "32px",
                color: "var(--text-secondary)",
              }}
            >
              <li style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--accent-primary)" }}>
                  Representation:
                </strong>{" "}
                How quantum circuits are drawn and read — wires, gates, and
                measurement symbols.
              </li>
            </ul>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "24px",
                borderRadius: "12px",
                borderLeft: "4px solid var(--accent-primary)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                A circuit is a sequence of gates
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                }}
              >
                Just like classical logic circuits combine AND, OR, NOT gates to
                compute boolean functions, quantum circuits combine quantum
                gates (H, X, CNOT, …) to transform qubit states and ultimately
                produce a measurement outcome.
              </p>
            </div>
          </>
        ),
        practiceGoal:
          "Review the module overview and explore the Representation subtopic.",
        subModules: [
          {
            id: 103,
            title: "Representation",
            description:
              "Understand how quantum circuits are visually represented using wires, gates, and measurement symbols.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  A <strong>quantum circuit</strong> is a model for quantum
                  computation. It describes a sequence of quantum operations
                  (gates) applied to a set of qubits, read from{" "}
                  <em>left to right</em> — just like reading a book.
                </p>

                {/* ── Core Elements ── */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  Core Elements of a Quantum Circuit
                </h3>

                {/* Visual: Wire, Gate, Measure */}
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    margin: "24px 0",
                  }}
                >
                  {/* Wire */}
                  <div
                    style={{
                      flex: "1",
                      minWidth: "160px",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50px",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "2px",
                          background: "var(--accent-primary)",
                          boxShadow: "0 0 6px var(--accent-primary)",
                        }}
                      />
                    </div>
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                        fontSize: "15px",
                      }}
                    >
                      Wire (Qubit Line)
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Each horizontal line represents one qubit. Time flows left
                      → right.
                    </p>
                  </div>

                  {/* Gate Box */}
                  <div
                    style={{
                      flex: "1",
                      minWidth: "160px",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50px",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          border: "2px solid var(--accent-primary)",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "var(--accent-primary)",
                          boxShadow: "0 0 10px var(--accent-primary)",
                        }}
                      >
                        H
                      </div>
                    </div>
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                        fontSize: "15px",
                      }}
                    >
                      Gate (Operation)
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      A labeled box on a wire applies that gate to the qubit at
                      that point in time.
                    </p>
                  </div>

                  {/* Measurement */}
                  <div
                    style={{
                      flex: "1",
                      minWidth: "160px",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50px",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          border: "2px solid #d29922",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          color: "#d29922",
                          boxShadow: "0 0 10px #d29922",
                        }}
                      >
                        ⊙
                      </div>
                    </div>
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                        fontSize: "15px",
                      }}
                    >
                      Measurement (⊙)
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      A meter symbol collapses the qubit to a classical bit (0
                      or 1). Results go to a double wire.
                    </p>
                  </div>
                </div>

                {/* ── Full Circuit Example ── */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "36px",
                    marginBottom: "16px",
                  }}
                >
                  Example: Bell State Circuit
                </h3>
                <p style={{ marginBottom: "16px" }}>
                  The simplest and most famous quantum circuit creates a{" "}
                  <strong>Bell State</strong> — a maximally entangled pair of
                  qubits. It uses just two gates: a{" "}
                  <strong>Hadamard (H)</strong> on qubit 1, followed by a{" "}
                  <strong>CNOT</strong> with qubit 1 as control and qubit 2 as
                  target.
                </p>

                <div className="my-6">
                  <div style={{ pointerEvents: "auto", opacity: 1, minHeight: "400px" }}>
                    <VisualPlayground
                      
                      inlineMode={true}
                      initialNumQubits={2}
                      initialGates={[
                        ["H", "CX|1", "M", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                        ["", "CX|0", "M", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
                      ]}
                    />
                  </div>
                </div>

                {/* ── Key Symbols ── */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "36px",
                    marginBottom: "16px",
                  }}
                >
                  Quick Reference: Common Circuit Symbols
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Symbol
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Meaning
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "───",
                          "Wire / qubit line",
                          "Time flows left to right",
                        ],
                        ["[H]", "Hadamard gate", "Creates superposition"],
                        ["[X]", "Pauli-X (NOT) gate", "Flips |0⟩ ↔ |1⟩"],
                        [
                          "●",
                          "CNOT control",
                          "Applies flip only when this qubit = |1⟩",
                        ],
                        ["⊕", "CNOT target", "Gets flipped by the control"],
                        [
                          "[M]",
                          "Measurement gate",
                          "Collapses qubit → classical 0 or 1",
                        ],
                        [
                          "═══",
                          "Classical wire",
                          "Carries classical bits after measurement",
                        ],
                      ].map(([sym, meaning, note], i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            background:
                              i % 2 === 0
                                ? "rgba(255,255,255,0.02)"
                                : "transparent",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              color: "var(--accent-primary)",
                              fontFamily: "monospace",
                              fontWeight: "bold",
                            }}
                          >
                            {sym}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              color: "var(--text-primary)",
                            }}
                          >
                            {meaning}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ),
            practiceGoal:
              "Read the Bell State circuit diagram above and match each symbol to its meaning in the quick-reference table.",
          },

          /* ═══════════════════════════════════════════════════
             SUBTOPIC: ENTANGLEMENT CIRCUIT
          ═══════════════════════════════════════════════════ */
          {
            id: 104,
            title: "Entanglement Circuit",
            description:
              "Build and analyze the Bell State circuit that creates a maximally entangled pair of qubits.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  <strong>Entanglement</strong> is the quantum phenomenon where
                  two qubits become so correlated that measuring one{" "}
                  <em>instantly</em> determines the state of the other — no
                  matter how far apart they are. The simplest way to create
                  entanglement is the <strong>Bell State circuit</strong>.
                </p>

                {/* ── Bell State Circuit ── */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "28px",
                    marginBottom: "16px",
                  }}
                >
                  Bell State Circuit
                </h3>
                <div className="my-6">
                  <div style={{ pointerEvents: "auto", opacity: 1, minHeight: "400px" }}>
                    <VisualPlayground
                      inlineMode={true}
                      initialNumQubits={2}
                      initialGates={[
                        ["H", "CX|1", "M", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                        ["", "CX|0", "M", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
                      ]}
                    />
                  </div>
                </div>
                

                {/* ── Step by Step ── */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  Step-by-Step State Analysis
                </h3>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                  }}
                >
                  We track the 2-qubit state <strong>|q₀ q₁⟩</strong> (where q₀
                  is the bottom qubit and q₁ is the top qubit) at each timestep
                  T.
                </p>
                {[
                  {
                    t: "T=0",
                    label: "Initial State",
                    color: "var(--text-secondary)",
                    state: "|q₀q₁⟩ = |00⟩",
                    desc: "Both qubits start in the ground state |0⟩. The combined 2-qubit state is |00⟩.",
                  },
                  {
                    t: "T=1",
                    label: "After H on q₀",
                    color: "var(--accent-primary)",
                    state: "1/√2 (|00⟩ + |10⟩)",
                    desc: "The Hadamard gate puts q₀ into an equal superposition: |0⟩ → 1/√2(|0⟩+|1⟩). q₁ remains |0⟩, so the combined state becomes 1/√2(|00⟩+|10⟩).",
                  },
                  {
                    t: "T=2",
                    label: "After CNOT (ctrl=q₀, tgt=q₁)",
                    color: "#2e7d32",
                    state: "|Φ⁺⟩ = 1/√2 (|00⟩ + |11⟩)",
                    desc: "CNOT flips q₁ whenever q₀=|1⟩. The |10⟩ term becomes |11⟩. The result is the Φ⁺ Bell state — the two qubits are now maximally entangled and cannot be described independently.",
                  },
                  {
                    t: "T=3",
                    label: "Measurement",
                    color: "#b28215",
                    state: "|00⟩ or |11⟩ (50% each)",
                    desc: "Measuring either qubit instantly determines the state of the other. If q₀ yields 0, q₁ is immediately known to be 0. If q₀ yields 1, q₁ is immediately known to be 1. They always agree, no matter how far apart. This is the essence of entanglement.",
                  },
                ].map(({ t, label, color, state, desc }) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                      padding: "16px",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "10px",
                      border: `1px solid rgba(255,255,255,0.08)`,
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        flexShrink: 0,
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          background: color,
                          color: "#000",
                          borderRadius: "4px",
                          padding: "4px 6px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          fontFamily: "monospace",
                        }}
                      >
                        {t}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: "bold",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: "monospace",
                          color: "var(--accent-primary)",
                          fontSize: "14px",
                          marginBottom: "6px",
                          background: "rgba(0,0,0,0.2)",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          display: "inline-block",
                        }}
                      >
                        {state}
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "13px",
                          margin: "6px 0 0 0",
                          lineHeight: "1.6",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ),
            practiceGoal:
              "Trace through the Bell State circuit and write out the state at each timestep.",
          },

          /* ═══════════════════════════════════════════════════
             SUBTOPIC: QUANTUM TELEPORTATION PROTOCOL
          ═══════════════════════════════════════════════════ */
          {
            id: 105,
            title: "Teleportation Protocol",
            description:
              "Transfer a qubit state from Alice to Bob using entanglement and classical communication — no physical qubit moves!",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  <strong>Quantum Teleportation</strong> is a protocol that
                  transfers an unknown qubit state from Alice to Bob using:
                </p>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "20px",
                    color: "var(--text-secondary)",
                    lineHeight: "2",
                  }}
                >
                  <li>
                    A pre-shared <strong>entangled Bell pair |Φ⁺⟩</strong>{" "}
                    between Alice and Bob
                  </li>
                  <li>
                    Two <strong>classical bits</strong> of measurement results
                    sent from Alice to Bob
                  </li>
                </ul>
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "14px 18px",
                    marginBottom: "24px",
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>
                    Key insight:
                  </strong>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      marginLeft: "8px",
                    }}
                  >
                    No physical qubit travels from Alice to Bob. Only 2
                    classical bits are sent. The quantum state |ψ⟩ is{" "}
                    <em>reconstructed</em> at Bob's side. Alice's original qubit
                    is destroyed — the no-cloning theorem is preserved.
                  </span>
                </div>

                {/* ── The Teleportation Myth ── */}
                <div
                  style={{
                    background: "rgba(255, 71, 87, 0.05)",
                    border: "1px solid rgba(255, 71, 87, 0.15)",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    marginBottom: "24px",
                  }}
                >
                  <h4
                    style={{
                      color: "#ff4757",
                      margin: "0 0 8px 0",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    ⚛ The Teleportation Myth
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    <strong>Myth:</strong> Quantum teleportation allows
                    instantaneous (faster-than-light) communication or physical
                    transportation of objects, similar to science fiction.{" "}
                    <br />
                    <strong>Reality:</strong> <br />
                    1. <strong>No matter is moved:</strong> Only the{" "}
                    <em>quantum state</em> (information) is transferred. The
                    original qubit's state is destroyed in the process
                    (preserving the No-Cloning Theorem). <br />
                    2. <strong>No FTL communication:</strong> Bob cannot read
                    the teleported state until he receives Alice's classical
                    measurement results. Because these 2 bits must travel over a
                    classical channel (limited by the speed of light), the
                    protocol is strictly bounded by the speed of light.
                  </p>
                </div>

                {/* ── Roles ── */}
                <h3
                  style={{
                    fontSize: "18px",
                    color: "var(--text-primary)",
                    marginTop: "8px",
                    marginBottom: "12px",
                  }}
                >
                  The Three Qubits
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                  }}
                >
                  {[
                    {
                      label: "Q  (|ψ⟩)",
                      role: "Alice's qubit — the unknown state to teleport",
                      color: "var(--accent-primary)",
                    },
                    {
                      label: "A  (Alice)",
                      role: "Alice's half of the Bell pair",
                      color: "var(--text-primary)",
                    },
                    {
                      label: "B  (Bob)",
                      role: "Bob's half of the Bell pair — receives |ψ⟩",
                      color: "var(--text-secondary)",
                    },
                  ].map(({ label, role, color }) => (
                    <div
                      key={label}
                      style={{
                        flex: "1",
                        minWidth: "150px",
                        padding: "12px",
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          color,
                          marginBottom: "4px",
                          fontSize: "14px",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "12px",
                        }}
                      >
                        {role}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Circuit matching image style ── */}
                <h3
                  style={{
                    fontSize: "18px",
                    color: "var(--text-primary)",
                    marginTop: "8px",
                    marginBottom: "12px",
                  }}
                >
                  Teleportation Circuit
                </h3>
                <div className="my-6">
                  <div style={{ pointerEvents: "auto", opacity: 1, minHeight: "400px" }}>
                    <VisualPlayground
                      
                      inlineMode={true}
                      initialNumQubits={3}
                      initialGates={[
                        ['', '', 'CX|1', 'H', 'M', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                        ['H', 'CX|2', '', '', 'M', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', 'X', 'Z', '', '', '', '', '', '', '', '', '', '', '', '', '']
                      ]}
                    />
                  </div>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '16px' }}>
  Dashed lines = classical bits sent from Alice. X applied if m_A=1. Z applied if m_Q=1.
</div>

                {/* ── Step by Step ── */}
                <h3
                  style={{
                    fontSize: "18px",
                    color: "var(--text-primary)",
                    marginTop: "28px",
                    marginBottom: "16px",
                  }}
                >
                  Step-by-Step Protocol Analysis
                </h3>
                {[
                  {
                    t: "T=0",
                    label: "Initial State",
                    color: "var(--text-secondary)",
                    state: "|ψ⟩_Q ⊗ |Φ⁺⟩_AB = 1/√2 (α|0⟩+β|1⟩)(|00⟩+|11⟩)",
                    desc: "Q holds |ψ⟩=α|0⟩+β|1⟩. A and B already share the Bell pair |Φ⁺⟩=1/√2(|00⟩+|11⟩). The full 3-qubit state is their tensor product.",
                  },
                  {
                    t: "T=1",
                    label: "CNOT: Q (control) → A (target)",
                    color: "var(--accent-primary)",
                    state: "1/√2 [α|000⟩ + α|011⟩ + β|110⟩ + β|101⟩]",
                    desc: "CNOT with Q as control and A as target. When Q=|1⟩, A is flipped. This entangles Q with the A-B Bell pair.",
                  },
                  {
                    t: "T=2",
                    label: "H on Q",
                    color: "var(--accent-primary)",
                    state:
                      "1/2 [|00⟩(α|0⟩+β|1⟩) + |01⟩(α|1⟩+β|0⟩) + |10⟩(α|0⟩−β|1⟩) + |11⟩(α|1⟩−β|0⟩)]",
                    desc: "H on Q rotates it into the measurement basis. Now the full state can be written grouped by Alice's qubits (Q,A). Bob's qubit B is in a different state for each of the 4 QA outcomes.",
                  },
                  {
                    t: "T=3",
                    label:
                      "Alice measures Q and A → sends 2 classical bits (m_Q, m_A)",
                    color: "var(--accent-primary)",
                    state:
                      "Result (m_Q, m_A) ∈ {00, 01, 10, 11} — each with probability 1/4",
                    desc: "Alice measures both Q and A. The measurement collapses Bob's qubit B into one of four possible states. Alice sends the 2-bit result to Bob over a classical channel (phone, internet, etc.)",
                  },
                  {
                    t: "T=4",
                    label:
                      "Bob's Correction: apply X if m_A=1, then Z if m_Q=1",
                    color: "var(--text-secondary)",
                    state: "After correction: B = α|0⟩ + β|1⟩ = |ψ⟩ ✓",
                    desc: "Bob applies X if Alice measured m_A=1, and Z if m_Q=1. This corrects Bob's qubit to exactly |ψ⟩. The state is teleported — Alice's Q qubit is destroyed, and Bob's B qubit is now |ψ⟩.",
                  },
                ].map(({ t, label, color, state, desc }) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                      padding: "16px",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        flexShrink: 0,
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          background: color,
                          color: "#000",
                          borderRadius: "4px",
                          padding: "4px 6px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          fontFamily: "monospace",
                        }}
                      >
                        {t}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: "bold",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: "monospace",
                          color: "var(--accent-primary)",
                          fontSize: "13px",
                          marginBottom: "6px",
                          background: "rgba(0,0,0,0.2)",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          display: "inline-block",
                          maxWidth: "100%",
                          wordBreak: "break-word",
                        }}
                      >
                        {state}
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "13px",
                          margin: "6px 0 0 0",
                          lineHeight: "1.6",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Correction table */}
                <h3
                  style={{
                    fontSize: "18px",
                    color: "var(--text-primary)",
                    marginTop: "28px",
                    marginBottom: "12px",
                  }}
                >
                  Bob's Correction Table
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          m_Q (Q result)
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          m_A (A result)
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Bob applies
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Bob's qubit B before correction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["0", "0", "I (nothing)", "α|0⟩ + β|1⟩  =  |ψ⟩"],
                        ["0", "1", "X", "α|1⟩ + β|0⟩"],
                        ["1", "0", "Z", "α|0⟩ − β|1⟩"],
                        ["1", "1", "X then Z", "α|1⟩ − β|0⟩"],
                      ].map(([mq, ma, gate, bstate], i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            background:
                              i % 2 === 0
                                ? "rgba(255,255,255,0.02)"
                                : "transparent",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              fontFamily: "monospace",
                              color: "var(--accent-primary)",
                            }}
                          >
                            {mq}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              fontFamily: "monospace",
                              color: "var(--text-primary)",
                            }}
                          >
                            {ma}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              fontFamily: "monospace",
                              color: "#4a9eff",
                              fontWeight: "bold",
                            }}
                          >
                            {gate}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              fontFamily: "monospace",
                              color: "var(--text-secondary)",
                              fontSize: "13px",
                            }}
                          >
                            {bstate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.7",
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>
                    Rule:
                  </strong>{" "}
                  Apply <code>X</code> if m_A = 1, then apply <code>Z</code> if
                  m_Q = 1. The order matters. In all four cases, after
                  correction Bob's qubit becomes exactly |ψ⟩ = α|0⟩ + β|1⟩.
                </p>
              </>
            ),
            practiceGoal:
              "Trace the teleportation protocol and fill in the correction table from memory.",
          },

          /* ═══════════════════════════════════════════════════
             SUBTOPIC: SUPERDENSE CODING
          ═══════════════════════════════════════════════════ */
          {
            id: 106,
            title: "Superdense Coding",
            description:
              "Send 2 classical bits of information by transmitting just 1 qubit, using a shared Bell pair.",
            difficulty: "Intermediate",
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  <strong>Superdense Coding</strong> is the <em>dual</em> of
                  Quantum Teleportation. Instead of sending quantum states using
                  classical bits, here Alice sends{" "}
                  <strong>2 classical bits</strong> to Bob by transmitting just{" "}
                  <strong>1 qubit</strong> — thanks to a pre-shared Bell pair.
                </p>
                <div
                  style={{
                    background: "rgba(63,185,80,0.03)",
                    border: "1px solid rgba(63,185,80,0.2)",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    marginBottom: "24px",
                  }}
                >
                  <strong style={{ color: "#3fb950" }}>Core idea:</strong>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      marginLeft: "8px",
                    }}
                  >
                    Alice and Bob share a Bell pair. Alice encodes 2 bits into
                    her qubit using one of four gates (I, X, Z, or XZ). She
                    sends her qubit to Bob. Bob decodes both bits by measuring
                    after applying CNOT + H.
                  </span>
                </div>

                {/* Qiskit note */}
                <div
                  style={{
                    background: "rgba(210,153,34,0.03)",
                    border: "1px solid rgba(210,153,34,0.2)",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    marginBottom: "24px",
                  }}
                >
                  <h4
                    style={{
                      color: "#d29922",
                      margin: "0 0 8px 0",
                      fontSize: "15px",
                    }}
                  >
                    ⚠ Convention Note
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    We represent Alice's qubit as <code>q_A</code> (top line)
                    and Bob's qubit as <code>q_B</code> (bottom line). <br />
                    The combined state is written as <code>|q_A q_B⟩</code> read
                    from left to right.
                  </p>
                </div>

                {/* Encoding table */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "8px",
                    marginBottom: "12px",
                  }}
                >
                  Alice's Encoding (4 possible messages)
                </h3>
                <div style={{ overflowX: "auto", marginBottom: "28px" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Message (bits)
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Gate Alice applies
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Resulting Bell State
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          State formula
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "00",
                          "I (identity)",
                          "|Φ⁺⟩",
                          "1/\u221a2(|00⟩ + |11⟩)",
                        ],
                        [
                          "01",
                          "X (bit flip)",
                          "|Ψ⁺⟩",
                          "1/\u221a2(|10⟩ + |01⟩)",
                        ],
                        [
                          "10",
                          "Z (phase flip)",
                          "|Φ⁻⟩",
                          "1/\u221a2(|00⟩ − |11⟩)",
                        ],
                        ["11", "XZ (both)", "|Ψ⁻⟩", "1/\u221a2(|10⟩ − |01⟩)"],
                      ].map(([msg, gate, bell, state], i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            background:
                              i % 2 === 0
                                ? "rgba(255,255,255,0.02)"
                                : "transparent",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              fontFamily: "monospace",
                              fontWeight: "bold",
                              color: "var(--accent-primary)",
                              fontSize: "16px",
                            }}
                          >
                            {msg}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              fontFamily: "monospace",
                              color: "#3fb950",
                              fontWeight: "bold",
                            }}
                          >
                            {gate}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              color: "#d29922",
                              fontWeight: "bold",
                            }}
                          >
                            {bell}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              fontFamily: "monospace",
                              color: "var(--text-secondary)",
                              fontSize: "13px",
                            }}
                          >
                            {state}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Superdense Coding Circuit ── */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                >
                  Superdense Coding Circuit
                </h3>
                <p
                  style={{
                    marginBottom: "16px",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Alice encodes the classical bits <strong>a</strong> and{" "}
                  <strong>b</strong> by applying gates, then transmits her qubit
                  to Bob. Bob decodes the state using a CNOT and a Hadamard
                  gate.
                </p>
                <div className="my-6">
                  <div style={{ pointerEvents: "auto", opacity: 1, minHeight: "400px" }}>
                    <VisualPlayground
                      inlineMode={true}
                      initialNumQubits={2}
                      initialGates={[
                        ['H', 'CX|1', 'X', 'Z', 'CX|1', 'H', 'M', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', 'M', '', '', '', '', '', '', '', '', '', '', '', '', '']
                      ]}
                    />
                  </div>
                </div>

                {/* ── Step by Step ── */}
                <h3
                  style={{
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginTop: "32px",
                    marginBottom: "16px",
                  }}
                >
                  Step-by-Step State Analysis (sending "11")
                </h3>
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                  }}
                >
                  We track the 2-qubit state <strong>|q_A q_B⟩</strong> (where
                  q_A is Alice's top qubit and q_B is Bob's bottom qubit) at
                  each timestep T.
                </p>
                {[
                  {
                    t: "T=0",
                    label: "Initial State",
                    color: "var(--text-secondary)",
                    state: "|q_A q_B⟩ = |00⟩",
                    desc: "Alice (q_A) and Bob (q_B) both start in the ground state |0⟩.",
                  },
                  {
                    t: "T=1",
                    label: "H on q_A",
                    color: "#2e7d32",
                    state: "1/\u221a2 (|00⟩ + |10⟩)",
                    desc: "Hadamard gate on q_A puts it into superposition: |0⟩ → 1/\u221a2(|0⟩+|1⟩). q_B remains |0⟩, giving the combined state 1/\u221a2(|00⟩+|10⟩).",
                  },
                  {
                    t: "T=2",
                    label: "CNOT (ctrl=q_A, tgt=q_B) → Bell State",
                    color: "#2e7d32",
                    state: "|\u03b2₀₀⟩ = 1/\u221a2 (|00⟩ + |11⟩)",
                    desc: "CNOT flips q_B whenever q_A=|1⟩. The |10⟩ term becomes |11⟩. They now share the maximally entangled state |\u03b2₀₀⟩.",
                  },
                  {
                    t: "T=3",
                    label: 'Alice encodes "11" → applies Z then X to q_A',
                    color: "var(--accent-primary)",
                    state: "1/\u221a2 (|10⟩ − |01⟩)",
                    desc: "Alice applies Z (phase flip on 1): 1/\u221a2(|00⟩ − |11⟩). Then she applies X (flips q_A): 1/\u221a2(|10⟩ − |01⟩). Alice then sends q_A to Bob.",
                  },
                  {
                    t: "T=4",
                    label: "Bob applies CNOT (ctrl=q_A, tgt=q_B)",
                    color: "#b28215",
                    state:
                      "1/\u221a2 (|11⟩ − |01⟩) = 1/\u221a2 (|1⟩ − |0⟩)_A ⊗ |1⟩_B",
                    desc: "Bob applies CNOT to Alice's qubit q_A and Bob's qubit q_B. The state is factored into Bob's qubit in state |1⟩ and Alice's qubit in superposition.",
                  },
                  {
                    t: "T=5",
                    label: "Bob applies H on q_A",
                    color: "#b28215",
                    state: "-|11⟩  (measures as 1, 1)",
                    desc: "Bob applies H to q_A, transforming 1/\u221a2(|1⟩ − |0⟩) back to -|1⟩. When Bob measures both qubits, he gets 1 and 1, exactly recovering the bits a and b!",
                  },
                ].map(({ t, label, color, state, desc }) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                      padding: "16px",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "10px",
                      border: `1px solid rgba(255,255,255,0.05)`,
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        flexShrink: 0,
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          background: color,
                          color: "#000",
                          borderRadius: "4px",
                          padding: "4px 6px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          fontFamily: "monospace",
                        }}
                      >
                        {t}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: "bold",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: "monospace",
                          color: "var(--accent-primary)",
                          fontSize: "13px",
                          marginBottom: "6px",
                          background: "rgba(0,0,0,0.2)",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          display: "inline-block",
                          maxWidth: "100%",
                          wordBreak: "break-word",
                        }}
                      >
                        {state}
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "13px",
                          margin: "6px 0 0 0",
                          lineHeight: "1.6",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Comparison table */}
                <h3
                  style={{
                    fontSize: "18px",
                    color: "var(--text-primary)",
                    marginTop: "28px",
                    marginBottom: "12px",
                  }}
                >
                  Teleportation vs Superdense Coding
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 14px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Property
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "var(--accent-primary)",
                          }}
                        >
                          Teleportation
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: "10px 14px",
                            color: "#3fb950",
                          }}
                        >
                          Superdense Coding
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "What is sent?",
                          "1 qubit (state)",
                          "1 qubit (physical)",
                        ],
                        [
                          "What is received?",
                          "1 qubit state |ψ⟩",
                          "2 classical bits",
                        ],
                        [
                          "Classical bits used",
                          "2 bits (corrections)",
                          "0 bits over quantum channel",
                        ],
                        ["Pre-shared resource", "Bell pair", "Bell pair"],
                        [
                          "Direction of info flow",
                          "Quantum → Classical",
                          "Classical → Quantum channel",
                        ],
                        [
                          "Alice's qubit destroyed?",
                          "Yes (no cloning)",
                          "Yes (sent to Bob)",
                        ],
                      ].map(([prop, tel, sdc], i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            background:
                              i % 2 === 0
                                ? "rgba(255,255,255,0.02)"
                                : "transparent",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {prop}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              color: "var(--accent-primary)",
                              fontFamily: "monospace",
                              fontSize: "13px",
                            }}
                          >
                            {tel}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              color: "#3fb950",
                              fontFamily: "monospace",
                              fontSize: "13px",
                            }}
                          >
                            {sdc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ),
            practiceGoal:
              'Use the encoding table to determine which gate Alice would apply for each message (00, 01, 10, 11), and trace the state for "01".',
          },
          {
            id: 107,
            title: "Quantum Circuits Quiz",
            description:
              "Test your mastery of circuit representation, entanglement generation, teleportation mechanics, and superdense coding!",
            difficulty: "Hard",
            isFinalTest: true,
            prerequisiteId: 102,
            pointsAward: 2,
            lessonContent: (
              <>
                <p style={{ marginBottom: "16px" }}>
                  Ready to test your understanding of quantum circuits? This
                  quiz features{" "}
                  <strong>15 challenging circuit questions</strong> where you
                  are given a circuit and must calculate the measurement
                  probabilities of the outcomes. Pass this quiz to complete the
                  Quantum Circuits module!
                </p>
              </>
            ),
            practiceGoal: "Pass the hard quiz!",
            quizzes: [
              {
                type: "mcq",
                question:
                  "Which of the following is a common myth about quantum teleportation?",
                options: [
                  "It teleports matter instantly faster than light.",
                  "It transmits quantum states without moving the physical particle.",
                  "It requires classical communication to complete.",
                  "It destroys the original state being teleported.",
                ],
                correctAnswerIndex: 0,
                explanation:
                  "A common myth is that quantum teleportation moves physical matter faster than light. In reality, it only transmits quantum information (the state) and requires classical communication, which is limited by the speed of light.",
              },
              {
                type: "mcq",
                question:
                  "How many classical bits can be transmitted using one qubit and one entangled pair in superdense coding?",
                options: ["1", "2", "3", "4"],
                correctAnswerIndex: 1,
                explanation:
                  "Superdense coding allows the transmission of 2 classical bits of information by sending just 1 quantum bit, provided the sender and receiver share an entangled pair.",
              },
              {
                type: "mcq",
                question:
                  "What happens when you measure one qubit of a Bell state |Φ+⟩ = 1/√2(|00⟩ + |11⟩)?",
                options: [
                  "The other qubit remains in superposition.",
                  "The other qubit's state is instantly determined to match.",
                  "Both qubits are destroyed.",
                  "Nothing happens to the other qubit.",
                ],
                correctAnswerIndex: 1,
                explanation:
                  "Due to entanglement, measuring one qubit instantly determines the state of the other qubit, regardless of the distance between them.",
              },
              {
                type: "mcq",
                question:
                  "Which gates are used to create the standard Bell state |Φ+⟩ = 1/√2(|00⟩ + |11⟩) from |00⟩?",
                options: [
                  "H on q0, then CNOT(control=q0, target=q1)",
                  "X on q0, then CNOT(control=q0, target=q1)",
                  "H on both q0 and q1",
                  "CNOT(control=q0, target=q1) only",
                ],
                correctAnswerIndex: 0,
                explanation:
                  "An H gate on q0 creates a superposition 1/√2(|0⟩+|1⟩). The CNOT gate then flips q1 if q0 is |1⟩, resulting in 1/√2(|00⟩ + |11⟩).",
              },
              {
                type: "mcq",
                question:
                  "In the quantum teleportation protocol, how many classical bits must Alice send to Bob to complete the teleportation?",
                options: ["0", "1", "2", "3"],
                correctAnswerIndex: 2,
                explanation:
                  "Alice performs a Bell measurement on her two qubits (the message and half of the entangled pair), yielding two classical bits (00, 01, 10, or 11) which she sends to Bob.",
              },
              {
                type: "mcq",
                question:
                  "In superdense coding, what gates does Bob apply to decode the 2-bit message after receiving Alice's qubit?",
                options: [
                  "CNOT(control=qA, target=qB) then H on qA",
                  "H on qA then CNOT(control=qA, target=qB)",
                  "CNOT(control=qA, target=qB) then X on qB",
                  "Z on qA then X on qB",
                ],
                correctAnswerIndex: 0,
                explanation:
                  "Bob applies a CNOT gate with Alice's qubit as control and his as target, followed by a Hadamard gate on Alice's qubit. Finally, measuring both yields the original 2-bit message.",
              },
              {
                type: "circuit",
                question:
                  "Build a circuit that generates the Bell state |Φ+⟩ = 1/√2(|00⟩ + |11⟩). Initialize with 2 qubits.",
                expectedOutputsText: "Output: Measure both q0 and q1.",
                expectedProbs: { "00": 0.5, "11": 0.5 },
                explanation:
                  "Apply an H gate to q0, then a CNOT with q0 as control and q1 as target. Finally, measure both.",
              },
              {
                type: "circuit",
                question:
                  'Alice wants to send the message "01" to Bob using Superdense Coding. First, create the Bell state |Φ+⟩ on q0 and q1. Then, build the encoding part for Alice on q0 to send "01" (Note: "01" means apply Z).',
                expectedOutputsText: "Output: Measure q0 (Alice) and q1 (Bob).",
                expectedProbs: { "00": 0.5, "11": 0.5 },
                explanation:
                  'First, H on q0 and CNOT(q0, q1) creates the Bell state. To encode "01", Alice applies a Z gate to her qubit (q0). If you measure the entangled pair after this, you will still get 50% 00 and 50% 11, but the phase is flipped to |00⟩ - |11⟩.',
              },
              {
                type: "circuit",
                question:
                  "Teleportation Preparation: Alice wants to teleport the state |-> (minus state) to Bob. Build the circuit that prepares the |-> state on q0, and creates the entangled Bell state on q1 and q2.",
                expectedOutputsText: "Output: Measure q0, q1, and q2.",
                expectedProbs: {
                  "000": 0.25,
                  "011": 0.25,
                  "100": 0.25,
                  "111": 0.25,
                },
                explanation:
                  "Apply X then H (or H then Z) to q0 to make |->. Apply H to q1 and CNOT(q1, q2) to make the Bell state. Measuring yields 4 equally probable outcomes.",
              },
              {
                type: "circuit",
                question:
                  'Superdense Coding Decoding: Bob receives q0 from Alice. First, prepare their shared state 1/√2(|01⟩ + |10⟩) on q0 and q1 (Hint: X on q1, H on q0, CX from q0 to q1). Then, build Bob\'s decoding circuit to retrieve the message "10".',
                expectedOutputsText: "Output: Measure q0 and q1.",
                expectedProbs: { "10": 1.0 },
                explanation:
                  'After preparing the state, Bob applies CNOT(q0, q1) followed by H(q0). This disentangles the state and yields "10" with 100% probability.',
              },
              {
                type: "circuit",
                question:
                  "Create the GHZ state (3-qubit entanglement) 1/√2(|000⟩ + |111⟩). Initialize with 3 qubits.",
                expectedOutputsText: "Output: Measure q0, q1, and q2.",
                expectedProbs: { "000": 0.5, "111": 0.5 },
                explanation:
                  "Apply H to q0, CNOT(q0, q1), then CNOT(q1, q2). Measuring all three yields 000 or 111.",
              },
              {
                type: "circuit",
                question:
                  "Apply a phase flip to a qubit in superposition. Initialize q0 to |+⟩, apply a Z gate, and measure it in the computational basis.",
                expectedOutputsText: "Output: Measure q0.",
                expectedProbs: { "0": 0.5, "1": 0.5 },
                explanation:
                  "H on q0 creates |+⟩. Z changes it to |-⟩. Measuring in the computational (Z) basis still yields 0 or 1 with 50% probability.",
              },
              {
                type: "circuit",
                question:
                  "Quantum Interference: Apply an H gate, then an S gate, then another H gate to q0.",
                expectedOutputsText: "Output: Measure q0.",
                expectedProbs: { "0": 0.5, "1": 0.5 },
                explanation:
                  "H then S creates 1/√2(|0⟩ + i|1⟩). Another H yields an equal superposition of probabilities, so 50% 0 and 50% 1.",
              },
              {
                type: "circuit",
                question:
                  "Entanglement swapping part 1: Create two independent Bell states |Φ+⟩ on pairs (q0, q1) and (q2, q3).",
                expectedOutputsText: "Output: Measure all 4 qubits.",
                expectedProbs: {
                  "0000": 0.25,
                  "0011": 0.25,
                  "1100": 0.25,
                  "1111": 0.25,
                },
                explanation:
                  "H on q0, CNOT(q0, q1). H on q2, CNOT(q2, q3). Measuring yields the product of the two Bell states.",
              },
              {
                type: "circuit",
                question:
                  "What happens if you measure the target qubit of a CNOT gate before the control qubit? Create a Bell state on q0, q1, but measure ONLY q1.",
                expectedOutputsText: "Output: Measure q1.",
                expectedProbs: { "0": 0.5, "1": 0.5 },
                explanation:
                  "H on q0, CNOT(q0, q1). Measuring just q1 yields 0 or 1 with 50% probability, perfectly random.",
              },
            ],
          },
        ],
      },
      {
        id: 108,
        title: "Final Exam: Quantum Computing Basics",
        prerequisiteId: 107,
        description: "The ultimate test of your quantum knowledge! Complete this 20-question exam to earn your Easy badge and 20 XP.",
        difficulty: "Hard",
        isFinalTest: true,
        badgeAward: "Easy",
        pointsAward: 20,
        lessonContent: (
          <>
            <p style={{ marginBottom: "16px" }}>
              Welcome to the Final Exam! This test consists of 10 Multiple Choice Questions and 10 Circuit Building tasks.
              <br/><br/>
              <b>Anti-Cheat Active:</b> Do not switch tabs during this exam. Doing so will result in an automatic failure.
              <br/><br/>
              <b>Cooldown:</b> If you fail the exam, you will be locked out for 24 hours. Good luck!
            </p>
          </>
        ),
        practiceGoal: "Pass the final exam with a perfect 10/10!",
        quizzes: [
          {
            type: "mcq",
            question: "What operations do the S and T gates perform respectively?",
            options: [
              "S applies a 90° phase shift, T applies a 45° phase shift (both around Z-axis).",
              "S applies a 45° phase shift, T applies a 90° phase shift (both around Z-axis).",
              "S is a bit flip (X), T is a phase flip (Z).",
              "S applies a 180° phase shift, T applies a 90° phase shift."
            ],
            correctAnswerIndex: 0,
            explanation: "The S gate (Phase gate) applies a π/2 (90°) rotation around the Z-axis. The T gate (π/8 gate) applies a π/4 (45°) rotation."
          },
          {
            type: "mcq",
            question: "Trace this 4-qubit circuit (initialized to |0000⟩): 1. X on q0  2. H on q1  3. CNOT(q0->q2)  4. CZ(q1->q3)  5. H on q1  6. Z on q2  7. CNOT(q2->q3). What is the final state of the 4 qubits?",
            options: [
              "|1011⟩",
              "|1100⟩",
              "|1111⟩",
              "|1010⟩"
            ],
            correctAnswerIndex: 0,
            explanation: "q0 becomes 1. q1 becomes |+⟩ then H makes it 0. q2 becomes 1 (flipped by q0), Z adds a phase but leaves prob as 1. q3 starts at 0, CZ does nothing, then q2 flips it to 1. Result: 1011."
          },
          {
            type: "mcq",
            question: "Are these two 5-depth 3-qubit circuits perfectly equivalent? Circuit A: SWAP(q0,q1) using 3 CNOTs, then CNOT(q1,q2), then X(q0). Circuit B: CNOT(q0,q2), SWAP(q0,q1) using 3 CNOTs, then X(q0).",
            options: [
              "Yes, they produce the exact same final state.",
              "No, because the control qubit changes in Circuit B.",
              "No, because SWAP cannot be built with 3 CNOTs.",
              "Yes, but only if q2 is initialized to |0⟩."
            ],
            correctAnswerIndex: 0,
            explanation: "They are equivalent! In Circuit A, q1 acts as control for q2 after q0 and q1 swap (so original q0 controls q2). In Circuit B, original q0 controls q2 before the swap. The X(q0) happens at the end for both."
          },
          {
            type: "mcq",
            question: "In physical superconducting quantum computers, how is an arbitrary continuous rotation gate like Rx(θ) actually implemented in real life?",
            options: [
              "By applying a calibrated microwave pulse at the qubit's resonance frequency for a specific duration.",
              "By physically rotating the superconducting loop by θ degrees.",
              "By sending photons through a sequence of beam splitters.",
              "By cooling the dilution refrigerator to exactly θ millikelvin."
            ],
            correctAnswerIndex: 0,
            explanation: "Arbitrary single-qubit rotations are implemented using microwave pulses. The amplitude, phase, and duration of the pulse dictate the rotation angle θ."
          },
          {
            type: "mcq",
            question: "Why can't Quantum Teleportation be used to achieve faster-than-light (FTL) communication?",
            options: [
              "Because Bob must wait to receive the 2 classical bits from Alice's measurement to decode the state.",
              "Because the entangled particles degrade over large distances.",
              "Because FTL teleportation requires too much energy.",
              "Because measuring the state instantly destroys the receiver's qubit."
            ],
            correctAnswerIndex: 0,
            explanation: "Teleportation requires a classical channel. Bob's qubit is in a mixed state until he applies the Pauli corrections (X, Z) based on Alice's classical 2-bit message, which travels at light speed."
          },
          {
            type: "circuit",
            question: "Teleportation Protocol: Alice wants to teleport q0 to Bob's q2. 1) Create a Bell state on q1 and q2. 2) Alice does Bell basis measurement prep: CNOT(q0->q1) then H(q0).",
            expectedOutputsText: "Output: Measure q0 and q1.",
            expectedProbs: { "00": 0.25, "01": 0.25, "10": 0.25, "11": 0.25 },
            explanation: "This is the core preparation and measurement part of the teleportation protocol. The 4 outcomes occur with equal probability."
          },
          {
            type: "circuit",
            question: "Superdense Coding: Alice wants to send '11' to Bob. 1) Create a Bell state on q0, q1. 2) Alice encodes '11' by applying X then Z to her qubit (q0). 3) Bob decodes by applying CNOT(q0->q1) then H(q0).",
            expectedOutputsText: "Output: Measure q0 and q1.",
            expectedProbs: { "11": 1.0 },
            explanation: "Superdense coding relies on applying Pauli gates to one half of a Bell state to encode 2 classical bits. Bob's decoding perfectly retrieves '11'."
          },
          {
            type: "circuit",
            question: "Build exactly this 10-depth sequence: H(q0), X(q1), Z(q2), CNOT(q0,q1), CNOT(q1,q2), H(q1), CNOT(q2,q0), X(q0), Z(q1), H(q2).",
            expectedOutputsText: "Output: Measure all 3 qubits.",
            expectedProbs: { "000": 0.25, "010": 0.25, "101": 0.25, "111": 0.25 },
            explanation: "Just follow the exact sequence!"
          },
          {
            type: "circuit",
            question: "Create a 4-qubit GHZ state 1/sqrt(2) (|0000> + |1111>) so measuring one perfectly predicts all others. Hint: Use H on q0, then cascade CNOTs.",
            expectedOutputsText: "Output: Measure all 4 qubits.",
            expectedProbs: { "0000": 0.5, "1111": 0.5 },
            explanation: "H on q0 creates |+>. CNOT(q0,q1) makes Bell state |00>+|11>. CNOT(q1,q2) and CNOT(q2,q3) extends the entanglement to all 4 qubits."
          },
          {
            type: "circuit",
            question: "Demonstrate Phase Kickback: 1) Prepare q1 in the |-> state (X then H). 2) Apply H to q0. 3) Apply CNOT with q0 as control and q1 as target. 4) Apply H to q0. Measure q0.",
            expectedOutputsText: "Output: Measure q0.",
            expectedProbs: { "1": 1.0 },
            explanation: "When a CNOT targets the |-> state, it kicks back a phase of -1 to the control qubit (q0). This acts like a Z gate on q0, turning |+> into |->. The final H turns |-> into |1>."
          }        ]
      },
    ],
  },
  {
    id: "fundamental-algorithms",
    sessionName: "Fundamental Quantum Algorithms",
    badge: "Medium",
    modules: [
      {
        id: 201,
        title: "Introduction to Grover's Algorithm",
        description: "Learn how quantum computers can search unstructured databases quadratically faster than classical computers.",
        difficulty: "Intermediate",
        lessonContent: (
          <div>
            <h3 style={{ fontSize: "20px", color: "var(--text-primary)", marginBottom: "12px" }}>Unstructured Search</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              Grover's algorithm provides a quadratic speedup over classical algorithms for searching an unstructured database. It uses amplitude amplification to increase the probability of measuring the correct state.
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              <i>(More subtopics and content will be added here soon.)</i>
            </p>
          </div>
        ),
        practiceGoal: "Explore the core concepts of amplitude amplification.",
        quizzes: []
      },
      {
        id: 202,
        title: "Introduction to Shor's Algorithm",
        description: "Explore the algorithm that factors large integers exponentially faster, threatening modern cryptography.",
        difficulty: "Advanced",
        lessonContent: (
          <div>
            <h3 style={{ fontSize: "20px", color: "var(--text-primary)", marginBottom: "12px" }}>Integer Factorization</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              Shor's algorithm can factorise large numbers exponentially faster than the best known classical algorithms by mapping the factoring problem to a period-finding problem using the Quantum Fourier Transform.
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              <i>(More subtopics and content will be added here soon.)</i>
            </p>
          </div>
        ),
        practiceGoal: "Understand period finding and the Quantum Fourier Transform.",
        quizzes: []
      }
    ]
  },
];

export const getAllTutorials = (): TutorialModule[] => {
  const flatten = (modules: TutorialModule[]): TutorialModule[] => {
    return modules.reduce((acc: TutorialModule[], module: TutorialModule) => {
      acc.push(module);
      if (module.subModules) {
        acc.push(...flatten(module.subModules));
      }
      return acc;
    }, []);
  };
  return tutorialSessions.flatMap((session) => flatten(session.modules));
};
