import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Svg, { G, Path, Circle } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'

const Chart = () => {
  const [data, setData] = useState<{ name: string; percentage: number; color: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)  // State to store total

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#00D8B6']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.144.28:5000/api/admin/analytics')
        const routeData = response.data.data
        const total = response.data.total  // Fetch total from the response
  
        // Calculate percentages based on the total
        const formatted = Object.entries(routeData).map(([route, count], i) => ({
          name: route,
          percentage: (Number(count) / total) * 100,
          color: colors[i % colors.length]
        }))
  
        setData(formatted)
        setTotal(total)  // Store total in the state (if needed)
        setLoading(false)
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }
  
    fetchData()
  }, [])
  

  const pieSlices: JSX.Element[] = []
  let startAngle = 0

  data.forEach((item) => {
    const angle = (item.percentage / 100) * 360
    const endAngle = startAngle + angle
    const largeArc = angle > 180 ? 1 : 0

    const radius = 100
    const x1 = 100 + radius * Math.cos((Math.PI * startAngle) / 180)
    const y1 = 100 + radius * Math.sin((Math.PI * startAngle) / 180)
    const x2 = 100 + radius * Math.cos((Math.PI * endAngle) / 180)
    const y2 = 100 + radius * Math.sin((Math.PI * endAngle) / 180)

    const path = `M100,100 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`
    pieSlices.push(<Path key={item.name} d={path} fill={item.color} stroke="#fff" strokeWidth={2} />)

    startAngle = endAngle
  })

  return (
    <LinearGradient
      colors={['#2980B9', '#89253e']}
      style={styles.gradient}
    >
      <Text style={styles.heading}>📊 Route Analytics</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <View style={styles.chartBox}>
            <Svg height="200" width="200">
              <Circle cx="100" cy="100" r="100" fill="#f0f0f0" />
              <G>{pieSlices}</G>
            </Svg>
          </View>

          <View style={styles.legendBox}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.name} - {item.percentage.toFixed(1)}%</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </LinearGradient>
  )
}

export default Chart

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20
  },
  chartBox: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10
  },
  legendBox: {
    marginTop: 25,
    width: '80%',
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 12
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4
  },
  legendText: {
    fontSize: 16,
    color: '#333'
  }
})
