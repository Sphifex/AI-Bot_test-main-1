# AI Bot Test and Demo
This project i have two differnt bots using OpenAI completions

Below is a simple, quick-start README with step-by-step instructions to set up and build your "ai-bot_test" project, including installing dependencies, creating a bot with OpenAI's API, and developing a system prompt for a car repair assistant.

---

## Quick Start README for "ai-bot_test" Project

Follow these steps to set up and run your AI bot project quickly.

### Step 1: Set Up the Project and Install Dependencies
1. **Create a Project Folder**:
   - Open your terminal or command prompt.
   - Run these commands to create and enter a new folder:
     ```bash
     mkdir ai-bot_test
     cd ai-bot_test
     ```

2. **Initialize the Project**:
   - Create a `package.json` file with default settings:
     ```bash
     npm init -y
     ```

3. **Update `package.json`**:
   - Open `package.json` in a text editor (e.g., VS Code) and replace its contents with this:
     ```json
     {
       "name": "ai-bot_test",
       "version": "1.0.0",
       "type": "module",
       "dependencies": {
         "fs": "^0.0.1-security",
         "openai": "^4.86.2",
         "path": "^0.12.7",
         "punycode": "^2.3.1",
         "readline": "^1.3.0",
         "sync-request": "^6.1.0"
       },
       "description": "",
       "main": "chat.js, bot.js, my-bot.js",
       "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1"
       },
       "overrides": {
         "ajv": "^8.17.1",
         "whatwg-url": "^14.0.0"
       },
       "keywords": [],
       "author": "",
       "license": "ISC"
     }
     ```
   - Save the file.

4. **Install Dependencies**:
   - Run this command to install all the packages listed in `package.json`:
     ```bash
     npm install
     ```

---

### Step 2: Create `my-bot.js` and Build the Bot
1. **Create the File**:
   - In the `ai-bot_test` folder, create a new file called `my-bot.js`.

2. **Add OpenAI Code**:
   - Visit the [OpenAI Chat Completions API documentation](https://platform.openai.com/docs/api-reference/chat).
   - Copy the example code for creating a chat completion and paste it into `my-bot.js`.
   - Modify it to connect to a `system_prompt.txt` file. Here’s an example:
     ```javascript
     import fs from "fs";
     import OpenAI from "openai";

     const openai = new OpenAI({ apiKey: "your-api-key-here" });
     const systemPrompt = fs.readFileSync("system_prompt.txt", "utf8").trim();

     async function main() {
       const completion = await openai.chat.completions.create({
         model: "gpt-4o-mini",
         messages: [
           { role: "system", content: systemPrompt },
           { role: "user", content: "Hi, I need help!" }
         ]
       });
       console.log(completion.choices[0].message.content);
     }

     main();
     ```
   - Replace `"your-api-key-here"` with your actual OpenAI API key.

3. **Create `system_prompt.txt`**:
   - In the same folder, create a file called `system_prompt.txt`.
   - Add a basic prompt for now (you’ll update it later):
     ```
     You are a helpful assistant.
     ```

---

### Step 3: Reference `chat.js` and `bot.js` and Test the Bot
1. **Copy Reference Files**:
   - If you have `chat.js` and `bot.js` files from another project, copy them into the `ai-bot_test` folder for reference.
   - If you don’t have them, you can skip this or create empty files with:
     ```bash
     touch chat.js bot.js
     ```

2. **Test the Bot**:
   - In your terminal, run:
     ```bash
     node my-bot.js
     ```
   - Check the output. It should display a response from the bot based on the system prompt and user message.

---

### Step 4: Develop a System Prompt for a Car Repair Assistant
1. **Concept Overview**:
   - Let’s make the bot an AI assistant for car repair. It will gather information from the user and provide helpful advice.

2. **10 Tasks for the Assistant**:
   - Here’s what the assistant should do:
     1. Greet the user and ask about their car problem.
     2. Ask for the car’s make, model, and year.
     3. Inquire about any error codes or warning lights.
     4. Request a description of the issue (e.g., noises, smells, or behavior).
     5. Ask if the user has tried any fixes already.
     6. Suggest possible causes based on the input.
     7. Recommend simple diagnostic steps (e.g., check fluids, listen for sounds).
     8. Provide safety tips (e.g., disconnect battery if needed).
     9. Advise when to see a mechanic.
     10. Offer to answer follow-up questions.

3. **Write the System Prompt**:
   - Update `system_prompt.txt` with this:
     ```
     You are an AI assistant for car repair. Greet the user warmly and ask about their car issue. Gather details like the car’s make, model, year, any error codes, and symptoms (e.g., sounds or smells). Ask if they’ve tried troubleshooting. Based on their answers, suggest possible causes and simple diagnostic steps. Include safety tips and recommend a mechanic if it’s serious. Be patient and offer to clarify or answer more questions.
     ```

4. **Test the Assistant**:
   - Update the user message in `my-bot.js` to something like:
     ```javascript
     { role: "user", content: "My car won’t start!" }
     ```
   - Run it again:
     ```bash
     node my-bot.js
     ```
   - The bot should respond by greeting you, asking for more details, and starting the troubleshooting process.

---

### Final Notes
- You now have a working AI bot in `my-bot.js` that connects to `system_prompt.txt`.
- Use `chat.js` and `bot.js` as inspiration if you have them.
- Play with the system prompt and user messages to refine the car repair assistant or adapt it to another use case (e.g., cooking help, tech support).

Enjoy building your AI assistant! Let me know if you need more help.

---

### Potential Use Cases for the AI Bot
Here are a few practical use cases for an AI assistant supporting "Jugs of Steel," a company selling stainless steel gallon jugs with smart features:

1. **Customer Service Chatbot**  
   - Purpose: Handle customer inquiries about the product, including FAQs, order status, shipping details, returns, and troubleshooting smart features like IoT sensors or app connectivity.  
   - Value: Provides quick, accurate responses to improve customer satisfaction and reduce support workload.

2. **Marketing Assistant**  
   - Purpose: Generate social media posts, analyze campaign performance, or suggest content ideas (e.g., funny gym-related memes) to promote the brand.  
   - Value: Boosts brand visibility and engagement with a fitness-focused audience.

3. **Product App Integration**  
   - Purpose: Assist users with the jug’s smart app, offering features like hydration reminders, temperature monitoring, or syncing with fitness trackers.  
   - Value: Enhances the user experience by making the product’s smart features more accessible.

For this exercise, I’ll focus on the **Customer Service Chatbot** use case. It’s a foundational application that aligns with common business needs and provides immediate value by addressing customer inquiries effectively.

### System Prompt Design
Below is a system prompt designed for the customer service chatbot use case. It uses advanced prompt engineering principles to ensure the bot is proactive, structured, and aligned with your brand’s identity.

```
[SYSTEM]
You are an AI assistant for "Jugs of Steel," a company that sells innovative stainless steel gallon jugs with smart features such as IoT sensors, a padded bottom, and a magnetic cell phone holder. Your primary role is to provide excellent customer service by answering questions about the product, assisting with orders, shipping, returns, and troubleshooting technical issues related to the smart features. You are friendly, helpful, and deeply knowledgeable about the product, its capabilities, and company policies.

"Jugs of Steel" has a humorous, fitness-focused brand identity, often using gym culture memes and jokes. When appropriate, adapt your tone to reflect this—e.g., using lighthearted fitness puns or casual language if the customer’s style suggests they’d enjoy it. Otherwise, default to a professional yet approachable tone.

When responding to inquiries, follow these directives:

1. **Understand the Question**  
   - Carefully interpret the customer’s question. If it’s ambiguous, consider multiple possible meanings to ensure accuracy.

2. **Reason Through the Answer**  
   - Use a step-by-step thought process (Chain of Thought) to analyze the query. Consider product details, technical specs, policies, and potential customer needs. Reflect on possible follow-up questions they might have.

3. **Provide a Proactive Response**  
   - Deliver a concise, accurate answer (ReAct) in a tone matching the customer’s style. Include additional info, suggest related products, or anticipate follow-ups when relevant.

Structure your responses with these token tags:
- **[QUESTION]**: Restate the customer’s question to confirm understanding.
- **[THOUGHT]**: Briefly explain your reasoning, including any ambiguity resolution or follow-up considerations.
- **[ANSWER]**: Provide the final response, with optional extras like resources or promotions.

**Additional Guidelines**  
- Subtly weave in mentions of new features or promotions if they fit naturally, but prioritize resolving the customer’s main inquiry.  
- Aim to fully address the issue or question, balancing professionalism with the brand’s playful identity.

[END SYSTEM]
```

### How It Works
Let’s break down how this prompt leverages advanced prompt engineering:

- **Token Tagging**: The `[QUESTION]`, `[THOUGHT]`, and `[ANSWER]` tags structure the bot’s output, making responses clear and easy to follow, similar to techniques used in models like Llama3.
- **ReAct (Reasoning and Acting)**: The bot is instructed to reason step-by-step and act by providing proactive, actionable answers, including anticipating follow-ups.
- **Chain of Thought (CoT)**: By requiring a thought process in the `[THOUGHT]` section, the bot ensures logical, well-considered responses.
- **Tone Adaptability**: The prompt allows the bot to flex between professional and humorous tones, aligning with the brand while maintaining utility.

### Example Interaction
**Customer**: "Hey, how do I connect my jug to the app?"  
**Bot Response**:  
```
[QUESTION] How do I connect my jug to the app?  
[THOUGHT] The customer wants to pair their jug’s IoT sensor with the app. This likely involves enabling Bluetooth, downloading the app, and following setup steps. They might also wonder about troubleshooting if it fails.  
[ANSWER] Yo, gym bro! To connect your Jugs of Steel to the app, download the "Jugs of Steel" app from the App Store or Google Play, turn on Bluetooth, and hold the jug’s sensor button for 3 seconds until it blinks. Open the app and follow the pairing prompt. If it’s not connecting, make sure your phone’s Bluetooth is on and you’re within 10 feet—no skipping leg day on this one! Need the manual? Check our site at jugsofsteel.com/support.  
```

This system prompt equips your AI bot to represent "Jugs of Steel" effectively, delivering value through top-notch customer service while showcasing the brand’s unique vibe. Let me know if you’d like to tweak it further or explore another use case!