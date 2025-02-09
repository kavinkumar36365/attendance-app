import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="timetable" options={{ headerShown: false }} />
      <Stack.Screen name="attendanceRecord" options={{ headerShown: false }} />
    </Stack>
  );
}