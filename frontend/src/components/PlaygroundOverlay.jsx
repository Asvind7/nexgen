import React from 'react';
import ProjectIDE from './ProjectIDE';

/**
 * PlaygroundOverlay now delegates to the full-featured ProjectIDE.
 * Keeps backward compatibility with any existing `onClose` usages.
 */
export default function PlaygroundOverlay({ onClose }) {
    return (
        <ProjectIDE
            onClose={onClose}
            title="Free Lab"
            initialCode={"# NexGen Python Lab 🐍\n# Experiment freely here!\n\nprint('Hello, World!')\n"}
        />
    );
}