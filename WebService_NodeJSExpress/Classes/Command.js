
const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Commands";
class Command {
  constructor() {

    this.CommandID='';
    this.PluginID = '';
    this.C_Name = '';
    this.C_Description = '';
   
  }
  /////////////////////////////////////////////////
  static async GET(DB, data, res) {
    let query;
    let con = [];
    let result;

    con["CommandID"] = data.CommandID;
    con["PluginID"] = data.PluginID;
    con['C_Name'] = data.C_Name;
    con['C_Description'] = data.C_Description;
   
    con["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek
       
    query = query_Builder.Select("*", Table_Name).Where(con).Get();
    
    result = await DB(query);

    if (typeof res !== "undefined")
      res.status(200).send(result);
    else
    {
      let data = JSON.parse(JSON.stringify(result));
      return data[0];
    }
  }
  /////////////////////////////////////////////////
  static async PUT(DB, data, res) {
    let con = [];

  
    
    con["PluginID"] = data.PluginID;
    con['C_Name'] = data.C_Name;
    con['C_Description'] = data.C_Description;

    let where = [];
   where["PluginID"] = data.PluginID;
   where['C_Name'] = data.C_Name; //check if player exists

    let query = query_Builder.Select("*", Table_Name).Where(where).Get();


    if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
    {
  
      if (typeof res !== "undefined")
      return  res.status(400).send("The Command is already existing");
    else
    {
        //console.log("The Plugin is already existing "+ con['P_Name'] );
        return "[]";
    }
      
    }

    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    let result = await DB(query);
  if (typeof res !== "undefined")
    res.status(201).send("The Command has been added");
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
  static async POST(DB, data, res) {
    let con = [];
    
    con["PluginID"] = data.PluginID;
    con['C_Name'] = data.C_Name;
    con['C_Description'] = data.C_Description;
    let where = []; where["PluginID"] = data.PluginID;  //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();

    if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
    {
        res.status(404).send("The Command is not existing");
      return;
    }

    query = query_Builder.Update(con, Table_Name).Where(where).Get();
    let result =   await DB(query);
    if (typeof res !== "undefined")
    res.status(201).send("The Command has been updated");
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
  static async DELETE(DB, data, res) {
    let con = [];
     con["CommandID"] = data.CommandID;
     con["PluginID"] = data.PluginID;
     con['C_Name'] = data.C_Name;
    
    let query = query_Builder.Delete(Table_Name).Where(con).Get();
    console.log(query);
    let result =   await DB(query);
    if (typeof res !== "undefined")
    res.status(200).send("The Command has been deleted");
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
}
module.exports = Command;