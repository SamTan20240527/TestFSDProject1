//Define chart <options>, <series>=empty array, <noData>=option property to display "Waiting..."
const options =  {
    chart: {
        type: 'line',
        height:"100%"
    },
    series:[   
    ],
    noData: {
        "text": "Waiting to fetch data"
    }
}

//Create & render id=chart and <options>
const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render()

//Fetch data after all DOM elements have been loaded
//<loadData> function is called from data.js
//<chart> variable refers to the global variable <chart>
window.addEventListener('DOMContentLoaded', async ()=>{
    let series = await loadData();
    chart.updateSeries([{
        'name': 'Sales',
        'data': series
    }])
})
