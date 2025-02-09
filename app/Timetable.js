import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function Timetable() {
  const classes = [
    { course: 'MATHS (U18MAT3101-R21)', instructor: 'Dr. Smith', timing: '08:30 AM - 09:30 AM (60 min)' },
    { course: 'PHYSICS (U18PHY3101-R21)', instructor: 'Dr. Johnson', timing: '09:30 AM - 10:30 AM (60 min)' },
    // Add more classes as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TIME TABLE</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Jan 2025</Text>
      </View>
      <ScrollView horizontal style={styles.dateSelector}>
        {['01 MON', '02 TUE', '03 WED', '04 THU', '05 FRI', '06 SAT', '07 SUN'].map((date, index) => (
          <View key={index} style={styles.dateItem}>
            <Text style={styles.dateItemText}>{date}</Text>
          </View>
        ))}
      </ScrollView>
      <ScrollView style={styles.classesContainer}>
        {classes.map((item, index) => (
          <View key={index} style={styles.classItem}>
            <Text style={styles.classCourse}>{item.course}</Text>
            <Text style={styles.classInstructor}>{item.instructor}</Text>
            <Text style={styles.classTiming}>{item.timing}</Text>
            <TouchableOpacity style={styles.attendanceButton}>
              <Text style={styles.attendanceButtonText}>Mark attendance</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'green',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateSelector: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  dateItem: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  dateItemText: {
    fontSize: 16,
  },
  classesContainer: {
    padding: 10,
  },
  classItem: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  classCourse: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  classInstructor: {
    fontSize: 16,
    color: '#555',
  },
  classTiming: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  attendanceButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  attendanceButtonText: {
    color: 'white',
    fontSize: 16,
  },
});