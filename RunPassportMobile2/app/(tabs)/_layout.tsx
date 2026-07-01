import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:'#8B6B4A',
      tabBarInactiveTintColor:'#A79C8E',
      tabBarStyle:{backgroundColor:'#FFFDF8',borderTopColor:'#E9E1D5'}
    }}>
      <Tabs.Screen name="index" options={{title:'Home', tabBarIcon:({color,size})=><Ionicons name="home" color={color} size={size}/>}} />
      <Tabs.Screen name="run" options={{title:'Run', tabBarIcon:({color,size})=><Ionicons name="walk" color={color} size={size}/>}} />
      <Tabs.Screen name="mail" options={{title:'Mail', tabBarIcon:({color,size})=><Ionicons name="mail" color={color} size={size}/>}} />
      <Tabs.Screen name="passport" options={{title:'Passport', tabBarIcon:({color,size})=><Ionicons name="book" color={color} size={size}/>}} />
      <Tabs.Screen name="profile" options={{title:'Profile', tabBarIcon:({color,size})=><Ionicons name="person" color={color} size={size}/>}} />
    </Tabs>
  )
}
