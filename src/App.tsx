import React, { useState, useEffect } from 'react';
import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';
import './App.css';
import { renderContent } from './Tooltip';
import Input from './Components/Input';
import FilterPill from './Components/FilterPill';
import hotkeys from 'hotkeys-js';
import { Toggle } from './Components/Toggle';
import { HelpToolTip } from './Components/HelpTooltip';

interface AppProps {
  data: Item[],
  graphHeight: number,
  isLoading: boolean,
  errorMessage: string,
}


const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const element = document.querySelector('[data-test-selector="seekbar-interaction-area__interactionArea"]');
  const cursor = document.querySelector('.recharts-tooltip-cursor');

  if (!element) {
    return;
  }

  if (!cursor) {
    return;
  }

  const key = Object.keys(element).find(key => key.startsWith('__reactInternalInstance$')) || '';

  // @ts-ignore
  let instance = element[key];
  const onClick = instance && instance.memoizedProps && instance.memoizedProps.onClick;

  const { right, left, } = cursor.getBoundingClientRect();

  const middle = (right + left) / 2

  console.log(cursor.getBoundingClientRect());

  onClick && onClick({ type: 'click', clientX: middle });
}

interface Item {
  startTime: string;
  startTimeStamp: number;
  displayTime: string;
  count: number,
  map: WordCount[],
}

interface WordCount {
  word: string,
  count: number
}

const filterData = (data: Item[], filters: string[]) => {
  const isFiltered = (word: string) => filters.some(filter => word.startsWith(filter));
  return data.map(({ map, ...item }) => {
    const count = map.reduce((acc, { word, count }) => isFiltered(word) ? acc + count : acc, 0);
    const newMap = map.filter(({ word }) => isFiltered(word));
    return {
      ...item,
      count,
      map: newMap,
    }
  });
}

// const data = require('./processed-data.json') as Item[];
function App({ isLoading, data, errorMessage, graphHeight }: AppProps) {
  const [chartData, setData] = useState<Item[]>(data);
  const [filters, setFilters] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [hide, setHide] = useState(false);

  const handleEnter = () => {
    setFilters([...filters, text.toLowerCase()]);
    setText('');
  }

  const handleRemove = (i: number) => {
    setFilters(filters.filter((_, index) => index !== i))
  }

  useEffect(() => {
    if (filters.length) {
      setData(filterData(data, filters));
    } else {
      setData(data);
    }
  }, [filters, data])

  useEffect(() => {
    hotkeys('alt+h', () => {
      setHide(!hide);
    });

    return () => { hotkeys.unbind('alt+h'); };
  }, [hide])

  const [toggle, setToggle] = useState(false);

  if (hide) {
    return null;
  }


  if (isLoading) {
    return <div style={{ backgroundColor: '#fff' }}>Loading data may take upto 20 seconds (to hide / show press alt+h)</div>
  }

  if (errorMessage) {
    return <div style={{ backgroundColor: '#fff' }}>Error: {errorMessage} (to hide / show press alt+h)</div>
  }

  return (
    <>
      <div className="app-test tw-flex">
        <HelpToolTip />
        <Toggle toggled={toggle} handleToggle={setToggle} />
        <Input label="Add filter" value={text} onEnter={handleEnter} onChange={e => setText(e.target.value)} />
        {filters.map((filter, i) => (
          <FilterPill key={i} onRemove={() => handleRemove(i)}>{filter}</FilterPill>
        ))}
      </div>
      <div onClick={click} className="App">
        <ResponsiveContainer width="100%" height={graphHeight}>
          <AreaChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={chartData}>
            <XAxis hide tick={false} axisLine={false} dataKey="startTimeStamp" type="number" domain={['dataMin', 'dataMax']} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={renderContent} />
            <Area type="monotone" dataKey="count" stroke={toggle ? "#8884d8" : "#fff"} fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default App;
