import fs from "fs"; // Import file system module
import readline from "readline"; // Import readline for user input handling
import OpenAI from "openai"; // Import OpenAI client
import dotenv from "dotenv"; // Import dotenv for environment variables

dotenv.config(); // Load environment variables

const apiKey = process.env.OPENAI_API_KEY || "your_hardcoded_api_key_here"; // Set API key

const systemPrompt = fs.readFileSync("system_prompt.txt", "utf8").trim(); // Read system prompt from file

const rl = readline.createInterface({ // Set up readline interface
  input: process.stdin,
  output: process.stdout
});

const openai = new OpenAI({ apiKey }); // Initialize OpenAI client

// Memory array to store conversation history
const messages = [
  { role: "system", content: systemPrompt }
];

async function main() { // Main chat function
  console.log("AI: Hello! I am a music assistant"); // AI speaks first
  let userPrompt = ""; // Initialize user input variable

  while (true) { // Infinite chat loop
    userPrompt = await new Promise((resolve) => {
      rl.question("You: ", resolve); // Prompt user for input
    });

    if (userPrompt.toLowerCase() === "exit") { // Check for exit condition
      console.log("Goodbye!");
      break;
    }

    // Add user input to memory
    messages.push({ role: "user", content: userPrompt });

    const completion = await openai.chat.completions.create({ // Send request to OpenAI API
      model: "gpt-4o",
      messages: messages, // Send entire conversation history
      stream: true,
    });

    process.stdout.write("AI: "); // Indicate AI response
    let responseContent = "";

    for await (const chunk of completion) { // Stream response
      if (chunk.choices[0].delta.content) {
        process.stdout.write(chunk.choices[0].delta.content);
        responseContent += chunk.choices[0].delta.content;
      }
    }

    console.log(); // New line for readability

    // Add AI response to memory
    messages.push({ role: "assistant", content: responseContent });
  }

  rl.close(); // Close readline interface
}

main(); // Start the chat application
