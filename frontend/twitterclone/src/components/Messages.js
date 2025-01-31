import React from 'react';

const Messages = () => {
    return (
        <div className="flex-grow">
            <div className="border-b border-gray-200 p-4">
                <h1 className="text-xl font-bold">Messages</h1>
            </div>
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                <h2 className="text-2xl font-bold mb-2">Welcome to your inbox!</h2>
                <p className="text-gray-600 mb-4">Drop a line, share posts and more with private conversations between you and others on X.</p>
                <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-2 font-bold hover:bg-[#1a8cd8]">
                    Write a message
                </button>
            </div>
        </div>
    );
};

export default Messages;
