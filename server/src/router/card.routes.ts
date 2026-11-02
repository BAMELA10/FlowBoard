import express, { type Router } from "express";
import {
  cardIdParamsSchema,
  cardColumnIdParamsSchema,
  payloadCreateCardSchema,
  payloadUpdateCardSchema,
} from "../dto";
import { CardController } from "../controller/card.controller";
import { CardRepository } from "../repository";
import { CardService } from "../services/card.service";
import { validatePayload } from "../middleware/validate-payload";
import { asyncHandler } from "../utils.ts";

const router: Router = express.Router();
const cardController = new CardController(new CardService(new CardRepository()));

router.post(
  "/",
  validatePayload(payloadCreateCardSchema, "body"),
  asyncHandler(cardController.create),
);

router.get(
  "/column/:columnId",
  validatePayload(cardColumnIdParamsSchema, "params"),
  asyncHandler(cardController.listByColumn),
);

router.patch(
  "/:id",
  validatePayload(cardIdParamsSchema, "params"),
  validatePayload(payloadUpdateCardSchema, "body"),
  asyncHandler(cardController.update),
);

router.delete(
  "/:id",
  validatePayload(cardIdParamsSchema, "params"),
  asyncHandler(cardController.remove),
);

export default router;
