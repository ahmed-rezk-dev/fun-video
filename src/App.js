import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
	FaPlay,
	FaPause,
	FaVolumeMute,
	FaVolumeUp,
	FaRegClock,
	FaClosedCaptioning,
} from 'react-icons/fa';
import videosArray from './fake-data';
import time_convert from './Helper';

// To load random video every time the pase is visited.
var randomVideo = videosArray[Math.floor(Math.random() * videosArray.length)];

function App() {
	const videoEl = useRef();
	const [play, setPlay] = useState(false);
	const [muted, setMuted] = useState(false);
	const [volume, setVolume] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [textTracks, setTextTracks] = useState(false);

	// handle Play video event
	const handleOnPlay = () => {
		setPlay(true);
		if (videoEl.current.textTracks.length > 0) {
			setTextTracks(true);
		}
	};

	// handle Paused video event
	const handleOnPause = () => {
		setPlay(false);
	};

	// handle Volume Change event
	const handleVolumeChange = () => {
		console.log(videoEl.current.volume);
		setMuted(videoEl.current.muted);
		if (videoEl.current.volume > 0) {
			setVolume(videoEl.current.volume);
		} else {
			setMuted(true);
		}
	};

	// handle Time Update event
	const handleTimeUpdate = () => {
		const minutes = parseInt(videoEl.current.duration / 60, 10);
		const seconds = parseInt(videoEl.current.duration % 60);
		const currentTimeTotal = parseInt(videoEl.current.currentTime);
		setCurrentTime(`${time_convert(currentTimeTotal)} / ${minutes}:${seconds}`);
	};

	useEffect(() => {
		setVolume(videoEl.current.volume);
		videoEl.current.title = randomVideo.title;
	}, []);

	return (
		<div className="App">
			<div className="container main-container d-flex flex-column justify-content-center align-items-start">
				{/* START: header */}
				<header className="header">
					<p className="title" data-heading="Fun Videos">
						Fun Videos
					</p>
				</header>
				{/* END: header */}

				<div className="row">
					{/* START: video title */}
					<div className="col-md-12 text-left">
						<h3>{randomVideo.title}</h3>
					</div>
					{/* END: video title */}

					{/* START: video player */}
					<div className="col-md-12">
						<div className="video-container text-center">
							<video
								ref={videoEl}
								controls
								className="video-player"
								src={randomVideo.link}
								poster={randomVideo.poster}
								preload="none"
								onPlay={handleOnPlay}
								onPause={handleOnPause}
								onVolumeChange={handleVolumeChange}
								onTimeUpdate={handleTimeUpdate}
							></video>
						</div>
					</div>
					{/* END: video player */}

					<div className="col-md-12">
						<div className="row justify-content-center">
							{/* START: playing status */}
							<div className="col-md-3 col-sm-3 d-flex justify-content-md-center justify-content-sm-start align-items-center mb-3">
								{play ? (
									<>
										<FaPlay color="#20c997" size="20" /> <span className="ml-1">Playing</span>
									</>
								) : (
									<>
										<FaPause color="#e83e8c" size="20" />
										<span className="ml-1">Paused</span>
									</>
								)}
							</div>
							{/* END: playing status */}

							{/* START: Volume status */}
							<div className="col-md-3 col-sm-3 d-flex justify-content-md-center justify-content-sm-start align-items-center mb-3">
								{muted ? (
									<>
										<FaVolumeMute color="#4ad9db" size="30" />
										<span className="ml-1">Muted</span>
									</>
								) : (
									<>
										<FaVolumeUp color="#4ad9db" size="30" />
										<span className="ml-1">{parseInt(volume * 10)}</span>
									</>
								)}
							</div>
							{/* END: Volume status */}

							{/* START: time status */}
							<div className="col-md-3 col-sm-3 d-flex justify-content-md-center justify-content-sm-start align-items-center mb-3">
								<FaRegClock color="#007bff" size="30" />
								<span className="ml-1">{currentTime}</span>
							</div>
							{/* END: time status */}

							{/* START: video caption */}
							<div className="col-md-3 col-sm-3 d-flex justify-content-md-center justify-content-sm-start align-items-center mb-3">
								<FaClosedCaptioning color="#007bff" size="30" />
								<span className="ml-1">{textTracks ? 'YES' : 'NO'}</span>
							</div>
							{/* END: video caption */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
