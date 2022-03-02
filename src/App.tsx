/* eslint-disable import/no-default-export */
import React, { useState, useEffect } from 'react';
import './App.css';
import hotkeys from 'hotkeys-js';
import { formatDistanceToNowStrict } from 'date-fns';
import { ToggleHide } from './Components/ToggleView';
import { ProcessVideoButton } from './Components/ProcessVideoButton';
import { ErrorCode, Status, useVideoData } from './hooks/useVideoData';
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
  useEffect(() => {
    hotkeys('alt+h', () => {
      setHide(!hide);
    });

    return () => { hotkeys.unbind('alt+h'); };
  }, [hide]);

  useEffect(() => {
    onHide(hide);
  }, [hide]);

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
        <Message>
          You have reached the video limit, relax go to some friends, chill out and see the real world ffs.
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

  if (videoState.status === Status.ERROR && videoState.code === ErrorCode.LOGGED_OUT) {
    return (
      <div className="app-wrapper">
        <Message>
           You need to login to twitch to use the extension. Don’t have an account? well tough shit eh.
        </Message>
        <div className="app-test tw-flex tw-root--hover">
          <ToggleHide isHidden={hide} onToggle={setHide} />
          <ProcessVideoButton tooltip="You are not logged in">
            Login to use the service
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

  if (videoState.status === Status.SUCCESS) {
    return (
      <Chart graphHeight={graphHeight} data={videoState.data} isHidden={hide} onHide={setHide} />
    );
  }

  return null;
}

export default App;
