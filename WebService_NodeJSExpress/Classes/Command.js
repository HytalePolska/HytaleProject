
const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Commands";
class Command {
    constructor() {
        this.CommandID = '';
        this.GroupID = '';
        this.C_Name = '';
        this.C_Plugin = '';
    }
  /////////////////////////////////////////////////
  static async GET(DB,data,res)
  {
   let query;
   let cond = [];
   let result;
   cond['CommandID'] = data.CommandID;
   cond['GroupID'] = data.GroupID;
   cond["C_Name"] = data.Name;
   cond['C_Plugin'] = data.Plugin;
   cond["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek
  
   query= query_Builder.Select("*", Table_Name).Where(cond).Get();
   
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
   con["GroupID"] =data.GroupID;  
   con["C_Name"] = data.Name;
   con["C_Plugin"] =data.Plugin;
 
   let where = []; 
   where["GroupID"] =data.GroupID;   //check if command exists
   where["C_Name"] = data.Name;
   where["C_Plugin"] =data.Plugin;
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
   con["C_Plugin"]=data.Plugin;
   con["C_Name"] =data.Name;
  
   let where = [];
    where["CommandID"] =data.CommandID;
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
   query = query_Builder.Update(con, Table_Name).Where(where).Get();
   console.log(query);
   result =await DB(query); 
   if(typeof res == 'undefined')
       return  "true";
   else
      res.send("Command has been updated");
  }
  /////////////////////////////////////////////////
  static async DELETE(DB,data,res)
  {
   let con = [];
   con["CommandID"] =  data.CommandID;
   con["C_Plugin"] =  data.Plugin;
   con["GroupID"] =  data.GroupID;
   let query = query_Builder.Delete(Table_Name).Where(con).Get();//usuwanie grupy
   await DB(query);
    
   if(typeof res == 'undefined')
   return 'deleted';
  else
  res.send("Command has been deleted");
 
  }
  /////////////////////////////////////////////////
}
module.exports = Command;