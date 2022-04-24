import type { FormEventHandler, FC} from "react";
import { memo } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export type TodoFormProps = {
  onSubmit: FormEventHandler;
  textRegister: UseFormRegisterReturn;
};

export const TodoForm: FC<TodoFormProps> = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="btn-group mx-auto w-auto">
      <div className="form-control m-2 mx-auto p-2">
        <label className="input-group">
          <input
            type="text"
            {...props.textRegister}
            className="input bg-white focus:outline-none"
            placeholder="What's on your mind ?"
          />
          <input type="submit" value="Add" className="btn" />
        </label>
      </div>
    </form>
  );
};

export const MemorizedTodoForm = memo(TodoForm)
