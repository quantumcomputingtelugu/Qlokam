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
                    <svg width="100%" height="100%" viewBox="0 0 300 300" style={{ maxWidth: '300px', width: '100%', filter: 'drop-shadow(0 0 20px rgba(69,243,255,0.15))' }}>
                      <defs>
                        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                          <stop offset="50%" stopColor="rgba(69, 243, 255, 0.05)" />
                          <stop offset="100%" stopColor="rgba(176, 38, 255, 0.2)" />
                        </radialGradient>
                        <marker id="arrowhead-z" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#4dabf7" />
                        </marker>
                        <marker id="arrowhead-y" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#69db7c" />
                        </marker>
                        <marker id="arrowhead-x" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#ff8787" />
                        </marker>
                        <marker id="arrowhead-purple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#b026ff" />
                        </marker>
                      </defs>
                      
                      {/* Back half of equator */}
                      <path d="M 50 150 A 100 35 0 0 1 250 150" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                      
                      {/* Sphere outline with gradient */}
                      <circle cx="150" cy="150" r="100" fill="url(#sphereGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                      
                      {/* Front half of equator */}
                      <path d="M 50 150 A 100 35 0 0 0 250 150" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeDasharray="4 4" />
                      
                      {/* Axes */}
                      {/* Z-axis */}
                      <line x1="150" y1="260" x2="150" y2="30" stroke="#4dabf7" strokeWidth="1.5" markerEnd="url(#arrowhead-z)" />
                      
                      {/* Y-axis */}
                      <line x1="150" y1="150" x2="280" y2="150" stroke="#69db7c" strokeWidth="1.5" markerEnd="url(#arrowhead-y)" />
                      
                      {/* X-axis */}
                      <line x1="150" y1="150" x2="45" y2="200" stroke="#ff8787" strokeWidth="1.5" markerEnd="url(#arrowhead-x)" />
                    
                      {/* Projections */}
                      {/* Center to projection on equator */}
                      <line x1="150" y1="150" x2="200" y2="175" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3 3" />
                      {/* Vector tip to projection */}
                      <line x1="200" y1="80" x2="200" y2="175" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* Angles */}
                      {/* Theta arc */}
                      <path d="M 150 100 Q 165 100 175 115" fill="none" stroke="#fcc419" strokeWidth="1.5" />
                      {/* Phi arc: from X-axis to projection */}
                      <path d="M 85 180 Q 140 200 200 175" fill="none" stroke="#fcc419" strokeWidth="1.5" />
                      
                      {/* State Vector |ψ⟩ */}
                      <line x1="150" y1="150" x2="200" y2="80" stroke="#b026ff" strokeWidth="3" markerEnd="url(#arrowhead-purple)" />
                      
                      {/* Labels */}
                      <text x="160" y="45" fill="#4dabf7" fontSize="20" fontWeight="bold">|0⟩</text>
                      <text x="160" y="275" fill="#ff6b6b" fontSize="20" fontWeight="bold">|1⟩</text>
                      <text x="210" y="75" fill="#b026ff" fontSize="20" fontWeight="bold">|ψ⟩</text>
                      
                      <text x="160" y="90" fill="#fcc419" fontSize="20" fontStyle="italic" fontWeight="bold">θ</text>
                      <text x="135" y="195" fill="#fcc419" fontSize="20" fontStyle="italic" fontWeight="bold">φ</text>
                    
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
              {
                question: "What does 'qubit' stand for?",
                options: ["Quality Bit", "Quantum Bit", "Quantized Byte", "Quadratic Bit"],
                correctAnswerIndex: 1,
                explanation: "Qubit stands for Quantum Bit, the basic unit of quantum information."
              },
              {
                question: "While a classical bit can be 0 or 1, a qubit can be in a state of 0, 1, or:",
                options: ["Neither 0 nor 1", "A combination of both 0 and 1 simultaneously", "Only 2", "Negative 1"],
                correctAnswerIndex: 1,
                explanation: "A qubit can be in a superposition, which is a combination of both 0 and 1 simultaneously."
              },
              {
                question: "What is the phenomenon called when a qubit exists in multiple states at once?",
                options: ["Entanglement", "Interference", "Superposition", "Decoherence"],
                correctAnswerIndex: 2,
                explanation: "Superposition allows a quantum system to exist in multiple states simultaneously."
              },
              {
                question: "What happens to a qubit in superposition when it is measured?",
                options: ["It remains in superposition", "It disappears", "It collapses into a definite state (0 or 1)", "It turns into two qubits"],
                correctAnswerIndex: 2,
                explanation: "Measuring a qubit forces it to collapse into a definite classical state, either 0 or 1."
              },
              {
                question: "In the coin toss analogy, what does the spinning coin represent?",
                options: ["A classical bit", "A qubit in a definite state of 1", "A qubit in a state of superposition", "A measured qubit"],
                correctAnswerIndex: 2,
                explanation: "A spinning coin is a blur of heads and tails, representing a qubit in superposition before it is measured."
              },
              {
                question: "If 1 qubit can represent 2 states simultaneously, how many states can 3 qubits represent?",
                options: ["3 states", "6 states", "8 states", "9 states"],
                correctAnswerIndex: 2,
                explanation: "The number of states grows exponentially as 2^n. For 3 qubits, it's 2^3 = 8 states."
              },
              {
                question: "Why is superposition useful for quantum computing?",
                options: ["It makes computers smaller", "It prevents computers from overheating", "It allows quantum computers to process a vast number of possibilities at once", "It stores more files on a hard drive"],
                correctAnswerIndex: 2,
                explanation: "Superposition allows quantum computers to perform calculations on many possibilities simultaneously."
              },
              {
                question: "True or False: A classical bit can be in a state of superposition.",
                options: ["True", "False"],
                correctAnswerIndex: 1,
                explanation: "False. A classical bit can only be exactly 0 or exactly 1."
              },
              {
                question: "When a coin is resting flat on a table (Heads or Tails), it is most like:",
                options: ["A qubit in superposition", "A classical bit", "An entangled state", "A quantum algorithm"],
                correctAnswerIndex: 1,
                explanation: "A resting coin is in a definite state (Heads or Tails), just like a classical bit (1 or 0)."
              },
              {
                question: "The power of a quantum computer grows ________ as you add more qubits.",
                options: ["Linearly", "Exponentially", "Logarithmically", "It does not grow"],
                correctAnswerIndex: 1,
                explanation: "Because of superposition, adding a qubit doubles the number of simultaneous states, leading to exponential growth."
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
