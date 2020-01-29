
const SQL_Builder = require("../../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Members";
class Member {
    constructor() {

        this.M_GroupID = '';
        this.M_PlayerID ='';
        this.M_Rang =''
    }
  /////////////////////////////////////////////////
   static async GET(DB,data,res)
   {
    let query;
    let cond = [];
    let result;

   
    cond['M_GroupID'] = data.GroupID;
    cond['M_PlayerID'] = data.Player_ID;
    cond["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek
    
    query= query_Builder.Select("*", Table_Name).Where(cond).Get();
   
    result = await DB(query);
     
    if(typeof res !== "undefined") 
      res.send(result);
    else 
       return JSON.parse(JSON.stringify(result));
  
   }
   /////////////////////////////////////////////////
   static async PUT(DB,data,res)
   {
    let result;
    let query;
     let con = [];
    con["M_GroupID"] = data.GroupID;
    con["M_PlayerID"] = data.PlayerID;
    con["M_Rang"] =data.Rang;
  
    let where = []; 
    where["M_PlayerID"] =data.PlayerID; 
    where["M_GroupID"] =data.GroupID; //check if player exists

     query= query_Builder.Select("*", Table_Name).Where(where).Get();
     result = JSON.stringify(await DB(query));
     
      if (result !== "[]")  //in other case return filled JSON with data
     {
       if(typeof res == 'undefined')
        return 'error'
       else
        res.send("The Player is already existing");

        return;
     }
     
     where =[];
     where["M_GroupID"] =data.GroupID   //check if group exists
     query = query_Builder.Select("*", "S_Groups").Where(where).Get();
     result = JSON.stringify(await DB(query));
      if (result == "[]")  //in other case return filled JSON with data
     {
       if(typeof res == 'undefined')
        return 'error'
       else
        res.send("The Group is not existing");

        return;
     }

    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
     result = await DB(query);
    if(typeof res !== "undefined") 
        res.send("The Players has been added");
    else 
       return JSON.parse(JSON.stringify(result));
 
   }
     /////////////////////////////////////////////////
   static async POST( DB,data,res)
   {
    let result;
    let con = [];
   
    con["M_Rang"] =data.Rang;
   
    let where = [];
    where["M_PlayerID"] =data.PlayerID;   //check if player exists
    where["M_GroupID"] =data.GroupID; 
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();
    
    result = JSON.stringify(await DB(query));
    if (result === "[]")  //in other case return filled JSON with data
   {
     if(typeof res == 'undefined')
      return 'error'
     else
      res.send("The Member is not existing");

      return;
   }
    query = query_Builder.Update(con, Table_Name).Where(where).Get();
    result = await DB(query);
    if(typeof res !== "undefined") 
        res.send("The Member has been updated");
    else 
       return JSON.parse(JSON.stringify(result));
   }
   /////////////////////////////////////////////////
   static async DELETE(DB,data,res)
   {
    let where = [];
    where["M_PlayerID"] = data.M_PlayerID;
    let query = query_Builder.Delete(Table_Name).Where(where).Get();
    await DB(query);
    res.send("Player has been deleted");
   }
   /////////////////////////////////////////////////
}
module.exports = Member;