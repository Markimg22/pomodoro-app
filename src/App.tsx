import React from 'react';
import Pomodoro from './components/Pomodoro';

export default function App(): JSX.Element {
  return (
    <div className="container">
      <Pomodoro
        pomodoroTime={10}
        shortRestTime={2}
        longRestTime={5}
        cycles={4}
      />
    </div>
  );
}
