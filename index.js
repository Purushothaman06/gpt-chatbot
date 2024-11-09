import openai from "./config/openaiProvider.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the Chatbot"));
  console.log(
    colors.bold.green(
      'You can start chatting with the bot. Type "exit" to quit.'
    )
  );

  const chatHistory = []; // Store conversation history

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    if (userInput.toLowerCase() === "exit") {
      console.log(colors.bold.green("Goodbye!"));
      break;
    }

    try {
      // Construct messages array including the current user input
      const messages = [...chatHistory, { role: "user", content: userInput }];

      // Call the OpenAI API with the conversation history
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: messages,
      });

      // Extract completion text
      const completionText = response.data.choices[0].message.content.trim();

      console.log(colors.green("Chatbot: ") + completionText);

      // Update history with the user input and the assistant's response
      chatHistory.push({ role: "user", content: userInput });
      chatHistory.push({ role: "assistant", content: completionText });
    } catch (error) {
      console.error(colors.red("Error: " + error.message));
    }
  }
}

main();
