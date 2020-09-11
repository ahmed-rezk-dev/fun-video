import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaPlay, FaPause } from 'react-icons/fa';

function App() {
	const videoEl = useRef();

	const [play, setPlay] = useState(false);

	// handle Play video event
	const handleOnPlay = () => {
		setPlay(true);
	};

	// handle Paused video event
	const handleOnPause = () => {
		setPlay(false);
	};

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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
