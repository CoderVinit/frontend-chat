import moment from "moment";

const FileFormate = (url = "") => {


  const fileExt = url.split(".").pop();

  if (fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg') {
    return "video"
  }
  if (fileExt === 'mp3' || fileExt === 'wav') {
    return "audio"
  }
  if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {
    return "image"
  }

  return "file"

}

const transformImage = (url = "", width = 400) => {

  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

const last7dayes = () => {
  const currentDate = moment();
  const last7Days = []

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("ddd")
    last7Days.unshift(dayName)
  }
  return last7Days;
}


const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  else localStorage.setItem(key, JSON.stringify(value));
}


export { FileFormate, transformImage, last7dayes, getOrSaveFromStorage };