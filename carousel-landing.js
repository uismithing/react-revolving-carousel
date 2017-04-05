import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Carousel from "react-revolving-carousel";
//
import {fetchCarouselHtml} from "../actions/actions_carousel-landing";
import {fetchCarouselPropsexampleJs} from "../actions/actions_carousel-landing";
import {fetchCarouselMethodsexampleJs} from "../actions/actions_carousel-landing";
import {fetchCarouselPropsDemoexampleJson} from "../actions/actions_carousel-landing";
import {fetchCarouselCssDemoexampleCss} from "../actions/actions_carousel-landing";
import {fetchCarouselDeployexampleHtml} from "../actions/actions_carousel-landing";
//
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class CarouselLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getInitialState()
	{
		return(
		{
			"Rangefilter":
			{
				"Focused":[]
			}
		});
	}
	componentWillMount()
	{
		this.props.fetchCarouselHtml();
		this.props.fetchCarouselPropsexampleJs();
		this.props.fetchCarouselMethodsexampleJs();
		this.props.fetchCarouselPropsDemoexampleJson();
		this.props.fetchCarouselCssDemoexampleCss();
		this.props.fetchCarouselDeployexampleHtml();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let navigationSection
			= 0;
		//
		window.requestAnimationFrame(()=>
		{
			let updateNavigationState
				= scopeProxy.props.updateNavigationstateAction;
			let setViewLoaded
				= scopeProxy.props.setViewLoadedAction;
			let setLayoutMode
				= scopeProxy.props.setLayoutModeAction;
			//
			let setviewTimeout =
				setTimeout(function()
				{
					setViewLoaded(true);
					setLayoutMode("full");
					updateNavigationState(navigationSection);
				},
				500);
			//
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		// empty
	}
	render()
	{
		let scopeProxy
			= this;
		let carouselHtml
			= scopeProxy.props.html;
		let jsonReady
			= true;
		let profileReady
			= true;
		let carouselPropsDemoExample
			= (scopeProxy.props.carouselPropsexampleJs !== undefined
			&& scopeProxy.props.carouselPropsexampleJs !== null)
			? scopeProxy.props.carouselPropsexampleJs
			: "loading...";
		let carouselMethodsDemoExample
			= (scopeProxy.props.carouselMethodsexampleJs !== undefined
			&& scopeProxy.props.carouselMethodsexampleJs !== null)
			? scopeProxy.props.carouselMethodsexampleJs
			: "loading...";
		let carouselPropsExample
			= (scopeProxy.props.carouselPropsDemoexampleJson !== undefined
			&& scopeProxy.props.carouselPropsDemoexampleJson !== null)
			? scopeProxy.props.carouselPropsDemoexampleJson
			: "loading...";
		let carouselCssDemoExample
			= (scopeProxy.props.carouselCssDemoexampleCss !== undefined
			&& scopeProxy.props.carouselCssDemoexampleCss !== null)
			? scopeProxy.props.carouselCssDemoexampleCss
			: "loading...";
		let carouselDeployExample
			= (scopeProxy.props.carouselDeployexampleHtml !== undefined
			&& scopeProxy.props.carouselDeployexampleHtml !== null)
			? scopeProxy.props.carouselDeployexampleHtml
			: "loading...";
		//
		let carouselProfile =
			{
				"Panel":
				{
					"Classname":"carousel-panel"
				},
				"Viewport":
				{
					"Face":
					{
						"Classname":"carousel-viewport"
					},
					"Lens":
					{
						"Classname":"carousel-viewport-lens"
					}
				},
				"Section":
				{
					"Backface":true,
					"Perspective":"2500px",
					"Click":function(event)
					{
						// empty
					}
				},
				"Carousel":
				{
					"Ready":function(event)
					{
						// empty
					},
					"Change":function(event)
					{
						scopeProxy.carouselChanged(event);
					}
				}
			}
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"carousel",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":carouselHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="json" value={carouselPropsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Methods" className="detail-heading">
								<Highlight lang="js" value={"let reactcarouselRef = this.refs.reactcarousel;"}/>
								<hr/>
								<Highlight lang="js" value={carouselMethodsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="js" value={carouselPropsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={carouselCssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-revolving-carousel -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Carousel from 'react-revolving-carousel';"}/>
								<hr/>
								<Highlight lang="html" value={carouselDeployExample}/>
							</Panel>
						</div>
						<div id="carousel-showcase-container" ref="carouselshowcase" className="carousel-showcase">
							<div id="carousel-heading-container" ref="carouselheading" className="carousel-heading">
								<div id="carousel-heading-headline-container" ref="carouselheadingheadline" className="carousel-heading-headline">
									Demo
								</div>
							</div>
							<Carousel ref="reactcarousel" {...carouselProfile}>
								<div id="carousel-item-container_0" className="carousel-item carousel-item-0">
									<div className="carousel-section-cardheader">
										<div className="carousel-section-label">Section 1</div>
										<div className="carousel-section-heading">Features</div>
									</div>
									<div className="carousel-section-cardbody">
										<ul>
											<li>Draggable or Clickable</li>
											<li>Supports any HTML/CSS</li>
											<li>Supports full interactivity</li>
											<li>Callbacks for ready, click, and change</li>
											<li>Method access for focus and draggable</li>
											<li>Customizable and CSS rich</li>
										</ul>
									</div>
								</div>
								<div id="carousel-item-container_1" className="carousel-item carousel-item-1">
									<div className="carousel-section-label">Section 2</div>
									<div className="carousel-section-navcluster">
										<Button className="carousel-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, 0)}>Section 1</Button>
										<Button className="carousel-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, 2)}>Section 3</Button>
										<Button className="carousel-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, 4)}>Section 5</Button>
									</div>
									<div className="carousel-section-buttoncluster">
										<Button className="carousel-section-button" onClick={scopeProxy.backClicked.bind(scopeProxy)}>Back</Button>
										<Button className="carousel-section-button" onClick={scopeProxy.nextClicked.bind(scopeProxy)}>Next</Button>
									</div>
								</div>
								<div id="carousel-item-container_2" className="carousel-item carousel-item-2">
									<div className="carousel-section-label">Section 3</div>
									<svg height="100%" width="100%">
										<circle cx="50%" cy="50%" r="25%" stroke="none" stroke-width="3" fill="rgba(50,200,10,1)" />
									</svg>
								</div>
								<div id="carousel-item-container_3" className="carousel-item carousel-item-3">
									<div className="carousel-section-label section-4-label">Section 4</div>
									<iframe width="100%" height="100%" src="https://www.youtube.com/embed/bR4Gq9qfpnM" frameborder="0" allowfullscreen></iframe>
									<div className="buttoncluster-middle">
										<Button className="carousel-section-button-left" onClick={scopeProxy.backClicked.bind(scopeProxy)}>Back</Button>
										<Button className="carousel-section-button-right" onClick={scopeProxy.nextClicked.bind(scopeProxy)}>Next</Button>
									</div>
								</div>
								<div id="carousel-item-container_4" className="carousel-item carousel-item-4">
									<div className="carousel-section-label">Section 5</div>
								</div>
								<div id="carousel-item-container_5" className="carousel-item carousel-item-5">
									<div className="carousel-section-label">Section 6</div>
									<div className="carousel-section-navcluster">
										<Button className="carousel-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, 0)}>Section 1</Button>
										<Button className="carousel-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, 2)}>Section 3</Button>
										<Button className="carousel-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, 4)}>Section 5</Button>
									</div>
									<div className="carousel-section-buttoncluster">
										<Button className="carousel-section-button" onClick={scopeProxy.backClicked.bind(scopeProxy)}>Back</Button>
										<Button className="carousel-section-button" onClick={scopeProxy.nextClicked.bind(scopeProxy)}>Next</Button>
									</div>
								</div>
							</Carousel>
						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Carousel Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	carouselChanged(sectionChange)
	{
		let scopeProxy
			= this;
		let reactcarouselRef
			= scopeProxy.refs.reactcarousel;
		let sectionIndex
			= sectionChange.Section.Index;
		//
		ReactGA.event(
		{
		  "category":"carousel_action",
		  "action":"carousel_change",
		  "label":"section-index".concat(sectionIndex)
		});
		if(sectionIndex === 3
		|| sectionIndex === 5
		|| sectionIndex === 1)
		{
			reactcarouselRef.allowDraggable(false);
		}
		else
		{
			reactcarouselRef.allowDraggable(true);
		}
	}
	nextClicked()
	{
		let reactcarouselRef
			= this.refs.reactcarousel;
		//
		ReactGA.event(
		{
		  "category":"carousel_action",
		  "action":"carousel_change",
		  "label":"carousel_next"
		});
		reactcarouselRef.allowDraggable(true);
		reactcarouselRef.nextSection();
	}
	backClicked()
	{
		let reactcarouselRef
			= this.refs.reactcarousel;
		//
		ReactGA.event(
		{
		  "category":"carousel_action",
		  "action":"carousel_change",
		  "label":"carousel_back"
		});
		reactcarouselRef.allowDraggable(true);
		reactcarouselRef.previousSection();
	}
	jumpTo(SectionIndex)
	{
		let reactcarouselRef
			= this.refs.reactcarousel;
		//
		ReactGA.event(
		{
		  "category":"carousel_action",
		  "action":"carousel_jump",
		  "label":"jump-index_".concat(SectionIndex)
		});
		reactcarouselRef.allowDraggable(true);
		reactcarouselRef.jumpToSection(SectionIndex);
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}
// Map Redux state items to this.props properties
// each time the Redux state changes. When that
// happens, the render() function is called
// and the DOM is updated according to any
// changes that happened in this.props. Use this
// to retrieve values from the Redux state and
// place them in this.props.
function mapReduxstateToReactprops(reduxState)
{
	return(
	{
		"html":reduxState.carouselReducer.html,
		"carouselPropsexampleJs":reduxState.carouselReducer.carouselPropsexampleJs,
		"carouselMethodsexampleJs":reduxState.carouselReducer.carouselMethodsexampleJs,
		"carouselPropsDemoexampleJson":reduxState.carouselReducer.carouselPropsDemoexampleJson,
		"carouselCssDemoexampleCss":reduxState.carouselReducer.carouselCssDemoexampleCss,
		"carouselDeployexampleHtml":reduxState.carouselReducer.carouselDeployexampleHtml,
		"setViewLoadedAction":reduxState.mainReducer.setViewloadedAction,
		"setLayoutModeAction":reduxState.mainReducer.setLayoutmodeAction,
		"updateNavigationstateAction":reduxState.navigationReducer.updateNavigationstateAction
	});
}
// Map Redux action-creators to this.props properties
// when the component is initialized. This gives access
// to each action-creator to the component from within
// this.props so that actions can be dispatched. Use
// this to initially establish values in the Redux state.
export default connect(mapReduxstateToReactprops,
{
	"fetchCarouselHtml":fetchCarouselHtml,
	"fetchCarouselPropsexampleJs":fetchCarouselPropsexampleJs,
	"fetchCarouselMethodsexampleJs":fetchCarouselMethodsexampleJs,
	"fetchCarouselPropsDemoexampleJson":fetchCarouselPropsDemoexampleJson,
	"fetchCarouselCssDemoexampleCss":fetchCarouselCssDemoexampleCss,
	"fetchCarouselDeployexampleHtml":fetchCarouselDeployexampleHtml
})(CarouselLanding);