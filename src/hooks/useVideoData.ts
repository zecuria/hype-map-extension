import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { Item } from '../types';

const HYPE_MAP_AUTH_COOKIE = 'hypemap-auth-token';
const AUTH_COOKIE = 'auth-token';
const NAME_COOKIE = 'name';

type LoginArgs = {
  auth: string;
  name: string;
};

const login = async ({ auth: token, name }: LoginArgs) => {
  const res = await fetch('https://api.hypemap.io/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, username: name }),
  });

  if (res.ok) {
    return res.json() as Promise<{ token: string }>;
  }

  throw new Error('Unexpected error');
};

type VideoArgs = {
  videoId: string;
  token: string;
}

const getVideo = async ({ videoId, token }: VideoArgs) => {
  const res = await fetch(`https://api.hypemap.io/video/${videoId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const def = {
    isProcessing: false,
    isEnabled: false,
    data: [],
  }

  if (res.status === 200) {
    const data: Item[] = await res.json();
    return { ...def, data, isEnabled: true };
  }

  if(res.status === 202) {
    return { ...def, isProcessing: true, isEnabled: true};
  }

  if (res.status === 404) {
    return def;
  }

  throw new Error("Unexpected error")
}

const processVideo = async ({ videoId, token }: VideoArgs) => {
  const res = await fetch(`https://api.hypemap.io/process-video`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId })
  });

  const output = { success: false, nextReset: '' };

  if (res.status === 200) {
    return { ...output, success: true };
  }

  if (res.status === 400) {
    const { name, data } = await res.json();
    if (name === 'VideoLimitReached') {
      return { ...output, nextReset: data.nextReset };
    }
  }

  throw new Error("Unexpected error")
}

export enum Status {
  LOADING = 'loading',
  PROCESSING = 'processing',
  NOT_ENABLED = 'not_enabled',
  LIMIT_REACHED = 'limit_reached',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ErrorCode {
  LOGGED_OUT = 'logged_out',
  UNEXPECTED_ERROR = 'unexpected_error',
}

type State = {
  status: Exclude<Status, Status.SUCCESS | Status.ERROR | Status.LIMIT_REACHED>;
} | {
  status: Status.SUCCESS;
  data: Item[],
} | {
  status: Status.ERROR,
  code: ErrorCode,
} | {
  status: Status.LIMIT_REACHED;
  nextReset: string;
};

const getToken = async ({ auth, name }: LoginArgs) => {
  const token = Cookie.get(HYPE_MAP_AUTH_COOKIE);
  if (token) {
    return token;
  }

  const { token: freshToken } = await login({ auth, name });
  Cookie.set(HYPE_MAP_AUTH_COOKIE, freshToken);
  return freshToken;
}

export const useVideoData = (videoId: string) => {
  const [videoState, setState] = useState<State>({
    status: Status.LOADING,
  });

  const { status } = videoState;

  const fetchVideo = async () => {
    if (status !== Status.PROCESSING) {
      setState({ status: Status.LOADING });
    }

    const auth = Cookie.get(AUTH_COOKIE);
    const name = Cookie.get(NAME_COOKIE);
    if (!auth || !name) {
      setState({ status: Status.ERROR, code: ErrorCode.LOGGED_OUT });
      Cookie.remove(HYPE_MAP_AUTH_COOKIE)
      return;
    }
    try {
      const token = await getToken({ auth, name });
      const { isEnabled, isProcessing, data } = await getVideo({ videoId, token })
      if (isEnabled && !isProcessing) {
        setState({ status: Status.SUCCESS, data });
      } else if (isProcessing) {
        setState({ status: Status.PROCESSING });
      } else {
        setState({ status: Status.NOT_ENABLED });
      }
    } catch (err) {
      setState({ status: Status.ERROR, code: ErrorCode.UNEXPECTED_ERROR });
    }
  };

  const process = async () => {
    setState({ status: Status.LOADING });

    const auth = Cookie.get(AUTH_COOKIE);
    const name = Cookie.get(NAME_COOKIE);
    if (!auth || !name) {
      setState({ status: Status.ERROR, code: ErrorCode.LOGGED_OUT });
      Cookie.remove(HYPE_MAP_AUTH_COOKIE)
      return;
    }
    try {
      const token = await getToken({ auth, name });
      const { nextReset, success } = await processVideo({ videoId, token })
      if (success) {
        setState({ status: Status.PROCESSING });
      } else if (nextReset) {
        setState({ status: Status.LIMIT_REACHED, nextReset });
      } else {
        setState({ status: Status.NOT_ENABLED });
      }
    } catch (err) {
      setState({ status: Status.ERROR, code: ErrorCode.UNEXPECTED_ERROR });
    }
  }

  useEffect(() => {
    fetchVideo();
  }, []);

  useEffect(() => {
    let interval: number;
    const clear = () => { window.clearInterval(interval); };

    if (status === Status.PROCESSING) {
      interval = window.setInterval(() => {
        fetchVideo();
      }, 10000);
    } else {
      clear();
    }

    return clear;
  }, [status]);

  return { videoState, process };
};
