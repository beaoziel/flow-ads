const sensors = require('./sensors')

class NewArduinoSwitch {

    constructor(){
        this.listData = [];
        // this.listDataR = [];
		this.__listDataTemp = [];
		this.listDataHour = [];
    }

    get List() {
        return this.listData;
    }

    // get ListR() {
    //     return this.listDataR;
    // }
	
	get ListHour() {
		return this.listDataHour;
	}
    
    SetConnection(){
        setInterval(() => {
            let data_float = sensors.trc5000();

            // let data_int = sensors.escolhe();

            if (this.__listDataTemp.length === 59) {
                let sum = this.__listDataTemp.reduce((a, b) =>  a + b, 0);
                this.listDataHour.push((sum / this.__listDataTemp.length).toFixed(2));
                while(this.__listDataTemp.length > 0) {
                    this.__listDataTemp.pop();
                }
            }
            
            this.__listDataTemp.push(data_float);
            this.listData.push(data_float);
            // this.listDataR.push(data_int);

        }, 3000);
    }
}

const serial = new NewArduinoSwitch();
serial.SetConnection();

module.exports.ArduinoDataSwitch = {List: serial.List, ListHour:serial.ListHour}

// List: serial.ListR