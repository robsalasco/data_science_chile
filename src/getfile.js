import * as d3 from 'd3';

export const getData = async () => {
    try {
      const response = await d3.csv("./data/datall.csv")
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
    }
};

