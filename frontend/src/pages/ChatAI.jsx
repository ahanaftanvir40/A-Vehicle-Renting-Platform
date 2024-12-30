import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import SendIcon from '../components/Icon';

function ChatAI() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const resetConversation = async () => {
            try {
                await axios.post('http://localhost:5000/api/reset');
                setMessages([]);
            } catch (error) {
                console.error('Error resetting conversation history:', error.message);
            }
        };
        resetConversation();
    }, []);

    const displayMessage = (role, content) => {
        setMessages((prevMessages) => [...prevMessages, { role, content }]);
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const sendMessage = async () => {
        if (loading) return;
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        displayMessage('user', input);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                model: 'llama3',
                messages: [...messages, userMessage],
            });
            const assistantMessage = response.data.choices[0]?.message?.content || 'No response from server';
            displayMessage('LLama', assistantMessage);
        } catch (error) {
            console.error('Error:', error.message);
            displayMessage('LLama', 'Error occurred, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow p-6 overflow-y-auto bg-gray-100">
                <div className="max-w-3xl mx-auto">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                            {message.role === 'LLama' && (
                                <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">L</div>
                            )}
                            <div
                                className={`p-3 rounded-lg shadow ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} max-w-xs`}
                                dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
                            />
                            {message.role === 'user' && (
                                <div className="flex-shrink-0 bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center ml-3">U</div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start mb-4">
                            <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">L</div>
                            <div className="p-3 rounded-lg shadow bg-white text-gray-700 max-w-xs">
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef}></div>
                </div>
            </div>
            <div className="p-4 bg-white border-t border-gray-300">
                <div className="max-w-3xl mx-auto flex items-center space-x-4">
                    <input
                        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={sendMessage}
                        disabled={loading}
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatAI;
