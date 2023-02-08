
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;
const morgan = require("morgan");

app.use(morgan("dev"))

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

app.post("/text-completion", async (req, res) => {
  const { message } = req.body;
  console.log(message, 'text-completion')
const response = await openai.createCompletion({
model: "text-davinci-003",
prompt: `return this text the same way you receive it: ${message}`,
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

app.post("/image-generation", async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    const response = await openai.createImage({
      prompt: message,
      n: 1,
      size: "256x256",
    });
    res.json({
      data: response.data.data[0].url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while generating the image",
    });
  }
});

app.listen(port, () => {
console.log(`Server started on port ${port}`);
});
