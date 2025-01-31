import React from 'react';

const Bookmarks = () => {
    return (
        <div className="flex-grow border-l border-r border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Bookmarks</h1>
            </div>
            <div className="p-4">
                <p className="text-gray-600">You haven't added any Tweets to your Bookmarks yet.</p>
                {/* Add bookmarked tweets list here */}
            </div>
        </div>
    );
};

export default Bookmarks;
