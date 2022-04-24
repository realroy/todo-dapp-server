import type { FC, MouseEventHandler } from "react";
import { memo } from "react";

import type { Todo } from "~/types/todo";

export type TodoItemProps = {
  todo: Todo;
  onClick: (todo: Todo) => void | Promise<void>;
};

export const TodoItem: FC<TodoItemProps> = (props) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    props.onClick(props.todo);

    e.preventDefault();
  };

  return (
    <div
      onClick={handleClick}
      className={`btn m-2 text-left ${
        props.todo.isDone ? "line-through" : ""
      } ${props.todo.loading ? "loading" : ""}`}
    >
      {props.todo.text}
    </div>
  );
};

export const MemorizedTodoItem = memo(TodoItem)