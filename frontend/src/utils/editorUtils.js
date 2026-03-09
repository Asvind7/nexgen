/**
 * Handles tab insertion and auto-indentation logic for the Python code editor.
 * @param {KeyboardEvent} e - The keyboard event object.
 * @param {string} code - The current code in the editor.
 * @param {function} setCode - State setter for the code.
 */
export const handleAutoIndent = (e, code, setCode) => {
    const value = code;
    const target = e.target;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;

    // --- 1. HANDLE TAB KEY (Insert 4 spaces) ---
    if (e.key === 'Tab') {
        e.preventDefault();
        const newValue = value.substring(0, selectionStart) + "    " + value.substring(selectionEnd);
        setCode(newValue);

        const newPos = selectionStart + 4;
        // Restore cursor
        target.selectionStart = target.selectionEnd = newPos;
        setTimeout(() => {
            target.selectionStart = target.selectionEnd = newPos;
            // Backup for React render
            const el = document.activeElement;
            if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
                el.selectionStart = el.selectionEnd = newPos;
            }
        }, 0);
        return;
    }

    // --- 2. HANDLE ENTER KEY (Smart Indent) ---
    if (e.key === 'Enter') {
        // Get current line content up to the cursor
        const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
        const currentLine = value.substring(lineStart, selectionStart);

        // Find existing indentation of the current line
        const indentMatch = currentLine.match(/^(\s*)/);
        let indent = indentMatch ? indentMatch[1] : "";

        // If line ends with a colon, increase indentation for the next line
        if (currentLine.trim().endsWith(':')) {
            indent += "    ";
        }

        // Only take over if we have something to indent or we are after a colon
        if (indent.length > 0 || currentLine.trim().endsWith(':')) {
            e.preventDefault();

            // Construct new value
            const newValue = value.substring(0, selectionStart) + '\n' + indent + value.substring(selectionEnd);
            setCode(newValue);

            // Restore cursor position precisely after the inserted indentation
            const newCursorPos = selectionStart + indent.length + 1;

            // Immediate set
            target.selectionStart = target.selectionEnd = newCursorPos;

            // Deferred set (backup for React render cycles)
            setTimeout(() => {
                target.selectionStart = target.selectionEnd = newCursorPos;
                const el = document.activeElement;
                if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
                    el.selectionStart = el.selectionEnd = newCursorPos;
                }
            }, 0);
        }
    }
};
