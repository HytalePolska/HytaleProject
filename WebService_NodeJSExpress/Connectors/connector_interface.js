class MenuInterface {
    constructor() {

        if (this.database == null)
            this.database = this.Connect();

    }

    Execute(params) {
        return null;
    }
    Connect() {
        return null;
    }

}
module.exports = MenuInterface