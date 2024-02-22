import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTypedRoute} from '../navigation/MainStack';
import {Task, fetchTaskById} from '../services/tasks';
import {ImportantBadge} from '../components/ImportantBadge';

export const DetailsScreen = () => {
  const {params} = useTypedRoute<'Details'>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    async function getTask() {
      if (params?.itemId) {
        const res = await fetchTaskById(params.itemId);
        if (res._id) {
          setTask(res);
        }
      }
    }

    getTask();
  }, [params?.itemId]);

  return (
    <View style={styles.container}>
      {task && (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{task.title}</Text>
            {task.isImportant && <ImportantBadge />}
          </View>
          <Text style={styles.description}>{task.description}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
  },
});
