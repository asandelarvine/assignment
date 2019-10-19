class State {
    constructor(startTimestamp, difference, suspended) {
        this.startTimestamp = startTimestamp;
        this.difference = difference;
        this.suspended = suspended;
    }

    static ready() {
        return new State(null, 0, 0);
    }
}

class stopwatch {
    constructor(state) {
        this.state = state; 
        this.requestAnimationId = null;
        this.handleclickStart = this.handleclickstart.bind(this);
        document
            .getElementById("start")
            .addEventListener("click", this.handleclickStart);  
        this.handleclickStop = this.handleclickstop.bind(this);
        document
            .getElementById("stop")
            .addEventListener("click", this.handleclickStop); 
        this.handleclickReset = this.handleclickreset.bind(this);
        document
            .getElementById("reset")
            .addEventListener("click", this.handleclickReset);  
       this.tick = this.tick.bind(this);
       this.render();
    }

   static ready() {
       return newstopwatch(state.ready());
   }

    setstate(newstate) {
        this.state = { ...this.state, ...newstate};
        this.render();
    }

    tick() {
        this.setstate({
            difference: new Date(new Date() - this.state.startTimestamp)
        });
        this.requestAnimationId = requestAnimationFrame(this.tick);
    }

    handleclickstart(){
        if(this.state.startTimestamp) {
            return;
        }
        this.setstate({
            startTimestamp: new Date() - this.state.suspended,
            suspended:0
        });
        this.requestAnimationId = requestAnimationFrame(this.tick);
    }

    handleclickstop() {
        cancelAnimationFrame(this.requestAnimationId);
        this.setstate({
            startTimestamp: null,
            suspended: this.state.difference
        });
    }

    handleclickreset() {
        cancelAnimationFrame(this.requestAnimationId);
        this.setstate(state.ready());
    }

    render(){
        const {difference} = this.state;
        const hundredths = (difference 
            ? Math.floor(difference.getmilliseconds ()/ 10) 
            : 0
        )
            .tostring()
            .padstart(2, "0");
        const seconds = (difference
            ? Math.floor(difference.getseconds() / 10): 0 )
            .tostring()
            .padstart(2, "0");
        const minutes = (difference 
            ? Math.floor(difference.getminutes ()/ 10) : 0)
            .tostring()
            .padstart(2, "0");
            //render screen
            document.getElementById("minutes").textcontent = minutes;
            document.getElementById("seconds").textContent = seconds;
            document.getElementById("hundredths").textContent = hundredths;
        
    }    
}

const STOPWATCH = stopwatch.ready();
