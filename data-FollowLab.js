/*x
async function loadData() {
    const response = await axios.get('data.json');
    return response.data.yearly;
}
*/

//datnum is a variable that represents each individual element within
//the data array during each iteration of the map function
let data = await loadData();
let earnings = data.map(function (datnum) {
    return {
        amount: datnum.payment.amount,
        date: new Date(datnum.completed_at)
    };
});

//2.Filter 2020 only
let filtered = earnings.filter(function (datnum) {
    return datnum.date.getFullYear() == 2020;
});

//getMonth() method is a built-in function in JavaScript's Date object.
//It's used to retrieve the month component of a specified date object.
let byMonth = filtered.map(function (datanum) {
    return {
        amount: parseInt(datanum.amount),
        month: datanum.date.getMonth()
    };
});

//Group all the records of the same month together
// `data` is an array of objects, `key` is the key (or property accessor) to group by
// reduce runs this anonymous function on each element of `data` (the `item` parameter,
// returning the `storage` parameter at the end
var groupBy = function (data, key) {
    return data.reduce(function (storage, item) {
        // get the first instance of the key by which we're grouping
        var group = item[key];
        // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
        storage[group] = storage[group] || [];
        // add this item to its group within `storage`
        storage[group].push(item);
        // return the updated storage to the reduce function, which will then loop through the next
        return storage;
    }, {}); // {} is the initial value of the storage
};
let groups = groupBy(byMonth, "month");

//Reducing is to summarize an array into a single value, 
//usually used for finding the sum, average, minimal value or maximum value.
let series = Object.values(groups).map(function(group, month) {
    return {
      x: monthNames[month],
      y: group.reduce((acc, datanum) => acc + datanum.amount, 0)
    };
  });

  //The final data is ready for us to send to ApexCharts.
  chart.updateSeries([
    {
      name: "Sales",
      data: series
    }
  ]);

//8.Dynamic Charts - not yet