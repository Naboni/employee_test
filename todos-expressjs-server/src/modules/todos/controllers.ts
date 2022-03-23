import {
  IControllerResult,
  newControllerData,
  newControllerError,
} from '../../utils/controller-result.model';
import { todosDal, TodosDal } from './dal';
import { ITodoPayload, Todo } from './model';
import {
  validateTodoCreatePayload,
  validateTodoEditPayload,
} from './validator';

export class TodosController {
  todosDal: TodosDal;
  constructor(todosDal: TodosDal) {
    this.todosDal = todosDal;
  }

  create(payload: ITodoPayload): IControllerResult<Todo> {
    const { error, value } = validateTodoCreatePayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }

    return newControllerData(this.todosDal.create(value));
  }

  //TODO: Implement get all
  getAll(): IControllerResult<Todo[]> {
    return newControllerData(this.todosDal.getAll());
  }

  //TODO: Implement update
  update(payload: ITodoPayload, id: string): IControllerResult<Todo> {
    const { error, value } = validateTodoEditPayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }
    return newControllerData(this.todosDal.edit(value, id));
  }

  //TODO: Implement delete
  delete(id: string): IControllerResult<String> {
    this.todosDal.delete(id);
    return {
      error: null,
      data: 'Deleted Todo',
    };
  }
}

export const todosController = new TodosController(todosDal);
