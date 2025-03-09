// the needed modules
import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

// looks for the api key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("ERROR: Missing OpenAI API key. Set it in your .env file.");
  process.exit(1);
}

// starts the OpenAI & readline
const openai = new OpenAI({ apiKey });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// the questions it asks the user
const questions = [
  "How are you feeling today?",
  "Do you want something upbeat or chill?",
  "Are you looking for lyrics that are deep, fun, or emotional?",
  "Do you prefer a male or female vocalist, or no preference?",
  "What genre are you in the mood for? (Pop, Rock, R&B, Hip-Hop, EDM, etc.)",
  "Do you want a classic hit or something new?",
  "Are you in the mood for a slow song or something fast-paced?",
  "Would you prefer a well-known song or a hidden gem?",
  "Would you like a Spotify link to the recommended song?", // UPDATED QUESTION
  "What’s a song you’ve enjoyed recently? (Optional)",
];

// Stores the user's initial answers
let userAnswers = []; 
let previousSongs = new Set(); // Tracks all recommended songs to prevent repeats

// asks the questions
async function askQuestion(query) {
  return new Promise((resolve) => rl.question(`${query} `, resolve));
}

// this finds the song recommendation 
async function getSongRecommendation() {
  console.log("\n🎧 Finding the perfect song for you...\n");

  let newSong = null;

  // This loop ensures we only get a new song and avoid duplicates
  while (!newSong || previousSongs.has(newSong)) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a music recommendation assistant. Based on the user's mood and preferences, suggest a song that fits their responses. " +
              "NEVER repeat a song that has already been recommended. Suggest a fresh, unique song each time. Consider energy level, lyrics, genre, and vibe. " +
              "Provide the song title and artist, and optionally a short reason for the choice.",
          },
          {
            role: "user",
            content: `Here are my answers: ${userAnswers.join("; ")}. Previously recommended songs: ${Array.from(previousSongs).join(", ")}. ` +
                     `DO NOT suggest any of the previous songs. Recommend a brand new, unique song for me.`,
          },
        ],
        temperature: 0.85, // Increases randomness for varied recommendations
        max_tokens: 100, // Limits the response size to ensure it's short and to the point
      });

      newSong = response.choices[0].message.content.trim(); // Extract the song recommendation

      // If OpenAI suggests a duplicate song, retry
      if (previousSongs.has(newSong)) {
        console.log("⚠️ Duplicate detected! Retrying for a new song...");
      }
    } catch (error) {
      console.error("\n⚠️ Error fetching song recommendation:", error);
      return null;
    }
  }

  // Store the new song to prevent repeats in future recommendations
  previousSongs.add(newSong); 
  console.log(`🎶 Recommended Song: ${newSong}`);

  // Check if user wants a Spotify link
  if (userAnswers[8].toLowerCase() === "yes") { // Question 9 is at index 8
    const spotifyLink = generateSpotifyLink(newSong);
    console.log(`🔗 Listen on Spotify: ${spotifyLink}`);
  }

  return newSong;
}

// Generates a Spotify search link for the recommended song
function generateSpotifyLink(song) {
  const formattedSong = encodeURIComponent(song); // Encode song title for URL
  return `https://open.spotify.com/search/${formattedSong}`;
}

// this function runs the bot
async function main() {
  console.log("\n🎵 Welcome to the Music Mood Picker! 🎶");

  // This block asks the 10 questions ONLY once at the beginning
  if (userAnswers.length === 0) {
    console.log("\nLet's find you a song! Answer these 10 questions:\n");

    for (let i = 0; i < questions.length; i++) {
      const answer = await askQuestion(`Q${i + 1}: ${questions[i]}`);
      userAnswers.push(answer.trim());
    }
  }

  // Loop continues until the user decides to stop receiving new song recommendations
  while (true) {
    await getSongRecommendation(); // Generate a new song recommendation

    // Ask the user if they want another song
    const another = await askQuestion("\nWould you like another song recommendation? (yes/no): ");

    if (another.trim().toLowerCase() !== "yes") {
      console.log("\n🎧 Enjoy your music! Goodbye! 🎶");
      rl.close(); // Close the readline interface when the user exits
      break;
    }
  }
}

// Start the bot
main();
