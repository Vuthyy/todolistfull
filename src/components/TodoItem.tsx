import { Edit, Trash2 } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({
  todo,
  onCompletedChange,
  onDelete,
  onEdit,
}: TodoItemProps) {
  return (
    <div className="flex items-center gap-1">
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
          className="scale-125"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </label>
      <button onClick={() => onEdit(todo)}>
        <Edit size={20} className="text-green-500" />
      </button>
      <button onClick={() => onDelete(todo.id)} className="p-1">
        <Trash2 size={20} className="text-red-500" />
      </button>
    </div>
  );
}
