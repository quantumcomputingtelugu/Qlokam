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
  prerequisiteId?: number;
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

                {/* MYTH 1 */}
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 1: "Quantum Computers Will Replace Classical Computers"</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> Quantum computers are special-purpose machines. They are excellent for certain problems, such as simulating molecules, optimization, cryptography, and quantum physics simulations.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  But for everyday tasks like browsing the web, watching videos, writing documents, and playing games, classical computers are much more efficient.
                </p>

                {/* Visual Info: General vs Specialized */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Classical Computers</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ fontSize: '40px' }}>💻</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}><strong>General-purpose workers</strong>. Great for everyday tasks.</p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--surface-border)' }}></div>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Quantum Computers</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ fontSize: '40px', textShadow: '0 0 15px var(--accent-primary)' }}>⚛️</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}><strong>Highly specialized experts</strong>. Like a surgeon—you wouldn&apos;t ask them to clean floors. Both will work together!</p>
                  </div>
                </div>

                {/* MYTH 2 */}
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 2: "Quantum Computers Try Every Possible Answer Simultaneously"</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> Quantum computers use phenomena such as superposition and interference. While a quantum system can represent many possibilities simultaneously, measuring it gives only <em>one</em> outcome.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  The real challenge is designing algorithms that amplify correct answers and suppress wrong answers. This is why quantum algorithm design is difficult.
                </p>

                {/* Visual Info: Interference */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Random Noise</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '40px' }}>
                        <div style={{ width: '6px', height: '10px', background: '#888', borderRadius: '3px' }}></div>
                        <div style={{ width: '6px', height: '35px', background: '#888', borderRadius: '3px' }}></div>
                        <div style={{ width: '6px', height: '15px', background: '#888', borderRadius: '3px' }}></div>
                        <div style={{ width: '6px', height: '40px', background: '#888', borderRadius: '3px' }}></div>
                        <div style={{ width: '6px', height: '20px', background: '#888', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>If every singer in a band sings randomly, the result is noise.</p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--surface-border)' }}></div>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Constructive Interference</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '40px' }}>
                        <div style={{ width: '6px', height: '10px', background: 'var(--accent-primary)', borderRadius: '3px', boxShadow: '0 0 5px var(--accent-primary)' }}></div>
                        <div style={{ width: '6px', height: '25px', background: 'var(--accent-primary)', borderRadius: '3px', boxShadow: '0 0 5px var(--accent-primary)' }}></div>
                        <div style={{ width: '6px', height: '40px', background: 'var(--accent-primary)', borderRadius: '3px', boxShadow: '0 0 8px var(--accent-primary)' }}></div>
                        <div style={{ width: '6px', height: '25px', background: 'var(--accent-primary)', borderRadius: '3px', boxShadow: '0 0 5px var(--accent-primary)' }}></div>
                        <div style={{ width: '6px', height: '10px', background: 'var(--accent-primary)', borderRadius: '3px', boxShadow: '0 0 5px var(--accent-primary)' }}></div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>If all singers coordinate, the desired melody becomes louder!</p>
                  </div>
                </div>

                {/* MYTH 3 */}
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 3: "Current Quantum Computers Can Already Break All Encryption"</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> Today&apos;s quantum computers are too small and noisy to break modern encryption schemes.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Breaking widely used encryption such as the RSA Cryptosystem would require large fault-tolerant quantum computers that do not yet exist. However, governments and researchers are preparing for the future by developing post-quantum cryptography.
                </p>

                {/* Visual Info: Cryptography Timeline */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Today (NISQ Era)</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ fontSize: '30px', filter: 'grayscale(1) opacity(0.5)' }}>🤖</div>
                      <div style={{ color: '#e74c3c', marginLeft: '12px', fontSize: '14px', fontWeight: 'bold' }}>Too small & noisy</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Cannot break modern RSA encryption.</p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--surface-border)' }}></div>
                  <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Future</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', height: '60px' }}>
                      <div style={{ fontSize: '30px', textShadow: '0 0 10px #3fb950' }}>🛡️</div>
                      <div style={{ color: '#3fb950', marginLeft: '12px', fontSize: '14px', fontWeight: 'bold' }}>Post-Quantum Crypto</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Preparing new encryptions before fault-tolerant QCs arrive.</p>
                  </div>
                </div>
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
                question: "Quantum computing performs computations using the laws of:",
                options: ["Thermodynamics", "Quantum Mechanics", "Relativity", "Electromagnetism"],
                correctAnswerIndex: 1,
                explanation: "Quantum computers leverage the principles of quantum mechanics, such as superposition and entanglement."
              },
              {
                question: "A classical bit can have how many possible values?",
                options: ["One", "Two", "Three", "Infinite"],
                correctAnswerIndex: 1,
                explanation: "A classical bit can only be 0 or 1, giving it exactly two possible values."
              },
              {
                question: "A classical bit always exists in exactly:",
                options: ["Two states simultaneously", "One state at a time", "Infinite states", "No definite state"],
                correctAnswerIndex: 1,
                explanation: "At any given moment, a classical bit is either exclusively 0 or exclusively 1."
              },
              {
                question: "Quantum computers use ______ instead of classical bits.",
                options: ["Bytes", "Transistors", "Qubits", "Registers"],
                correctAnswerIndex: 2,
                explanation: "Quantum bits, or qubits, are the fundamental unit of information in quantum computing."
              },
              {
                question: "Which of the following is mentioned as a possible realization of a qubit?",
                options: ["Electron spin", "Magnetic tape", "Hard disk sector", "Capacitor voltage"],
                correctAnswerIndex: 0,
                explanation: "Qubits can be realized using physical quantum properties like the spin of an electron."
              },
              {
                question: "The ability of a qubit to exist in a complex combination of 0 and 1 is called:",
                options: ["Entanglement", "Superposition", "Interference", "Polarization"],
                correctAnswerIndex: 1,
                explanation: "Superposition allows a quantum system to exist in a complex combination of multiple states at the same time."
              },
              {
                question: "According to the passage, measuring a quantum system can:",
                options: ["Leave the system unchanged", "Disturb the system being measured", "Increase its energy", "Convert it into a classical bit"],
                correctAnswerIndex: 1,
                explanation: "Because quantum systems are incredibly delicate, the very act of measuring them can disturb their state."
              },
              {
                question: "In drug discovery, quantum computers can help scientists by:",
                options: ["Replacing laboratories completely", "Modeling molecular behavior", "Manufacturing drugs automatically", "Eliminating chemical synthesis"],
                correctAnswerIndex: 1,
                explanation: "Quantum computers can simulate molecular behavior using the laws of quantum mechanics natively."
              },
              {
                question: "In finance, a quantum computer could potentially evaluate:",
                options: ["Only stock prices", "A vast number of investment combinations", "Only mutual funds", "Only commodity markets"],
                correctAnswerIndex: 1,
                explanation: "Quantum optimization algorithms can evaluate vast numbers of investment combinations simultaneously."
              },
              {
                question: "According to the passage, today's internet security relies mainly on:",
                options: ["Quantum algorithms", "Mathematical problems difficult for classical computers", "Artificial intelligence", "Cloud computing"],
                correctAnswerIndex: 1,
                explanation: "Modern cryptography (like RSA) relies on the fact that classical computers struggle to factor large prime numbers."
              },
              {
                question: "Which algorithm is specifically mentioned as being capable of solving certain cryptographic problems faster?",
                options: ["Grover's Algorithm", "Dijkstra's Algorithm", "Shor's Algorithm", "Bellman's Algorithm"],
                correctAnswerIndex: 2,
                explanation: "Shor's Algorithm is famous for its ability to find prime factors exponentially faster than classical algorithms."
              },
              {
                question: "According to the passage, current quantum computers are too ______ to break modern RSA encryption.",
                options: ["expensive and large", "small and noisy", "slow and heavy", "complex and unstable"],
                correctAnswerIndex: 1,
                explanation: "Today's 'NISQ' era quantum computers are too small and noisy to run Shor's Algorithm at scale."
              },
              {
                question: "The myth that quantum computers try every possible answer simultaneously is incorrect because measuring a quantum system gives:",
                options: ["All possible outcomes", "No outcome", "Only one outcome", "Infinite outcomes"],
                correctAnswerIndex: 2,
                explanation: "Although a system can represent many possibilities, measurement collapses it to only one outcome."
              },
              {
                question: "The current era of quantum computing is referred to in the passage as the:",
                options: ["AI Era", "Classical Era", "NISQ Era", "Silicon Era"],
                correctAnswerIndex: 2,
                explanation: "NISQ stands for Noisy Intermediate-Scale Quantum era, reflecting our current hardware limitations."
              }
            ]
          }
        ]
      },
      {
        id: 6,
        title: 'Qubits and its properties',
        description: 'Introduction to Qubits and their fundamental properties.',
        difficulty: 'Beginner',
        lessonContent: (
          <>
            <p style={{ marginBottom: '16px', fontSize: '18px', color: 'var(--text-secondary)' }}>
              Welcome to the <strong>Qubits and its properties</strong> topic! In this module, we will explore the fundamental building blocks of a quantum computer.
            </p>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>What&apos;s Inside This Module</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '32px', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>What is Qubit:</strong> A deep dive into the quantum bit.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Superposition:</strong> The ability to be in multiple states simultaneously.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Measurement Collapse:</strong> How observing a quantum system changes its state.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Representation:</strong> How qubits are mathematically modeled.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Interference:</strong> The wavelike property of quantum states.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>No Cloning Theorem:</strong> Why you can't perfectly copy a qubit.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Coherence and Decoherence:</strong> The fragility of quantum information.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Bloch Sphere:</strong> A geometric visualization of a qubit.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Quiz:</strong> Test your knowledge on all these properties!
              </li>
            </ul>
          </>
        ),
        practiceGoal: 'Understand the nature of a qubit and superposition.',
        subModules: [
          {
            id: 7,
            title: 'What is Qubit',
            description: 'Learn exactly what a qubit is, how it functions, and its physical realization.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', fontSize: '18px' }}>
                  A <strong>qubit</strong> (short for quantum bit) is the basic unit of information in a quantum computer, just as a bit is the basic unit of information in a classical computer.
                </p>
                
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '16px' }}>The Classical Bit</h3>
                <p style={{ marginBottom: '16px' }}>
                  A classical computer stores information using bits. A bit can be only one of two values: <strong>0 or 1</strong>. Everything in your laptop, from the text you type to the videos you watch, is ultimately represented using billions of such bits.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Think of a classical bit like a light switch: it is either completely <strong>ON (1)</strong> or completely <strong>OFF (0)</strong>. There is no in-between state.
                </p>

                {/* Visual: Classical Bit */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '24px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: '#333', border: '2px solid #555', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold', color: '#888' }}>0</div>
                  <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontWeight: 'bold' }}>OR</div>
                  <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: 'var(--accent-primary)', border: '2px solid var(--accent-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold', color: '#000', boxShadow: '0 0 15px var(--accent-primary)' }}>1</div>
                </div>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>The Quantum Bit</h3>
                <p style={{ marginBottom: '16px' }}>
                  A qubit, however, is not bound by this binary restriction. A qubit can be:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}>Exactly 0</li>
                  <li style={{ marginBottom: '8px' }}>Exactly 1</li>
                  <li style={{ marginBottom: '8px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>A combination of both 0 and 1 simultaneously</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  Physically, how do we make a qubit? Unlike a classical transistor, a qubit is made using microscopic quantum systems. For example:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '8px' }}><strong>Superconducting circuits:</strong> Tiny loops of metal cooled to near absolute zero where electrons flow without resistance.</li>
                  <li style={{ marginBottom: '8px' }}><strong>Trapped Ions:</strong> Individual atoms held in place by lasers and electromagnetic fields.</li>
                  <li style={{ marginBottom: '8px' }}><strong>Photons:</strong> Individual particles of light whose polarization (horizontal or vertical) acts as the 0 or 1.</li>
                </ul>
              </>
            ),
            practiceGoal: 'Understand the fundamental difference between a classical bit and a qubit.'
          },
          {
            id: 8,
            title: 'Superposition',
            description: 'Dive deep into superposition and exponential scaling.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  The ability of a qubit to be in multiple states simultaneously is known as <strong>Superposition</strong>. This is one of the two core pillars of quantum mechanics (the other being Entanglement).
                </p>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>The Spinning Coin Analogy</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Imagine a classical coin resting on a table. It is either Heads (1) or Tails (0). This is exactly how a classical bit works.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Now, imagine tossing the coin into the air. While it is spinning in the air, what state is it in? It is a blur of both Heads and Tails. It isn't just Heads, and it isn't just Tails—it's a <strong>superposition of both</strong>. 
                </p>

                {/* Visual: Spinning Coin */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <style>{`
                    @keyframes spinCoin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
                  `}</style>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(45deg, #FFD700 0%, #FFA500 100%)', boxShadow: '0 0 20px rgba(255,215,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'spinCoin 1.5s linear infinite' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>H / T</span>
                  </div>
                </div>

                <p style={{ marginBottom: '16px' }}>
                  Only when the coin lands (when we <strong>measure</strong> the qubit) does it collapse into a definite state of either Heads or Tails.
                </p>

                <div style={{ padding: '24px', background: 'rgba(69, 243, 255, 0.1)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '0 8px 8px 0', marginTop: '32px' }}>
                  <h4 style={{ color: 'var(--accent-primary)', margin: '0 0 12px 0' }}>The Exponential Power of Superposition</h4>
                  <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>
                    Why is this important? Because a qubit can be in a superposition, two qubits can represent 4 states simultaneously, 3 qubits can represent 8 states, and <strong>n qubits can represent 2^n states</strong>.
                  </p>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    If you have just 300 qubits in a state of superposition, they can represent more states simultaneously than there are atoms in the observable universe! This exponential scaling allows quantum computers to analyze massive datasets and complex systems all at once, something a classical computer could never do.
                  </p>
                </div>
              </>
            ),
            practiceGoal: 'Understand the concept of quantum superposition.'
          },
          {
            id: 10,
            title: 'Measurement Collapse',
            description: 'Understand how measuring a qubit forces it into a definite state.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Unlike classical systems where you can look at a bit without changing it, <strong>measuring a qubit alters its state fundamentally</strong>. This is a core rule of quantum mechanics.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  When you observe or "measure" a qubit that is in a superposition, you force it to make a decision. It instantly "collapses" into one of the definite classical states—either exactly 0 or exactly 1. You cannot measure a qubit and see the superposition itself.
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '16px' }}>Probabilities, Not Certainties</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Which state will it collapse into? You cannot know for sure. The outcome is fundamentally probabilistic. The qubit has a certain probability of collapsing to 0, and a certain probability of collapsing to 1. For example, a qubit could be in a state where it has a 90% chance of being 0 and a 10% chance of being 1.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(69,243,255,0.5), rgba(139,92,246,0.5))', boxShadow: '0 0 20px rgba(69,243,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold', position: 'relative' }}>
                      <span style={{ position: 'absolute', top: '-25px', fontSize: '14px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Superposition</span>
                      👁️
                    </div>
                    <div style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>➔</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ padding: '8px 24px', background: '#333', borderRadius: '8px', border: '2px solid #555', textAlign: 'center', fontWeight: 'bold' }}>
                        <div>0</div>
                        <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>(prob p)</div>
                      </div>
                      <div style={{ padding: '8px 24px', background: 'var(--accent-primary)', borderRadius: '8px', border: '2px solid var(--accent-secondary)', textAlign: 'center', fontWeight: 'bold', color: '#000' }}>
                        <div>1</div>
                        <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', marginTop: '4px' }}>(prob 1-p)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
            practiceGoal: 'Learn about quantum measurement and probabilities.'
          },
          {
            id: 11,
            title: 'Representation',
            description: 'Learn how qubits are mathematically modeled using Dirac notation.',
            difficulty: 'Intermediate',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  To describe a qubit mathematically, we use a notation called <strong>Dirac notation</strong> (or bra-ket notation), invented by physicist Paul Dirac. It is the standard language of quantum mechanics.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0', padding: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--accent-primary)', letterSpacing: '4px', textShadow: '0 0 15px rgba(69,243,255,0.3)' }}>
                    |ψ⟩ = α|0⟩ + β|1⟩
                  </div>
                </div>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '16px' }}>Breaking it Down</h3>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '12px' }}><strong>|ψ⟩ (Ket Psi):</strong> This represents the overall quantum state of our qubit.</li>
                  <li style={{ marginBottom: '12px' }}><strong>|0⟩ and |1⟩:</strong> These are the base classical states. Think of them as the X and Y axes on a graph.</li>
                  <li style={{ marginBottom: '12px' }}><strong>α (Alpha) and β (Beta):</strong> These are called <em>Probability Amplitudes</em>. They are complex numbers (meaning they can involve imaginary numbers, like the square root of -1). They determine how much of state |0⟩ and state |1⟩ make up our superposition.</li>
                </ul>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '4px solid #fff', marginTop: '24px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>The Normalization Rule</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    Because probabilities must add up to 100% (or 1.0), the amplitudes follow a strict mathematical rule: the absolute square of α plus the absolute square of β must equal 1. <br/><br/>
                    <strong>|α|² + |β|² = 1</strong><br/><br/>
                    |α|² is the probability of measuring 0, and |β|² is the probability of measuring 1.
                  </p>
                </div>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Matrix Representation</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  In quantum mechanics, qubits can also be represented as <strong>column vectors</strong> (a type of matrix with one column). The base states |0⟩ and |1⟩ look like this:
                </p>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <div style={{ flex: '1', minWidth: '150px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', color: 'var(--text-secondary)', marginBottom: '12px' }}>|0⟩ = </div>
                    <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid var(--text-primary)', borderTop: '2px solid var(--text-primary)', borderBottom: '2px solid var(--text-primary)' }}></div>
                      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid var(--text-primary)', borderTop: '2px solid var(--text-primary)', borderBottom: '2px solid var(--text-primary)' }}></div>
                      <div style={{ fontSize: '24px', lineHeight: '1.4', color: 'var(--text-primary)' }}>1<br/>0</div>
                    </div>
                  </div>
                  <div style={{ flex: '1', minWidth: '150px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', color: 'var(--accent-primary)', marginBottom: '12px' }}>|1⟩ = </div>
                    <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid var(--accent-primary)', borderTop: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)' }}></div>
                      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid var(--accent-primary)', borderTop: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)' }}></div>
                      <div style={{ fontSize: '24px', lineHeight: '1.4', color: 'var(--accent-primary)' }}>0<br/>1</div>
                    </div>
                  </div>
                </div>
              </>
            ),
            practiceGoal: 'Understand Dirac notation and probability amplitudes.'
          },
          {
            id: 12,
            title: 'Interference',
            description: 'Discover how quantum states can interfere with each other like waves.',
            difficulty: 'Intermediate',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Because qubits are defined by probability amplitudes (which are complex numbers), they possess wavelike properties. Just like ripples in a pond, these probability waves can exhibit <strong>interference</strong>.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  In a classical computer, probabilities are always positive numbers. In a quantum computer, probability amplitudes can be negative or imaginary. This means they can cancel each other out!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0', padding: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: 'var(--success)', fontSize: '32px', fontWeight: 'bold' }}>🌊 + 🌊 = 🏄</div>
                      <h4 style={{ color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Constructive Interference</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '200px', margin: '0 auto' }}>When the peaks of two waves align, they amplify each other, making the outcome more likely.</p>
                    </div>
                    <div style={{ width: '1px', height: '100px', background: 'var(--surface-border)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: 'var(--error)', fontSize: '32px', fontWeight: 'bold' }}>🌊 + 📉 = ➖</div>
                      <h4 style={{ color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Destructive Interference</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '200px', margin: '0 auto' }}>When a peak aligns with a trough, they cancel each other out, making the outcome impossible.</p>
                    </div>
                  </div>
                </div>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <strong>How Quantum Algorithms Work:</strong> A quantum algorithm (like Grover's Algorithm) is essentially a carefully choreographed dance of interference. The algorithm is designed to create <em>destructive interference</em> for all the wrong answers, shrinking their probability to zero, while creating <em>constructive interference</em> for the right answer, boosting its probability to near 100%. When you finally measure the system, the correct answer is the only one left standing!
                </p>
              </>
            ),
            practiceGoal: 'Learn how quantum algorithms use interference to find answers.'
          },
          {
            id: 13,
            title: 'No Cloning Theorem',
            description: 'Why you cannot copy a quantum state.',
            difficulty: 'Intermediate',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  In classical computing, copying data is trivial. You can easily duplicate a file, backup a hard drive, or press CTRL+C and CTRL+V to clone bits. 
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  However, quantum mechanics forbids this. The <strong>No-Cloning Theorem</strong> states that it is fundamentally impossible to create an identical copy of an arbitrary unknown quantum state.
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0', padding: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold', color: '#000', boxShadow: '0 0 15px var(--accent-primary)' }}>|ψ⟩</div>
                      <span style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>Original Qubit</span>
                    </div>
                    <div style={{ fontSize: '32px', color: 'var(--error)', fontWeight: 'bold' }}>➔ ❌ ➔</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: '#000', opacity: 0.3, border: '2px dashed #000' }}>|ψ⟩</div>
                        <span style={{ fontSize: '12px', color: 'var(--error)' }}>Failed Copy</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: '#000', opacity: 0.3, border: '2px dashed #000' }}>|ψ⟩</div>
                        <span style={{ fontSize: '12px', color: 'var(--error)' }}>Failed Copy</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '16px' }}>Why is this a big deal?</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  This theorem creates major hurdles for quantum computer engineering, because you cannot simply backup a quantum calculation if something goes wrong.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  However, it is a massive <em>advantage</em> for <strong>Quantum Cryptography</strong>. Because quantum states cannot be copied, an eavesdropper cannot intercept and copy a quantum message without destroying or altering the original state. If someone tries to spy on a quantum communication channel, the laws of physics guarantee that the sender and receiver will immediately know!
                </p>
              </>
            ),
            practiceGoal: 'Understand the No-Cloning Theorem and its security implications.'
          },
          {
            id: 14,
            title: 'Coherence and Decoherence',
            description: 'The extreme fragility of quantum information.',
            difficulty: 'Advanced',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <strong>Coherence</strong> refers to the pristine state where qubits are undisturbed and maintain their delicate superposition and phase relationships. A quantum computer can only perform its calculations while it remains coherent.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  <strong>Decoherence</strong> is the enemy of quantum computing. It is the process by which a quantum system loses its quantum behavior and reverts back to classical physics due to interactions with the surrounding environment.
                </p>
                
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', margin: '32px 0' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginTop: 0, marginBottom: '24px', textAlign: 'center' }}>The Journey to Decoherence</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '40px', right: '40px', height: '4px', background: 'linear-gradient(90deg, var(--accent-primary) 0%, rgba(255,255,255,0.1) 100%)', zIndex: 0, transform: 'translateY(-50%)' }}></div>
                    
                    <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', padding: '10px' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>💎</div>
                      <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>Coherent Qubit</span>
                    </div>
                    
                    <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', padding: '10px' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌡️</div>
                      <span style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 'bold' }}>Heat / Noise</span>
                    </div>

                    <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', padding: '10px' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px', filter: 'grayscale(1)' }}>🪨</div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Classical Bit</span>
                    </div>
                  </div>
                </div>

                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Qubits are incredibly sensitive. Even a stray photon, a tiny fluctuation in temperature, or weak electromagnetic radiation from nearby wires can cause decoherence.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  This is why many quantum computers use <strong>Dilution Refrigerators</strong> to cool the quantum chip down to around 0.015 Kelvin (colder than interstellar space!). Researchers measure qubit quality using T1 (relaxation time) and T2 (dephasing time). Extending these coherence times is the biggest hardware challenge in building a large-scale quantum computer.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  If engineers can discover a highly stable, room-temperature quantum building block—a &quot;quantum transistor&quot;—it would revolutionize the industry. While quantum computers will likely work alongside classical ones rather than replacing them entirely, such a breakthrough would make classical computers obsolete for a vast array of complex tasks.
                </p>
              </>
            ),
            practiceGoal: 'Learn why quantum computers must be kept incredibly cold and isolated.'
          },
          {
            id: 15,
            title: 'Bloch Sphere',
            description: 'Visualize a qubit in 3D space.',
            difficulty: 'Advanced',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  While a classical bit can only be represented as two points on a line (0 or 1), a qubit is vastly more complex. To visualize the pure state space of a qubit, physicists use a 3D geometric model known as the <strong>Bloch Sphere</strong>.
                </p>
                
                <div style={{ display: 'flex', gap: '32px', margin: '32px 0', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', display: 'flex', justifyContent: 'center', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', minWidth: '300px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 300 300" style={{ maxWidth: '300px', width: '100%', filter: 'drop-shadow(0 0 20px rgba(69,243,255,0.2))' }}>
                      <defs>
                        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                          <stop offset="60%" stopColor="rgba(69, 243, 255, 0.05)" />
                          <stop offset="100%" stopColor="rgba(69, 243, 255, 0.15)" />
                        </radialGradient>
                        <marker id="arrowhead-axis" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.8)" />
                        </marker>
                        <marker id="arrowhead-vector" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#45f3ff" />
                        </marker>
                      </defs>
                      
                      {/* Back half of equator */}
                      <path d="M 50 150 A 100 35 0 0 1 250 150" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                      
                      {/* Sphere outline with gradient */}
                      <circle cx="150" cy="150" r="100" fill="url(#sphereGrad)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                      
                      {/* Front half of equator */}
                      <path d="M 50 150 A 100 35 0 0 0 250 150" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeDasharray="4 4" />
                      
                      {/* Axes */}
                      {/* Z-axis */}
                      <line x1="150" y1="260" x2="150" y2="30" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" markerEnd="url(#arrowhead-axis)" />
                      
                      {/* Y-axis */}
                      <line x1="150" y1="150" x2="280" y2="150" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" markerEnd="url(#arrowhead-axis)" />
                      
                      {/* X-axis */}
                      <line x1="150" y1="150" x2="45" y2="200" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" markerEnd="url(#arrowhead-axis)" />
                    
                      {/* Projections */}
                      {/* Center to projection on equator */}
                      <line x1="150" y1="150" x2="200" y2="175" stroke="rgba(69,243,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                      {/* Vector tip to projection */}
                      <line x1="200" y1="80" x2="200" y2="175" stroke="rgba(69,243,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* Angles */}
                      {/* Theta arc */}
                      <path d="M 150 100 Q 165 100 175 115" fill="none" stroke="#45f3ff" strokeWidth="1.5" />
                      {/* Phi arc: from X-axis to projection */}
                      <path d="M 85 180 Q 140 200 200 175" fill="none" stroke="#45f3ff" strokeWidth="1.5" />
                      
                      {/* State Vector |ψ⟩ */}
                      <line x1="150" y1="150" x2="200" y2="80" stroke="#45f3ff" strokeWidth="3" markerEnd="url(#arrowhead-vector)" />
                      
                      {/* Labels */}
                      <text x="160" y="45" fill="rgba(255,255,255,0.9)" fontSize="20" fontWeight="bold">|0⟩</text>
                      <text x="160" y="275" fill="rgba(255,255,255,0.9)" fontSize="20" fontWeight="bold">|1⟩</text>
                      <text x="210" y="75" fill="#45f3ff" fontSize="20" fontWeight="bold">|ψ⟩</text>
                      
                      <text x="160" y="90" fill="#45f3ff" fontSize="20" fontStyle="italic" fontWeight="bold">θ</text>
                      <text x="135" y="195" fill="#45f3ff" fontSize="20" fontStyle="italic" fontWeight="bold">φ</text>
                    
                      <text x="5" y="225" fill="#fff" fontSize="14">|0⟩ + |1⟩</text>
                      <line x1="5" y1="230" x2="65" y2="230" stroke="#fff" strokeWidth="1" />
                      <text x="25" y="245" fill="#fff" fontSize="14">√2</text>
                      
                      <text x="225" y="125" fill="#fff" fontSize="14">|0⟩ + i|1⟩</text>
                      <line x1="225" y1="130" x2="295" y2="130" stroke="#fff" strokeWidth="1" />
                      <text x="250" y="145" fill="#fff" fontSize="14">√2</text>
                    
                      {/* Dots */}
                      <circle cx="150" cy="50" r="5" fill="#4dabf7" />
                      <circle cx="150" cy="250" r="5" fill="#ff6b6b" />
                      <circle cx="200" cy="80" r="4" fill="#b026ff" />
                      <circle cx="70" cy="188" r="5" fill="#fff" />
                      <circle cx="250" cy="150" r="5" fill="#fff" />
                    </svg>
                  </div>
                  
                  <div style={{ flex: '1', minWidth: '300px' }}>
                    <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px' }}>Navigating the Sphere</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                      <li style={{ marginBottom: '12px' }}><strong>The Poles:</strong> The absolute top of the sphere represents the classical state <strong>|0⟩</strong>. The absolute bottom represents the state <strong>|1⟩</strong>.</li>
                      <li style={{ marginBottom: '12px' }}><strong>The Surface:</strong> Any point on the surface of the sphere represents a valid quantum state. The arrow pointing from the center to the surface is the state vector <strong>|ψ⟩</strong>.</li>
                      <li style={{ marginBottom: '12px' }}><strong>The Equator:</strong> Points directly on the equator represent an exact 50/50 superposition of |0⟩ and |1⟩ (often denoted as |+⟩ and |-⟩). They are perfectly halfway between 0 and 1.</li>
                    </ul>
                    <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px', marginTop: '24px' }}>Angular Representation (θ and φ)</h3>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      A quantum state can be mathematically defined using two angles on the sphere:
                    </p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                      <li style={{ marginBottom: '12px' }}><strong>Theta (θ):</strong> The <em>polar angle</em> measured from the North Pole (Z-axis). It determines the probability of measuring 0 versus 1. Ranges from 0 to π.</li>
                      <li style={{ marginBottom: '12px' }}><strong>Phi (φ):</strong> The <em>azimuthal angle</em> measured around the equator (X-Y plane). It represents the quantum phase. Ranges from 0 to 2π.</li>
                    </ul>
                    <div style={{ background: '#222', padding: '12px', borderRadius: '8px', border: '1px solid #444', fontFamily: 'monospace', color: 'var(--accent-primary)', textAlign: 'center', marginBottom: '16px' }}>
                      |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '14px' }}>Note: Applying a quantum gate (like an X-gate or H-gate) mathematically alters θ and φ, effectively rotating this arrow around the sphere!</p>
                  </div>
                </div>
              </>
            ),
            practiceGoal: 'Visualize the vast state space of a single qubit.'
          },
          {
            id: 9,
            title: 'Quiz',
            prerequisiteId: 5,
            description: 'Test your knowledge on qubits and superposition.',
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
            practiceGoal: 'Score a perfect 5/5 to earn a point!',
            quizzes: [
              // Easy
              {
                question: "What is the fundamental difference between a classical bit and a qubit?",
                options: ["A classical bit can hold more data.", "A qubit can be 0, 1, or a combination of both simultaneously.", "A classical bit processes information faster.", "A qubit can only be exactly 0 or exactly 1."],
                correctAnswerIndex: 1,
                explanation: "Unlike a classical bit which is strictly binary, a qubit can exist in a superposition of both states."
              },
              {
                question: "In the spinning coin analogy, what does the spinning coin represent?",
                options: ["A measured qubit", "A classical bit", "A qubit in superposition", "A qubit undergoing decoherence"],
                correctAnswerIndex: 2,
                explanation: "A spinning coin is a blur of heads and tails, representing a qubit in superposition before it is measured."
              },
              {
                question: "What happens to a qubit in superposition when it is measured?",
                options: ["It remains in superposition forever.", "It turns into two separate qubits.", "It instantly collapses into a definite state (0 or 1).", "It clones itself."],
                correctAnswerIndex: 2,
                explanation: "Measuring a qubit forces it to make a decision and instantly collapse into a classical state."
              },
              {
                question: "Which part of the Bloch Sphere represents the classical state |1⟩?",
                options: ["The absolute top (North Pole)", "The absolute bottom (South Pole)", "The exact center of the sphere", "Anywhere on the equator"],
                correctAnswerIndex: 1,
                explanation: "The South Pole of the Bloch sphere represents the state |1⟩, while the North Pole represents |0⟩."
              },
              {
                question: "What is the process called when a quantum system loses its quantum behavior due to environmental noise?",
                options: ["Coherence", "Superposition", "Decoherence", "Interference"],
                correctAnswerIndex: 2,
                explanation: "Decoherence is when a qubit's delicate state is destroyed by interaction with the environment."
              },
              // Medium
              {
                question: "How many states can a system of n qubits represent simultaneously due to superposition?",
                options: ["2 × n", "n²", "2^n", "Infinite"],
                correctAnswerIndex: 2,
                explanation: "Because of superposition, adding a qubit doubles the number of simultaneous states, leading to 2^n exponential growth."
              },
              {
                question: "In Dirac notation for a qubit (|ψ⟩ = α|0⟩ + β|1⟩), what do α and β represent?",
                options: ["The physical coordinates of the qubit", "Probability amplitudes that are complex numbers", "The temperature of the quantum system", "The number of photons"],
                correctAnswerIndex: 1,
                explanation: "α and β are complex probability amplitudes that determine the superposition."
              },
              {
                question: "According to the Normalization Rule, what must the sum of the absolute squares of the amplitudes (|α|² + |β|²) equal?",
                options: ["0", "1", "2^n", "100"],
                correctAnswerIndex: 1,
                explanation: "Because probabilities must add up to 100% (or 1), |α|² + |β|² must strictly equal 1."
              },
              {
                question: "Which wavelike property of qubits explains how quantum algorithms amplify the correct answer while canceling out wrong answers?",
                options: ["No-Cloning Theorem", "Decoherence", "Interference", "Measurement Collapse"],
                correctAnswerIndex: 2,
                explanation: "Quantum algorithms use constructive and destructive interference to find the correct answer."
              },
              {
                question: "What do points directly on the equator of the Bloch Sphere represent?",
                options: ["A definite state of exactly |0⟩", "A definite state of exactly |1⟩", "An exact 50/50 superposition of |0⟩ and |1⟩", "A state that has fully decohered"],
                correctAnswerIndex: 2,
                explanation: "The equator is halfway between the poles, representing states with equal probabilities for 0 and 1."
              },
              // Hard
              {
                question: "If a qubit's state is represented on the Bloch sphere with a polar angle (θ) of 45° and an azimuthal angle (φ) of 90°, what is its quantum state according to the formula |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩?",
                options: ["cos(22.5°)|0⟩ + i sin(22.5°)|1⟩", "cos(45°)|0⟩ + sin(45°)|1⟩", "|0⟩ + i|1⟩ / √2", "cos(22.5°)|0⟩ + sin(22.5°)|1⟩"],
                correctAnswerIndex: 0,
                explanation: "Substituting θ = 45° and φ = 90°: θ/2 = 22.5°, and e^(i90°) = i. Thus the state is cos(22.5°)|0⟩ + i sin(22.5°)|1⟩."
              },
              {
                question: "The No-Cloning Theorem forbids copying quantum states, which creates engineering hurdles but is a massive advantage for which field?",
                options: ["Quantum Cryptography", "Classical Data Storage", "CPU Manufacturing", "Operating Systems"],
                correctAnswerIndex: 0,
                explanation: "In Quantum Cryptography, the inability to copy a state means an eavesdropper cannot intercept data without alerting the sender."
              },
              {
                question: "Why are Dilution Refrigerators used to cool quantum chips to around 0.015 Kelvin?",
                options: ["To speed up the clock rate of the processor", "To prevent decoherence caused by heat and environmental noise", "To make the qubits visible to the naked eye", "To increase the electrical resistance of the wires"],
                correctAnswerIndex: 1,
                explanation: "Extreme cold is required to isolate qubits from environmental heat and noise, preventing decoherence."
              },
              {
                question: "In the angular representation of a qubit on the Bloch Sphere, what does the azimuthal angle (φ) represent?",
                options: ["The probability of measuring 0", "The quantum phase", "The total energy of the qubit", "The number of classical bits required to store the state"],
                correctAnswerIndex: 1,
                explanation: "The azimuthal angle φ circles the equator and represents the relative quantum phase between the |0⟩ and |1⟩ states."
              },
              {
                question: "If a qubit's probability amplitude for state |0⟩ is α, what is the actual probability of measuring the qubit as 0?",
                options: ["α", "1 - α", "|α|²", "α / 2"],
                correctAnswerIndex: 2,
                explanation: "The probability of measuring a state is the absolute square of its probability amplitude (|α|²)."
              },
              {
                question: "In the angular representation of a qubit (θ and φ), what does the angle θ (theta) control?",
                options: ["The probability of measuring |0⟩ vs |1⟩", "The relative phase between |0⟩ and |1⟩", "The speed of decoherence", "The entanglement strength"],
                correctAnswerIndex: 0,
                explanation: "Theta (θ) determines the latitude on the Bloch sphere, which directly controls the probabilities of measuring |0⟩ or |1⟩."
              },
              {
                question: "If a qubit's probability amplitude for |0⟩ is 1/√2, what is the probability of measuring 0?",
                options: ["100%", "25%", "50%", "70.7%"],
                correctAnswerIndex: 2,
                explanation: "The probability is the absolute square of the amplitude. (1/√2)² = 1/2, or 50%."
              },
              {
                question: "In the matrix representation of qubits, what does a column vector with 1 on top and 0 on the bottom represent?",
                options: ["State |1⟩", "State |0⟩", "A qubit in superposition", "A Pauli Gate"],
                correctAnswerIndex: 1,
                explanation: "The column vector [1; 0] is the standard mathematical matrix representation of the base state |0⟩."
              }
            ]
          }
        ]
      }
      ,{
        id: 16,
        title: 'Quantum Gates',
        description: 'Learn how we manipulate qubits to perform computations.',
        difficulty: 'Beginner',
        lessonContent: (
          <>
            <p style={{ marginBottom: '16px' }}>
              Just as classical computers use logic gates (AND, OR, NOT) to manipulate bits, quantum computers use <strong>Quantum Gates</strong> to manipulate qubits.
            </p>
            <p style={{ marginBottom: '16px' }}>
              In this module, we will explore the fundamental gates used in quantum computing, how they rotate the state of a qubit on the Bloch sphere, and how they create complex phenomena like entanglement.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', color: 'white' }}>Topics Covered</h4>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.6' }}>
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
        practiceGoal: 'Review the introduction and explore the subtopics in the sidebar.',
        subModules: [
          {
            id: 17,
            title: 'What are gates?',
            description: 'Understanding quantum gates as operations on qubits.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  A quantum gate is a basic quantum circuit operating on a small number of qubits. They are the building blocks of quantum algorithms.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Mathematically, quantum gates are represented by <strong>Unitary Matrices</strong>. Because they are unitary, all quantum gates are reversible (except for measurement). If you apply a gate, there is always a way to apply an inverse gate to perfectly undo the operation.
                </p>

                {/* Visual Info: Classical vs Quantum Gate */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  
                  {/* Classical Gate */}
                  <div style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Classical Logic Gate (NOT)</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', gap: '8px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>0</div>
                      
                      <div style={{ width: '20px', height: '2px', background: 'var(--surface-border)' }}></div>
                      
                      <div style={{ width: '60px', height: '60px', borderRadius: '4px', background: '#333', border: '2px solid #555', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', color: '#888', position: 'relative' }}>
                        NOT
                        <div style={{ position: 'absolute', right: '-12px', top: '50%', marginTop: '-4px', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #555', background: '#333' }}></div>
                      </div>

                      <div style={{ width: '20px', height: '2px', background: 'var(--surface-border)', marginLeft: '8px' }}></div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#888' }}>1</div>
                    </div>
                    
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                      Flips the state of a classical bit. It turns a 0 into a 1, and a 1 into a 0.
                    </p>
                  </div>

                  {/* Quantum Gate */}
                  <div style={{ flex: '1', minWidth: '250px', textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Quantum Gate (X Gate)</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                      
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>|0⟩</div>
                      
                      <div style={{ position: 'relative', width: '80px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 12px' }}>
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'var(--surface-border)' }}></div>
                        
                        <div style={{ zIndex: 1, width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(69,243,255,0.1)', border: '2px solid var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold', color: 'var(--accent-primary)', boxShadow: '0 0 15px rgba(69,243,255,0.2)' }}>
                          X
                        </div>
                      </div>

                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>|1⟩</div>

                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                      The quantum equivalent of a NOT gate. It takes a qubit from one state to another.
                    </p>
                  </div>
                </div>

              </>
            ),
            practiceGoal: 'Understand the concept of a quantum gate and unitarity.',
          },
          {
            id: 18,
            title: 'Single Qubit Gates',
            description: 'Introduction to gates that act on a single qubit.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Single-qubit gates change the state of exactly one qubit at a time. Because qubits are represented as points on the surface of a sphere, any single-qubit gate mathematically corresponds to a <strong>rotation</strong> of the state vector around the X, Y, or Z axes.
                </p>

                {/* Visual Info: Airplane on a Globe */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', alignItems: 'center' }}>
                  <div style={{ flex: '1', minWidth: '250px' }}>
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '4px solid #fff' }}>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        <strong>Analogy:</strong> Just as an airplane takes you from one city to another on the surface of the Earth, a single-qubit quantum gate takes a qubit from one point to another on the surface of the Bloch sphere. 
                        <br/><br/>
                        For example, the <strong>X gate</strong> is like flying from the North Pole (state <strong style={{ color: 'var(--text-primary)' }}>|0⟩</strong>) directly to the South Pole (state <strong style={{ color: 'var(--accent-primary)' }}>|1⟩</strong>)!
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ flex: '1', minWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '16px' }}>
                    {/* CSS representation of a globe/Bloch sphere with a path */}
                    <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', border: '2px solid rgba(69,243,255,0.3)', background: 'radial-gradient(circle at 30% 30%, rgba(69,243,255,0.1), transparent)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {/* Equator & Meridian */}
                      <div style={{ position: 'absolute', width: '100%', height: '40px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', height: '100%', width: '40px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
                      
                      {/* North Pole |0> */}
                      <div style={{ position: 'absolute', top: '-24px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>|0⟩</div>
                      <div style={{ position: 'absolute', top: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-primary)' }}></div>
                      
                      {/* South Pole |1> */}
                      <div style={{ position: 'absolute', bottom: '-28px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>|1⟩</div>
                      <div style={{ position: 'absolute', bottom: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></div>
                      
                      {/* Flight Path Arc */}
                      <div style={{ position: 'absolute', left: '-20px', width: '80px', height: '120px', borderLeft: '3px dashed var(--accent-primary)', borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px', borderTop: 'transparent', borderBottom: 'transparent', opacity: 0.8 }}>
                        {/* Airplane marker (using a triangle) */}
                        <div style={{ position: 'absolute', top: '50%', left: '-8.5px', marginTop: '-6px', width: '0', height: '0', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderTopWidth: '8px', borderRight: '14px solid var(--accent-primary)', transform: 'rotate(-90deg)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
            practiceGoal: 'Recognize that single-qubit gates are rotations on the Bloch sphere.',
          },
          {
            id: 19,
            title: 'Pauli Gates',
            description: 'The fundamental X, Y, and Z gates.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  The Pauli gates are the most fundamental single-qubit operations. Geometrically, they correspond to <strong>180-degree rotations</strong> around the X, Y, and Z axes of the Bloch sphere.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '32px 0' }}>
                  
                  {/* Pauli X */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>Pauli-X (NOT Gate)</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the state 180° around the <strong>X-axis</strong>. It flips |0⟩ to |1⟩ and |1⟩ to |0⟩, acting just like a classical NOT gate.
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>X =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid var(--accent-primary)', borderTop: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid var(--accent-primary)', borderTop: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)' }}></div>
                            <div style={{ fontSize: '20px', lineHeight: '1.4', textAlign: 'center' }}>0 &nbsp; 1<br/>1 &nbsp; 0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pauli Y */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>Pauli-Y</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the state 180° around the <strong>Y-axis</strong>. It maps |0⟩ to i|1⟩ and |1⟩ to -i|0⟩, introducing complex phases.
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#ff6b6b', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>Y =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid #ff6b6b', borderTop: '2px solid #ff6b6b', borderBottom: '2px solid #ff6b6b' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid #ff6b6b', borderTop: '2px solid #ff6b6b', borderBottom: '2px solid #ff6b6b' }}></div>
                            <div style={{ fontSize: '20px', lineHeight: '1.4', textAlign: 'center' }}>0 &nbsp; -i<br/>i &nbsp; &nbsp;0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pauli Z */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>Pauli-Z (Phase Flip)</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the state 180° around the <strong>Z-axis</strong>. It leaves |0⟩ unchanged but flips the sign of |1⟩ to -|1⟩ (changing the quantum phase).
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>Z =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid #4CAF50', borderTop: '2px solid #4CAF50', borderBottom: '2px solid #4CAF50' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid #4CAF50', borderTop: '2px solid #4CAF50', borderBottom: '2px solid #4CAF50' }}></div>
                            <div style={{ fontSize: '20px', lineHeight: '1.4', textAlign: 'center' }}>1 &nbsp; &nbsp;0<br/>0 &nbsp; -1</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            ),
            practiceGoal: 'Learn the effects of the X, Y, and Z Pauli gates.',
          },
          {
            id: 20,
            title: 'Phase Gates',
            description: 'The S and T phase shift gates.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  Phase gates rotate the state around the Z-axis by specific fractions of a circle. Importantly, a rotation around the Z-axis <strong>only affects the azimuthal angle (φ)</strong>, leaving the probability of measuring |0⟩ or |1⟩ unchanged. It only changes the quantum phase!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '32px 0' }}>
                  
                  {/* S Gate */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>S Gate (Phase Gate)</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the state by <strong>90 degrees (π/2)</strong> around the Z-axis. Applying it twice equals a Pauli-Z gate.
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#ffb84d', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>S =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid #ffb84d', borderTop: '2px solid #ffb84d', borderBottom: '2px solid #ffb84d' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid #ffb84d', borderTop: '2px solid #ffb84d', borderBottom: '2px solid #ffb84d' }}></div>
                            <div style={{ fontSize: '20px', lineHeight: '1.4', textAlign: 'center' }}>1 &nbsp; 0<br/>0 &nbsp; i</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* T Gate */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>T Gate</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the state by <strong>45 degrees (π/4)</strong> around the Z-axis. Applying it twice equals an S gate.
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#ffb84d', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>T =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid #ffb84d', borderTop: '2px solid #ffb84d', borderBottom: '2px solid #ffb84d' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid #ffb84d', borderTop: '2px solid #ffb84d', borderBottom: '2px solid #ffb84d' }}></div>
                            <div style={{ fontSize: '20px', lineHeight: '1.4', textAlign: 'center' }}>1 &nbsp; &nbsp;0<br/>0 &nbsp; e<sup>iπ/4</sup></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            ),
            practiceGoal: 'Understand fractional Z-axis rotations.',
          },
          {
            id: 21,
            title: 'Rotation Gates',
            description: 'Arbitrary angle rotations Rx, Ry, and Rz.',
            difficulty: 'Intermediate',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  While Pauli and Phase gates represent fixed, predefined rotations, <strong>Rotation Gates</strong> allow you to specify a <strong>custom angle θ (theta)</strong> to rotate a qubit by any arbitrary amount around the X, Y, or Z axes.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '32px 0' }}>
                  
                  {/* Rx Gate */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>Rx(θ)</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the qubit by angle θ around the <strong>X-axis</strong>.
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>Rx =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid var(--accent-primary)', borderTop: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid var(--accent-primary)', borderTop: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)' }}></div>
                            <div style={{ fontSize: '16px', lineHeight: '1.4', textAlign: 'center' }}>cos(θ/2) &nbsp; -i sin(θ/2)<br/>-i sin(θ/2) &nbsp; cos(θ/2)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ry Gate */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>Ry(θ)</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the qubit by angle θ around the <strong>Y-axis</strong>.
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#ff6b6b', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>Ry =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid #ff6b6b', borderTop: '2px solid #ff6b6b', borderBottom: '2px solid #ff6b6b' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid #ff6b6b', borderTop: '2px solid #ff6b6b', borderBottom: '2px solid #ff6b6b' }}></div>
                            <div style={{ fontSize: '16px', lineHeight: '1.4', textAlign: 'center' }}>cos(θ/2) &nbsp; -sin(θ/2)<br/>sin(θ/2) &nbsp; cos(θ/2)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rz Gate */}
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ flex: '2', minWidth: '200px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>Rz(θ)</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          Rotates the qubit by angle θ around the <strong>Z-axis</strong>.
                        </p>
                      </div>
                      <div style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>Rz =</span>
                          <div style={{ display: 'inline-block', position: 'relative', padding: '0 12px' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', borderLeft: '2px solid #4CAF50', borderTop: '2px solid #4CAF50', borderBottom: '2px solid #4CAF50' }}></div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px', borderRight: '2px solid #4CAF50', borderTop: '2px solid #4CAF50', borderBottom: '2px solid #4CAF50' }}></div>
                            <div style={{ fontSize: '16px', lineHeight: '1.4', textAlign: 'center' }}>e<sup>-iθ/2</sup> &nbsp; 0<br/>0 &nbsp; e<sup>iθ/2</sup></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  These are essential for fine-tuning states in algorithms like VQE (Variational Quantum Eigensolver).
                </p>
              </>
            ),
            practiceGoal: 'Learn about continuous rotation gates.',
          },
          {
            id: 22,
            title: '2-Qubit Gates',
            description: 'Operations that involve two qubits, like CNOT and SWAP.',
            difficulty: 'Intermediate',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  Two-qubit gates allow qubits to interact with each other. The most famous is the <strong>CNOT (Controlled-NOT)</strong> gate.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  A CNOT gate has a <em>control</em> qubit and a <em>target</em> qubit. If the control qubit is |1⟩, it applies an X gate (NOT) to the target. If the control is |0⟩, it does nothing.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Another common gate is the <strong>SWAP</strong> gate, which literally exchanges the states of two qubits.
                </p>
              </>
            ),
            practiceGoal: 'Understand how qubits interact through controlled gates.',
          },
          {
            id: 23,
            title: 'Entanglement',
            description: 'Spooky action at a distance and Bell States.',
            difficulty: 'Advanced',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  When a Hadamard gate is combined with a CNOT gate, they create <strong>Entanglement</strong>.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Entanglement is a unique quantum phenomenon where the state of two or more qubits becomes perfectly correlated. Measuring one qubit instantly dictates the state of the other, no matter how far apart they are. Einstein famously called this "spooky action at a distance."
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Entanglement is the core resource that makes quantum teleportation and quantum cryptography possible.
                </p>
              </>
            ),
            practiceGoal: 'Learn how to create an entangled pair of qubits.',
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
