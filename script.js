// Fetch data from data.json using Axios
axios.get('data.json')
  .then(response => {
    const data = response.data;

    // Prepare data for ApexCharts
    const options = {
      chart: {
        type: 'line' // or 'bar', 'pie', etc.
      },
      series: [{
        name: 'Series Name',
        data: data.seriesData
      }],
      xaxis: {
        categories: data.categories
      }
    };

    // Initialize ApexCharts
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });