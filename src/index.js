/*
 * LightningChartJS example that showcases series/axes progressing to all kinds of directions inside a dashboard.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    SolidFill,
    ColorRGBA,
    AxisScrollStrategies,
    DataPatterns,
    Themes
} = lcjs

// Import data-generators from 'xydata'-library.
const {
    createProgressiveTraceGenerator,
    createTraceGenerator
} = require('@arction/xydata')

// Create a 3x3 dashboard.
const grid = lightningChart().Dashboard({
    // theme: Themes.dark 
    numberOfRows: 3,
    numberOfColumns: 3
})

// Add charts to dashboard.
const cells = [
    { row: 1, col: 0 },
    { row: 2, col: 1 },
    { row: 1, col: 2 },
    { row: 0, col: 1 },
    { row: 1, col: 1 }
]
const chooseRandom = (options) => options[Math.round(Math.random() * (options.length - 1))]
const createCell = (cell) => {
    const chart = grid.createChartXY({
        columnIndex: cell.col,
        rowIndex: cell.row,
        columnSpan: 1,
        rowSpan: 1
    })
    // Add a random omni-directional series.
    const type = chooseRandom(['PointSeries', 'LineSeries'])
    // Setup data-generation for series.
    if (cell.row == cell.col) {
        const series = chart['add' + type]()
        if (type === 'LineSeries') {
            series.setCursorSolveBasis('nearest')
        }
        // Random trace
        createTraceGenerator()
            .setNumberOfPoints(100000)
            .generate()
            .setStreamInterval(50)
            .setStreamBatchSize(10)
            .setStreamRepeat(true)
            .toStream()
            .forEach(point => series.add(point))
    } else {
        // Random progressive trace with mapped direction.
        const flipPlane = cell.col == 1
        const mul = { x: cell.col == 0 ? -1 : 1, y: cell.row == 0 ? 1 : -1 }
        // Configure axes.
        let axisX = chart.getDefaultAxisX(), axisY = chart.getDefaultAxisY()
        if (cell.row == cells.reduce((prev, cell) => Math.max(prev, cell.row), 0)) {
            axisX.dispose()
            axisX = chart.addAxisX(true)
        }
        if (cell.col == 0) {
            axisY.dispose()
            axisY = chart.addAxisY(true)
        }
        if (mul.x < 0) {
            axisX
                .setInterval(-100, 0)
                .setScrollStrategy(flipPlane ? AxisScrollStrategies.fitting : AxisScrollStrategies.regressive)
        } else
            axisX
                .setInterval(0, 100)
                .setScrollStrategy(flipPlane ? AxisScrollStrategies.fitting : AxisScrollStrategies.progressive)

        if (mul.y < 0) {
            axisY
                .setInterval(-100, 0)
                .setScrollStrategy(flipPlane ? AxisScrollStrategies.regressive : AxisScrollStrategies.fitting)
        } else
            axisY
                .setInterval(0, 100)
                .setScrollStrategy(flipPlane ? AxisScrollStrategies.progressive : AxisScrollStrategies.fitting)

        const series = chart['add' + type](axisX, axisY)
        if (type === 'LineSeries') {
            series.setCursorSolveBasis('nearest')
        }
        createProgressiveTraceGenerator()
            .setNumberOfPoints(100000)
            .generate()
            .setStreamInterval(50)
            .setStreamBatchSize(2)
            .setStreamRepeat(true)
            .toStream()
            .forEach(point => series.add({ x: (flipPlane ? point.y : point.x) * mul.x, y: (flipPlane ? point.x : point.y) * mul.y }))
    }
    return chart.setTitle(type)
}
cells.map(createCell)
