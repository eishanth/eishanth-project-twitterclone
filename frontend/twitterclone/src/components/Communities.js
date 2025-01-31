import React from 'react';

const Communities = () => {
    return (
        <div className="flex-grow">
            <div className="border-b border-gray-200 p-4">
                <h1 className="text-xl font-bold">Communities</h1>
            </div>
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                <h2 className="text-2xl font-bold mb-2">Find your communities</h2>
                <p className="text-gray-600 mb-4">Communities are groups of people with shared interests. Find communities you want to join, or create your own.</p>
                <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-2 font-bold hover:bg-[#1a8cd8]">
                    Create new community
                </button>
            </div>
        </div>
    );
};

export default Communities;
