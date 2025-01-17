"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

type City = {
  id: number
  name: string
  image_url: string | null
}

interface CityGraphProps {
  cities: City[]
  selectedCity: City
  onCityClick: (cityName: string) => void
}

export default function CityGraph({
  cities,
  selectedCity,
  onCityClick,
}: CityGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 100
    const height = 200
    const nodeRadius = 10

    svg.selectAll("*").remove()

    const yScale = d3
      .scaleLinear()
      .domain([0, cities.length - 1])
      .range([height - nodeRadius, nodeRadius])

    // Draw the dashed line
    svg
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", yScale(0))
      .attr("x2", width / 2)
      .attr("y2", yScale(cities.length - 1))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")

    // Draw nodes
    cities.forEach((city, i) => {
      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${yScale(i)})`)
        .attr("cursor", "pointer")

      const circle = g
        .append("circle")
        .attr(
          "r",
          city.name === selectedCity.name ? nodeRadius * 1.2 : nodeRadius
        )
        .attr("stroke-width", 2)

      // Apply Tailwind primary color if selected, otherwise white
      circle
        .classed("fill-primary", city.name === selectedCity.name)
        .classed("fill-white", city.name !== selectedCity.name)

      g.append("title").text(city.name)

      g.on("click", () => onCityClick(city.name))
    })
  }, [cities, selectedCity.name, onCityClick])

  return (
    <svg ref={svgRef} width="100" height="200" className="overflow-visible" />
  )
}
