import axios from "axios";
import { saveAs } from "file-saver";

// Čia negalima naudoti dispatch, nes čia ne funkcinis komponentas

const api_url = process.env.REACT_APP_SERVER_PATH;

const download = async (id, failoPavadinimas) => {
  const response = await axios.get(api_url + "download/" + id, {
    responseType: 'blob'
  });
  if (response.status === 200) {
    saveAs(response.data, failoPavadinimas);
  }
};

const getAudio = async () => {
  const response = await axios.get(api_url);
  if (response.status !== 200) {
    throw new Error("Klaida iš serverio. " + response.statusText);
  }
  return response.data;
};

const getAudioItem = async (id) => {
  const response = await axios.get(api_url + id);
  if (response.status !== 200) {
    throw new Error("Klaida iš serverio. " + response.statusText);
  }
  return response.data;
};

const groti = async (id) => {
  const response = await axios.get(api_url + "play/" + id);
  if (response.status !== 200) {
    throw new Error("Klaida iš serverio. " + response.statusText);
  }
  return response.data;
};

export {
  api_url,
  download,
  getAudio,
  getAudioItem,
  groti,
};
