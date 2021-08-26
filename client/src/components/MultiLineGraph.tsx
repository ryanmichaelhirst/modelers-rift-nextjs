import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

const MultiLineGraph = ({
  id,
  data,
  xLabel,
  yLabels,
  tooltipTitle,
  tooltipTitles,
}: {
  id: string
  data: { [key: string]: string | number }[]
  xLabel: string
  yLabels: string[]
  tooltipTitle: string
  tooltipTitles: string[]
}) => {
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    const chart = am4core.create(id, am4charts.XYChart)

    chart.data = data

    // Create x axis
    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = xLabel

    // create y axis
    let yAxis = chart.yAxes.push(new am4charts.ValueAxis())
    yAxis.baseValue = 0

    // Create 1st line
    let series = chart.series.push(new am4charts.LineSeries())
    series.tooltipText = `${tooltipTitle} (lvl {level}) \n [bold]${tooltipTitles[0]}:[/] {value1} \n[bold]${tooltipTitles[1]}:[/] {value2}`
    series.dataFields.valueY = 'value1'
    series.dataFields.categoryX = 'level'
    series.yAxis = yAxis

    // Create 2nd line
    let series2 = chart.series.push(new am4charts.LineSeries())
    series2.dataFields.valueY = 'value2'
    series2.dataFields.categoryX = 'level'

    // Add cursor
    chart.cursor = new am4charts.XYCursor()

    chartRef.current = chart

    return () => {
      chart.dispose()
    }
  }, [data])

  return <div id={id} style={{ width: '100%', height: '500px' }} />
}

export default MultiLineGraph
