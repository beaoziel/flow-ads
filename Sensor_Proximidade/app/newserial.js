const sensors = require('./sensors')

class NewArduino {

    constructor(){
        this.listData = [];
		this.__listDataTemp = [];
		this.listDataHour = [];
    }

    get List() {
        return this.listData;
    }
	
	get ListHour() {
		return this.listDataHour;
	}
    
    SetConnection(){
        setInterval(() => {
            let data_float = sensors.trc5000();
            
            this.__listDataTemp.push(data_float);
            this.listData.push(data_float);

        }, 300);
    }
}

const serial = new NewArduino();
serial.SetConnection();

module.exports.ArduinoData = {List: serial.List, ListHour:serial.ListHour} 