/**
 * Plugin Context API Test
 *
 * This plugin tests all methods of the PluginContext API to verify
 * they work correctly in the agent-runner context.
 */

let testResults = [];

function logTest(methodName, passed, details = '') {
  const result = { method: methodName, passed, details };
  testResults.push(result);
  console.log(`[ContextTest] ${methodName}: ${passed ? '✓ PASS' : '✗ FAIL'} ${details}`);
}

function showSummary(context) {
  const passed = testResults.filter(r => r.passed).length;
  const total = testResults.length;
  const message = `Context API Tests: ${passed}/${total} passed`;

  if (passed === total) {
    context.showToast('success', message + ' - All tests passed!');
  } else {
    context.showToast('warning', message + ' - Some tests failed');
  }

  // Log summary to console
  console.log('[ContextTest] ===== TEST SUMMARY =====');
  testResults.forEach(r => {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.method}: ${r.details || (r.passed ? 'OK' : 'FAILED')}`);
  });
  console.log('[ContextTest] =========================');
}

exports.activate = function(context) {
  console.log('[ContextTest] Activating Plugin Context API Test...');

  // Reset test results
  testResults = [];

  // Test 1: getMessages()
  try {
    const messages = context.getMessages();
    const isArray = Array.isArray(messages);
    logTest('getMessages()', isArray, isArray ? `Returned ${messages.length} messages` : 'Did not return an array');
  } catch (error) {
    logTest('getMessages()', false, error.message);
  }

  // Test 2: getInput()
  try {
    const input = context.getInput();
    const isString = typeof input === 'string';
    logTest('getInput()', isString, isString ? `Returned: "${input}"` : 'Did not return a string');
  } catch (error) {
    logTest('getInput()', false, error.message);
  }

  // Test 3: setInput()
  try {
    const testValue = '[TEST INPUT]';
    context.setInput(testValue);
    const result = context.getInput();
    const passed = result === testValue;
    logTest('setInput()', passed, passed ? 'Input value set correctly' : `Expected "${testValue}", got "${result}"`);
    // Restore original input
    context.setInput('');
  } catch (error) {
    logTest('setInput()', false, error.message);
  }

  // Test 4: insertInInput()
  try {
    const originalInput = context.getInput();
    const testText = ' [INSERTED] ';
    context.insertInInput(testText);
    const result = context.getInput();
    const passed = result.includes(testText);
    logTest('insertInInput()', passed, passed ? 'Text inserted correctly' : 'Text was not inserted');
    // Restore original input
    context.setInput(originalInput);
  } catch (error) {
    logTest('insertInInput()', false, error.message);
  }

  // Test 5: sendMessage()
  try {
    // We can't actually send a message in tests, but we can verify the method exists
    const isFunction = typeof context.sendMessage === 'function';
    logTest('sendMessage()', isFunction, isFunction ? 'Method exists and is callable' : 'Method is not a function');
  } catch (error) {
    logTest('sendMessage()', false, error.message);
  }

  // Test 6: scrollToBottom()
  try {
    context.scrollToBottom();
    logTest('scrollToBottom()', true, 'Method executed without errors');
  } catch (error) {
    logTest('scrollToBottom()', false, error.message);
  }

  // Test 7: onChatKeyDown()
  try {
    const unregister = context.onChatKeyDown((e) => false);
    const isFunction = typeof unregister === 'function';
    if (isFunction) {
      unregister(); // Clean up
      logTest('onChatKeyDown()', true, 'Handler registered and unregistered correctly');
    } else {
      logTest('onChatKeyDown()', false, 'Did not return unregister function');
    }
  } catch (error) {
    logTest('onChatKeyDown()', false, error.message);
  }

  // Test 8: showToast()
  try {
    context.showToast('info', 'Test toast notification');
    logTest('showToast()', true, 'Toast notification displayed');
  } catch (error) {
    logTest('showToast()', false, error.message);
  }

  // Test 9: copyToClipboard()
  try {
    context.copyToClipboard('Test clipboard content').then(success => {
      logTest('copyToClipboard()', success, success ? 'Text copied to clipboard' : 'Clipboard operation failed');
    }).catch(error => {
      logTest('copyToClipboard()', false, error.message);
    });
  } catch (error) {
    logTest('copyToClipboard()', false, error.message);
  }

  // Show test summary after a short delay to allow async tests to complete
  setTimeout(() => {
    showSummary(context);
  }, 100);

  // Register keyboard shortcut to run tests again
  context.onChatKeyDown((event) => {
    if (event.ctrlKey && event.key === 't') {
      event.preventDefault();
      testResults = []; // Reset
      exports.activate(context); // Run tests again
      return true;
    }
    return false;
  });

  context.showToast('info', 'Context Test Plugin activated. Press Ctrl+T to run tests again.');
};

exports.deactivate = function() {
  console.log('[ContextTest] Plugin deactivated');
};
