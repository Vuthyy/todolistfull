import { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  const addOrEditTodo = async (title: string) => {
    if (editingTodo) {
      const updatedTodo = { ...editingTodo, title };
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodo.id ? updatedTodo : todo
        )
      );
      setEditingTodo(null);
    } else {
      const newTodo = {
        id: todos.length + 1,
        title,
        completed: false,
      };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);

      try {
        await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });
      } catch (error) {
        console.error("Failed to add new todo", error);
      }
    }
  };

  const deleteTodo = async (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const startEditingTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  return (
    <main className="py-10 h-screen space-y-5">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addOrEditTodo} editingTodo={editingTodo} />
        <TodoList
          todos={todos}
          onCompletedChange={setTodoCompleted}
          onDelete={deleteTodo}
          onEdit={startEditingTodo}
        />
      </div>
    </main>
  );
}

export default App;
