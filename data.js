//Simplified by Gemini
let data = await loadData();

let earnings = data.map(({ payment: { amount }, completed_at }) => ({
    amount,
    date: new Date(completed_at)
}));

let filtered = earnings.filter(datnum => datnum.date.getFullYear() === 2020);

let byMonth = filtered.map(({ amount, date }) => ({
    amount: parseInt(amount),
    month: date.getMonth()
}));

const groupBy = (data, key) => data.reduce((groups, item) => {
    (groups[item[key]] ||= []).push(item);
    return groups;
}, {});

let groups = groupBy(byMonth, "month");

let series = Object.entries(groups).map(([month, group]) => ({
    x: monthNames[month],
    y: group.reduce((acc, datnum) => acc + datnum.amount, 0)
}));

chart.updateSeries([{
    name: "Sales",
    data: series
}]);