import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {TaskItem} from '../components/TaskItem';
import {Task, fetchTasks} from '../services/tasks';

type Tabs = 'all' | 'important';

export const MainScreen = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [sortedTasksList, setSortedTasksList] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<Tabs>('all');

  useEffect(() => {
    async function getTasks() {
      const res = await fetchTasks();
      console.log(res);
      if (res) {
        setTasksList(res);
        setSortedTasksList(res);
      }
    }

    getTasks();
  }, []);

  const renderTaskItem = ({item}: {item: Task}) => <TaskItem item={item} />;

  const onPressTab = (tab: Tabs) => {
    if (tab === 'all') {
      setActiveTab('all');
      setSortedTasksList(tasksList);
    } else {
      setActiveTab('important');
      const onlyImportantTasks = tasksList.filter(task => task.isImportant);
      setSortedTasksList(onlyImportantTasks);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'all' ? styles.tabButtonActive : {},
          ]}
          onPress={() => onPressTab('all')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'all' ? styles.tabButtonTextActive : {},
            ]}>
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'important' ? styles.tabButtonActive : {},
          ]}
          onPress={() => onPressTab('important')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'important' ? styles.tabButtonTextActive : {},
            ]}>
            Important
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={sortedTasksList}
        contentContainerStyle={styles.taskList}
        renderItem={renderTaskItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  taskList: {
    gap: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderColor: '#3979F1',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 24,
  },
  tabButton: {
    width: '50%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
  },
  tabButtonActive: {
    backgroundColor: '#3979F1',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#000',
  },
  tabButtonTextActive: {
    fontSize: 16,
    color: '#fff',
  },
});
