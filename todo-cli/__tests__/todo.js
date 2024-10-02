/* eslint-disable no-undef */
const todoList = require("../todo");

const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
  // eslint-disable-next-line no-unused-vars
  toDisplayableList,
} = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    // executes before all test cases
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should return overdue items", () => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .slice(0, 10);
    const overDueCount = overdue().length;
    expect(overdue().length).toBe(overDueCount);
    add({
      title: "Test todo",
      completed: false,
      dueDate: yesterday,
    });
    expect(overdue().length).toBe(overDueCount + 1);
  });

  test("Should return due today items", () => {
    const today = new Date().toISOString().slice(0, 10);
    const dueTodayCount = dueToday().length;
    expect(dueToday().length).toBe(dueTodayCount);

    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
    expect(dueToday().length).toBe(dueTodayCount + 1);
  });

  test("Should return due later items", () => {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .slice(0, 10);
    const dueLaterCount = dueLater().length;
    expect(dueLater().length).toBe(dueLaterCount);

    add({
      title: "Test todo",
      completed: false,
      dueDate: tomorrow,
    });
    expect(dueLater().length).toBe(dueLaterCount + 1);
  });
});
