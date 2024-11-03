// Fetch data from data.json using Axios
axios.get('https://raw.githubusercontent.com/SamTan20240527/TestFSDProject1/refs/heads/main/data.json')
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
