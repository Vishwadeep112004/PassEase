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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import faqData from './data';

type RootStackParamList = {
  Dashboard: undefined;
  ChatBot: undefined;
  Settings: undefined;
  Landing: undefined; // Added Landing to the type definition
};

const ChatBot_01 = () => {


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Hi! How can I help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [showPresets, setShowPresets] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state for "typing..." message

  const presetQuestions = [
    'Registration Query',
    'Document Requirement',
    'Pass Related Query',
    'Payment Issue',
    'Others',
  ];

 

  const findBestMatch = (query: string) => {
    query = query.toLowerCase().trim();
    let max=0;
    let ans="";
    for (const faq of faqData) {
        // Count how many keywords match
        const matchCount = faq.keywords.filter(keyword => query.includes(keyword)).length;
        if(max<matchCount)
        {
            max=matchCount;
            ans=faq.answer;
        }
    }
  

    return ans||"Sorry, I am unable to answer to your question can you visit out website";
};

  
  
  const sendMessage = async (messageText?: string) => {
    const userMessage = (messageText || input).trim();
    if (!userMessage) return;
  
    if (userMessage === 'Others') {
      setMessages(prev => [
        ...prev,
        { text: 'Enter the Query manually', sender: 'bot' },
      ]);
      setInput('');
      return;
    }
  
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setShowPresets(false);
    setLoading(true);
  
    setTimeout(() => {
      const botReply = findBestMatch(userMessage);
      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
      setLoading(false);
      setShowPresets(true);
    }, 1000); // Simulate "typing..."
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
      
        <Text style={styles.title}>PassEase Assistant</Text>
        <Text style={styles.status}>🟢 Online</Text>
      </View>

      <ScrollView style={styles.chatBox} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              msg.sender === 'user' ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}

        {loading && (
          <View style={[styles.bubble, styles.botBubble]}>
            <Text style={styles.messageText}>Typing...</Text>
          </View>
        )}

        {showPresets && (
          <View style={styles.presetContainer}>
            {presetQuestions.map((question, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.presetButton}
                onPress={() => sendMessage(question)} // Directly send message when preset is tapped
              >
                <Text style={styles.presetText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message..."
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBot_01;

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
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  presetButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF4B4B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 5,
  },
  presetText: {
    color: '#FF4B4B',
    fontSize: 14,
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
