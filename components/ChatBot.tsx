import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const ChatBot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Hi! How can I help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages([...messages, { text: userMessage, sender: 'user' }]);
    setInput('');

    try {
      const response = await fetch(
        'https://passeasebot.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=PassEase-chatbot&api-version=2021-10-01&deploymentName=production',
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': 'BjwBCbwK0n030b5uD3VEO6Z4DwmwFCyLgM0BIVpdApCmzW4pjXf5JQQJ99BDACGhslBXJ3w3AAAaACOGOYqP',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            top: 3,
            question: userMessage,
            includeUnstructuredSources: true,
            confidenceScoreThreshold: '0.3',
            answerSpanRequest: {
              enable: true,
              topAnswersWithSpan: 1,
              confidenceScoreThreshold: '0.3',
            },
            filters: {
              metadataFilter: {
                logicalOperation: 'AND',
                metadata: [],
              },
            },
          }),
        }
      );

      const data = await response.json();
      const botReply = data.answers?.[0]?.answer || "Sorry, I couldn't find an answer.";

      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { text: 'Something went wrong. Please try again later.', sender: 'bot' },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Image
          source={require('../assets/images/bot.jpeg')} // Add your bot avatar here
          style={styles.avatar}
        />
        <Text style={styles.title}>PassEase Assistant</Text>
        <Text style={styles.status}>🟢 Online</Text>
      </View>

      <ScrollView style={styles.chatBox} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[styles.bubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message..."
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0FF',
  },
  header: {
    backgroundColor: '#FF1E1E',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  chatBox: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#D6B5F9',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF4B4B',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#FF1E1E',
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});