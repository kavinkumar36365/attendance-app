import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function AttendanceRecord() {
  // Sample data
  const data = {
    labels: ['Maths', 'Phy', 'Chem', 'Bio', 'Hist'],
    datasets: [
      {
        data: [90, 75, 60, 85, 70],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Attendance record</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Attendance Percentages</Text>
        <BarChart
          data={data}
          width={Dimensions.get('window').width - 30}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`, // green color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          fromZero
          showBarTops
          showValuesOnTopOfBars
        />
      </View>
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
  chartContainer: {
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});