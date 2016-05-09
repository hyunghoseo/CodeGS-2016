import React from 'react';
import SubComponentA from './subcomponents/SubComponentA';

/**
 * Component seed to demonstrate how to build a component.
 * For Component Lifecycle API go to:
 * https://facebook.github.io/react/docs/component-specs.html
 *
 * For component Documentation go to:
 * <INSERT DOC URL>
 */
 
var firstDraw = true;
var happy;
var sad;
var mad;
var stressed;
var retrievedObject = localStorage.getItem('states');
       var states = JSON.parse(retrievedObject);
       //states = {'happy': 0, 'sad': 0, 'angry': 0, 'stressed': 0}
        happy = parseInt(states["happy"]) || 0;
        sad = parseInt(states["sad"]) || 0;
        mad = parseInt(states["mad"]) || 0;
        stressed = parseInt(states["stressed"]) || 0;

export default class MyComponent extends React.Component {
    // ---------------------------------------------------
    // VIEW LIFECYCLE. THESE ARE CALLED BY REACT AUTOMATICALLY
    // ALL METHODS ARE OPTIONAL
    // ----------------------------------------------------
	constructor() {
		super();
		this.bindMethods();
        this.state = {userName:null};
	}

    componentDidMount() {
        var state = this.props.meta.state;
        this.setState(state);
    }

    // ---------------------------------------------------
    // MOVEMENT LIFECYCLE.
    // THESE ARE ALL CALLED BY THE LAYOUT MANAGER.
    // ----------------------------------------------------

    updateDimensions() {
        this.setState({width: $(window).width(), height: $(window).height()});
    }

	//Resize callbacks
	resizeStart() {
		console.log('resize started');
	}

	resize() {
		console.log('resize happening');
	}

	resizeStop() {
		console.log('resize stopped');
	}

	//drag callbacks
	dragStart() {
		console.log('drag started');
	}

	drag() {
		console.log('drag happening');
	}

	dragStop() {
		console.log('drag stopped');
	}

    // ---------------------------------------------------
    // ACTUAL CODE FOR COMPONENT THAT DOES ANYTHING
    // ----------------------------------------------------

    /**
     * Make the following methods accessible outside component
     * @return {[type]} [description]
     */
    bindMethods() {
        this.resizeStart = this.resizeStart.bind(this);
        this.resize = this.resize.bind(this);
        this.resizeStop = this.resizeStop.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.drag = this.drag.bind(this);
        this.dragStop = this.dragStop.bind(this);
    }

    assetFieldChanged(event) {
        var text = event.target.value;
        this.setState({userName:text}, function() {
            this.props.meta.state =  this.state;
        });
    }

	/**
	 * Create component HTML
	 * @return {[type]} [description]
	 */
  	render() {
          console.log('rendering');
          
        var PieChart = require("react-chartjs").Pie;
        var charData = [
    {
        value: mad,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Mad"
    },
    {
        value: happy,
        color: "#42BD41",
        highlight: "#72D572",
        label: "Happy"
    },
    {
        value: stressed,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Stressed"
    },
    {
        value: sad,
        color: "#4A46F7",
        highlight: "#5E5AFF",
        label: "Sad"
    }
    ]
    
    if (!firstDraw) {
        return <div className='my-component'> <PieChart width={this.state.width} height={this.state.height} className="graph" data={charData}/> </div>;
    }
    
    return <div className='my-component'>
           <div id="q1">
            <input className="button" type="image" name="happy" id="happy" src="images/happy.png" onClick={this.happyClick.bind(this)}></input>
           </div>
           <div id="q2">
            <input className="button" type="image" name="sad" id="sad" src="images/sad.png" onClick={this.sadClick.bind(this)}></input>
            </div>
           <div id="q3">
            <input className="button" type="image" name="mad" id="mad" src="images/angry.png" onClick={this.madClick.bind(this)}></input>
            </div>
           <div id="q4">
            <input className="button" type="image" name="stressed" id="stressed" src="images/stressed.png" onClick={this.stressedClick.bind(this)}></input>
            </div>
        </div>;
    }
    
    happyClick() {
        happy++;
        firstDraw = false;
        this.forceUpdate();
        states["happy"] = happy;
        localStorage.setItem('states', JSON.stringify(states));
        console.log(happy);
    }
    
    madClick() {
        mad++;
        firstDraw = false;
        this.forceUpdate();
        states["mad"] = mad;
        localStorage.setItem('states', JSON.stringify(states));
    }
    
    sadClick() {
        sad++;
        firstDraw = false;
        this.forceUpdate();
        states["sad"] = sad;
        localStorage.setItem('states', JSON.stringify(states));
    }
    
    stressedClick() {
        stressed++;
        firstDraw = false;
        this.forceUpdate();
        states["stressed"] = stressed;
        localStorage.setItem('states', JSON.stringify(states));
    }
}