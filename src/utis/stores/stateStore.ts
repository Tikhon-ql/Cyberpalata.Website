import {observable} from "mobx"

const stateStore = observable({
    state:false,
    stateChange(){
        this.state = !this.state;
    },
});

export default stateStore;