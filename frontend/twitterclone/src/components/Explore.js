import React from 'react';

const Explore = () => {
    return (
        <div className="flex-grow border-l border-r border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Explore</h1>
            </div>
            <div className="p-4">
                <p className="text-gray-600">Discover what's happening in the world right now.</p>
                {/* Add trending topics and search functionality here */}
            </div>
        </div>
    );
};

export default Explore;
