import React, { useRef, useLayoutEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

const LineGraph = ({
  id,
  data,
  xLabel,
  yLabel,
}: {
  id: string
  data: { [key: string]: string | number }[]
  xLabel: string
  yLabel: string
}) => {
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    const chart = am4core.create(id, am4charts.XYChart)

    chart.data = data

    // create x axis
    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = xLabel
    xAxis.renderer.minGridDistance = 50
    xAxis.renderer.grid.template.location = 0.5
    xAxis.startLocation = 0.5
    xAxis.endLocation = 0.5

    // create x axis
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
    yAxis.baseValue = 0

    // create series
    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.valueY = yLabel
    series.dataFields.categoryX = xLabel
    series.strokeWidth = 2
    series.tensionX = 0.77

    // tooltip
    const bullet = series.bullets.push(new am4charts.Bullet())
    bullet.tooltipText = '{valueY}'

    // create line
    const range = yAxis.createSeriesRange(series)
    range.value = 0
    range.endValue = -1000
    range.contents.stroke = am4core.color('#FF0000')
    range.contents.fill = range.contents.stroke

    // Add scrollbar
    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.scrollbarX = scrollbarX

    chart.cursor = new am4charts.XYCursor()

    chartRef.current = chart

    return () => {
      chart.dispose()
    }
  }, [data])

  return <div id={id} style={{ width: '100%', height: '500px' }} />
}

export default LineGraph
