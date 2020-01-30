
const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Players";
class Player {
  constructor() {

    this.Player_ID = '';
    this.P_Name = '';
    this.P_Pass = '';
    this.P_Online = '';
  }
  /////////////////////////////////////////////////
  static async GET(DB, data, res) {
    let query;
    let cond = [];
    let result;

    cond["PlayerID"] = data.PlayerID;
    cond['P_Name'] = data.P_Name;
    cond['P_Pass'] = data.P_Pass;
    cond['P_Online'] = data.P_Online;
    cond["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek

    query = query_Builder.Select("*", Table_Name).Where(cond).Get();

    result = await DB(query);

    if (typeof res !== "undefined")
      res.send(result);
    else {
      let data = JSON.parse(JSON.stringify(result));
      return data[0];
    }
  }
  /////////////////////////////////////////////////
  static async PUT(DB, data, res) {
    let con = [];

    con["PlayerID"] = data.PlayerID;
    con["P_Name"] = data.P_Name;
    con["P_Pass"] = data.P_Pass;
    con["P_Online"] = data.P_Online;


    let where = [];
    where["PlayerID"] = data.PlayerID;   //check if player exists

    let query = query_Builder.Select("*", Table_Name).Where(where).Get();


    if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
    {
      res.send("The Player is already existing");
      return;
    }

    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    let result = await DB(query);
    if (typeof res !== "undefined")
      res.send(result);
    else {
      let data = JSON.parse(JSON.stringify(result));
      return data[0];
    }
  }
  /////////////////////////////////////////////////
  static async POST(DB, data, res) {
    let con = [];
    con["P_Name"] = data.P_Name;
    con["P_Pass"] = data.P_Pass;
    con["P_Online"] = data.P_Online;

    let where = []; where["PlayerID"] = data.PlayerID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();

    if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
    {
      res.send("The Player is not existing");
      return;
    }

    query = query_Builder.Update(con, Table_Name).Where(where).Get();
    let result = await DB(query);
    if (typeof res !== "undefined")
      res.send(result);
    else {
      let data = JSON.parse(JSON.stringify(result));
      return data[0];
    }
  }
  /////////////////////////////////////////////////
  static async DELETE(DB, data, res) {
    let con = [];
    con["PlayerID"] = data.PlayerID;
    let query = query_Builder.Delete(Table_Name).Where(con).Get();
    let result = await DB(query);
    if (typeof res !== "undefined")
      res.send(result);
    else {
      let data = JSON.parse(JSON.stringify(result));
      return data[0];
    }
  }
  /////////////////////////////////////////////////
}
module.exports = Player;