
const Builder = require("../Tools/Sql_Builder");
const SQL_Builder = new Builder();
const Table_Name = "S_Players";
const FielID = 'PlayerID';
class Player {

  static Is_Init = false;

  static async Init_table(DB) {

   
    DB.createCollection(Table_Name, function(err, res)
     {
        if (err)   
        console.log(Table_Name+" ERROR "+err);
        else
        db.close();
      });
   
  }
  /////////////////////////////////////////////////
  static async GET(DB, data, res) {

    let query;
    let selected_filds = ["PlayerID", "P_Name", "P_Pass", "P_Online"];
    let result;
  

    if (typeof res !== "undefined")
      res.status(200).send(result);
    else {
      let data = JSON.parse(result);
      return data[0];
    }
  }
  /////////////////////////////////////////////////
  static async PUT(DB, Json, res) {


    let error_message = "Error occur add Players : \n\n"
    let error = false;

    for (var data in Json) {

      let put_filds = ["PlayerID", "P_Name", "P_Pass", "P_Online"];

      let where_filds = ["PlayerID", "P_Name"];

      let put = this.LoadFilds(Json[data], put_filds);
      let where = this.LoadFilds(Json[data], where_filds);

      let query = SQL_Builder.Select("*", Table_Name).Where(where).Get();


      if (await DB(query) != "[]")  //in other case return filled JSON with data
      {

        error_message += `PlayerID ${Json[data][FielID]} is already existing \n`;
        error = true;

        continue;
      }
      query = SQL_Builder.Insert(put, Table_Name).Get();   //add new player
      await DB(query);
    }

    if (typeof res !== "undefined") //jesli checmy uzyc jako funcji res nie wkladamy do srodka
    {
      if (error == false)
        res.status(201).send(`The ${Table_Name} has been Added`);
      else
        res.status(404).send(error_message + "\n Another records has been added");
    }
    else {
      if (error == false)

        return "201";
      else
        console.log(error_message);
      return "404";
    }
  }
  /////////////////////////////////////////////////
  static async POST(DB, Json, res) {

    let error_message = "Error occur updated Players : \n"
    let error = false;

    for (var data in Json) {
      let post_filds = ["P_Pass", "P_Online"];

      let where_filds = ["PlayerID", "P_Name"];

      let post = this.LoadFilds(Json[data], post_filds);
      let where = this.LoadFilds(Json[data], where_filds);


      let query = SQL_Builder.Select("*", Table_Name).Where(where).Get();


      if (await DB(query) == "[]")  //in other case return filled JSON with data
      {
        error_message += `PlayerID ${Json[data][FielID]} is not existing \n`;
        error = true;

        continue;
      }

      query = SQL_Builder.Update(post, Table_Name).Where(where).Get();
      await DB(query);
    }

    if (typeof res !== "undefined") //jesli checmy uzyc jako funcji res nie wkladamy do srodka
    {
      if (error == false)
        res.status(201).send(`The ${Table_Name} has been updated`);
      else
        res.status(404).send(error_message);
    }
    else {
      if (error == false)

        return "201";
      else
        console.log(error_message);
      return "404";
    }
  }
  /////////////////////////////////////////////////
  static async DELETE(DB, Json, res) {

    let error_message = "Error occur deleted Players : \n"
    let error = false;

    for (var data in Json) {
      let where_filds = ["PlayerID", "P_Name"];

      let where = this.LoadFilds(Json[data], where_filds);

      let query
      if (where.length == "[]")
        query = SQL_Builder.Delete(Table_Name).Get();
      else
        query = SQL_Builder.Delete(Table_Name).Where(where).Get();

      await DB(query);
    }




    if (typeof res !== "undefined") //jesli checmy uzyc jako funcji res nie wkladamy do srodka
    {
      if (error == false)
        res.status(200).send(`The ${Table_Name} has been deleted`);
      else
        res.status(404).send(error_message);
    }
    else {
      if (error == false)

        return "201";
      else
        console.log(error_message);
      return "404";
    }
  }
  /////////////////////////////////////////////////

  static LoadFilds(data, selectedfilds) {
    let result = [];
    for (var record in data) {

      for (var fild in selectedfilds) {
        if (record == selectedfilds[fild]) {
          result[record] = data[record];
          break;
        }
      }
    }
    return result;
  }

}
module.exports = Player;