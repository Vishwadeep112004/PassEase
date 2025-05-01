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

type RootStackParamList = {
  Dashboard: undefined;
  ChatBot: undefined;
  Settings: undefined;
};

const ChatBot = () => {
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

  const sendMessage = async (messageText?: string) => {
    const userMessage = (messageText || input).trim();
    if (!userMessage) return;

    // Check if "Others" is selected
    if (userMessage === 'Others') {
      setMessages(prev => [
        ...prev,
        { text: 'Enter the Query manually', sender: 'bot' },
      ]);
      setInput('');  // Clear the input field
      return;
    }

    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setShowPresets(false); // Hide preset temporarily while waiting for bot response
    setLoading(true); // Show "Typing..." message

    try {
      const response = await fetch(
        'https://passease-conductor.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=Pass-Conductor&api-version=2021-10-01&deploymentName=production',
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key':
              '8i1OjJYJ0Maey9iauKeTMDM0aoyqmTdmg9xDrWdyCMAUrjSp5WLhJQQJ99BDACYeBjFXJ3w3AAAaACOGSXeP',
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
            filters: {},
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
    } finally {
      setLoading(false);
      setShowPresets(true); // Show presets again after bot reply
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Image
          source={require('../assets/images/bot.jpeg')}
          style={styles.avatar}
        />
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

      {/* Bottom Navigation Bar */}
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image source={require('../app/images/home2.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
          <Image source={require('../app/images/profile1.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../app/images/logout1.png')} style={styles.icon} />
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
