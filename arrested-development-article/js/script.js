function IsMobileCard()
{
  var check =  false;

  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

  return check;   
}

if (IsMobileCard()){
    document.getElementById("valueHeader").innerHTML = "Tap Any Picture Or Line";
    document.getElementById("viz2instructions").innerHTML = "Tap Any Bar";
    viz1Instructions = "Tap Any Picture Or Line";
}
else{
    viz1Instructions = "Hover Over Any Character Or Line";
}

//// first viz ///// 
d3.json("./data.json", function(error, json) {
    nodes = (json.nodes)
    links = (json.links)

var width = window.innerHeight / 1.35,
    height = window.innerHeight / 1.35;

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height]);

// evenly spaces nodes along arc
var circleCoord = function(node, index, num_nodes){
    var circumference = circle.node().getTotalLength();
    var pointAtLength = function(l){return circle.node().getPointAtLength(l)};
    var sectionLength = (circumference)/num_nodes;
    var position = sectionLength*index+sectionLength/2;
    return pointAtLength(circumference-position)
}

var svg = d3.select("#viz1").append("svg")
    .attr("width", width * 1.1)
    .attr("height", height * 1.1);

// invisible circle for placing nodes
// it's actually two arcs so we can use the getPointAtLength() and getTotalLength() methods
var dim = width-80
var circle = svg.append("path")
    .attr("d", "M 40, "+(dim/2+65)+" a "+dim/2+","+dim/2+" 0 1,0 "+dim+",0 a "+dim/2+","+dim/2+" 0 1,0 "+dim*-1+",0")
    .style("fill", "#ffd2c5");

force.start();

// set coordinates for container nodes
nodes.forEach(function(n, i) {
    var coord = circleCoord(n, i, nodes.length)
    n.x = coord.x
    n.y = coord.y
});

// use this one for straight line links...
var lines = svg.selectAll("line.node-link")
  .data(links).enter().append("line")
    .attr("class", "node-link")
  .attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; })
  .style("opacity","0.8")
  .style("stroke-width", function(d){return  Math.sqrt(d.value)})
  .on("mouseover", function(d){
                svg.selectAll(".node-link").style("stroke","lightgray")
                svg.selectAll(".node-link").style("opacity","0.3")
                d3.select(this).style("stroke","#FF4D11")
                d3.select(this).style("opacity","1")
                document.getElementById("valueHeader").innerHTML = d.value + " Shared Scenes";
            })
    .on("mouseout", function(d){
        svg.selectAll(".node-link").style("stroke","darkgray")
        svg.selectAll(".node-link").style("opacity","0.8")
        document.getElementById("valueHeader").innerHTML = viz1Instructions;
    });;

var gnodes = svg.selectAll('g.gnode')
    .data(nodes).enter().append('g')
    .attr("transform", function(d) {
        return "translate("+d.x+","+d.y+")"
    })
    .classed('gnode', true);

var node = gnodes.append("circle")
    .attr("r", 25)
    .attr("class", "node");

function restingLabelHeight(name){
if (name == 'Michael' || name == "Lindsay" || name == "G.O.B." || name == "Lucille"){
        return -3
    }
    else {
        return 3.5
    }
}

function activatedLabelHeight(name){
    if (name == 'Michael' || name == "Lindsay" || name == "G.O.B." || name == "Lucille"){
            return -3.5
        }
        else {
            return 4
        }
}

var labels = gnodes.append("text")
    .text(function(d){return d.name})
    .attr("id",function(d){return d.name + "Text"})
    .style("font-weight", "bold")
    .attr("dy", function(d){return restingLabelHeight(d.name) + "em"})


images = gnodes.append("image")
    .attr("xlink:href", function(d){return d.picture})
    .attr("x", -40)
    .attr("y", -40)
    .attr("width", 80)
    .attr("height", 80)
    .style("border-radius", "50%")
    .style("overflow","hidden")
    .attr("id",function(d){return d.name})
    .on("mouseover", function (d) {
        d3.select(this).attr("x", -50)
        d3.select(this).attr("y", -50)
        document.getElementById(d.name+"Text").dy.baseVal[0].valueInSpecifiedUnits = activatedLabelHeight(d.name)
        document.getElementById("valueHeader").innerHTML = d.total + " Total Scenes";
        lines.style('stroke', function(l) {
            if (d === l.source || d === l.target)
            return "#FF4D11";
            else
            return "lightgray";})
            lines.style('opacity', function(l) {
            if (d === l.source || d === l.target)
            return "1";
            else
            return "0.3";})})
    .on("mouseout", function (d) {
        images.attr("x", -40);
        images.attr("y", -40);
        document.getElementById(d.name+"Text").dy.baseVal[0].valueInSpecifiedUnits = restingLabelHeight(d.name)
        document.getElementById("valueHeader").innerHTML = viz1Instructions;
        lines.style('stroke', "darkgray")
        lines.style("opacity", "0.8")
    });

    
})

////////////////////// 2nd viz /////////////////////////
var data = [{
    "name": "Michael",
    "value": 2400,
    "picture": "./img/michael.jpg"
},
{
    "name": "G.O.B.",
    "value": 1381,
    "picture": "./img/gob.jpg"
},
{
    "name": "Lindsay",
    "value": 1265,
    "picture": "./img/lindsay.jpg"
},
{
    "name": "Lucille",
    "value": 1222,
    "picture": "./img/lucille.jpg"
},
{
    "name": "George Michael",
    "value": 1119,
    "picture": "./img/gm.jpg"
},
{
    "name": "Tobias",
    "value": 963,
    "picture": "./img/tobias.jpg"
},
{
    "name": "Buster",
    "value": 943,
    "picture": "./img/buster.jpg"
},
{
    "name": "Maeby",
    "value": 779,
    "picture": "./img/maeby.jpg"
},
{
    "name": "George",
    "value": 752,
    "picture": "./img/george.jpg"
}];

//sort bars based on value
data = data.sort(function (a, b) {
return d3.ascending(a.value, b.value);
})


if (IsMobileCard()) { // is mobile

    //set up svg using margin conventions - we'll need plenty of room on the right for labels
    var margin = {
        top: 0,
        right: 45,
        bottom: 25,
        left: 5
    };

    var width = window.innerWidth / 1.25 - margin.left - margin.right,
        height = window.innerHeight / 1.5 - margin.top - margin.bottom,
        labelAppendix = " Interactions";
}
else { // is not mobile

    //set up svg using margin conventions - we'll need plenty of room on the right for labels
    var margin = {
        top: 0,
        right: 65,
        bottom: 25,
        left: 15
    };

    var width = window.innerWidth / 1.75 - margin.left - margin.right,
        height = window.innerHeight / 1.5 - margin.top - margin.bottom,
        labelAppendix = " Family Interactions";
}

var svg = d3.select("#viz2").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
.range([0, width])
.domain([0, d3.max(data, function (d) {
    return d.value;
})]);

var y = d3.scale.ordinal()
.rangeRoundBands([height, 0], .1)
.domain(data.map(function (d) {
    return d.name;
}));

var bars = svg.selectAll(".bar")
.data(data)
.enter()
.append("g")

//append rects
bars.append("rect")
.attr("class", "bar")
.attr("y", function (d) {
    return y(d.name);
})
.attr("height", y.rangeBand())
.attr("x", 0)
.attr("width", function (d) {
    return x(d.value);
})
.on("mouseover", function(d, i){
    var src = d.picture;
    d3.select("#profPic").attr("xlink:href", src);
    document.getElementById('bar' + i + 'pic').style.visibility = 'hidden';
    document.getElementById('bar' + i + 'text').style.visibility = 'visible';
})
.on("mouseout", function(d,i){
    document.getElementById('bar' + i + 'pic').style.visibility = 'visible';
    document.getElementById('bar' + i + 'text').style.visibility = 'hidden';
});

//add a value label to the right of each bar
bars.append("text")
.attr("class", "label")
//y position of the label is halfway down the bar
.attr("y", function (d) {
    return y(d.name) + y.rangeBand() / 2 + 4;
})
//x position is 3 pixels to the right of the bar
.attr("x", function (d) {
    return x(d.value) + 3;
})
.text(function (d) {
    return d.value.toLocaleString('en') + labelAppendix;
})
.attr("id", function(d,i){
    return "bar" + i + "text"
})
.style('visibility', 'hidden');

// ADD IMAGE 
bars
    .append('image')
    .attr('id',function(d,i){return "bar" + i + "pic"})
    .attr('xlink:href', function(d) { return d.picture})
    .attr("height", d3.select('.bar')[0][0].height.baseVal.value + 2 + "px")
    .attr("y", function (d) { return y(d.name) - 1; })
    .attr("x", function (d) { return x(d.value) - 1});

profPic = svg.append('image')
.attr({
  'xlink:href': './img/michael.jpg', 
  x: width + margin.left + margin.right,
  y: height + margin.top + margin.bottom,
  width: 250,
  height: 250
})
.attr("transform", "translate(-250,-250)")
.attr("id", "profPic");

profPic[0][0].classList.add("profPicStyle");

//make y axis to show bar names
var yAxis = d3.svg.axis()
.scale(y)
//no tick marks
.tickSize(0)
.orient("right");

var gy = svg.append("g")
.attr("class", "y axis")
.call(yAxis)