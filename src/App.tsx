/* eslint-disable import/no-default-export */
import React, { useState, useEffect } from 'react';
import './App.css';
import hotkeys from 'hotkeys-js';
import { formatDistanceToNowStrict } from 'date-fns';
import { ToggleHide } from './Components/ToggleView';
import { ProcessVideoButton } from './Components/ProcessVideoButton';
import { Status, useVideoData } from './hooks/useVideoData';
import { Chart } from './Chart';
import { Message } from './Components/Message';
// import { CloseButton } from './Components/CloseButton';
interface AppProps {
  graphHeight: number,
  isHidden: boolean;
  onHide: (isHidden: boolean) => void;
  videoId: string;
}

function App({
  graphHeight, onHide, isHidden, videoId
}: AppProps) {
  const [hide, setHide] = useState(isHidden);
  const { process, videoState} = useVideoData(videoId)
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    hotkeys('alt+h', () => {
      setHide(!hide);
    });

    return () => { hotkeys.unbind('alt+h'); };
  }, [hide]);

  useEffect(() => {
    onHide(hide);
  }, [hide]);

  useEffect(() => {
    setShowMessage(true);
  }, [videoState.status])

  // if (message) {
  //   return (
  //     <div className="app-wrapper">
  //       <div className="pop-over">
  //         <div>{message}</div>
  //         <CloseButton onClick={() => console.log("close")} />
  //       </div>
  //     </div>
  //   );
  // }

  if (hide) {
    return (
      <div className="app-wrapper">
        <div className="app-test tw-flex tw-root--hover">
          <ToggleHide isHidden={hide} onToggle={setHide} />
        </div>
      </div>
    );
  }

  if (videoState.status === Status.LOADING) {
    return (
      <div className="app-wrapper">
        <div className="app-test tw-flex tw-root--hover">
          <ToggleHide isHidden={hide} onToggle={setHide} />
          <ProcessVideoButton isLoading tooltip="Loading data may take upto 1 min please don't refresh">
            Loading data
          </ProcessVideoButton>
        </div>
      </div>
    );
  }

  if (videoState.status === Status.NOT_ENABLED) {
    return (
      <div className="app-wrapper">
        <div className="app-test tw-flex tw-root--hover">
          <ToggleHide isHidden={hide} onToggle={setHide} />
          <ProcessVideoButton onClick={() => process()}>Process video</ProcessVideoButton>
        </div>
      </div>
    );
  }

  if (videoState.status === Status.PROCESSING) {
    return (
      <div className="app-wrapper">
        <div className="app-test tw-flex tw-root--hover">
          <ToggleHide isHidden={hide} onToggle={setHide} />
          <ProcessVideoButton isLoading tooltip="Processing can take upto 5 mins please don't refresh">
            Processing video...
          </ProcessVideoButton>
        </div>
      </div>
    );
  }

  if (videoState.status === Status.LIMIT_REACHED) {
    const distance = formatDistanceToNowStrict(new Date(videoState.nextReset));
    return (
      <div className="app-wrapper">
        <Message isOpen={showMessage}>
          You have reached the video limit, if you would like to gain more videos and support the development you can go <a href="https://hypemap.io">here</a>.
        </Message>
        <div className="app-test tw-flex tw-root--hover">
          <ToggleHide isHidden={hide} onToggle={setHide} />
          <ProcessVideoButton tooltip="You have reached the video limit">
            Limit reached, reset in {distance}
          </ProcessVideoButton>
        </div>
      </div>
    );
  }

  if (videoState.status === Status.ERROR) {
    return (
      <div className="app-wrapper">
        <div className="app-test tw-flex tw-root--hover">
          <ToggleHide isHidden={hide} onToggle={setHide} />
          <ProcessVideoButton tooltip="Error">
            Error occured
          </ProcessVideoButton>
        </div>
      </div>
    )
  }

  // if (errorMessage) {
  //   return (
  //     <div style={{ backgroundColor: '#fff' }}>
  //       Error:
  //       {errorMessage}
  //       {' '}
  //       (to hide / show press alt+h)
  //     </div>
  //   );
  // }

  if (videoState.status === Status.SUCCESS) {
    return (
      <Chart graphHeight={graphHeight} data={videoState.data} isHidden={hide} onHide={setHide} />
    );
  }

  return null;
}

export default App;
