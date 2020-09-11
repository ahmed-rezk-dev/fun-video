import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	const videoEl = useRef();
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
							></video>
						</div>
					</div>
					{/* END: video player */}
				</div>
			</div>
		</div>
	);
}

export default App;
