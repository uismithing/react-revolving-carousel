import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import Draggable from "react-draggable";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
//
//*************************
//*************************
// Nonpublished Imports
//
function updateState(ScopeProxy, Parcel)
{
	let existingState
		= (ScopeProxy.state !== null)
		? _.cloneDeep(ScopeProxy.state)
		: {};
	let adjustedState
		= _.merge(existingState, _.cloneDeep(Parcel));
	//
	try
	{
		ScopeProxy.setState(adjustedState);
	}
	catch(event)
	{
		console.warn("::react-carousel:problem::updateState::", event);
	}
}
function watch(Testfunction)
{
	let watchCore =
		{
			"Match":function(Target, Complete, ExpireAt)
			{
				let intervalCount
					= 0;
				let maximumAttempts
					= (ExpireAt !== undefined)
					? ExpireAt
					: 2000;
				//
				let watchInterval =
					setInterval(function()
					{
						if(Testfunction() === Target)
						{
							Complete();
							//
							clearInterval(watchInterval);
						}
						if(intervalCount >= maximumAttempts)
						{
							console.warn("toolbox.js::watch::exceeded watch limit timeout::action halted.")
							//
							clearInterval(watchInterval);
						}
						intervalCount++;
					},
					1);
				//
			}
		}
	//
	return watchCore;
}
//
//*************************
//*************************
// Exports
//
export default class Carousel extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		//
		updateState(scopeProxy,
		{
			"Ready":false,
			"Panel":
			{
				"Style":
				{
					"width":"100%",
					"height":"auto",
					"box-sizing":"border-box"
				},
				"Classname":this.props.Panel.Classname
			},
			"Carousel":
			{
				"Ready":this.props.Carousel.Ready,
				"Change":this.props.Carousel.Change
			},
			"Viewport":
			{
				"Face":
				{
					"Style":
					{
						"display":"inline-flex",
						"position":"relative",
						"overflow":"hidden",
						"box-sizing":"border-box"
					},
					"Classname":this.props.Viewport.Face.Classname
				},
				"Lens":
				{
					"Style":
					{
						"display":"inline-block",
						"position":"absolute",
						"top":"0",
						"left":"0",
						"width":"100%",
						"height":"100%",
						"zIndex":"9"
					},
					"Classname":this.props.Viewport.Lens.Classname
				}
			},
			"Section":
			{
				"Size":
				{
					"Width":"0px",
					"Height":"0px"
				},
				"Click":this.props.Section.Click,
				"Backface":this.props.Section.Backface,
				"Perspective":this.props.Section.Perspective
			},
			"Sections":
			{
				"Style":
				{
					//empty
				},
				"Crawl":
				{
					"Style":
					{
						"position":"absolute",
						"visibility":"hidden",
						"opacity":0,
						"width":"0px",
						"height":"0px"
					},
					"Profile":
					{
						"runOnMount":false
					}
				},
				"Focused":
				{
					"Index":0
				}
			},
			"Dragpane":
			{
				"Profile":
				{
					"axis":"x",
					"bounds":
					{
						"top":0,
						"right":0,
						"bottom":0,
						"left":0
					}
				}
			},
			"DragpaneTrolley":
			{
				"Style":
				{
					"display":"inline-block",
					"position":"absolute",
					"top":"0px",
					"left":"0px",
					"width":"100%",
					"height":"100%",
					"zIndex":"10"
				}
			}
		});
		watch(function()
		{
			return _.has(scopeProxy, "state.DragpaneTrolley")
		})
		.Match(true, function(event)
		{
			scopeProxy.setListeners();
			scopeProxy.measureFirstChild();
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		//
		window.requestAnimationFrame(function()
		{
			// empty
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let panelStyle
			= _.has(this, "state.Panel.Style")
			? this.state.Panel.Style
			: null;
		let panelClassname
			= _.has(this, "state.Panel.Classname")
			? this.state.Panel.Classname
			: "carousel-panel";
		let viewportStyle
			= _.has(this, "state.Viewport.Face.Style")
			? this.state.Viewport.Face.Style
			: null;
		let viewportClassname
			= _.has(this, "state.Viewport.Face.Classname")
			? this.state.Viewport.Face.Classname
			: "carousel-viewport";
		let viewportlensStyle
			= _.has(this, "state.Viewport.Lens.Style")
			? this.state.Viewport.Lens.Style
			: null;
		let viewportlensClassname
			= _.has(this, "state.Viewport.Lens.Classname")
			? this.state.Viewport.Lens.Classname
			: "carousel-viewport-lens";
		let carouselsectionsStyle
			= _.has(this, "state.Sections.Style")
			? this.state.Sections.Style
			: null;
		let carouselsectionsElements
			= _.has(this, "state.Sections.Elements")
			? this.state.Sections.Elements
			: null;
		//
		let dragpaneprofileOnmount =
			{
				"axis":"x",
				"bounds":
				{
					"top":0,
					"right":0,
					"bottom":0,
					"left":0
				}
			}
		//
		let sectionsCrawlprofileOnMount =
			{
				"runOnMount":false
			}
		//
		let firstchildMeasurementStyle =
			{
				"display":"flex",
				"position":"absolute",
				"top":"0",
				"left":"0",
				"margin":"0",
				"padding":"0",
				"visibility":"hidden"
			}
		//
		let dragpaneTrolleyStyle
			= _.has(this, "state.DragpaneTrolley.Style")
			? this.state.DragpaneTrolley.Style
			: null;
		let crawlsectionsStyle
			= _.has(this, "state.Sections.Crawl.Style")
			? this.state.Sections.Crawl.Style
			: null;
		let dragpaneProfile
			= _.has(this, "state.Dragpane.Profile")
			? this.state.Dragpane.Profile
			: dragpaneprofileOnmount;
		let sectionsCrawlProfile
			= _.has(this, "state.Sections.Crawl.Profile")
			? this.state.Sections.Crawl.Profile
			: sectionsCrawlprofileOnMount;
		let sectionWidth
			= _.has(this, "state.Section.Size.Width")
			? this.state.Section.Size.Width
			: 0;
		let sectionHeight
			= _.has(this, "state.Section.Size.Height")
			? this.state.Section.Size.Height
			: 0;
		let sectionPerspective
			= _.has(this, "state.Section.Perspective")
			? this.state.Section.Perspective
			: "1000px";
		//
		let itemshostStyle =
			{
				"display":"inline-block",
				"position":"relative",
				"top":"50%",
				"width":sectionWidth.toString().concat("px"),
				"height":sectionHeight.toString().concat("px"),
				"margin":"0 auto",
				"transform":"translateY(-50%)",
				"perspective":sectionPerspective
			}
		//
		return(
			<div id="carousel-panel-container" ref="carouselpanel" style={panelStyle} className={panelClassname}>
				<div id="carousel-viewport-container" ref="carouselviewport" style={viewportStyle} className={viewportClassname}>
					<div id="carousel-viewport-lens-container" ref="carouselviewportlens" style={viewportlensStyle} className={viewportlensClassname}></div>
					<div id="carousel-items-host-container" ref="carouselitemshost" style={itemshostStyle}>
						<div id="carousel-sections-container" ref="carouselsections" style={carouselsectionsStyle}>{carouselsectionsElements}</div>
					</div>
					<Draggable {...dragpaneProfile}>
						<div id="dragpane-trolley-container" ref="dragpanetrolley" style={dragpaneTrolleyStyle}></div>
					</Draggable>
				</div>
				<VelocityComponent {...sectionsCrawlProfile}>
					<div id="crawl-sections-container" ref="crawlsections" style={crawlsectionsStyle}></div>
				</VelocityComponent>
				<div id="section-measurement-container" ref="firstchildmeasurement" style={firstchildMeasurementStyle}></div>
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	setListeners()
	{
		let scopeProxy
			= this;
		let carouselviewportRef
			= this.refs.carouselviewport;
		//
		carouselviewportRef.addEventListener("click", function(event)
		{
			let sectionIndex
				= scopeProxy.state.Sections.Focused.Index;
			let sectionElement
				= scopeProxy.props.children[sectionIndex];
			//
			let focusParcel =
				{
					"Section":
					{
						"Index":sectionIndex,
						"Element":sectionElement
					}
				}
			//
			scopeProxy.state.Section.Click(focusParcel);
		});
	}
	nextSection()
	{
		this.advanceCarousel(-1);
	}
	previousSection()
	{
		this.advanceCarousel(1);
	}
	getFocusedSection()
	{
		let focusedIndex
			= (this.state !== null)
			? this.state.Sections.Focused.Index
			: "carousel not ready";
		let focusedElement
			= (this.state !== null)
			? this.props.children[focusedIndex]
			: "carousel not ready"
		//
		return(
		{
			"Index":focusedIndex,
			"Section":focusedElement
		});
	}
	measureFirstChild()
	{
		let scopeProxy
			= this;
		let targetElement
			= document.getElementById("section-measurement-container");
		//
		let measurementFirstchildStyle =
			{
				"display":"inline-flex",
				"position":"realative",
				"margin":"0",
				"padding":"0"
			}
		//
		let childElement
			= <div id="measurement-firstchild-container" style={measurementFirstchildStyle}>{this.props.children[0]}</div>
		//
		ReactDOM.render(childElement, targetElement);
		//
		watch(function()
		{
			let firstchildMeasurementId
				= document.getElementById("measurement-firstchild-container");
			let firstchildExists
				= (firstchildMeasurementId !== undefined)
				? true
				: false;
			//
			return (firstchildExists);
		})
		.Match(true, function()
		{
			let firstchildmeasurementRef
				= scopeProxy.refs.firstchildmeasurement;
			let sectionWidth
				= firstchildmeasurementRef.offsetWidth;
			let sectionHeight
				= firstchildmeasurementRef.offsetHeight;
			//
			updateState(scopeProxy,
			{
				"Ready":true,
				"Section":
				{
					"Size":
					{
						"Width":sectionWidth,
						"Height":sectionHeight
					}
				}
			});
			ReactDOM.unmountComponentAtNode(firstchildmeasurementRef);
			//
			scopeProxy.mountCarouselItems();
		});
	}
	mountCarouselItems()
	{
		let scopeProxy
			= this;
		let totalSections
			= this.props.children.length;
		let sectionWidth
			= this.state.Section.Size.Width;
		let sectionHeight
			= this.state.Section.Size.Height;
		let backfaceVisibility
			= this.state.Section.Backface;
		var zDistance
			= ((sectionWidth / 2) / Math.tan(Math.PI / totalSections)).toString().concat("px");
		let sectionCount
			= 0;
		let carouselitemsHostElement
			= ReactDOM.findDOMNode(this.refs.carouselitemshost);
		//
		let carouselSectionsStyle =
			{
				"position":"relative",
				"width":"100%",
				"height":"100%",
				"transform-style":"preserve-3d",
				"transform":"translateZ(".concat(-(parseInt(zDistance)), "px) rotateY(0deg)")
			}
		//
		let carouselSections =
			this.props.children.map(function(carouselItem)
			{
				let sectionId
					= "carousel-item-".concat(sectionCount);
				let sectionRotation
					= ((360 / totalSections) * sectionCount).toString().concat("deg");
				let sectionTransform
					= "rotateY(".concat(sectionRotation, ") translateZ(", zDistance, ")");
				//
				let sectionStyle =
					{
						"display":"block",
						"position":"absolute",
						"width":sectionWidth.toString().concat("px"),
						"height":sectionHeight.toString().concat("px"),
						"transform":sectionTransform,
						"backface-visibility":backfaceVisibility
					}
				//
				sectionCount++;
				//
				return(
					<div id={sectionId} style={sectionStyle}>{carouselItem}</div>
				);
			});
		//
		updateState(scopeProxy,
		{
			"Sections":
			{
				"Style":carouselSectionsStyle,
				"Elements":carouselSections,
				"Revolve":0
			}
		});
		watch(function()
		{
			return _.has(scopeProxy, "state.Sections.Style.position")
		})
		.Match(true, function(event)
		{
			scopeProxy.initDragpaneTrolley();
		});
	}
	initDragpaneTrolley()
	{
		let scopeProxy
			= this;
		let carouselViewportRef
			= this.refs.carouselviewport;
		let carouselViewportWidth
			= carouselViewportRef.offsetWidth;
		let carouselViewportHeight
			= carouselViewportRef.offsetHeight;
		let segmentWidth
			= (carouselViewportWidth * 4).toString().concat("px");
		let segmentHeight
			= (carouselViewportHeight).toString().concat("px");
		let segmentLeft
			= (-carouselViewportWidth * 1.5).toString().concat("px");
		let targetElement
			= document.getElementById("dragpane-trolley-container");
		//
		updateState(scopeProxy,
		{
			"Trolleysegment":
			{
				"Style":
				{
					"display":"inline-block",
					"position":"relative",
					"left":segmentLeft,
					"width":segmentWidth,
					"height":segmentHeight
				}
			}
		});
		watch(function()
		{
			return _.has(scopeProxy, "state.Trolleysegment.Style")
		})
		.Match(true, function(event)
		{
			scopeProxy.mountDragpaneTrolley();
		});
	}
	mountDragpaneTrolley()
	{
		let scopeProxy
			= this;
		let carouselViewportRef
			= this.refs.carouselviewport;
		let carouselViewportWidth
			= carouselViewportRef.offsetWidth;
		let carouselViewportHeight
			= carouselViewportRef.offsetHeight;
		let segmentWidth
			= (carouselViewportWidth * 4).toString().concat("px");
		let segmentHeight
			= (carouselViewportHeight).toString().concat("px");
		let segmentLeft
			= (-carouselViewportWidth * 1.5).toString().concat("px");
		let targetElement
			= document.getElementById("dragpane-trolley-container");
		let trolleysegmentStyle
			= this.state.Trolleysegment.Style;
		//
		let trolleysegmentElement =
			(function()
			{
				return(
					<div id="dragpane-trolleysegment-container" style={trolleysegmentStyle}></div>
				);
			})();
		//
		ReactDOM.render(trolleysegmentElement, targetElement);
		//
		updateState(scopeProxy,
		{
			"Dragpane":
			{
				"Profile":
				{
					"axis":"x",
					"bounds":
					{
						"top":0,
						"right":carouselViewportWidth,
						"bottom":0,
						"left":-carouselViewportWidth
					},
					"onStart":function(event)
					{
						scopeProxy.trolleyStart(event);
					},
					"onDrag":function(event)
					{
						scopeProxy.trolleyDrag(event);
					},
					"onStop":function(event)
					{
						scopeProxy.trolleyStop(event);
					}
				}
			}
		});
		this.state.Carousel.Ready(this.props.children);
	}
	trolleyStart(event)
	{
		this.props.trolleyLocations
		= [];
	}
	trolleyDrag(event)
	{
		let trolleyCurrent
			= (event.targetTouches === undefined)
			? event.clientX
			: event.targetTouches[0].clientX;
		let trolleyInitial
			= (this.props.trolleyLocations[0] !== undefined)
			? this.props.trolleyLocations[0]
			: trolleyCurrent;
		let trolleyDelta
			= trolleyCurrent
			- trolleyInitial;
		//
		this.props.trolleyLocations.push(trolleyCurrent);
		//
		this.revolveCarousel(trolleyDelta);
	}
	trolleyStop(event)
	{
		let scopeProxy
			= this;
		let CarouselviewportRef
			= this.refs.carouselviewport;
		let totalSections
			= this.props.children.length;
		let currentFocusedIndex
			= this.state.Sections.Focused.Index;
		let newSectionIndex
			= currentFocusedIndex;
		let sectionDegrees
			= 360 / totalSections;
		let carouselViewportWidth
			= CarouselviewportRef.offsetWidth;
		let totalTrolleyLocations
			= this.props.trolleyLocations.length;
		let trolleyInitial
			= this.props.trolleyLocations[0];
		let trolleyFinal
			= this.props.trolleyLocations[(totalTrolleyLocations - 1)];
		let advanceSections
			= false;
		let trolleyDelta
			= trolleyFinal
			- trolleyInitial;
		let revolvePercent
			= trolleyDelta / carouselViewportWidth;
		let initialRevolveLocation
			= (this.state.Sections.Revolve !== null)
			? this.state.Sections.Revolve
			: 0;
		let revolveDegrees
			= 360 * revolvePercent
			+ initialRevolveLocation;
		let adjustedRevolveDegrees
			= (revolveDegrees > 360)
			? (revolveDegrees - 360)
			: (revolveDegrees < -360)
			? (revolveDegrees + 360)
			: revolveDegrees;
		let snapDifference
			= adjustedRevolveDegrees
			- sectionDegrees;
		let sectionWidth
			= this.state.Section.Size.Width;
		let zDistance
			= ((sectionWidth / 2) / Math.tan(Math.PI / totalSections)).toString().concat("px");
		let snapRatio
			= adjustedRevolveDegrees / sectionDegrees;
		let snapRemainder
			= snapRatio
			- parseInt(snapRatio);
		let snapRemainderDegrees
			= snapRemainder * sectionDegrees;
		//
		let sectionscrawlProfile =
			{
				"duration":200,
				"easing":"easeOutQuart",
				"runOnMount":false,
				"animation":
				{
					"opacity":1
				},
				"progress":function(elements, complete, remaining, start, tweenValue)
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity. This must be avoided so that the
					// rotation of the sections does not revert to its original
					// rotation value.
					//
					let opacityValue
						= (elements[0].style.opacity > 0)
						? elements[0].style.opacity
						: 1;
					//
					if(snapRemainder >= 0)
					{
						if(snapRemainder < .5
						&& advanceSections === false)
						{
							var targetDegrees
								= adjustedRevolveDegrees
								- (snapRemainderDegrees * opacityValue);
							//
						}
						else
						{
							var targetDegrees
								= adjustedRevolveDegrees
								+ (sectionDegrees - snapRemainderDegrees) * opacityValue;
							//
						}
					}
					else if(snapRemainder < 0)
					{
						if(snapRemainder > -.5
						&& advanceSections === false)
						{
							var targetDegrees
								= adjustedRevolveDegrees
								- (snapRemainderDegrees * opacityValue);
							//
						}
						else
						{
							var targetDegrees
								= adjustedRevolveDegrees
								+ (-sectionDegrees - snapRemainderDegrees) * opacityValue;
							//
						}
					}
					let sectionDegreesRatio
						= targetDegrees / sectionDegrees;
					let sectionIndex
						= (sectionDegreesRatio <= 0
						&& sectionDegreesRatio > -totalSections)
						? Math.abs(sectionDegreesRatio)
						: totalSections
						- sectionDegreesRatio;
					//
					newSectionIndex
					= sectionIndex;
					//
					updateState(scopeProxy,
					{
						"Dragpane":
						{
							"Profile":
							{
								"position":
								{
									"x":0,
									"y":0
								}
							}
						},
						"Sections":
						{
							"Revolve":targetDegrees,
							"Style":
							{
								"position":"relative",
								"width":"100%",
								"height":"100%",
								"transform-style":"preserve-3d",
								"transform":"translateZ(".concat(-(parseInt(zDistance)), "px) rotateY(", targetDegrees, "deg)")
							},
							"Focused":
							{
								"Index":sectionIndex
							}
						}
					});
				},
				"complete":function()
				{
					updateState(scopeProxy,
					{
						"Sections":
						{
							"Crawl":
							{
								"Style":
								{
									"position":"absolute",
									"visibility":"hidden",
									"opacity":0
								},
								"Profile":
								{
									"duration":0,
									"easing":"easeOutQuad",
									"runOnMount":false,
									"animation":
									{
										"opacity":0
									}
								}
							}
						}
					});
					//
					// The complete property gets updated twice for unknown
					// reasons for a single animation update. To prevent the
					// Change() callback from being triggered twice, a
					// comparison is used between previous and new values
					// of the section index.
					if(!isNaN(newSectionIndex)
					&& newSectionIndex !== currentFocusedIndex)
					{		
						currentFocusedIndex
						= newSectionIndex;
						//
						scopeProxy.state.Carousel.Change(
						{
							"Section":
							{
								"Index":newSectionIndex,
								"Element":scopeProxy.props.children[newSectionIndex]
							},
							"Sections":scopeProxy.props.children
						});
					}
				}
			}
		//
		updateState(scopeProxy,
		{
			"Sections":
			{
				"Crawl":
				{
					"Profile":sectionscrawlProfile
				}
			}
		});
	}
	revolveCarousel(Trolleydelta)
	{
		let scopeProxy
			= this;
		let CarouselviewportRef
			= this.refs.carouselviewport;
		let totalSections
			= this.props.children.length;
		let carouselViewportWidth
			= CarouselviewportRef.offsetWidth;
		let revolvePercent
			= Trolleydelta / carouselViewportWidth;
		let initialRevolveLocation
			= this.state.Sections.Revolve;
		let revolveDegrees
			= 360 * revolvePercent
			+ initialRevolveLocation;
		let sectionWidth
			= this.state.Section.Size.Width;
		let zDistance
			= ((sectionWidth / 2) / Math.tan(Math.PI / totalSections)).toString().concat("px");
		//
		updateState(scopeProxy,
		{
			"Sections":
			{
				"Style":
				{
					"position":"relative",
					"width":"100%",
					"height":"100%",
					"transform-style":"preserve-3d",
					"transform":"translateZ(".concat(-(parseInt(zDistance)), "px) rotateY(", revolveDegrees, "deg)")
				}
			}
		});
	}
	advanceCarousel(Direction)
	{
		let scopeProxy
			= this;
		let CarouselviewportRef
			= this.refs.carouselviewport;
		let totalSections
			= this.props.children.length;
		let newSectionIndex
			= null;
		let currentFocusedIndex
			= this.state.Sections.Focused.Index;
		let sectionDegrees
			= 360 / totalSections;
		let carouselViewportWidth
			= CarouselviewportRef.offsetWidth;
		let revolvePercent
			= .01;
		let initialRevolveLocation
			= (this.state.Sections.Revolve !== null)
			? this.state.Sections.Revolve
			: 0;
		let advanceSections
			= true;
		let revolveDegrees
			= Direction
			+ initialRevolveLocation;
		let adjustedRevolveDegrees
			= (revolveDegrees > 360)
			? (revolveDegrees - 360)
			: (revolveDegrees < -360)
			? (revolveDegrees + 360)
			: revolveDegrees;
		let snapDifference
			= adjustedRevolveDegrees
			- sectionDegrees;
		let sectionWidth
			= this.state.Section.Size.Width;
		let zDistance
			= ((sectionWidth / 2) / Math.tan(Math.PI / totalSections)).toString().concat("px");
		let snapRatio
			= adjustedRevolveDegrees / sectionDegrees;
		let snapRemainder
			= snapRatio
			- parseInt(snapRatio);
		let snapRemainderDegrees
			= snapRemainder * sectionDegrees;
		//
		let sectionscrawlProfile =
			{
				"duration":500,
				"easing":"easeInOutCubic",
				"runOnMount":false,
				"animation":
				{
					"opacity":1
				},
				"progress":function(elements, complete, remaining, start, tweenValue)
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity. This must be avoided so that the
					// rotation of the sections does not revert to its original
					// rotation value.
					//
					let opacityValue
						= (elements[0].style.opacity > 0)
						? elements[0].style.opacity
						: 1;
					//
					if(snapRemainder >= 0)
					{
						if(snapRemainder < .5
						&& advanceSections === false)
						{
							var targetDegrees
								= adjustedRevolveDegrees
								- (snapRemainderDegrees * opacityValue);
							//
						}
						else
						{
							var targetDegrees
								= adjustedRevolveDegrees
								+ (sectionDegrees - snapRemainderDegrees) * opacityValue;
							//
						}
					}
					else if(snapRemainder < 0)
					{
						if(snapRemainder > -.5
						&& advanceSections === false)
						{
							var targetDegrees
								= adjustedRevolveDegrees
								- (snapRemainderDegrees * opacityValue);
							//
						}
						else
						{
							var targetDegrees
								= adjustedRevolveDegrees
								+ (-sectionDegrees - snapRemainderDegrees) * opacityValue;
							//
						}
					}
					let sectionDegreesRatio
						= targetDegrees / sectionDegrees;
					let sectionIndex
						= (sectionDegreesRatio <= 0
						&& sectionDegreesRatio > -totalSections)
						? Math.abs(sectionDegreesRatio)
						: totalSections
						- sectionDegreesRatio;
					//
					newSectionIndex
					= sectionIndex;
					//
					updateState(scopeProxy,
					{
						"Dragpane":
						{
							"Profile":
							{
								"position":
								{
									"x":0,
									"y":0
								}
							}
						},
						"Sections":
						{
							"Revolve":targetDegrees,
							"Style":
							{
								"position":"relative",
								"width":"100%",
								"height":"100%",
								"transform-style":"preserve-3d",
								"transform":"translateZ(".concat(-(parseInt(zDistance)), "px) rotateY(", targetDegrees, "deg)")
							},
							"Focused":
							{
								"Index":sectionIndex
							}
						}
					});
				},
				"complete":function()
				{
					updateState(scopeProxy,
					{
						"Sections":
						{
							"Crawl":
							{
								"Style":
								{
									"position":"absolute",
									"visibility":"hidden",
									"opacity":0
								},
								"Profile":
								{
									"duration":0,
									"easing":"easeOutQuad",
									"runOnMount":false,
									"animation":
									{
										"opacity":0
									}
								}
							}
						}
					});
					//
					// The complete property gets updated twice for unknown
					// reasons for a single animation update. To prevent the
					// Change() callback from being triggered twice, a
					// comparison is used between previous and new values
					// of the section index.
					if(!isNaN(newSectionIndex)
					&& newSectionIndex !== currentFocusedIndex)
					{		
						currentFocusedIndex
						= newSectionIndex;
						//
						scopeProxy.state.Carousel.Change(
						{
							"Section":
							{
								"Index":newSectionIndex,
								"Element":scopeProxy.props.children[newSectionIndex]
							},
							"Sections":scopeProxy.props.children
						});
					}
				}
			}
		//
		updateState(scopeProxy,
		{
			"Sections":
			{
				"Crawl":
				{
					"Profile":sectionscrawlProfile
				}
			}
		});
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