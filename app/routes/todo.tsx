import {
  useForm,
} from "react-hook-form";

import { MemorizedTodoForm as TodoForm } from "~/components/TodoForm";
import { MemorizedTodoItem as TodoItem } from "~/components/TodoItem";
import { useTodoList } from "~/hooks/useTodoList";

const formInitState = {
  text: "",
};

export default function TodoPage() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm({ defaultValues: formInitState });

  const { handleAddTodo, handleClickTodo, data: todoList } = useTodoList();

  const onSubmit = async (data: typeof formInitState) => {
    try {
      resetField("text");
      handleAddTodo(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl">Todo</h1>
      <div>
        <TodoForm
          onSubmit={handleSubmit(onSubmit)}
          textRegister={register("text", { required: true })}
        />
        <div className="flex flex-col overflow-y-auto">
          {todoList.sort().map((todo, i) => (
            <TodoItem key={todo.id + i} todo={todo} onClick={handleClickTodo} />
          ))}
        </div>
      </div>
    </div>
  );
}


