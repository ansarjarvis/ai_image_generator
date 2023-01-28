import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

/*  configuring openai api */
let configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
let openai = new OpenAIApi(configuration);

export let getOpenAi = async (req, res) => {
  try {
    let { prompt } = req.body;
    let aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    let image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
