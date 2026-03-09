import React from 'react';
import TutorScreen from './TutorScreen';

const ChatScreen = ({ level, userName }) => {
    return (
        <div className="flex-1 w-full h-full animate-fade-in flex flex-col overflow-hidden relative">
            <TutorScreen
                level={level}
                userName={userName}
                isOverlay={false}
                showSidebar={true}
            />
        </div>
    );
};

export default ChatScreen;
