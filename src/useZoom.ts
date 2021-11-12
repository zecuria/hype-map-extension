import { useState } from 'react';
import { RechartsFunction } from 'recharts';

import { Item } from './types';

const initialState = {
  top: 'dataMax',
  bottom: 0,
  left: 'dataMin',
  right: 'dataMax',
  refLeft: '',
  refRight: '',
  startIndex: 0,
};

interface ZoomArguments {
  onClick: (data: string) => void,
  data: Item[]
}

export const useZoom = ({ onClick, data }: ZoomArguments) => {
  const [state, setState] = useState({
    ...initialState,
  });

  const onMouseDown: RechartsFunction = (e) => {
    setState({
      ...state,
      refLeft: e.activeLabel,
      startIndex: e.activeTooltipIndex,
    });
  };

  const onMouseMove: RechartsFunction = (e) => {
    if (!state.refLeft) {
      return;
    }
    setState({
      ...state,
      refRight: e.activeLabel,
    });
  };

  const onMouseUp: RechartsFunction = (e) => {
    if (!e.activeTooltipIndex) {
      setState({ ...initialState });
    }

    if (state.refLeft === state.refRight || !state.refRight) {
      onClick(e);
      setState({
        ...state,
        refLeft: initialState.refLeft,
        refRight: initialState.refRight,
      });
      return;
    }

    let { refLeft, refRight } = state;
    if (refLeft > refRight) {
      [refLeft, refRight] = [refRight, refLeft];
    }

    const startIndex = state.startIndex < e.activeTooltipIndex ? state.startIndex : e.activeTooltipIndex;
    const endIndex = state.startIndex > e.activeTooltipIndex ? state.startIndex : e.activeTooltipIndex;

    const top = Math.max(...data.slice(startIndex, endIndex + 1).map(({ count }) => count));

    // @ts-ignore
    setState({
      ...state,
      top,
      left: refLeft,
      right: refRight,
      refLeft: '',
      refRight: '',
    });
  };

  const zoomOut = () => {
    setState({
      ...initialState,
    });
  };

  return {
    zoomOut,
    state,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
