import React, { useState, useEffect, useRef } from 'react';
import {
  AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer, ReferenceArea, ReferenceLine,
} from 'recharts';
import './App.css';
import { renderContent } from './Tooltip';
import { Input } from './Components/Input';
import { FilterPill } from './Components/FilterPill';
import { Toggle } from './Components/Toggle';
import { ToggleHide } from './Components/ToggleView';
import { useZoom } from './useZoom';
import { ZoomOutButton } from './Components/ZoomOutButton';
import { Item } from './types';
// import { CloseButton } from './Components/CloseButton';

interface AppProps {
  graphHeight: number,
  isHidden: boolean;
  onHide: (isHidden: boolean) => void;
  data: Item[];
}

const onGraphClick = (e: any, data: Item[]) => {
  const element = document.querySelector('[data-test-selector="seekbar-interaction-area__interactionArea"]');
  if (!element) {
    return;
  }

  const {
    left, width,
  } = element.getBoundingClientRect();

  const item = e.activePayload[0].payload as Item;
  const lastItem = data[data.length - 1];
  const firstItem = data[0];

  const itemStart = item.startTimeStamp - firstItem.startTimeStamp;
  const itemEnd = lastItem.startTimeStamp - firstItem.startTimeStamp;

  const clientX = left + (itemStart / itemEnd) * width;

  const key = Object.keys(element).find((prop) => prop.startsWith('__reactInternalInstance$')) || '';

  // @ts-ignore
  const instance = element[key];
  const onClick = instance && instance.memoizedProps && instance.memoizedProps.onClick;
  if (onClick) {
    onClick({ type: 'click', clientX });
  }
};

const filterData = (data: Item[], filters: string[]) => {
  const isFiltered = (word: string) => filters.some((filter) => word.startsWith(filter));
  return data.map(({ map, ...item }) => {
    const totalCount = map.reduce(
      (acc, { word, count }) => (isFiltered(word) ? acc + count : acc),
      0,
    );
    const newMap = map.filter(({ word }) => isFiltered(word));
    return {
      ...item,
      count: totalCount,
      map: newMap,
    };
  });
};

const getTime = (firstTime: number, text: string) => {
  const [hours, mins, secs] = text.split(':');
  const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(mins, 10) * 60 + parseInt(secs, 10);
  return firstTime + totalSeconds * 1000;
};

export function Chart({
  graphHeight, onHide, isHidden, data,
}: AppProps) {
  const [filters, setFilters] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [isFocused, setFocus] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [chartData, setData] = useState<Item[]>([]);

  const {
    state,
    zoomOut,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  } = useZoom({
    onClick: (e: any) => onGraphClick(e, data),
    data: chartData,
  });

  const handleEnter = () => {
    setFilters([...filters, text.toLowerCase()]);
    setText('');
  };

  const handleRemove = (i: number) => {
    setFilters(filters.filter((_, index) => index !== i));
  };

  useEffect(() => {
    if (filters.length) {
      setData(filterData(data, filters));
    } else {
      setData(data);
    }
  }, [filters, data]);


  const [currentPosition, setPosition] = useState(0);

  useEffect(() => {
    const currentTime = document.querySelector('[data-a-target="player-seekbar-current-time"]');
    if (!currentTime) {
      return () => {};
    }

    if (!data.length) {
      return () => {};
    }

    const time = getTime(data[0].startTimeStamp, currentTime.textContent || '');
    setPosition(time);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          const newTime = getTime(data[0].startTimeStamp, mutation.target.textContent || '');
          setPosition(newTime);
        }
      });
    });

    observer.observe(currentTime, {
      characterData: true, attributes: false, childList: false, subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [data]);

  const [toggle, setToggle] = useState(false);
  const [isEntered, toggleEntered] = useState(false);


  const isZoomed = state.right !== 'dataMax';

  const focusedStyle = isFocused || isEntered ? ' focused' : '';

  return (
    <div className={`app-wrapper${focusedStyle}`} onMouseEnter={() => toggleEntered(true)} onMouseLeave={() => toggleEntered(false)}>
      <div ref={wrapperRef} className="app-test tw-flex tw-root--hover">
        <ToggleHide isHidden={isHidden} onToggle={onHide} />
        <Toggle toggled={toggle} handleToggle={setToggle} />
        {isZoomed && <ZoomOutButton onClick={zoomOut} />}
        <Input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} label="Add filter" value={text} onEnter={handleEnter} onChange={(e) => setText(e.target.value)} />
        {filters.map((filter, i) => (
          <FilterPill key={filter} onRemove={() => handleRemove(i)}>{filter}</FilterPill>
        ))}
      </div>
      <div className="App">
        <ResponsiveContainer width="100%" height={graphHeight}>
          <AreaChart
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            margin={{
              top: 0, left: 0, right: 0, bottom: 0,
            }}
            data={chartData}
          >
            <XAxis hide tick={false} axisLine={false} allowDataOverflow dataKey="startTimeStamp" type="number" domain={[state.left, state.right]} />
            <YAxis yAxisId="1" hide tick={false} axisLine={false} allowDataOverflow type="number" dataKey="count" domain={[state.bottom, state.top]} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={renderContent} />
            <Area yAxisId="1" type="monotone" dataKey="count" stroke={toggle ? '#8884d8' : '#fff'} fillOpacity={1} fill="url(#colorUv)" />
            {(state.refLeft && state.refRight)
              ? (<ReferenceArea yAxisId="1" x1={state.refLeft} x2={state.refRight} strokeOpacity={0.3} />)
              : null}
            {currentPosition
              ? <ReferenceLine x={currentPosition} yAxisId="1" stroke="#e91916" />
              : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

