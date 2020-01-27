
const SQL_Builder = require("../../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Groups";
class Group {
    constructor() {
        this.G_GroupID = '';
        this.G_Name='';
        this.G_Type='';
    }
  /////////////////////////////////////////////////
   static async GET(DB,data,res)
   {
    let query;
    
    if(typeof data.G_GroupID === 'undefined') //if iddata is empty return all users
    {
        query= query_Builder.Select("*", Table_Name).Get();
        res.send(await DB(query));
        return;
    }
   
    let cond = [];
    cond['G_Name'] = data.G_GroupID;
    cond['G_Type'] = data.G_GroupID;
    query = query_Builder.Select("*", Table_Name).Where(cond).Get();
    res.send( await DB(query));
   }
   ///////////////////////////////////////////////
   static async PUT(DB,data,res)
   {
     let con = [];

    con["G_Name"] = data.G_Name;
    con["G_Type"] =data.G_Type;

    let wher = []; wher["G_GroupID"] =data.G_GroupID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(wher).Get();
 
      if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
     {
        res.send("The Player is already existing");
        return;
     }
       
    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    await DB(query);
      res.send("The Players has been added");
 //////////////////////////////////////////////////////////////////////
   }
   static async POST( DB,data,res)
   {
    let con = [];
    con["G_Type"] =data.G_Type;
  
   
    let wher = []; wher["G_GroupID"] =data.G_GroupID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(wher).Get();
 
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
    let con = [];
    con["G_GroupID"] = data.G_GroupID;
    let query = query_Builder.Delete("S_Members").Where(con).Get(); //usuwanie czlonkow
    await DB(query); //wykonanie 
     query = query_Builder.Delete(Table_Name).Where(con).Get();//usuwanie grupy
    await DB(query);
    res.send("Group has been deleted");
   }
   /////////////////////////////////////////////////
}
module.exports = Group;