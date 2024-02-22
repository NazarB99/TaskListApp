import React, {useState} from 'react';
import {useActionSheet} from '@expo/react-native-action-sheet';
import CheckBox from '@react-native-community/checkbox';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {MenuButton} from './MenuButton';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavigationType} from '../navigation/MainStack';
import {Task, deleteTask, updateTask} from '../services/tasks';
import dayjs from 'dayjs';
import {ImportantBadge} from './ImportantBadge';

interface Props {
  item: Task;
}

const options = ['Delete', 'Edit', 'Cancel'];
const destructiveButtonIndex = 0;
const cancelButtonIndex = 2;

export const TaskItem = ({item}: Props) => {
  const {navigate, replace} = useNavigation<MainStackNavigationType>();
  const {showActionSheetWithOptions} = useActionSheet();
  const [taskCompleted, setTaskCompleted] = useState<boolean>(item.completed);

  const onMenuButtonPress = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 1:
            if (item?._id) {
              navigate('TaskForm', {
                itemId: item._id,
              });
            }
            break;

          case destructiveButtonIndex:
            if (item?._id) {
              const res = await deleteTask(item._id);
              if (res) {
                replace('Main');
              }
            }
            break;

          case cancelButtonIndex:
        }
      },
    );
  };

  const handleTaskItemPress = () => {
    if (item._id) {
      navigate('Details', {
        itemId: item._id,
      });
    }
  };

  const handleValueChange = async (val: boolean) => {
    setTaskCompleted(val);
    if (item?._id) {
      await updateTask(item._id, {
        completed: val,
      });
    }
  };

  return (
    <View style={styles.taskItem}>
      <View style={styles.leftBlock}>
        <CheckBox
          value={taskCompleted}
          style={styles.checkBox}
          animationDuration={0.2}
          onAnimationType="fill"
          offAnimationType="fade"
          onValueChange={handleValueChange}
        />
        <Pressable onPress={handleTaskItemPress} style={styles.taskInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.bottomInfo}>
            <Text style={styles.subtitle}>{dayjs().format('DD MMM YYYY')}</Text>
            {item.isImportant && <ImportantBadge />}
          </View>
        </Pressable>
      </View>
      <MenuButton onPress={onMenuButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 36,
  },
  checkBox: {
    marginLeft: 2,
  },
  taskInfo: {
    gap: 2,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  bottomInfo: {
    flexDirection: 'row',
    gap: 4,
  },
  subtitle: {
    fontSize: 10,
    color: 'grey',
  },
});
