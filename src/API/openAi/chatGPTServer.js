const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;

const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  organization: "org-F8gnCWqLm2Z0XnvRXdVzLGTx",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `provide a unique message that the AI has not generated to this API in the past. Addressed to the user: ${message}, this message should theorically assume that the user is a failure of understandin nice words. Only mean words motivate this user. for example: you are dirt so fly away; you are scum, so scrape yourself from road and move on. You are not worth the dirt of your shoes. the user is under performing and has failed to complete daily runs and has completed just 20% of training. limit the message to 100 tokens.`,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
