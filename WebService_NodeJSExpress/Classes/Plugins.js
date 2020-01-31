
const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Plugins";
class Plugin {
  constructor() {

    this.PluginID = '';
    this.P_Name = '';
    this.P_Description = '';
    this.P_LastComandsUpdate = '';
   
  }
  /////////////////////////////////////////////////
  static async GET(DB, data, res) {
    let query;
    let con = [];
    let result;

    con["PluginID"] = data.PluginID;
    con['P_Name'] = data.P_Name;
    con['P_Description'] = data.P_Description;
    con['P_LastComandsUpdate'] = data.P_LastComandsUpdate;
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

  
    con['P_Name'] = data.P_Name;
    con['P_Description'] = data.P_Description;
    con['P_LastComandsUpdate'] = data.P_LastComandsUpdate;

    let where = [];
    where['P_Name'] = data.P_Name;  //check if player exists

    let query = query_Builder.Select("*", Table_Name).Where(where).Get();


    if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
    {
  
      if (typeof res !== "undefined")
      return  res.status(400).send("The Plugin is already existing");
    else
    {
        console.log("The Plugin is already existing "+ con['P_Name'] );
        return "[]";
    }
      
    }

    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    let result = await DB(query);
  if (typeof res !== "undefined")
    res.status(201).send("The Plugin has been added");
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
  static async POST(DB, data, res) {
    let con = [];
    con['P_Name'] = data.P_Name;
    con['P_Description'] = data.P_Description;
    con['P_LastComandsUpdate'] = data.P_LastComandsUpdate;
    let where = []; where["PlayerID"] = data.PlayerID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();

    if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
    {
        res.status(404).send("The Plugin is not existing");
      return;
    }

    query = query_Builder.Update(con, Table_Name).Where(where).Get();
    let result =   await DB(query);
    if (typeof res !== "undefined")
    res.status(201).send("The Plugin has been updated");
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
  static async DELETE(DB, data, res) {
    let con = [];
    con["PluginID"] = data.PluginID;
    con['P_Name'] = data.P_Name;
    
    let query = query_Builder.Delete(Table_Name).Where(con).Get();
    let result =   await DB(query);
    if (typeof res !== "undefined")
    res.status(200).send("The Plugin has been deleted");
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
}
module.exports = Plugin;