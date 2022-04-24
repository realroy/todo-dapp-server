import { useEffect, useState } from "react";
import TodoContract from 'todo-dapp-contract/artifacts/contracts/TodoContract.sol/TodoContract.json'

import type { Todo } from "~/types/todo";
import { getContractWithSigner } from "~/utils/get-contract-with-signer";

declare global {
    interface Window { ENV: any; }
}

const sortTodo = (a: Todo, b: Todo) => {
  return +b.id - +a.id;
};

export function useTodoList() {
  const [state, setState] = useState({
    todoList: [] as Todo[],
  });

  const fetchTodoList = async () => {
    const contract = getContractWithSigner(
      window.ENV.TODO_CONTRACT_ADDRESS,
      TodoContract.abi
    );

    const rawTodoList = (await contract?.getTodoList?.()) ?? [];

    setState((oldState) => ({
      ...oldState,
      todoList: rawTodoList?.map?.(
        (todo: any) =>
          ({
            id: todo.id,
            text: todo.text,
            isDone: todo.isDone,
            loading: false,
          } as Todo)
      ),
    }));
  };

  const handleAddTodo = async (text: string) => {
    setState((oldState) => ({
      ...oldState,
      todoList: [
        ...oldState.todoList,
        {
          id: oldState.todoList.length.toString(),
          loading: true,
          text,
          isDone: false,
        },
      ],
    }));

    const contract = getContractWithSigner(
      window.ENV.TODO_CONTRACT_ADDRESS,
      TodoContract.abi
    );

    const addTodoTx = await contract?.addTodo?.(text);
    await addTodoTx.wait();

    fetchTodoList();
  };

  const handleClickTodo = async (todo: Todo) => {
    setState((oldState) => ({
      ...oldState,
      todoList: [
        ...oldState.todoList.map((oldTodo) => ({
          ...oldTodo,
          loading: oldTodo.id === todo.id ? !oldTodo.loading : oldTodo.loading,
          isDone: oldTodo.id === todo.id ? !oldTodo.isDone : oldTodo.isDone,
        })),
      ],
    }));

    const contract = getContractWithSigner(
      window.ENV.TODO_CONTRACT_ADDRESS,
      TodoContract.abi
    );

    const toggleDoneTx = await contract?.toggleDone?.(todo.id);
    await toggleDoneTx.wait();

    fetchTodoList();
  };

  useEffect(() => {
    // connectWallet();
    fetchTodoList();
  }, []);

  return {
    data: [...state.todoList].sort(sortTodo),
    handleAddTodo,
    handleClickTodo,
    fetch: fetchTodoList,
  };
}
