import React from 'react';
import { Tabs } from 'expo-router';





export default function Layout() {
    return (
        <Tabs>
        <Tabs.Screen name="Timetable" options={{ title: 'Timetable',headerShown:false }} />
        <Tabs.Screen name="AttendanceRecord" options={{ title: 'Attendance Record',headerShown:false }} />
        </Tabs>
    );
}
