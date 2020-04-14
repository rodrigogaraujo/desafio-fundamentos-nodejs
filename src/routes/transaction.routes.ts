import { Router } from "express";

import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateTransactionService from "../services/CreateTransactionService";

const transactionRouter = Router();

const transactions = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(transactions);

transactionRouter.get("/", (request, response) => {
  try {
    return response.json({
      transactions: transactions.all(),
      balance: transactions.getBalance(),
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post("/", (request, response) => {
  try {
    const { title, value, type } = request.body;
    const parseValue = Number(value);
    const transiction = createTransactionService.execute({
      title,
      value: parseValue,
      type,
    });
    return response.json(transiction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
