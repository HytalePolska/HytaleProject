const SQL_Builder = require("../../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "P_KM_PlayerData";
class PlayerData {
  constructor() {
    this.PlayerID = '';
    this.PD_Deaths='';
    this.PD_lifes='';
    this.PD_life='';
    this.PD_IsDeath='';
    this.PD_UnbanDate='';
  }
  /////////////////////////////////////////////////
  static async GET(DB, data, res) {
    let query;
    let con = [];
    let result;

    con['PlayerID'] = data.PlayerID;
    con['PD_Deaths'] = data.PD_Deaths;
    con['PD_lifes'] = data.PD_lifes;
    con['PD_life'] = data.PD_life;
    con['PD_IsDeath'] = data.PD_IsDeath;
    con['PD_UnbanDate'] =data.PD_UnbanDate;
    con["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek

    query = query_Builder.Select("*", Table_Name).Where(con).Get();

    result = await DB(query);

    if (typeof res !== "undefined")
      res.send(result);
    else
    {
         let data = JSON.parse(JSON.stringify(result));
         let index = String(data[0].PD_UnbanDate).indexOf('T');
         data[0].PD_UnbanDate = String(data[0].PD_UnbanDate).slice(0,index);
        
        return data[0];
    }
    
  }
  /////////////////////////////////////////////////
  static async PUT(DB, data, res) {
    let con = [];

    con['PlayerID'] = data.PlayerID;
    con['PD_Deaths'] = data.PD_Deaths;
    con['PD_lifes'] = data.PD_lifes;
    con['PD_life'] = data.PD_life;
    con['PD_IsDeath'] = data.PD_IsDeath;
    con['PD_UnbanDate'] = data.PD_UnbanDate;
    let where = [];
    where["PlayerID"] = data.PlayerID;   //check if player exists

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
    {
        let data = JSON.parse(JSON.stringify(result));
        return data[0];
    }
  }
  /////////////////////////////////////////////////
  static async POST(DB, data, res) {
    let con = [];
   
    con['PD_Deaths'] = data.PD_Deaths;
    con['PD_lifes'] = data.PD_lifes;
    con['PD_life'] = data.PD_life;
    con['PD_IsDeath'] = data.PD_IsDeath;
    con['PD_UnbanDate'] = data.PD_UnbanDate;

    let where = [];   where["PlayerID"] = data.PlayerID;   //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();
         
    if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
    {
      res.send("404");
      return;
    }

    query = query_Builder.Update(con, Table_Name).Where(where).Get();
   let result = await DB(query);
    if (typeof res !== "undefined")
    res.send("201");
  else
  {
      let data = JSON.parse(JSON.stringify(result));
      return data[0];
  }
  }
  /////////////////////////////////////////////////
  static async DELETE(DB, data, res) {
    let con = [];
    where["PlayerID"] = data.PlayerID;  
    let query = query_Builder.Delete(Table_Name).Where(con).Get();
    await DB(query);
    res.send("200");
  }
  /////////////////////////////////////////////////
}
module.exports = PlayerData;