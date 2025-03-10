import fs from "fs"; // Import file system module
import readline from "readline"; // Import readline for user input handling
import OpenAI from "openai"; // Import OpenAI client
import dotenv from "dotenv"; // Import dotenv for environment variables

dotenv.config(); // Load environment variables

const apiKey = process.env.OPENAI_API_KEY || "null"; // Set API key

const systemPrompt = fs.readFileSync("system_prompt.txt", "utf8").trim(); // Read system prompt from file

const rl = readline.createInterface({ // Set up readline interface
  input: process.stdin,
  output: process.stdout
});

const openai = new OpenAI({ apiKey }); // Initialize OpenAI client

async function main() { // Main chat function
  console.log("AI: Hello! i am a music assistant"); // AI speaks first
  let userPrompt = ""; // Initialize user input variable
  
  while (userPrompt.toLowerCase() !== "exit") { // Chat loop
    userPrompt = await new Promise((resolve) => {
      rl.question("You: ", resolve); // Prompt user for input
    });

    if (userPrompt.toLowerCase() === "exit") { // Check for exit condition
      console.log("Goodbye!");
      break;
    }

    const completion = await openai.chat.completions.create({ // Send request to OpenAI API
      model: "gpt-4o",
      messages: [
        { "role": "system", "content": systemPrompt  },
        { "role": "user", "content": userPrompt }
      ],
      stream: true,
    });

    process.stdout.write("AI: "); // Indicate AI response
    
    for await (const chunk of completion) { // Stream response
      if (chunk.choices[0].delta.content) {
        process.stdout.write(chunk.choices[0].delta.content);
      }
    }
    
    console.log(); // New line for readability
  }

  rl.close(); // Close readline interface
}

main(); // Start the chat application
