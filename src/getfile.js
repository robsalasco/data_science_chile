import * as d3 from 'd3';

export const getData = async () => {
  try {
    const response = await d3.csv("./data/datall.csv")
    response.forEach(function(d){ d.id = +d.id; });
    response.forEach(function(d, i) { if (d.price == "NA") response[i].price = 0; });
    response.forEach(function(d){ d.price = +d.price; });
    
    return response;
  } catch (error) {
    console.error(error);
  }
};

