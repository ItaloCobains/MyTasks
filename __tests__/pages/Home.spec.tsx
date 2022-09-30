import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-hooks';

import {TaskProvider, useTaskList} from '../../src/Context/TasksContext';
import {Home} from '../../src/pages/Home';

describe('Home page', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<Home />);

    const inputNewTask = getByPlaceholderText('Nova Tarefa ...');

    expect(inputNewTask).toBeDefined();

    expect(inputNewTask.props.placeholder).toBeTruthy();
  });
  it('verifica a inserção de um item na lista de tarefas', async () => {
    const result = renderHook(() => useTaskList(), {
      wrapper: TaskProvider,
    });

    const data = {
      id: 'Task01',
      title: 'Task',
    };

    await act(() => result.result.current.addTask(data));

    expect(result.result.current.tasks).toBeTruthy();
  });
  it('verificar se o click no botão insere um item na lista de tarefas', async () => {
    const {getByTestId, getByPlaceholderText} = render(<Home />, {
      wrapper: TaskProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TaskProvider,
    });

    const data = {
      id: 'Task01',
      title: 'Task',
    };

    const inputNewTask = getByPlaceholderText('Nova Tarefa ...');
    const button = getByTestId('addButton');

    act(() => fireEvent.changeText(inputNewTask, data.title));

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(result.current.tasks).toBeTruthy();
  });
});
