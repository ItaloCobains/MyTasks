import React from 'react';
import {TaskProvider} from './src/Context/TasksContext';
import {Home} from './src/pages/Home';

const App = () => {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
};

export default App;
