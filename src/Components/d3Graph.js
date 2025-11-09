import { getD3Data, subscribe, unsubscribe } from "../console-monkey-patch";
import { useState, useEffect } from "react";
import * as d3 from "d3"

export default function D3Graph()
{
    const [graphData, setData] = useState([])

    //useEffect essential to remount and unmount the subscribing event on rerender/updates, 
    //allowing for graphData to be updated
    useEffect(() =>
    {
        //set initial value of graph data.
        setData(getD3Data())

        //update graph when data is updated
        function update_graph(event)
        {
            const incoming_data = event.detail
            console.log("THIS SHIT ACtUALLY WORKS: " + incoming_data)
            setData(incoming_data.map(item => logToNum(item)))
        }
         //when the component is mounted, subscribe to d3Data event and map it to update_graph to 
            subscribe("d3Data", update_graph);
        //for clean up purposes to ensure that stale listener is removed and doesn't cause memory issues
            return () => unsubscribe("d3Data", update_graph);

    }, [])

    //useffect for creating graph logic
    useEffect(() =>
    {
        const svg = d3.select('svg')

        svg.selectAll("*").remove();

        let w = svg.node().getBoundingClientRect().width
        w = w-40
        let h = svg.node().getBoundingClientRect().height
        h = h-25
        const barMargin = 10;
        const barWidth = w/graphData.length;

        let yScale = d3.scaleLinear()
        //8000 is the max possible value for pitch (it's an arbitrary number)
            .domain([0, 100])
            .range([h, 0])

        

        const chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', 'translate(30,3)');


        //Actual data shit goes here
        chartGroup.append('path')
            .datum(graphData)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x((d, i) => i*barWidth)
                .y((d) => yScale(d))
            )


        let yAxis = d3.axisLeft(yScale);
        chartGroup.append('g')
            .classed('axis y', true)
            .call(yAxis);
    }, [graphData])
    
    function logToNum(input)
    {
        let letters = {'C': 0,  'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
        if (!input) {return 0};
        var stringArray  = input.split(/(\s+)/)
        for(const item of stringArray)
        {
            if(item.startsWith('note:'))
            {
                let val = item.substring(5)
                let midi_number = 12 +(12 * parseInt(val[1])) + letters[val[0].toUpperCase()] 
                return midi_number
            }
        }

    }
    return(
       <div className = 'col'>
            <svg width= '50%' height = '200px' className = 'border border-primary p-2'></svg> 
       </div>
    )
}