// Step 1: Importing Required Modules
// - 'fs' is a built-in Node.js module for file system operations, like reading files.
// - 'readline' is a built-in module to handle user input from the terminal.
// - 'OpenAI' is the official library for interacting with the OpenAI API.
import fs from "fs";
import readline from "readline";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Step 2: Setting the OpenAI API Key
// - The API key is a unique string that authenticates your requests to the OpenAI API.
// - Here, it’s hardcoded for simplicity, but in a real project, you should store it securely (e.g., in an environment variable).
const apiKey = process.env.OPENAI_API_KEY || "your_hardcoded_api_key_here";

// Step 3: Reading the System Prompt
// - This line reads the content of 'system_prompt.txt' using the 'fs' module.
// - The system prompt defines the AI’s behavior or context (e.g., "You are a helpful assistant").
// - 'utf8' specifies the file encoding, and 'trim()' removes any extra whitespace.
const systemPrompt = fs.readFileSync("system_prompt.txt", "utf8").trim();

// Step 4: Setting Up the Readline Interface
// - 'readline' creates an interface to read user input from the terminal (stdin) and write output to it (stdout).
// - This allows the script to interact with the user by prompting them and capturing their responses.
const rl = readline.createInterface({
  input: process.stdin,  // Standard input stream (keyboard).
  output: process.stdout // Standard output stream (terminal).
});

// Step 5: Initializing the OpenAI Client
// - This creates an instance of the OpenAI client using the API key.
// - The client is used to send requests to the OpenAI API and receive responses.
const openai = new OpenAI({
  apiKey: apiKey, // Pass the API key to authenticate the client.
});

// Step 6: Defining the Main Chat Function
// - 'main' is an asynchronous function because it involves waiting for user input and API responses.
// - It runs the core logic of the chat application in a loop.
async function main() {
  // Step 6.1: Initialize User Input Variable
  // - 'userPrompt' stores the user’s input and starts as an empty string.
  let userPrompt = "";
  
  // Step 6.2: Start the Chat Loop
  // - This 'while' loop keeps the chat running until the user types "exit".
  while (userPrompt.toLowerCase() !== "exit") {
    // Step 6.3: Prompt the User for Input
    // - 'rl.question' displays "You: " and waits for the user to type something.
    // - A Promise is used to handle the asynchronous nature of waiting for input.
    userPrompt = await new Promise((resolve) => {
      rl.question("You: ", resolve); // 'resolve' captures the user’s input.
    });

    // Step 6.4: Check for Exit Condition
    // - If the user types "exit" (case-insensitive), print a farewell message and break the loop.
    if (userPrompt.toLowerCase() === "exit") {
      console.log("Goodbye!"); // Say goodbye before exiting.
      break; // Exit the while loop.
    }

    // Step 6.5: Send Request to OpenAI API
    // - This creates a chat completion request with the system prompt and user input.
    // - 'stream: true' enables real-time streaming of the AI’s response.
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // The specific OpenAI model to use (e.g., GPT-4o).
      messages: [
        { "role": "system", "content": systemPrompt }, // System prompt sets the AI’s context.
        { "role": "user", "content": userPrompt }      // User’s input to process.
      ],
      stream: true, // Stream the response instead of waiting for the full text.
    });

    // Step 6.6: Display AI Response Start
    // - Write "AI: " to the terminal to indicate the AI is responding.
    process.stdout.write("AI: ");
    
    // Step 6.7: Process Streamed Response
    // - This loop iterates over chunks of the AI’s response as they arrive.
    // - 'for await' is used because streaming is asynchronous.
    for await (const chunk of completion) {
      // Step 6.8: Write Response Content
      // - Check if the chunk has content, then write it to the terminal.
      // - 'process.stdout.write' avoids adding newlines, creating a smooth output flow.
      if (chunk.choices[0].delta.content) {
        process.stdout.write(chunk.choices[0].delta.content);
      }
    }
    
    // Step 6.9: Add a Newline After Response
    // - After the full response is streamed, add a newline for readability.
    console.log(); // New line after the response.
  }

  // Step 6.10: Close the Readline Interface
  // - Once the loop ends (user exits), close the readline interface to stop input handling.
  rl.close();
}

// Step 7: Start the Chat Application
// - This line calls the 'main' function to begin the chat loop.
// - Since 'main' is async, it runs and handles all asynchronous operations.
main();