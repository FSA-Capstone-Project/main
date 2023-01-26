const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const getQuote = async (mood: string) => {
  const response = await openai.createCompletion({
    model: "davinci",
    prompt: `Give me a ${mood} quote.`,
    max_tokens: 10,
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  return response;
};

let quote = getQuote("inspirational");
console.log(quote)

export default getQuote

