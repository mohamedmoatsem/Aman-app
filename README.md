# 🛡️ Aman (أمان) — A Digital Beacon of Hope in Conflict Zones

> *"In the darkest of circumstances, the right to psychological safety remains a fundamental human right."*

**Aman** is not just an application. It is a digital companion, a safe space, and a bridge of hope for individuals whose daily lives have been torn apart by war. This project was born in the heart of one of the world's most complex humanitarian crises—Sudan—to bear witness that technology, in its purest form, can be a lifeline.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://aman-app--mohamedmoatsem9.replit.app/)
[![Gemma4 Competition](https://img.shields.io/badge/Gemma4-Competition-blue)](https://ai.google.dev/competitions/gemma4)

---

## 🚨 The Human Context: Why "Aman" Was Born

To grasp the significance of Aman, one must first understand the magnitude of the silent catastrophe it addresses. The statistics paint a stark picture of a nation's mental health infrastructure in crisis.

According to the **Sudanese Federal Ministry of Health (2020)** , a nation of over 40 million people is served by fewer than **100 registered psychiatrists**. This devastating shortage means there is roughly **one psychiatrist for every 400,000 citizens**, a ratio that collapses entirely in active conflict zones where most healthcare facilities have been destroyed or abandoned.

This gap is not just a number; it represents millions of individuals—men, women, and children—left to grapple with trauma, anxiety, and grief in total isolation. In this painful void, where silence and stigma are the norm, "Aman" arrives as a whispering voice saying: *"You are not alone."*

---

## 🌟 What is "Aman"?

"Aman" is a progressive web application (PWA) meticulously designed to provide **immediate, anonymous, and round-the-clock psychological first aid** to Arabic speakers in conflict-affected regions. It is not a substitute for a therapist, but rather the first, outstretched hand that helps a user to:

1.  **Understand Their Feelings:** Via a simple, icon-based daily mood tracker.
2.  **Find Solace:** In science-backed daily support messages and tips.
3.  **Learn & Build Resilience:** Through a resource library grounded in WHO guidelines for mental health in emergencies.
4.  **Seek Professional Help:** Via a secure, encrypted channel to connect with one of the available mental health specialists.

The core feature is the **"Aman" AI Companion**, powered by Google's **Gemma 4 (26B)** model. It offers instant, empathetic conversation in fluent Arabic, serving as a listening ear in moments of profound loneliness.

---

## ✨ Key Features

| Feature | Technical Description | Psychological Impact |
| :--- | :--- | :--- |
| **🤖 The Gemma AI Companion** | Real-time Arabic chat powered by `gemma-4-26b-a4b-it`. Tuned with strict prompt engineering for empathy, safety, and diagnostic refusal. | Breaks the cycle of isolation and provides immediate, non-judgmental listening, free from stigma. |
| **📊 Mood Tracker** | A simple 1-5 visual icon interface, allowing expression without the need for complex literacy. | Builds self-awareness of one's emotional state—the critical first step in any healing journey. |
| **📚 Psycho-Educational Library** | Fast-loading, static content organized into Tips, Rights, and WHO Resources. | Empowers the user with trusted, actionable knowledge to manage trauma and anxiety. |
| **💬 Specialist Connection** | A secure, end-to-end encrypted chat system linking the user directly to an available specialist. | Provides a critical escalation pathway for individuals needing professional human intervention. |
| **☀️ Daily Support** | A simple subscription system delivering daily motivational messages and tips. | Builds a routine of hope and consistent support, a vital anchor in unstable environments. |
| **📱 Adversity-Ready Design** | A text-first, mobile-optimized interface with a calming color palette. | Guarantees functionality on the weakest devices and slowest 2G/3G networks. |

---

## 🧠 Technology Stack & Architecture

"Aman" is built on a philosophy of "simplicity in the face of chaos." Every technical choice serves a single purpose: **to be accessible and reliable when everything else has failed.**

| Layer | Technology | The "Why" |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | No heavy frameworks. Near-instant loading even on a 2G connection. Every kilobyte counts in a war zone. |
| **Backend** | Python (Flask) | Simple, robust, and easily deployable on virtually any server. |
| **Artificial Intelligence** | **Gemma 4 (26B)** via API | The heart of the app. We use the instruction-tuned `gemma-4-26b-a4b-it` model, controlled by strict system prompts to be empathetic, refuse diagnosis, and always encourage professional help. |
| **Hosting** | **Replit** | Enables rapid prototyping and continuous deployment without complex infrastructure, minimizing maintenance overhead. |
| **Database** | SQLite | A lightweight, serverless database, perfect for resource-constrained environments. |
| **Security** | HTTPS/TLS, Chat Encryption | The privacy and confidentiality of the user is an absolute ethical and legal priority, especially in conflict contexts. |

---

## 🗺️ Roadmap to Global Scalability

"Aman" is not designed to remain on a single screen. Its lightweight architecture allows for massive horizontal expansion:

1.  **Multilingual Support:** The framework is ready to onboard other languages spoken by marginalized communities in crisis (e.g., Swahili, Amharic, Ukrainian, Pashto) by simply adding translation files and tuning the Gemma prompt.
2.  **"Camp Mode" (Offline Mesh):** We envision a decentralized version that can run on a local mesh network within a refugee camp, using a quantized version of Gemma to provide support without any global internet.
3.  **Integration with Humanitarian Organizations:** Aman can be transformed into a broadcast tool for NGOs to send safety announcements, mobile clinic schedules, and local emergency numbers directly to users.

---
## 🚀 Quick Start (Local Development)

Follow these steps to run Aman on your local machine.

### Prerequisites
- Python 3.9 or higher
- pip (Python package installer)
- A Gemma API key (get one from [Google AI Studio](https://aistudio.google.com/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamedmoatsem9/Aman-app.git
   cd Aman-app
```

1. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```
2. Set up environment variables
   · Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   · Open .env and fill in your keys:
     ```env
     GEMMA_API_KEY=your_gemma_api_key_here
     GEMMA_MODEL=gemma-4-26b-a4b-it
     SECRET_KEY=your_random_secret_key
     DATABASE_URL=sqlite:///aman.db
     ```
3. Run the application
   ```bash
   python app.py
   ```
   The app will be available at http://localhost:5000.
4. Open in browser
   Navigate to http://localhost:5000 to see Aman in action.

Environment Variables Reference

Variable Description Default
GEMMA_API_KEY Your Gemma API key from Google AI Studio (Required)
GEMMA_MODEL The Gemma model variant to use gemma-4-26b-a4b-it
SECRET_KEY Flask secret key for session security (Required)
DATABASE_URL Database connection string sqlite:///aman.db

## 💔 Challenges: The Full Picture Behind the Code

Building an application in a war zone is unlike building one in a tech hub. Every line of Aman's code was written while the following were our reality:

### 1. 📡 The Invisible Enemy: Unstable Internet & Power
*   **Constant Power Outages:** Work was done in short bursts, dictated by the availability of generator fuel or limited solar battery charge.
*   **Extremely Low Bandwidth:** Internet speed often did not exceed a few kilobits per second. This forced us to design a **near-text-only UI (Text-First UI)** with a total footprint under 500KB, ensuring a user could load it in under 10 seconds on the slowest connection. Every image was stripped unless absolutely critical for understanding.

### 2. 🚶 Dangerous & Difficult Mobility
*   **Finding Specialists:** Interviewing doctors and mental health professionals for collaboration required long, often dangerous journeys.
*   **User Testing in the Field:** Traditional usability testing was impossible. We relied on remote feedback from individuals in different communities, building digital trust that had to overcome immense barriers of fear and insecurity.

### 3. 🧠 Technical & Ethical Challenges
*   **Ensuring AI Safety:** The greatest challenge was making the Gemma model 100% safe. In mental health, an inappropriate response can be deeply harmful. Countless hours were spent on **prompt engineering** to ensure the companion is empathetic, non-judgmental, and always defers emergencies to a human professional.
*   **Building Trust in a Zero-Trust Environment:** People in conflict zones are deeply wary. Aman had to be built to request no personal data (even a name is optional) and to display its medical disclaimer clearly, making it truly "Aman" (safe) in every sense of the word.

---

## 🤝 How You Can Contribute

"Aman" is an open-source community project. You can be a part of this story:

*   **🧑‍💻 Developers:** Help us add offline mesh networking, translate the app, or build an API for partner organizations.
*   **🧑‍⚕️ Mental Health Professionals:** Join our specialist network to support users, or help us review the scientific content in our library.
*   **🌍 Humanitarian Organizations:** Partner with us to deploy Aman within the communities you serve, ensuring it reaches those in the greatest need.
*   **🤲 Everyone:** Spread the word. Share Aman's story. Sometimes, reaching just one person can make all the difference.

---

## 🏆 Submission for the Gemma4 Competition

This project is our submission to the **Gemma4 Competition**. It demonstrates how a powerful, open-source LLM, when used with responsibility and creativity, can become a life-saving tool in the world's harshest environments. It is a testament that advanced technology is not a luxury—it can be a fundamental right.

---

## ⚠️ Disclaimer

**The Aman app is not a substitute for professional medical advice, diagnosis, or treatment.** It is a tool for psychological first aid and knowledge sharing. If you are in crisis, please go immediately to the nearest medical center or contact local emergency services.

---

> *"On a pitch-black night, a single star cannot dispel all the darkness, but it is enough to remind us the sky is still there, and that dawn is coming."* — For everyone searching for safety, this application was built.

*Built with ❤️ and unbreakable hope.*
