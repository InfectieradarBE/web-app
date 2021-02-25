# Results Page

This document contains information about how to create page content for the results page.

## Markdown Flavors

Currently, the following renderers are available for selection:

- **default:** rendering standard markdowns, with one custom renderer for inline code.
- **chartRenderer:** extending the default renderer for custom syntax for Map Charts and Composed Line and Scatter chart.

### Custom Inline Code Renderer

Inline code syntax
```
`This page has been last updated at 02.feb.2021 16:00.`
```

This will be rendered as:

![inline code example](images/inlineCodeRenderer.png)

## Map Chart

This component can be used to display spatially distributed data that changes over time. With the tabs, you can select different data sources.
For example:

<img src="images/mapChartExample.png" alt="map chart example" width="70%"/>


### Data Format
- geo data
- time series

### Add as page item

This component can be added as an individual page item (not localizable then, for localization support include it through a localized markdown).

To include, use a page item with a config:

```
"config": {
  "type": "mapDataSeries",
  "mapUrl": "<relative or absolute path to the geo data json>",
  "dataUrl": "<relative or absolute path to the time series data json>"
}
```

Relative pathes are interpreted using the "content root URL" as a base.

### Add from markdown
To reference (include) such a map chart from a markdown, you can use the following definition syntax:

```
[mapchart:/results/ggd-map-nl.json]:  /results/20210126_0801_kaart_data.json
```

The markdown page item needs to use the flavor type `chartRenderer`.

The json file for the geo data is referenced through the first filename (inside the brackets behind 'mapchart:').

The json file containing the style definitions and time series data, is defined in the url part of the definition behind the brackets (as seen in the above example).

Relative URLs are interpreted using the "content root url" as a base. Optionally, this would also accept absolute URLs starting with "https://" as well.

## Composed Line and Scatter Chart

This component can be used to display a time series as a line or scatter plot, or as a combination, like in this example:

<img src="images/composedChartExample.png" alt="composed chart example" width="70%"/>


### Data Format
Data and configuration for this chart can be defined through a single JSON file, with the following structure:

```
{
  "propeties": { ... },
  "series": [ {...}, ... ]
}
```

- **properties** object containing the chart configurations. Follow attributes are required:
  - **title** [string]: Title text above the chart.
  - **yUnit** [string]:
  - **yLabel** [string]:
  - **xLabel** [string]:
  - **dateToUnixTsFactor** [number]

- **series** array with the data series that should be displayed. Each entry should be an object with the following attributes:
  - **config** [object]: config for this particular series
    - **type** ["scatter" | "line"]: display type for the series. Currently supported: scatter (dots) or line.
    - **name** [string]: Name of the data series, that will be used in the legend (popup on hover).
    - **color** [string]: line or dot color. Using hex color codes.
  - **data** [array]: Each entry should be an object with the following attributes:
    - **date** [number]: numeric date value. This value multiplied by the `dateToUnixTsFactor` value from the properties should result in the posix timestamp value (seconds since 1970).
    - **value** [number]: numeric value for the y axis.


### Add as page item

This component can be added as an individual page item (not localizable then, for localization support include it through a localized markdown).

To include, use a page item with a config:

```
"config": {
  "type": "lineWithScatterChart",
  "dataUrl": "<relative or absolute path to the data json>"
}
```

Relative pathes are interpreted using the "content root URL" as a base.

### Add from markdown
To reference (include) such a composed chart from a markdown, you can use the following definition syntax:

```
[line-and-scatter-chart]: /results/20210126_0801_percentage_klachten_over_tijd.json
```

The markdown page item needs to use the flavor type `chartRenderer`.

The URL can be relative to the "content root url" or absolute pathes starting with "https//:"
