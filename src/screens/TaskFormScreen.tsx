import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '../components/Input';
import {SubmitButton} from '../components/SubmitButton';
import {createTask, fetchTaskById, updateTask} from '../services/tasks';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavigationType, useTypedRoute} from '../navigation/MainStack';

export const TaskFormScreen = () => {
  const {replace} = useNavigation<MainStackNavigationType>();
  const {params} = useTypedRoute<'TaskForm'>();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImportance, setTaskImportance] = useState(false);

  useEffect(() => {
    async function getTask() {
      if (params?.itemId) {
        const res = await fetchTaskById(params.itemId);
        if (res._id) {
          setTaskTitle(res.title);
          setTaskDescription(res.description);
          setTaskImportance(res.isImportant);
        }
      }
    }

    getTask();
  }, [params?.itemId]);

  const handleCreateTaskPress = async () => {
    if (params?.itemId) {
      const res = await updateTask(params.itemId, {
        title: taskTitle,
        description: taskDescription,
        isImportant: taskImportance,
      });
      if (res.createdAt) {
        replace('Main');
      }
    } else {
      const res = await createTask({
        title: taskTitle,
        description: taskDescription,
        isImportant: taskImportance,
      });
      if (res.createdAt) {
        replace('Main');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Task Title"
        placeholder="Title"
        inputStyles={styles.titleInput}
        value={taskTitle}
        onChange={setTaskTitle}
      />
      <Input
        label="Task Description"
        placeholder="Description"
        inputStyles={styles.descriptionInput}
        value={taskDescription}
        onChange={setTaskDescription}
      />
      <View style={styles.importantFlag}>
        <CheckBox
          value={taskImportance}
          boxType="square"
          onAnimationType="fill"
          offAnimationType="fade"
          onValueChange={(val: boolean) => setTaskImportance(val)}
        />
        <Text>Important</Text>
      </View>
      <SubmitButton buttonText="Create Task" onPress={handleCreateTaskPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    height: 60,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    height: 120,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  importantFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
});
