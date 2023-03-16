import {observable} from "mobx"

const headerRerenderStore = observable({
    state:false,
    stateChange(){
        this.state = !this.state;
    },
});

export default headerRerenderStore;