import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaRegClock } from 'react-icons/fa';

// time convert helper
const time_convert = (num) => {
	var hours = Math.floor(num / 60);
	var minutes = num % 60;
	return hours + ':' + minutes;
};

function App() {
	const videoEl = useRef();

	const [play, setPlay] = useState(false);
	const [muted, setMuted] = useState(false);
	const [volume, setVolume] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	// handle Play video event
	const handleOnPlay = () => {
		setPlay(true);
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
	}, []);

	return (
		<div className="App">
			<div className="container">
				{/* START: header */}
				<header className="header">
					<p className="title" data-heading="Fun Videos">
						Fun Videos
					</p>
				</header>
				{/* END: header */}

				<div className="row">
					{/* START: video player */}
					<div className="col-md-12">
						<div className="video-container text-center">
							<video
								ref={videoEl}
								controls
								className="video-player"
								src="https://s3.eu-central-1.amazonaws.com/pipe.public.content/short.mp4"
								poster="https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png"
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
							<div className="col-md-3 status-container">
								{play ? (
									<>
										<FaPlay color="#20c997" size="20" /> <span>Playing</span>
									</>
								) : (
									<>
										<FaPause color="#e83e8c" size="20" />
										<span>Paused</span>
									</>
								)}
							</div>
							{/* END: playing status */}

							{/* START: Volume status */}
							<div className="col-md-3  status-container">
								{muted ? (
									<>
										<FaVolumeMute color="#4ad9db" size="30" />
										<span>Muted</span>
									</>
								) : (
									<>
										<FaVolumeUp color="#4ad9db" size="30" />
										<span>{parseInt(volume * 10)}</span>
									</>
								)}
							</div>
							{/* END: Volume status */}

							{/* START: time status */}
							<div className="col-md-3  status-container">
								<FaRegClock color="#007bff" size="30" />
								<span>{currentTime}</span>
							</div>
							{/* END: time status */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
