import React from 'react';

const Notifications = () => {
    return (
        <div className="flex-grow border-l border-r border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Notifications</h1>
            </div>
            <div className="p-4">
                <h1 style={{fontWeight:'bold', fontSize:40}}>Nothing to see here — yet</h1>
                <p className="text-gray-600">From likes to reposts and a whole lot more, this is where all the action happens.</p>
                {/* Add notification list here */}
            </div>
        </div>
    );
};

export default Notifications;
