import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import Button from '../components/Button';
import SkillCard from '../components/SkillCard';

interface SkillProps {
  id: string;
  name: string;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<SkillProps[]>([]);
  const [greeting, setGreeting] = useState('Good morning!');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }

    setSkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: String) {
    setSkills(oldState => oldState.filter(
      skill => skill.id !== id,
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return;
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon!');
    } else {
      setGreeting('Good night!');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Welcome, Jackson</Text>
      <Text style={styles.greetings}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#777"
        onChangeText={setNewSkill}
      />

      <Button
        title="Add Skill"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginTop: 50 }]}>My skills</Text>

      <FlatList
        data={skills}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  title: {
    color: '#f5f3f0',
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold'
  },
  greetings: {
    color: '#f5f3f0',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#f5f3f0',
    fontSize: 16,
    padding: Platform.OS === 'ios' ? 16 : 10,
    marginTop: 30,
    borderRadius: 8,
  },
});