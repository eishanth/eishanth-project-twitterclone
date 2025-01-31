import React from 'react';

const Premium = () => {
    return (
        <div className="flex-grow">
            <div className="border-b border-gray-200 p-4">
                <h1 className="text-xl font-bold">Premium</h1>
            </div>
            <div className="p-4">
                <div className="bg-[#f7f9f9] rounded-2xl p-6 mb-4">
                    <h2 className="text-2xl font-bold mb-2">Subscribe to Premium</h2>
                    <p className="text-gray-600 mb-4">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">✓</div>
                            <p>Prioritized rankings in conversations and search</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">✓</div>
                            <p>See approximately twice as many posts between ads</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">✓</div>
                            <p>Edit post feature</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">✓</div>
                            <p>Longer posts up to 25,000 characters</p>
                        </div>
                    </div>
                    <button className="mt-6 bg-black text-white rounded-full px-6 py-3 font-bold hover:bg-gray-800 w-full">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Premium;
