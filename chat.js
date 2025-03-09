import OpenAI from "openai";
import fs from "fs";
import readline from "readline";
const apiKey = "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";

// Initialize OpenAI client (replace with your actual API key)
const openai = new OpenAI({ apiKey: apiKey });

// Read the system prompt from a file (create system_prompt.txt if it doesn't exist)
const systemPrompt = fs.readFileSync("system_prompt.txt", "utf8").trim();

// Define model and LLM properties (adjust these as needed)
const model = "gpt-4o-mini";
const temperature = 0.0;          // Controls randomness (0.0 to 2.0)
const top_p = 1;                // Nucleus sampling (0.0 to 1.0)
const frequency_penalty = 0.5;    // Penalizes frequent tokens (-2.0 to 2.0)
const presence_penalty = 0.0;     // Penalizes tokens already present (-2.0 to 2.0)
const max_tokens = 500;           // Maximum number of tokens to generate

// Initialize conversation history with the system prompt
let messages = [{ role: "system", content: systemPrompt }];

// Set up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get user input asynchronously
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Main chat loop function
async function main() {
  while (true) {
    const userInput = await askQuestion("User: ");
    if (userInput.trim().toLowerCase() === "exit") {
      console.log("Chat ended.");
      rl.close();
      break;
    }

    // Add user input to conversation history
    messages.push({ role: "user", content: userInput });

    // Create a streaming chat completion with controlled properties
    const stream = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: true,
      temperature: temperature,
      top_p: top_p,
      frequency_penalty: frequency_penalty,
      presence_penalty: presence_penalty,
      max_tokens: max_tokens
      // Add other properties here if desired
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      process.stdout.write(content);
      fullResponse += content;
    }
    process.stdout.write("\n"); // New line after response

    // Add assistant's response to conversation history
    messages.push({ role: "assistant", content: fullResponse });
  }
}

// Start the chat loop
main();