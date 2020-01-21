
module.exports = class Player {
    constructor() {
        this.Player_ID = '';
        this.Player_Password ='';
        this. Nick = '';
    }

    ToJson()
    {
       return JSON.stringify(this.Player); 
    }
   FromJson()
   {

   }


}