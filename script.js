// Read in data
function readData(){

  //Read the data
  d3.csv("./ArrestedDevelopmentPairsAndRatingData.csv", function(data) {

    pairsData = []

    for (i=0;i<data.length;i++){
      pairsData.push({'title':data[i].title_y, 'rating': Number(data[i].rating), 'numVotes': Number(data[i].numVotes), 
                      'Buster+G.O.B.': Number(data[i]["Buster+G.O.B."]), 
                      'Buster+George_Michael': Number(data[i]["Buster+George_Michael"]), 
                      'Buster+George': Number(data[i]["Buster+George"]), 
                      'Buster+Lindsay': Number(data[i]["Buster+Lindsay"]), 
                      'Buster+Lucille': Number(data[i]["Buster+Lucille"]), 
                      'Buster+Maeby': Number(data[i]["Buster+Maeby"]), 
                      'Buster+Michael': Number(data[i]["Buster+Michael"]), 
                      'Buster+Oscar': Number(data[i]["Buster+Oscar"]), 
                      'Buster+Tobias': Number(data[i]["Buster+Tobias"]), 
                      'G.O.B.+George_Michael': Number(data[i]["G.O.B.+George_Michael"]), 
                      'G.O.B.+George': Number(data[i]["G.O.B.+George"]),
                      'G.O.B.+Lindsay': Number(data[i]["G.O.B.+Lindsay"]),
                      'G.O.B.+Lucille': Number(data[i]["G.O.B.+Lucille"]),
                      'G.O.B.+Maeby': Number(data[i]["G.O.B.+Maeby"]),
                      'G.O.B.+Michael': Number(data[i]["G.O.B.+Michael"]), 
                      'G.O.B.+Oscar': Number(data[i]["G.O.B.+Oscar"]),
                      'G.O.B.+Tobias': Number(data[i]["G.O.B.+Tobias"]),
                      'George_Michael+Lindsay': Number(data[i]["George_Michael+Lindsay"]),
                      'George_Michael+Lucille': Number(data[i]["George_Michael+Lucille"]),
                      'George_Michael+Maeby': Number(data[i]["George_Michael+Maeby"]),
                      'George_Michael+Michael': Number(data[i]["George_Michael+Michael"]),
                      'George_Michael+Oscar': Number(data[i]["George_Michael+Oscar"]),
                      'George_Michael+Tobias': Number(data[i]["George_Michael+Tobias"]),
                      'George+George_Michael': Number(data[i]["George+George_Michael"]),
                      'George+Lindsay': Number(data[i]["George+Lindsay"]),
                      'George+Lucille': Number(data[i]["George+Lucille"]),
                      'George+Maeby': Number(data[i]["George+Maeby"]),
                      'George+Michael': Number(data[i]["George+Michael"]),
                      'George+Oscar': Number(data[i]["George+Oscar"]),
                      'George+Tobias': Number(data[i]["George+Tobias"]),
                      'Lindsay+Lucille': Number(data[i]["Lindsay+Lucille"]),
                      'Lindsay+Maeby': Number(data[i]["Lindsay+Maeby"]),
                      'Lindsay+Michael': Number(data[i]["Lindsay+Michael"]),
                      'Lindsay+Oscar': Number(data[i]["Lindsay+Oscar"]),
                      'Lindsay+Tobias': Number(data[i]["Lindsay+Tobias"]),
                      'Lucille+Maeby': Number(data[i]["Lucille+Maeby"]),
                      'Lucille+Michael': Number(data[i]["Lucille+Michael"]),
                      'Lucille+Oscar': Number(data[i]["Lucille+Oscar"]),
                      'Lucille+Tobias': Number(data[i]["Lucille+Tobias"]),
                      'Maeby+Michael': Number(data[i]["Maeby+Michael"]),
                      'Maeby+Oscar': Number(data[i]["Maeby+Oscar"]),
                      'Maeby+Tobias': Number(data[i]["Maeby+Tobias"]),
                      'Michael+Oscar': Number(data[i]["Michael+Oscar"]),
                      'Michael+Tobias': Number(data[i]["Michael+Tobias"]),
                      'Oscar+Tobias': Number(data[i]["Oscar+Tobias"])
                    })
    }

    generateViz();
    
  })
}

function generateViz(){
  
  // FIRST VIZ //

  var margin = {top: 40, right: 40, bottom: 40, left: 60},
      //width = document.getElementById('first-viz').clientWidth - margin.left - margin.right,
      width = document.getElementById('scatter').clientWidth - margin.left - margin.right,
      height = document.getElementById('scatter').clientHeight - margin.top - margin.bottom

  // append the svg object to the body of the page
  var svg = d3.select("#scatter")
    .append("svg")
    .style("float","left")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // text label for title
  scatterTitle = svg.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                       (-5) + ")")
  .style("text-anchor", "middle")
  .text("Arrested Development Ratings And Common Scenes")
  .style("font-size","20px")
  .style("font-family", "Open Sans")
  .attr("id","scatterTitle")
  .style('alignment-baseline','ideographic');

  // text label for the y axis
  yAxisLabel = svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "0.75em")
    .style("text-anchor", "middle")
    .text("Number Of Ratings On IMDb")
    .style("font-size","15px")
    .style("font-family", "Open Sans")
    .attr("id","yAxisLabel");

  // text label for the x axis
  xAxisLabel = svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top) + ")")
      .style("text-anchor", "middle")
      .text("Number Of Scenes G.O.B. & Michael Share In Episode")
      .style("font-size","15px")
      .style("font-family", "Open Sans")
      .attr("id","xAxisLabel"); 

    minCommonScenes = d3.min(pairsData, function(d) { return d["G.O.B.+Michael"]; })
    maxCommonScenes = d3.max(pairsData, function(d) { return d["G.O.B.+Michael"]; })
    minNumVotes = d3.min(pairsData, function(d) { return d.numVotes; })
    maxNumVotes = d3.max(pairsData, function(d) { return d.numVotes; })

    // Add Y axis
    x = d3.scaleLinear()
      .domain( [0, maxCommonScenes])
      .range([ 5, width-5 ])

    // Add X axis
    y = d3.scaleLinear()
      .domain([0, maxNumVotes])
      .range([ height-5, 5 ]);


    xAxis = svg.append("g")
    .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(3));

    yAxis = svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y).tickSize(3));

    // Tool tip 
    var tooltip = d3.select("#scatter")
      .append("div")
      .style("max-width","200px")
      .attr('class', 'tooltip');

    // Initialize dots with group a
    dots = svg
      .selectAll('circle')
      .data(pairsData)
      .enter()
      .append('circle')
      .attr('id',function(d){return d.title})
      .attr("class", "scatter-dot")
      .attr('cx', function(d) {return x(d["G.O.B.+Michael"])})
      .attr("cy", function(d) { return y(d["numVotes"]) })
      .attr("r", 5)
      .attr("fill","#FF4D11")
      .attr("stroke-width",1)
      .attr("stroke","black")
      .on("mouseover", function(d){
        return tooltip
        .style("visibility", "visible")
          .style("left", d3.select(this).attr("cx") + "px")
          .style("top", d3.select(this).attr("cy") + "px")
        .html(d.title);
        })
        .on("mouseout", function(d){
          return tooltip.style("visibility", "hidden")})

    svg.append("svg:defs").append("svg:marker")
          .attr("id", "triangle")
          .attr("refX", 6)
          .attr("refY", 6)
          .attr("markerWidth", 30)
          .attr("markerHeight", 30)
          .attr("markerUnits","userSpaceOnUse")
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M 0 0 12 6 0 12 3 6")
          .style("fill", "black");
}



function updateXAxis(){

  name1 = document.getElementById("nameSelector1").value;
  name2 = document.getElementById("nameSelector2").value;

  if (name1 == name2){
    return;
  }
  else if (name1 < name2){ // if name1 is first alphabetically, put it first
    pair = name1 + "+" + name2;
  }
  else if (name1 > name2){
    pair = name2 + "+" + name1; // if name1 is first alphabetically, put it second
  }

  minCommonScenes = d3.min(pairsData, function(d) { return d[pair]; })
  maxCommonScenes = d3.max(pairsData, function(d) { return d[pair]; })

  x.domain( [0, maxCommonScenes])

  xAxis.call(d3.axisBottom(x));

  dots
    .transition()
    .duration(3000)
    .attr('cx', function(d) {return x(d[pair])})
    .attr("cy", function(d) { return y(d["numVotes"]) })

  xAxisLabel.text("Number Of Scenes " + name1 + " & " + name2 + " Share In Episode");
}





// function drawArrows(movieTitle, x1, y1){

//   //line              
//   d3.select("g").append("line")
//       .attr("x2",  (document.getElementById(movieTitle).cx.animVal.value)+3)
//       .attr("y2", (document.getElementById(movieTitle).cy.animVal.value)-10)
//       .attr("x1", x(x1))
//       .attr("y1", y(y1))
//       .attr("stroke-width", 1)
//       .attr("stroke", "black")
//       .attr("marker-end", "url(#triangle)");
// }


readData();
document.getElementById("nameSelector1").value = 'G.O.B.';
document.getElementById("nameSelector2").value = 'Michael';