import React from 'react';
import { Tabs } from 'expo-router';





export default function Layout() {
    return (
        <Tabs>
        <Tabs.Screen name="Timetable" options={{ title: 'Timetable' }} />
        <Tabs.Screen name="AttendanceRecord" options={{ title: 'Attendance Record' }} />
        </Tabs>
    );
}
