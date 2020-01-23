
const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "MC_Players";
class Player {
    constructor() {

        this.Player_ID = '';
        this.Player_Password = '';
        this.Nick = '';
    }
  /////////////////////////////////////////////////
 static async GET( DB,data,res)
   {
  
    let query;
    let  ID = parseInt(data.Player_ID);
   
    if(typeof ID != 'number')
    {
        query= query_Builder.Select("*", Table_Name).Get();
        res.send(  await DB(query));
    }
   
    let cond = [];
    cond['Player_ID'] = ID;
    query = query_Builder.Select("*", Table_Name).Where(cond).Get();
    res.send( await DB(query));
   }

   /////////////////////////////////////////////////
   static async PUT(DB,data,res)
   {
     let con = [];
   
    con["Nick"] = data.Nick;
    con["Player_Password"] = data.Player_Password;
    con["Player_ID"] =data.Player_ID;
   
    let wher = []; wher["Player_ID"] =data.Player_ID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(wher).Get();
 
    
      if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
     {
        res.send("The Player is already existing");
        return;
     }
     

       
    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    await DB(query);
      res.send("The Players has been added");
 
   }

}
module.exports = Player;