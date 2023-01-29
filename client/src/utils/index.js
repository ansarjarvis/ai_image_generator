import fileSaver from "file-saver";

import { surpriseMePrompts } from "../constant";

export function getRandomPrompt(prompt) {
  let randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  let randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);
  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  fileSaver.saveAs(photo, `download-${_id}.jpg`);
}
