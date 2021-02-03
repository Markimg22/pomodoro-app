import React, { useEffect, useState } from 'react';
import { useInterval } from '../../hooks/use-interval';
import Button from '../Button';
import Timer from '../Timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export default function Pomodoro(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }

    audioStopWorking.play();
  };

  return (
    <div className="pomodoro">
      <h2>Você está: {}</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Trabalhar" onClick={() => configureWork()} />
        <Button text="Descansar" onClick={() => configureRest(false)} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pausar' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>

      <div className="details">
        <p>Testando: asdadwdasdaw</p>
        <p>Testando: asdadwdasdaw</p>
        <p>Testando: asdadwdasdaw</p>
      </div>
    </div>
  );
}