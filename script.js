const API_URL = "https://dummyjson.com/todos";

// GET — получение списка задач
async function fetchTodos() {
  const res = await fetch(`${API_URL}?limit=10`);
  const data = await res.json();
  return data.todos;
}

function createTodoElement(todo) {
  const div = document.createElement("div");
  div.className = "todo-item";
  if (todo.completed) div.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const title = document.createElement("span");
  title.textContent = todo.todo;

  const btn = document.createElement("button");
  btn.textContent = "✖";

  // PUT — обновление статуса
  checkbox.addEventListener("change", async () => {
    div.classList.toggle("completed", checkbox.checked);
    try {
      const res = await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: checkbox.checked }),
      });
      const data = await res.json();
      console.log("✅ PUT:", data);
    } catch (err) {
      console.error("Ошибка PUT:", err);
    }
  });

  // DELETE — удаление
  btn.addEventListener("click", async () => {
    div.remove();
    try {
      const res = await fetch(`${API_URL}/${todo.id}`, { method: "DELETE" });
      const data = await res.json();
      console.log("🗑️ DELETE:", data);
    } catch (err) {
      console.error("Ошибка DELETE:", err);
    }
  });

  div.appendChild(checkbox);
  div.appendChild(title);
  div.appendChild(btn);

  return div;
}

async function renderTodos() {
  const container = document.getElementById("todoList");
  container.innerHTML = "<p>Загрузка...</p>";
  const todos = await fetchTodos();
  container.innerHTML = "";
  todos.forEach((t) => container.appendChild(createTodoElement(t)));
}

// POST — добавление новой задачи
document.getElementById("addTodoBtn").addEventListener("click", async () => {
  const input = document.getElementById("newTodo");
  const text = input.value.trim();

  if (!text) {
    alert("Пустая задача — нечего добавлять!");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: text, completed: false, userId: 1 }),
    });
    const data = await res.json();
    console.log("➕ POST:", data);

    const newTodo = createTodoElement(data);
    document.getElementById("todoList").prepend(newTodo);
    input.value = "";
  } catch (err) {
    console.error("Ошибка POST:", err);
  }
});

renderTodos();
