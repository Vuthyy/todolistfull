import { useEffect, useRef, useState } from "react";
import { Todo } from "../types/todo";

interface AddTodoFormProps {
  onSubmit: (title: string) => void;
  editingTodo: Todo | null;
}

export default function AddTodoForm({
  onSubmit,
  editingTodo,
}: AddTodoFormProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.title);
      inputRef.current?.focus();
    } else {
      setInput("");
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSubmit(input);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"
      >
        {editingTodo ? "Edit" : "Add"}
      </button>
    </form>
  );
}
