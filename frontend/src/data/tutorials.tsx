import React from 'react';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
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
  subModules?: TutorialModule[];
};

export interface TutorialSession {
  id: string; // e.g. "course-basics"
  sessionName: string;
  badge?: 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Master';
  modules: TutorialModule[];
};

export const tutorialSessions: TutorialSession[] = [
  {
    id: "course-basics",
    sessionName: "Quantum Computing Basics",
    badge: 'Easy',
    modules: [
      {
        id: 1,
        title: 'Introduction to Quantum Computing',
        description: 'Learn the fundamentals of quantum bits, superposition, and how they differ from classical bits.',
        difficulty: 'Beginner',
        lessonContent: (
          <>
            <p style={{ marginBottom: '16px', fontSize: '18px', color: 'var(--text-secondary)' }}>
              Welcome to the first module in <strong>Quantum Computing Basics</strong>! In this module, we will explore what makes a quantum computer so fundamentally different from the classical computers we use every day.
            </p>
            
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>What&apos;s Inside This Module</h3>
            
            <ul style={{ paddingLeft: '20px', marginBottom: '32px', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>What is quantum computing:</strong> The fundamental unit of quantum information, capable of superposition.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Use cases:</strong> Real world applications of quantum computing.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Myths about Quantum Computing:</strong> We separate the science fiction from the science fact.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Quiz:</strong> Test your knowledge of everything in this module!
              </li>
            </ul>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', color: 'white' }}>How to navigate</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                In the sidebar to your left, simply click on this lesson button to reveal subtopics. You can navigate freely between these subtopics to learn at your own pace!
              </p>
            </div>
          </>
        ),
        practiceGoal: 'Review the module overview and continue to the subtopics.',
        subModules: [
          {
            id: 2,
            title: 'What is quantum computing',
            description: 'Learn the fundamentals of quantum bits and superposition.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  Quantum computing is a way of performing computations using the laws of quantum mechanics—the branch of physics that describes how nature behaves at extremely small scales, such as atoms and subatomic particles.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  The quantum world often behaves in ways that seem strange from our everyday point of view. Many quantum phenomena do not match our common sense because our intuition is built from experiences in the large, everyday world. Nevertheless, these phenomena are real and have been verified through countless experiments.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Quantum computers are fundamentally different from the computers, smartphones, and other electronic devices that we use today. To understand quantum computing, we first need to understand how ordinary computers store information.
                </p>

                {/* Visual Info: Classical Bit vs Qubit */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Classical Bit</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: '#333', border: '2px solid #555', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold', color: '#888' }}>0</div>
                      <span style={{ color: 'var(--text-secondary)' }}>OR</span>
                      <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'var(--accent-primary)', border: '2px solid var(--accent-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold', color: '#fff', boxShadow: '0 0 15px var(--accent-primary)' }}>1</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Strictly one state at a time.</p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--surface-border)' }}></div>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Quantum Bit (Qubit)</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #333 0%, var(--accent-primary) 100%)', border: '2px solid var(--accent-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', color: '#fff', boxShadow: '0 0 20px var(--accent-primary)' }}>
                        0 & 1
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Can exist in a complex combination of both states (Superposition).</p>
                  </div>
                </div>

                <p style={{ marginBottom: '16px' }}>
                  In classical computers, information is stored using bits. A bit can have only one of two possible values: 0 or 1. In electronic circuits, these values are usually represented by different voltage levels. For example, a low voltage may represent 0, while a higher voltage may represent 1.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  So, in simple terms, a classical bit always exists in exactly one state at any moment: either 0 or 1.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Quantum computers use quantum bits, or qubits, instead of classical bits. A qubit can be realized using various quantum systems, such as:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}>the spin of an electron,</li>
                  <li style={{ marginBottom: '8px' }}>the ground and excited energy states of an atom, or</li>
                  <li style={{ marginBottom: '8px' }}>the polarization states of photons.</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  At first glance, this may not seem very different from classical bits. However, quantum systems behave in ways that are fundamentally different from classical systems.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Measuring a classical bit is relatively straightforward. We can easily measure the voltage in a circuit using suitable instruments without significantly disturbing the system. In contrast, quantum systems are extremely small and delicate. At these microscopic scales, quantum effects dominate, physical processes occur extremely rapidly, and even the finite speed of light can become important when describing interactions and information transfer accurately.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Moreover, unlike in classical systems, the act of measuring a quantum system can itself disturb the system being measured. This makes observing and controlling quantum systems a challenging task.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Interestingly, this sensitivity is both a challenge and an opportunity. On one hand, quantum states can be easily disturbed by their surroundings, making it difficult to build reliable quantum computers. On the other hand, this same quantum behavior gives rise to remarkable phenomena such as superposition and entanglement, which provide quantum computers with capabilities beyond those of classical computers for certain problems.
                </p>
              </>
            ),
            practiceGoal: 'Read through the foundational concepts of quantum computing.'
          },
          {
            id: 3,
            title: 'Use cases',
            description: 'Explore the real-world applications of quantum computers.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '16px' }}>1. Drug Discovery and Chemistry</h3>
                <p style={{ marginBottom: '16px' }}>
                  A drug molecule might interact with millions of atoms inside the human body. Simulating all these interactions on classical computers can take enormous time.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  A quantum computer can model molecules using the rules of quantum mechanics themselves.
                </p>
                <p style={{ marginBottom: '8px' }}><strong>Example</strong></p>
                <p style={{ marginBottom: '8px' }}>Suppose scientists want to develop a new drug for cancer. Instead of:</p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}>Synthesizing thousands of chemicals in a laboratory,</li>
                  <li style={{ marginBottom: '8px' }}>Testing them one by one,</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  they could first simulate molecular behavior on a quantum computer and identify the most promising candidates.
                </p>

                {/* Visual Info: Drug Discovery */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Laboratory Testing</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '16px', height: '60px' }}>
                      <div style={{ width: '20px', height: '40px', background: '#e74c3c', borderRadius: '10px' }}></div>
                      <div style={{ width: '20px', height: '40px', background: '#3498db', borderRadius: '10px' }}></div>
                      <div style={{ width: '20px', height: '40px', background: '#f1c40f', borderRadius: '10px' }}></div>
                      <div style={{ fontSize: '20px', color: '#888' }}>...</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Synthesizing thousands of chemicals one by one.</p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--surface-border)' }}></div>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Quantum Simulation</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                        <div style={{ position: 'absolute', top: '5px', left: '22px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></div>
                        <div style={{ position: 'absolute', top: '35px', left: '5px', width: '16px', height: '16px', borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 10px #3fb950' }}></div>
                        <div style={{ position: 'absolute', top: '35px', left: '39px', width: '16px', height: '16px', borderRadius: '50%', background: '#d29922', boxShadow: '0 0 10px #d29922' }}></div>
                        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '20px', height: '2px', background: '#fff', transform: 'rotate(50deg)' }}></div>
                        <div style={{ position: 'absolute', top: '15px', left: '25px', width: '20px', height: '2px', background: '#fff', transform: 'rotate(-50deg)' }}></div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Modeling molecular rules directly to find promising candidates.</p>
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>2. Optimization: Finding the Best Answer Among Millions</h3>
                <p style={{ marginBottom: '16px' }}>
                  Optimization means finding the best solution among countless possibilities. Imagine a delivery company such as Swiggy or Zomato.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  Suppose 500 delivery partners must deliver 20,000 orders across a city. Questions include:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}>Which rider should deliver which order?</li>
                  <li style={{ marginBottom: '8px' }}>What route minimizes fuel consumption?</li>
                  <li style={{ marginBottom: '8px' }}>How can deliveries be completed fastest?</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  A classical computer can solve this, but the problem becomes increasingly difficult as the city grows. Quantum algorithms may eventually explore many possible routes simultaneously and identify better solutions.
                </p>

                {/* Visual Info: Optimization */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Classical Routing</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#888' }}></div>
                          <div style={{ width: '30px', height: '2px', background: '#888' }}></div>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#888' }}></div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#888' }}>Checking route sequentially...</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Evaluates routes one by one.</p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--surface-border)' }}></div>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Quantum Optimization</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }}></div>
                          <div style={{ width: '30px', height: '2px', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }}></div>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }}></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 8px #3fb950' }}></div>
                          <div style={{ width: '30px', height: '2px', background: '#3fb950', boxShadow: '0 0 8px #3fb950' }}></div>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 8px #3fb950' }}></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d29922', boxShadow: '0 0 8px #d29922' }}></div>
                          <div style={{ width: '30px', height: '2px', background: '#d29922', boxShadow: '0 0 8px #d29922' }}></div>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d29922', boxShadow: '0 0 8px #d29922' }}></div>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Explores many possible routes simultaneously.</p>
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>3. Finance: Managing Money Smarter</h3>
                <p style={{ marginBottom: '8px' }}>
                  Suppose an investor has ₹10,00,000 and wants to invest in:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}>stocks,</li>
                  <li style={{ marginBottom: '8px' }}>bonds,</li>
                  <li style={{ marginBottom: '8px' }}>commodities,</li>
                  <li style={{ marginBottom: '8px' }}>mutual funds.</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  The challenge is to maximize profit while minimizing risk. A quantum computer could potentially evaluate a vast number of investment combinations more efficiently.
                </p>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>4. Cryptography: The Security Challenge</h3>
                <p style={{ marginBottom: '8px' }}>
                  Most internet security today relies on mathematical problems that are extremely difficult for classical computers. Examples include:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}>online banking,</li>
                  <li style={{ marginBottom: '8px' }}>secure messaging,</li>
                  <li style={{ marginBottom: '8px' }}>digital signatures.</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  A sufficiently powerful quantum computer running Shor&apos;s Algorithm could solve some of these problems much faster.
                </p>

                {/* Visual Info: Cryptography */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Classical Hack</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ fontSize: '40px', color: '#888' }}>🔒</div>
                      <div style={{ fontSize: '20px', color: '#888', marginLeft: '12px' }}>⏳ Years</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Would take millennia to guess the prime factors of a large key.</p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--surface-border)' }}></div>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Quantum Hack</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ fontSize: '40px', textShadow: '0 0 15px var(--accent-primary)' }}>🔓</div>
                      <div style={{ fontSize: '20px', color: 'var(--accent-primary)', marginLeft: '12px', fontWeight: 'bold' }}>⚡ Faster</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Shor&apos;s Algorithm finds prime factors exponentially faster.</p>
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>5. Artificial Intelligence and Machine Learning</h3>
                <p style={{ marginBottom: '8px' }}>
                  Machine learning often requires solving enormous optimization problems. Suppose we want to train an AI model to recognize diseases from medical images. Training may involve:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}>millions or billions of parameters,</li>
                  <li style={{ marginBottom: '8px' }}>enormous datasets,</li>
                  <li style={{ marginBottom: '8px' }}>extensive computation.</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  Researchers in Quantum Machine Learning are investigating whether quantum systems can accelerate certain machine-learning tasks.
                </p>
                
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>And Many More...</h3>
                <p style={{ marginBottom: '16px' }}>
                  The potential of quantum computing extends far beyond these examples, with ongoing research poised to unlock new possibilities across countless other industries.
                </p>
              </>
            ),
            practiceGoal: 'Review the use cases and continue to the next lesson.'
          },
          {
            id: 4,
            title: 'Myths about Quantum Computing',
            description: 'Debunk common misconceptions about quantum computers and how they actually work.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  Quantum computing sounds like science fiction, which naturally leads to many myths and misconceptions.
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 1: Quantum computers will replace all classical computers</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> Quantum computers are highly specialized machines. They are exceptionally good at specific tasks, but they are actually <em>slower</em> than your laptop for everyday tasks like browsing the web or sending emails.
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 2: They try all possibilities at once</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> While superposition allows qubits to represent many states simultaneously, a quantum computer does not simply "try all paths at once." Instead, quantum algorithms use <strong>interference</strong> to amplify the correct answer and cancel out the wrong ones—much like ripples on a pond.
                </p>
              </>
            ),
            practiceGoal: 'Review the myths and continue to the quiz.'
          },
          {
            id: 5,
            title: 'Quiz',
            description: 'Test your knowledge on the basics of quantum computing.',
            difficulty: 'Beginner',
            isFinalTest: true,
            pointsAward: 1,
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  Ready to test what you&apos;ve learned? Answer the questions below to complete this module!
                </p>
              </>
            ),
            practiceGoal: 'Pass the quiz!',
            quizzes: [
              {
                question: "What is a qubit?",
                options: [
                  "A classical bit that can only be 0 or 1",
                  "A quantum bit that can exist in a superposition of 0 and 1",
                  "A very fast classical computer"
                ],
                correctAnswerIndex: 1,
                explanation: "Unlike classical bits, qubits leverage quantum mechanics to exist in a state of superposition."
              },
              {
                question: "Are quantum computers going to replace your personal laptop?",
                options: [
                  "Yes, because they are faster at everything.",
                  "No, because they are specialized for specific types of complex problems.",
                  "Yes, they are just the next generation of processors."
                ],
                correctAnswerIndex: 1,
                explanation: "Quantum computers excel at certain mathematical and simulation problems but are not designed for general-purpose computing."
              }
            ]
          }
        ]
      }
    ]
  }
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
  return tutorialSessions.flatMap(session => flatten(session.modules));
};
