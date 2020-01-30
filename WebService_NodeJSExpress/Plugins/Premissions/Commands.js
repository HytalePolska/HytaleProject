
const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "P_Prem_Commands";
class Command {
    constructor() {
        this.CommandID = '';
        this.PluginID = '';
        this.C_Command = '';
    }
  /////////////////////////////////////////////////
  static async GET(DB,data,res)
  {
   let con = [];
   let result;
   con['CommandID'] = data.CommandID;
   con['PluginID'] = data.PluginID;
   con['C_Command'] = data.C_Command;

   let where = [];
   where["CommandID"] = data.PlayerID;   //check if player exists
   let query = query_Builder.Select("*", Table_Name).Where(where).Get();
  
   
   result = await DB(query);
    
   if(typeof res !== "undefined") 
     res.send(result);
   else 
      return JSON.parse(JSON.stringify(result));
   
  }
  ///////////////////////////////////////////////
  static async PUT(DB,data,res)
  {
    let con = [];
    let result;
   con['PluginID'] = data.PluginID;
   con['C_Command'] = data.C_Command;
 
   let where = []; 
    //check if command exists
    where['CommandID'] = data.CommandID;
    
   let query = query_Builder.Select("*", Table_Name).Where(where).Get();
    
   result = JSON.stringify(await DB(query));
     if (result != "[]")  //in other case return filled JSON with data
    {
      if(typeof res == 'undefined')
        return "error";
      else
        res.send("The Command is already existing");
       return;
    }
   query = query_Builder.Insert(con, Table_Name).Get();   //add new group
   result =await DB(query);
    
   if(typeof res === 'undefined')
   return  result;
 else
   res.send("Command has been established");
  }
 ///////////////////////////////////////////////
  static async POST(DB,data,res)
  {
    let result;
   let con = [];

   con['PluginID'] = data.PluginID;
   con['C_Command'] = data.C_Command;
  
   let where = [];
   where['CommandID'] = data.CommandID;
   let query = query_Builder.Select("*", Table_Name).Where(where).Get();
    
   result = JSON.stringify(await DB(query));
    
     if (result === "[]")  //in other case return filled JSON with data
    {
      if(typeof res == 'undefined')
        return "error";
      else
        res.send("The Command is not existing");
       return;
    }

     where = []; 
    //check if command exists
    where['PluginID'] = data.PluginID;
   where['C_Command'] = data.C_Command;
    query = query_Builder.Select("*", Table_Name).Where(where).Get();
    
   result = JSON.stringify(await DB(query));
     if (result != "[]")  //in other case return filled JSON with data
    {
      if(typeof res == 'undefined')
        return "error";
      else
        res.send("The Command is already existing");
       return;
    }

   query = query_Builder.Update(con, Table_Name).Where(where).Get();
  
   result =await DB(query); 
   if(typeof res == 'undefined')
       return  "true";
   else
      res.send("Command has been updated");
  }
  /////////////////////////////////////////////////
  static async DELETE(DB,data,res)
  {
   let where = [];
   where['PluginID'] = data.PluginID;
   where['CommandID'] = data.CommandID;
   let query = query_Builder.Delete(Table_Name).Where(where).Get();//usuwanie grupy
   await DB(query);
    
   if(typeof res == 'undefined')
   return 'deleted';
  else
  res.send("Command has been deleted");
 
  }
  /////////////////////////////////////////////////
}
module.exports = Command;