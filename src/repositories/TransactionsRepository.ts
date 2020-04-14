import Transaction from "../models/Transaction";

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((prevVal, transaction) => {
      let value = 0;
      // eslint-disable-next-line no-unused-expressions
      transaction.type === "income" ? (value = transaction.value) : (value = 0);
      return prevVal + value;
    }, 0);
    const outcome = this.transactions.reduce((prevVal, transaction) => {
      let value = 0;
      // eslint-disable-next-line no-unused-expressions
      transaction.type === "outcome"
        ? (value = transaction.value)
        : (value = 0);
      return prevVal + value;
    }, 0);
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
