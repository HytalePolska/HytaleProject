
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
    
  
    if(typeof data.M_GroupID !== 'undefined') //if iddata is empty return all users
    {
        let where = [];
        let con =["M_PlayerID"];
        where["M_GroupID"] = data.M_GroupID;
        
        query= query_Builder.Select(con, Table_Name).Where(where).Get();
        res.send(await DB(query));
        return;
    }

    query= query_Builder.Select("*", Table_Name).Get();
    res.send(await DB(query));
    return;
  
   }
   /////////////////////////////////////////////////
   static async PUT(DB,data,res)
   {
     let con = [];
    con["M_GroupID"] = data.M_GroupID;
    con["M_PlayerID"] = data.M_PlayerID;
    con["M_Rang"] =data.M_Rang;
  
    let where = []; where["M_GroupID"] =data.M_GroupID;   //check if player exists
   
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();
    
      if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
     {
        res.send("The Player is already existing");
        return;
     }
     where =[];
     where["M_GroupID"] =data.M_GroupID;   //check if group exists
     query = query_Builder.Select("*", Table_Name).Where(wher).Get();
     if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
     {
        res.send("The group is not existing");
        return;
     }  
    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    await DB(query);
     res.send("The Players has been added");
      
 
   }
   static async POST( DB,data,res)
   {
    let con = [];
   // con["M_GroupID"] = data.M_GroupID;
   // con["M_PlayerID"] = data.M_PlayerID;
    con["M_Rang"] =data.M_Rang;
   
    let where = []; wher["Player_ID"] =data.Player_ID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();
 
      if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
     {
        res.send("The Player is not existing");
        return;
     }

    query = query_Builder.Update(con, Table_Name).Where(wher).Get();
     await DB(query);
    res.send("Player has been updated");
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