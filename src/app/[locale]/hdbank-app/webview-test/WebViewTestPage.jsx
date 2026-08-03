'use client';

import { useEffect, useState } from 'react';

const WebViewTestPage = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isWebViewAvailable, setIsWebViewAvailable] = useState(false);

    useEffect(() => {
        // Check if running inside React Native WebView
        if (typeof window !== 'undefined' && window.ReactNativeWebView) {
            setIsWebViewAvailable(true);
            console.log('ReactNativeWebView is available');
        } else {
            console.log('ReactNativeWebView is NOT available');
        }
    }, []);

    const sendMessage = (type, data) => {
        if (window.ReactNativeWebView) {
            const message = {
                type,
                data,
                timestamp: new Date().toISOString()
            };
            
            // Send message to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify(message));
            
            // Log the sent message
            setMessages(prev => [...prev, {
                direction: 'sent',
                type,
                data,
                time: new Date().toLocaleTimeString()
            }]);
        } else {
            alert('ReactNativeWebView is not available. This page needs to be loaded in a React Native WebView.');
        }
    };

    const handleCustomMessage = () => {
        if (messageInput.trim()) {
            sendMessage('custom', { message: messageInput });
            setMessageInput('');
        }
    };

    const sendTestMessages = () => {
        // Test different message types
        sendMessage('greeting', { text: 'Hello from WebView!' });
        
        setTimeout(() => {
            sendMessage('user_action', { 
                action: 'button_click', 
                buttonId: 'test-button',
                userId: '12345'
            });
        }, 500);

        setTimeout(() => {
            sendMessage('data_request', { 
                requestType: 'user_profile',
                fields: ['name', 'email', 'phone']
            });
        }, 1000);
    };

    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        React Native WebView Test
                    </h1>
                    <p className="text-gray-600">
                        Test page for window.ReactNativeWebView.postMessage communication
                    </p>
                    
                    {/* Status Indicator */}
                    <div className="mt-4 flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${isWebViewAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`font-semibold ${isWebViewAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {isWebViewAvailable ? 'WebView Available' : 'WebView NOT Available'}
                        </span>
                    </div>
                </div>

                {/* Test Actions */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Messages</h2>
                    
                    <div className="space-y-3">
                        {/* Quick Test Buttons */}
                        <button
                            onClick={sendTestMessages}
                            className="w-full bg-[#DA2128] hover:bg-[#B71C22] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                            disabled={!isWebViewAvailable}
                        >
                            Send Test Messages (3)
                        </button>

                        <button
                            onClick={() => sendMessage('notification', { title: 'Test Notification', body: 'This is a test notification from WebView' })}
                            className="w-full bg-[#DA2128] hover:bg-[#B71C22] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                            disabled={!isWebViewAvailable}
                        >
                            Send Notification
                        </button>

                        <button
                            onClick={() => sendMessage('navigation', { screen: 'Profile', params: { userId: 123 } })}
                            className="w-full bg-[#DA2128] hover:bg-[#B71C22] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                            disabled={!isWebViewAvailable}
                        >
                            Request Navigation
                        </button>

                        <button
                            onClick={() => sendMessage('api_call', { endpoint: '/api/user/profile', method: 'GET' })}
                            className="w-full bg-[#F9A61C] hover:bg-[#E18C00] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                            disabled={!isWebViewAvailable}
                        >
                            Request API Call
                        </button>

                        {/* Custom Message Input */}
                        <div className="pt-4 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Custom Message:
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleCustomMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-transparent"
                                    disabled={!isWebViewAvailable}
                                />
                                <button
                                    onClick={handleCustomMessage}
                                    className="bg-[#DA2128] hover:bg-[#B71C22] text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                                    disabled={!isWebViewAvailable || !messageInput.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Log */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Message Log</h2>
                        <button
                            onClick={clearMessages}
                            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            Clear Log
                        </button>
                    </div>

                    {messages.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No messages sent yet</p>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className="bg-red-50 border-l-4 border-[#DA2128] p-4 rounded"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-[#B71C22]">
                                            Type: {msg.type}
                                        </span>
                                        <span className="text-sm text-gray-500">{msg.time}</span>
                                    </div>
                                    <pre className="text-sm text-gray-700 overflow-x-auto bg-white p-2 rounded">
                                        {JSON.stringify(msg.data, null, 2)}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Integration Guide */}
                <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Integration Guide</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-3">
                            <strong>React Native WebView Component:</strong>
                        </p>
                        <pre className="text-xs bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
{`import { WebView } from 'react-native-webview';

<WebView
  source={{ uri: 'https://your-domain.com/hdbank-app/webview-test' }}
  onMessage={(event) => {
    const message = JSON.parse(event.nativeEvent.data);
    console.log('Received from WebView:', message);
    
    // Handle different message types
    switch (message.type) {
      case 'greeting':
        console.log('Greeting:', message.data.text);
        break;
      case 'user_action':
        console.log('User action:', message.data.action);
        break;
      case 'navigation':
        // Navigate to screen
        navigation.navigate(message.data.screen, message.data.params);
        break;
      case 'api_call':
        // Make API call
        fetch(message.data.endpoint, { method: message.data.method });
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  }}
  javaScriptEnabled={true}
  domStorageEnabled={true}
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebViewTestPage;
