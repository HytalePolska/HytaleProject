
const SQL_Builder = require("../../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "P_KM_Lifes";
class Life {
  constructor() {

    this.LifeID = '';
    this.PlayerID = '';
    this.L_date='';
    this.L_Healer = '';
    this.L_location ='';
  }
  
  /////////////////////////////////////////////////
  static async GET(DB, data, res) {
    let query;
    let con = [];
    let result;

    con["LifeID"] = data.LifeID;
    con['PlayerID'] = data.PlayerID;
    con['L_date'] = data.L_date;
    con['L_Healer'] = data.L_Healer;
    con['L_location'] = data.L_Location;

    con["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek

    query = query_Builder.Select("*", Table_Name).Where(con).Get();

    result = await DB(query);

    if (typeof res !== "undefined")
      res.send(result);
    else
      return JSON.parse(JSON.stringify(result));
  }
  /////////////////////////////////////////////////
  static async PUT(DB, data, res) {
    let con = [];

    
    con['PlayerID'] = data.PlayerID;
    con['L_date'] = data.L_date;
    con['L_Healer'] = data.L_Healer;
    con['L_location'] = data.L_Location;

    let where = [];
    where["PlayerID"] = data.PlayerID;   //check if player exists
    where["L_date"] = data.L_date; 
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();


    if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
    {
      res.send("409");
      return;
    }

    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    let result = await DB(query);
    if (typeof res !== "undefined")
      res.send("201");
    else
      return JSON.parse(JSON.stringify(result));
  }
  /////////////////////////////////////////////////
  static async POST(DB, data, res) {
    let con = [];
   
   
    con['PlayerID'] = data.PlayerID;
    con['L_date'] = data.L_date;
    con['L_Healer'] = data.L_Healer;
    con['L_location'] = data.L_Location;

    let where = [];    where["LifeID"] = data.LifeID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();

    if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
    {
      res.send("404");
      return;
    }

    query = query_Builder.Update(con, Table_Name).Where(where).Get();
    let result = await DB(query);
    if (typeof res !== "undefined")
      res.send("200");
    else
      return JSON.parse(JSON.stringify(result));
  }
  /////////////////////////////////////////////////
  static async DELETE(DB, data, res) {
    let where = [];
    where["LifeID"] = data.LifeID;
    let query = query_Builder.Delete(Table_Name).Where(where).Get();
    await DB(query);
    res.send("200");
  }
  /////////////////////////////////////////////////
}
module.exports = Life;