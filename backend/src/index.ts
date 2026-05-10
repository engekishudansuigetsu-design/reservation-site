import { doGet, doPost } from "./presentation";

(globalThis as any).doGet = doGet;
(globalThis as any).doPost = doPost;
