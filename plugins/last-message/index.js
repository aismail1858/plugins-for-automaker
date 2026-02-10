/**
 * Last Message Navigator Plugin
 *
 * Features:
 * - Arrow Up/Down: Navigate through last user messages (shows in input)
 * - TAB: Insert message into input (does NOT send)
 * - Ctrl+C: Copy last message to clipboard
 * - ESC: Restore original input and exit navigation mode
 */

let messageIndex = -1;
let originalInput = '';
let lastNavigatedInput = '';

exports.activate = function(context) {
  context.onChatKeyDown((event) => {
    const messages = context.getMessages();
    const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);

    // Arrow Up: Show previous user message
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (userMessages.length === 0) {
        context.showToast('info', 'No messages to navigate');
        return true;
      }
      if (messageIndex < userMessages.length - 1) {
        if (messageIndex === -1) originalInput = context.getInput();
        messageIndex++;
        const msg = userMessages[userMessages.length - 1 - messageIndex];
        context.setInput(msg);
        lastNavigatedInput = msg;
        context.showToast('info', `${userMessages.length - messageIndex}/${userMessages.length}`);
      } else {
        context.showToast('info', 'At oldest message');
      }
      return true;
    }

    // Arrow Down: Show next user message
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (messageIndex > 0) {
        messageIndex--;
        const msg = userMessages[userMessages.length - 1 - messageIndex];
        context.setInput(msg);
        lastNavigatedInput = msg;
        context.showToast('info', `${userMessages.length - messageIndex}/${userMessages.length}`);
      } else if (messageIndex === 0) {
        messageIndex = -1;
        context.setInput(originalInput);
        lastNavigatedInput = originalInput;
        context.showToast('info', 'Back to original input');
      }
      return true;
    }

    // TAB: Insert current message into input (does NOT send)
    if (event.key === 'Tab') {
      event.preventDefault();
      messageIndex = -1;
      context.showToast('success', 'Message inserted! Press Enter to send.');
      return true;
    }

    // Ctrl+C: Copy last message to clipboard
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      if (userMessages.length > 0) {
        const lastMessage = userMessages[userMessages.length - 1];
        context.copyToClipboard(lastMessage);
        context.showToast('success', 'Last message copied!');
      } else {
        context.showToast('info', 'No messages to copy');
      }
      return true;
    }

    // ESC: Cancel navigation
    if (event.key === 'Escape' && messageIndex >= 0) {
      event.preventDefault();
      messageIndex = -1;
      context.setInput(originalInput);
      lastNavigatedInput = originalInput;
      context.showToast('info', 'Navigation cancelled');
      return true;
    }

    return false;
  });
};

exports.deactivate = function() {
  console.log('[LastMessage] Plugin deactivated');
};
