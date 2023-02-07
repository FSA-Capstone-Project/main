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
    prompt: `return this object in json format: ${message}`,
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
