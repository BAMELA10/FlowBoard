import express, { type Router } from "express";
import {
  columnBoardIdParamsSchema,
  columnIdParamsSchema,
  payloadCreateColumnSchema,
  payloadUpdateColumnSchema,
} from "../dto";
import { ColumnController } from "../controller/column.controller";
import { ColumnRepository } from "../repository";
import { ColumnService } from "../services/column.service";
import { validatePayload } from "../middleware/validate-payload";
import { asyncHandler } from "../utils.ts";

const router: Router = express.Router();
const columnController = new ColumnController(
  new ColumnService(new ColumnRepository()),
);

router.post(
  "/",
  validatePayload(payloadCreateColumnSchema, "body"),
  asyncHandler(columnController.create),
);

router.get(
  "/board/:boardId",
  validatePayload(columnBoardIdParamsSchema, "params"),
  asyncHandler(columnController.listByBoard),
);

router.patch(
  "/:id",
  validatePayload(columnIdParamsSchema, "params"),
  validatePayload(payloadUpdateColumnSchema, "body"),
  asyncHandler(columnController.update),
);

router.delete(
  "/:id",
  validatePayload(columnIdParamsSchema, "params"),
  asyncHandler(columnController.remove),
);

export default router;
