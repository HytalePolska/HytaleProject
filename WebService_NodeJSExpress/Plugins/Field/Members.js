
const Builder = require("../../Tools/Sql_Builder");
const SQL_Builder = new Builder();
const Table_Name = "P_FieldsMembers";
class Premission {

 static Is_Init =false;

 static async Init_table(DB)
  {
  
    if(this.Is_Init == false)
    {
      let filds = [];
      filds.push("MemberID INT AUTO_INCREMENT PRIMARY KEY");
      filds.push("PlayerID VARCHAR(50) NOT NULL");
      filds.push("FieldID INT");
      filds.push("M_Type VARCHAR(50)");
      filds.push("M_AddDate DATETIME NOT NULL");
      filds.push("M_AddByPlayer VARCHAR(50) NOT NULL");
     let Table = SQL_Builder.CreateTable(Table_Name).TableFilds(filds).Get();
     await DB(Table);
     this.Is_Init =true;
    }
  }
  /////////////////////////////////////////////////
  static async GET(DB, data, res) {
   
    let query;
    let selected_filds = ["PremMemberID","PlayerID","PremissionID","P_Prefix","P_AddDate","P_AddByPlayer"];
    let result;

     data = this.LoadFilds(data,selected_filds);
     data["1"]=1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek
       
    
    query = SQL_Builder.Select("*", Table_Name).Where(data).Get();
   
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

    let put_filds =  ["PremMemberID","PlayerID","PremissionID","P_Prefix","P_AddDate","P_AddByPlayer"];

    let where_filds = ["PremMemberID","PlayerID","PremissionID"];
    
    let put = this.LoadFilds(data,put_filds);
    let where = this.LoadFilds(data,where_filds);

    let query = SQL_Builder.Select("*", Table_Name).Where(where).Get();

 
    if (JSON.stringify(await DB(query)) != "[]")  //in other case return filled JSON with data
    {
  
      if (typeof res !== "undefined")
      return  res.status(400).send(`The ${Table_Name}is already existing`);
    else
    {
        console.log(`The ${Table_Name} is already existing  ${con['P_Name']} `);
        return "[]";
    }
      
    }

    query = SQL_Builder.Insert(put,Table_Name).Get();   //add new player
    let result = await DB(query);
  if (typeof res !== "undefined")
    res.status(201).send(`The ${Table_Name} has been added`);
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
  static async POST(DB, data, res) {
    
    let post_filds =  ["P_Prefix"];

    let where_filds =  ["PremMemberID","PlayerID","PremissionID"];
    
    let post = this.LoadFilds(data,post_filds);
    let where = this.LoadFilds(data,where_filds);
      
    
    let query = SQL_Builder.Select("*", Table_Name).Where(where).Get();
 
   
    if (JSON.stringify(await DB(query)) == "[]")  //in other case return filled JSON with data
    {
        res.status(404).send(`The ${Table_Name} is not existing`);
      return;
    }

    query = SQL_Builder.Update(post, Table_Name).Where(where).Get();
    let result =   await DB(query);
    if (typeof res !== "undefined")
    res.status(201).send(`The ${Table_Name} has been updated`);
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
  static async DELETE(DB, data, res) {

    let where_filds = ["PremMemberID","PlayerID","PremissionID"];
   
    let where = this.LoadFilds(data,where_filds);
    
    let query
    if(where.length == "[]")
       query = SQL_Builder.Delete(Table_Name).Get();
    else
       query = SQL_Builder.Delete(Table_Name).Where(where).Get();

    let result =   await DB(query);
  
    if (typeof res !== "undefined")
    res.status(200).send(`The ${Table_Name} has been deleted`);
  else
  {
    let data = JSON.parse(JSON.stringify(result));
    return data[0];
  }
  }
  /////////////////////////////////////////////////
    
   static LoadFilds(data,selectedfilds)
    {
     let result = [];
      for(var record in data)
      {
        let keep = false;
        for(var fild in selectedfilds)
        {
          if(record== selectedfilds[fild])
          {
           result[record] = data[record];
           break;
          }
        }
      }
      return result;
    }

}
module.exports = Premission;