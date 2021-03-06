import express from "express";
import routes from "../routes";
import {
  videoDetail,
  getEditVideo,
  deleteVideo,
  postEditVideo,
} from "../controllers/videoController";
import { onlyPrivate } from "../middlewares";

export const videoRouter = express.Router();

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);
