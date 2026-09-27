SWARMDEBUG ⚡


Get Live on: https://swarmdebug.netlify.app/

Autonomous Multi-Agent Debugging Platform: 

SwarmDebug is an advanced, parallel multi-agent software health intelligence platform designed to stress-test codebases, hunt anomalies across logs and runtime states, and generate guardrailed resolutions at swarm speed. Built for the IBM hackathon, it coordinates specialized AI subagents to tackle complex engineering incidents collaboratively.

🚀 Key Features


Parallel Signal Hunting: Three specialized agents inspect logs, state, and code concurrently to isolate anomalies instantly.

Context-Aware Diagnosis: Traces symptoms across repository history, runtime states, and dependency graphs.

Guardrailed Resolution: Automatically proposes explainable patches with confidence scores before any code reaches a protected branch.

Command Center UI: A dark-themed, responsive dashboard featuring real-time incident queues, repository health metrics, and interactive agent workflows.

🛠️ Tech Stack


Framework: Next.js (App Router)

Styling: Tailwind CSS

Icons: Lucide React

Language: TypeScript

State & Simulation: 

Custom multi-agent orchestration engine (swarmEngine.ts) with robust mock data simulation (db.ts) for seamless, high-performance demonstrations.

📦 Project Structure


Plaintext
SwarmDebug/
├── app/                  # Next.js App Router pages (Dashboard, Signup, etc.)
├── components/           # Reusable UI components & interactive carousels
├── lib/                  # Core simulation engine & mock data utilities
│   ├── swarmEngine.ts    # Multi-agent state machine and log orchestration
│   └── db.ts             # Repository statuses and incident queue mock data
├── public/               # Static assets and images
└── package.json          # Project dependencies and scripts
🏃‍♂️ Getting Started Locally


Clone the repository:

Bash


git clone https://github.com/Manish1678-sos/SwarmDebug.git


cd SwarmDebug


Install dependencies:

Bash


npm install


Run the development server:

Bash


npm run dev
Open your browser:
Navigate to http://localhost:3000 to access the application. (Note: Accessing via localhost ensures seamless WebSocket HMR handshakes).
