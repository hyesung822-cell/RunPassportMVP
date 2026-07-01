import { View, Text, StyleSheet } from 'react-native';

export default function RunScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏃 Today's Journey</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F3EA',
  },
  title: {
    fontSize: 28,
  },
});