## React Revolving Carousel

React UI component for filtering linearly arranged data. The layout is comprised of two areas of interest: the range-browser and the focus-tray. The bounds-sliders determine the start and end of the browsed range which is then displayed across the entire width of the focus-tray. The range is a colleciton of objects arranged by a sort-value, and is automatically sorted by string or number. The focus-tray is updated each time a bounds-slider position is changed.

### Features
  * Full React/Flux pattern
  * Minimal dependencies (lodash, react-draggable, react-velocity)
  * Callbacks for onReady, onClick and onChange
  * Methods for back, next, and focused
  * Fluid layout
  * CSS Rich

### Try it
See the demo at [http://www.uismithing.com/main/carousel](http://www.uismithing.com/main/carousel).

### Repository
[https://github.com/uismithing/react-revolving-carousel](https://github.com/uismithing/react-revolving-carousel)

### Install
`npm install react-revolving-carousel -s`

### Deploy
`import Carousel from "react-revolving-carousel"`

<Carousel ref="reactcarousel" {...props}>
  <div>section 0 content</div>
  <div>section 1 content</div>
  ...
  <div>section n content</div>
</Carousel>

### props
  * Panel:{}
  * Viewport:{}
  * Section:{}
  * Carousel:{}