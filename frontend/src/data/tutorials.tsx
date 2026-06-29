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

                {/* MYTH 5 */}
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 5: "Current Quantum Computers Can Already Break All Encryption"</h3>
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
              },
              {
                question: "Which phenomenon allows a qubit to represent a combination of 0 and 1 simultaneously?",
                options: [
                  "Entanglement",
                  "Interference",
                  "Superposition"
                ],
                correctAnswerIndex: 2,
                explanation: "Superposition allows a quantum system to exist in a complex combination of multiple states at the same time."
              },
              {
                question: "What is the fundamental unit of information in a classical computer?",
                options: [
                  "Qubit",
                  "Byte",
                  "Bit"
                ],
                correctAnswerIndex: 2,
                explanation: "The bit (0 or 1) is the fundamental unit of classical information."
              },
              {
                question: "Which quantum phenomenon allows correct answers to be amplified and incorrect ones cancelled out?",
                options: [
                  "Interference",
                  "Superposition",
                  "Decoherence"
                ],
                correctAnswerIndex: 0,
                explanation: "Interference works like ripples on a pond, amplifying constructive patterns (correct answers) and cancelling destructive ones."
              },
              {
                question: "What happens when you measure a qubit in superposition?",
                options: [
                  "It stays in superposition forever",
                  "It collapses to a single definite state (0 or 1)",
                  "It duplicates itself"
                ],
                correctAnswerIndex: 1,
                explanation: "Measuring a quantum system forces it to collapse into a single observable state."
              },
              {
                question: "What is quantum entanglement?",
                options: [
                  "When a qubit gets stuck in a wire",
                  "A strong connection where the state of one qubit instantly relates to another",
                  "When a quantum algorithm fails"
                ],
                correctAnswerIndex: 1,
                explanation: "Entanglement is a unique quantum property where particles become inextricably linked regardless of distance."
              },
              {
                question: "In drug discovery, why might quantum computers be better than classical ones?",
                options: [
                  "They have better graphics cards",
                  "They can naturally model molecular mechanics and interactions",
                  "They can store more data on a hard drive"
                ],
                correctAnswerIndex: 1,
                explanation: "Quantum computers operate on the same quantum rules as molecules, making them naturally suited for chemical simulation."
              },
              {
                question: "Which cryptography system is theoretically vulnerable to future quantum computers?",
                options: [
                  "RSA (Prime Factorization)",
                  "AES (Symmetric Encryption)",
                  "Post-Quantum Cryptography"
                ],
                correctAnswerIndex: 0,
                explanation: "Shor's Algorithm on a sufficiently large quantum computer could break RSA by rapidly finding prime factors."
              },
              {
                question: "What is a common misconception about quantum computers?",
                options: [
                  "They use superposition and interference",
                  "They will replace classical computers completely",
                  "They require extremely cold temperatures"
                ],
                correctAnswerIndex: 1,
                explanation: "Quantum computers are specialized and will work alongside classical computers, not replace them."
              },
              {
                question: "Which of the following is NOT a strong use case for quantum computing?",
                options: [
                  "Logistics optimization",
                  "Playing modern video games",
                  "Material science research"
                ],
                correctAnswerIndex: 1,
                explanation: "Everyday tasks like video games run much more efficiently on general-purpose classical computers."
              },
              {
                question: "Why are quantum computers currently difficult to scale?",
                options: [
                  "We ran out of silicon",
                  "Qubits are highly sensitive to environmental noise",
                  "They require too much electricity"
                ],
                correctAnswerIndex: 1,
                explanation: "Quantum states are very delicate and easily disrupted by heat or electromagnetic interference."
              },
              {
                question: "What is the current era of quantum computing known as?",
                options: [
                  "The NISQ Era (Noisy Intermediate-Scale Quantum)",
                  "The Fault-Tolerant Era",
                  "The Golden Age"
                ],
                correctAnswerIndex: 0,
                explanation: "We are currently in the NISQ era, where computers have a small number of noisy qubits without error correction."
              },
              {
                question: "How many states can a classical bit hold at one time?",
                options: [
                  "Zero",
                  "One",
                  "Two"
                ],
                correctAnswerIndex: 1,
                explanation: "A classical bit is strictly in one state at any moment: either 0 or 1."
              },
              {
                question: "What type of problems are optimization problems?",
                options: [
                  "Finding the best solution among countless possibilities",
                  "Storing a large video file",
                  "Typing a document quickly"
                ],
                correctAnswerIndex: 0,
                explanation: "Optimization involves evaluating numerous configurations to find the most efficient one, like routing delivery trucks."
              }
            ]
          }
        ]
      },
      {
        id: 6,
        title: 'Qubit',
        description: 'Introduction to Qubits and their fundamental properties.',
        difficulty: 'Beginner',
        lessonContent: (
          <>
            <p style={{ marginBottom: '16px', fontSize: '18px', color: 'var(--text-secondary)' }}>
              Welcome to the <strong>Qubit</strong> topic! In this module, we will explore the fundamental building block of a quantum computer.
            </p>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>What&apos;s Inside This Module</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '32px', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>What is Qubit:</strong> A deep dive into the quantum bit.
              </li>
            </ul>
          </>
        ),
        practiceGoal: 'Understand the nature of a qubit.',
        subModules: [
          {
            id: 7,
            title: 'What is Qubit',
            description: 'Learn exactly what a qubit is and how it functions.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '16px' }}>The Quantum Bit</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  A qubit (short for quantum bit) is the basic unit of information in quantum computing. While a classical bit can only be a 0 or a 1, a qubit can exist in a superposition of both states simultaneously.
                </p>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  This unique property allows quantum computers to process a vast number of possibilities at once, giving them incredible power for specific types of problems.
                </p>
              </>
            ),
            practiceGoal: 'Learn what a qubit is.'
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
