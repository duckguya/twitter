import { storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

export async function upload({ uid, attachment }) {
  let attachmentUrl = "";
  const attachmentRef = storageService.ref().child(`${uid}/${uuidv4()}`); // 1 파일에대한 reference를 만든다
  const response = await attachmentRef.putString(attachment, "data_url"); // 2 파일데이터를 reference로 보낸다
  attachmentUrl = await response.ref.getDownloadURL();
  return attachmentUrl;
}
