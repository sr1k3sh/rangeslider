import React, { Component } from 'react'

export default class Slider extends Component {

    constructor(){
        super();
        this.state ={
            sliderState: 0,
            emoji:'slider__emoji--mouth  slider__emoji--mouth-sad',
            isHappy:false
        }
    }
    render() {
        return (
            <div className='slider'>
                <div id="container" className="slider__wrapper">
                    <div className="slider__emoji" id="emoji">
                        <div className={this.state.isHappy ? 'slider__emoji--eye slider__emoji--eye-happy slider__emoji--eye1':'slider__emoji--eye slider__emoji--eye1'}></div>
                        <div className={this.state.isHappy ? 'slider__emoji--eye slider__emoji--eye-happy slider__emoji--eye2':'slider__emoji--eye slider__emoji--eye2'}></div>
                        <div className={this.state.emoji}></div>
                    </div>
                    <div className="slider__line slider__line--line1" id="connectLine1"></div>
                    <div className="slider__line slider__line--line2" id="connectLine2"></div>
                    <div className="slider__point slider__point--point1" id="point1"></div>
                    <div className="slider__point slider__point--point2" id="point2"></div>
                    <div id="elem" className="slider__dragpoint"></div>
                </div>
                <div className='slider__emoji-state'>
                    <h3>How much do you like our service?</h3>
                    <ul className='slider__emoji-list'>
                        <li className='slider__list list'>Poor</li>
                        <li className='slider__list list'>Average</li>
                        <li className='slider__list list'>Good</li>
                        <li className='slider__list list'>Excellent</li>
                        <li className='slider__list list'>Love it!</li>
                    </ul>
                </div>
            </div>
            
        )
    }

    componentDidMount(){
        let elem = document.getElementById("elem");

        let that = this;

        let point1 = document.getElementById('point1');
        let point2 = document.getElementById("point2");
        let line1 = document.getElementById("connectLine1");
        let line2 = document.getElementById("connectLine2");
        let emoji = document.getElementById("emoji");

        elem.style.top = (point1.offsetTop - elem.clientHeight/2)+"px";

        this.adjustLine(elem,point2,line2);

        elem.addEventListener("mousedown", function (event) {
            that.startMoving(this, "container", event);
        });
        
        elem.addEventListener("mouseup", function () {
            that.stopMoving("container");
            elem.style.top = (point1.offsetTop - elem.clientHeight/2)+"px";
            that.adjustLine(elem,point2,line2);
            that.adjustLine(elem,point1,line1);
            emoji.style.left= elem.offsetLeft - 25 + "px";
            emoji.style.top= elem.offsetTop - emoji.clientHeight*1.3 + "px";
        });

        
    }

    componentDidUpdate(){
        let that = this;
        let list = document.getElementsByClassName("list");
        Array.from(list).forEach(function(d){
            d.style.transform = `translateY(${-that.state.sliderState*48}px)`;
        });
    }

    adjustLine(from, to, line){

        var fT = from.offsetTop  + from.offsetHeight/2;
        var tT = to.offsetTop    + to.offsetHeight/2;
        var fL = from.offsetLeft + from.offsetWidth/2;
        var tL = to.offsetLeft   + to.offsetWidth/2;
        
        var CA   = Math.abs(tT - fT);
        var CO   = Math.abs(tL - fL);
        var H    = Math.sqrt(CA*CA + CO*CO);
        var ANG  = 180 / Math.PI * Math.acos( CA/H );
      
        let top,left = 0;
        if(tT > fT){
            top  = (tT-fT)/2 + fT;
        }else{
            top  = (fT-tT)/2 + tT;
        }
        if(tL > fL){
            left = (tL-fL)/2 + fL;
        }else{
            left = (fL-tL)/2 + tL;
        }
      
        if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
          ANG *= -1;
        }
        top-= H/2;
      
        line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-transform"] = 'rotate('+ ANG +'deg)';
        line.style.top    = top+'px';
        line.style.left   = left+'px';
        line.style.height = H + 'px';
    }

    move(divid, xpos, ypos){
        divid.style.left = xpos + "px";
        divid.style.top = ypos + "px";
        let point1 = document.getElementById('point1');
        let point2 = document.getElementById("point2");

        let line1 = document.getElementById("connectLine1");
        let line2 = document.getElementById("connectLine2");
        let elem = document.getElementById("elem");

        let container = document.getElementById("container");

        this.adjustLine(elem,point2,line2);
        this.adjustLine(elem,point1,line1);

        let emoji = document.getElementById("emoji");
        emoji.style.left= xpos - 25 + "px";
        emoji.style.top= ypos - emoji.clientHeight*1.3 + "px";
        
        let percentage = (elem.offsetLeft/container.clientWidth)*100;

        if(percentage<20){
            this.setState({
                sliderState:0,
                emoji:"slider__emoji--mouth slider__emoji--mouth-sad",
                isHappy:false
            });
        }
        else if(percentage<40){
            this.setState({
                sliderState:1,
                emoji:"slider__emoji--mouth slider__emoji--mouth-neutral",
                isHappy:false
            });
        }
        else if(percentage<60){
            this.setState({
                sliderState:2,
                emoji:"slider__emoji--mouth",
                isHappy:false
            });
        }
        else if(percentage<80){
            this.setState({
                sliderState:3,
                emoji:"slider__emoji--mouth ",
                isHappy:false
            });
        }
        else{
            this.setState({
                sliderState:4,
                emoji:"slider__emoji--mouth slider__emoji--mouth-love",
                isHappy:true
            });
        }
    }

    startMoving(divid, container, evt){
        let self = this;
        evt = evt || window.event;
        var posX = evt.clientX,
        posY = evt.clientY,
        divTop = divid.style.top,
        divLeft = divid.style.left,
        eWi = parseInt(divid.clientWidth),
        eHe = parseInt(divid.clientHeight),
        cWi = parseInt(document.getElementById(container).clientWidth),
        cHe = parseInt(document.getElementById(container).clientHeight);
        document.getElementById(container).style.cursor = "move";
        divTop = divTop.replace("px", "");
        divLeft = divLeft.replace("px", "");
        var diffX = posX - divLeft,
            diffY = posY - divTop;
        document.onmousemove = function (evt) {
            evt = evt || window.event;
            var posX = evt.clientX,
            posY = evt.clientY,
            aX = posX - diffX,
            aY = posY - diffY;
            if (aX < 0) aX = 0;
            if (aY < 0) aY = 0;
            if (aX + eWi > cWi) aX = cWi - eWi;
            if (aY + eHe > cHe) aY = cHe - eHe;
            
            self.move(divid, aX, aY);
        };
    }

    stopMoving (container) {
        document.createElement("script");
        document.getElementById(container).style.cursor = "default";
        document.onmousemove = function () {};
    }
}
