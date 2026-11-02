import express, { type Router } from "express";
import {
  boardIdParamsSchema,
  boardOwnerParamsSchema,
  payloadCreateBoardSchema,
  payloadUpdateBoardSchema,
} from "../dto";
import { BoardController } from "../controller/board.controller";
import { BoardRepository } from "../repository";
import { BoardService } from "../services/board.service";
import { validatePayload } from "../middleware/validate-payload";
import { asyncHandler } from "../utils.ts";

const router: Router = express.Router();
const boardController = new BoardController(
  new BoardService(new BoardRepository()),
);

router.post(
  "/",
  validatePayload(payloadCreateBoardSchema, "body"),
  asyncHandler(boardController.create),
);

router.get(
  "/owner/:ownerId",
  validatePayload(boardOwnerParamsSchema, "params"),
  asyncHandler(boardController.listByOwner),
);

router.get(
  "/:id",
  validatePayload(boardIdParamsSchema, "params"),
  asyncHandler(boardController.getById),
);

router.patch(
  "/:id",
  validatePayload(boardIdParamsSchema, "params"),
  validatePayload(payloadUpdateBoardSchema, "body"),
  asyncHandler(boardController.update),
);

router.delete(
  "/:id",
  validatePayload(boardIdParamsSchema, "params"),
  asyncHandler(boardController.remove),
);

export default router;
