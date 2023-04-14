import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Settings from './components/Settings';
import Quiz from './components/Quiz';
import { ReactComponent as Volume } from './assets/volume.svg';
import { ReactComponent as VolumeMute } from './assets/volume-mute.svg';
import { useAppDispatch, useAppSelector } from './store/helper/hooks';
import { toggleMute } from './store/game';
import theme from './assets/theme.mp3';
import About from './components/About';

function App() {
  const dispatch = useAppDispatch();
  const { mute } = useAppSelector((state) => state.game);
  const bgaudio = React.useRef<any>();

  React.useEffect(() => {
    bgaudio.current.volume = 0.1;
    if (!mute) bgaudio.current.play();
    if (mute) bgaudio.current.pause();
  }, [mute]);

  return (
    <BrowserRouter>
      <main>
        <audio loop ref={bgaudio}>
          <source src={theme} type="audio/mpeg" />
        </audio>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/play" element={<Quiz />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {mute ? (
          <VolumeMute className="mute" onClick={() => dispatch(toggleMute())} />
        ) : (
          <Volume className="sound" onClick={() => dispatch(toggleMute())} />
        )}
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
