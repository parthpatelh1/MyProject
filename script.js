let response = 0
const Super_Sector = {

'00': 'Total nonfarm',
'05': 'Total private',
'06': 'Goods-producing',
'07': 'Service-providing',
'08': 'Private service-providing',
'10': 'Mining and logging',
'20': 'Construction',
'30': 'Manufacturing',
'31': 'Durable Goods',
'32': 'Nondurable Goods',
'40': 'Trade, transportation, and utilities',
'41': 'Wholesale trade',
'42': 'Retail trade',
'43': 'Transportation and warehousing',
'44': 'Utilities',
'50': 'Information',
'55': 'Financial activities',
'60': 'Professional and business services',
'65': 'Education and health services',
'70': 'Leisure and hospitality',
'80': 'Other services',
'90': 'Government'
}

let Super_Sector_ID = Object.keys(Super_Sector)
console.log(Super_Sector_ID)
//These colors are from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow:'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      pink: 'rgb(247, 30, 223)',
      blueviolet:'rgb(26, 26, 255)',
      maroon:'rgb(179, 0, 0)',
      limegreen: 'rgb(102, 255, 51)',
      darkorange:'rgb(230, 138, 0)',
      brightgreen:'rgb(153, 255, 153)',
      seablue:'rgb(0, 153, 204)',
      brown:'rgb(153, 102, 51)',
      darkblue:'rgba(0, 77, 153,)',
      lightbrown:'rgb(204, 153, 102)',
      brightred:'rgb(255, 77, 77)',
      peach:'rgb(255, 217, 179)',
      forest:'rgb(0, 153, 51)',
      hotpink:'rgb(255, 26, 198)',
      teal:'rgb(0, 255, 255)',
      babyblue: 'rgb(153, 204, 255)'
    };

let Chart_Color_ID = Object.keys(CHART_COLORS)
//console.dir(CHART_COLORS)
    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 201, 201, 0.5)',
      pink: 'rgba(247, 30, 223, 0.5)',
      blueviolet: 'rgba(26, 26, 255, 0.5)',
      maroon:'rgba(179, 0, 0, 0.5)',
      limegreen: 'rgba(102, 255, 51, 0.5)',
      darkorange: 'rgba(230, 138, 0, 0.5)',
      brightgreen:'rgba(153, 255, 153, 0.5)',
      seablue: 'rgba(0, 153, 204, 0.5)',
      brown:'rgba(153, 102, 51, 0.5)',
      darkblue:'rgba(0, 77, 153, 0.5)',
      lightbrown: 'rgba(204, 153, 102, 0.5)',
      brightred:'rgba(255, 77, 77, 0.5)',
      peach:'rgba(255, 217, 179, 0.5)',
      forest:'rgba(0, 153, 51, 0.5)',
      hotpink:'rgba(255, 26, 198, 0.5)',
      teal:'rgba(0, 255, 255, 0.5)',
      babyblue: 'rgba(153, 204, 255, 0.5)'

    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: [],
      datasets: []
    }

  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);

//    console.dir(myChart);
//    console.log("Ending");

function responseReceivedHandler() {
  if (this.status == 200) {
    console.log(this.response);
    let dataArray = this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID;
    let sectorID = seriesID.substring(3,5)
    let gridline =  {
      label: 'Super Sector',
      data: [],
      borderColor: CHART_COLORS.red,
      backgroundColor: CHART_COLORS_50_Percent.red,
      hidden: true
    };

    for (let i = dataArray.length-1; i >= 0; i--) {
     gridline.data.push(dataArray[i].value)
     if(response==0) {

     data.labels.push(dataArray[i].period.substring(1)+ '/'+ dataArray[i].year)
    }
  }
gridline.label = Super_Sector[sectorID]
gridline.borderColor = CHART_COLORS[Chart_Color_ID[response]]
gridline.backgroundColor = CHART_COLORS_50_Percent[Chart_Color_ID[response]]

  data.datasets.push(gridline)
  response++
  } else {
console.log ("error");
  }

  if(response==Super_Sector_ID.length) {

  const myChart = new Chart(
    document.getElementById('myChart'),
      config);
    }
}
//console.log(config)
//console.dir(myChart)

for (let i=0; i<Super_Sector_ID.length; i++) {
let startquery = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
let endquery = "00000001?registrationkey=2bf44dddc7104ef3af7c40be297bda02"
let xhr = new XMLHttpRequest();
xhr.addEventListener("load", responseReceivedHandler);
xhr.responseType = "json";
xhr.open("GET", startquery+Super_Sector_ID[i]+endquery);
xhr.send();
}
