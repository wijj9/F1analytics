import React from 'react';
const twitchParent = window.location.hostname;
const Live: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-black flex flex-col md:flex-row p-4 gap-4">
            {/* Video iframe (left side) */}
            <div className="flex-1">
                <iframe
                    src="https://embedrun.store/embed/e1143ef0-3bc4-11f0-afb1-ecf4bbdafde4"
                    width="100%"
                    height="600"
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-lg"
                    frameBorder="0"
                ></iframe>
            </div>

            {/* Twitch Chat iframe (right side) */}
            <div className="w-full md:w-[350px]">
                <iframe
                    src={`https://www.twitch.tv/embed/bigunit_42/chat?parent=${twitchParent}`}
                    style={{
                        zIndex: 0, // Ensure it's not being overlapped
                        pointerEvents: 'auto', // Allow interaction
                    }}
                    className="rounded-lg shadow-lg"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                ></iframe>
            </div>
        </div>
    );
};

export default Live;
