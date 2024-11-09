import { getStorage } from "firebase/storage";
import firebase_app from "./config";

const STORAGE_FOLDER_PATH = "gs://sp-ecors-db.appspot.com"

export const storage = getStorage(firebase_app,STORAGE_FOLDER_PATH)