import axios from "axios";
import { ENV } from "../env";

const baseURL = ENV.BASE_URL;

export async function storeExpense(expenseData) {
  const response = await axios.post(baseURL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(baseURL + "/expenses.json");
  const expenses = [];

  for (const key in response.data) {
    const expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expense);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(baseURL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(baseURL + `/expenses/${id}.json`);
}
