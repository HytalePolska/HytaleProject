
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
    let cond = [];
    let result;

   
    cond["G_type"] = data.Type;
    cond['G_GroupID'] = data.GroupID;
    cond['G_Name'] = data.Name;
    cond["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek
    
    query= query_Builder.Select("*", Table_Name).Where(cond).Get();
   
        if(data.token==='true' ) //// DLA /Group/:ID/MEMBERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         {
             query= "SELECT p.*,m.M_Rang FROM S_Members m INNER JOIN MC_Players p ON m.M_playerID = p.Player_ID ";
             query+=query_Builder.Where(cond).Get();
         }

    result = await DB(query);
     
    if(typeof res !== "undefined") 
      res.send(result);
    else 
       return result;
    
   }
   ///////////////////////////////////////////////
   static async PUT(DB,data,res)
   {
     let con = [];
    con["G_GroupID"] =data.G_GroupID;  
    con["G_Name"] = data.G_Name;
    con["G_Type"] =data.G_Type;

    let wher = []; wher["G_GroupID"] =data.G_GroupID;   //check if group exists
    let query = query_Builder.Select("*", Table_Name).Where(wher).Get();
 
      if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
     {
        res.send("The Player is already existing");
        return;
     }
    query = query_Builder.Insert(con, Table_Name).Get();   //add new group
    await DB(query);
      res.send("The Players has been added");
 //////////////////////////////////////////////////////////////////////
   }
  ///////////////////////////////////////////////
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
    console.log(query);
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