
const SQL_Builder = require("../../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();
const Table_Name = "S_Members";
class Member {
    constructor() {

        this.GroupID = '';
        this.M_ValueID ='';
        this.M_ValueTable =''
    }
  /////////////////////////////////////////////////
   static async GET(DB,data,res)
   {
    let query;
    let con = [];
    let result;

   
    con['GroupID'] = data.GroupID;
    con['M_ValueID'] = data.M_ValueID;
    con['M_ValueTabel'] = data.M_ValueTabel;
    con["1"] = 1; //JESLI G_TYPE JEST nullem query > select * forom S_group Where trzeba dac jeden warunek
    
    query= query_Builder.Select("*", Table_Name).Where(con).Get();
   
    result = await DB(query);
     
    if(typeof res !== "undefined") 
      res.send(result);
    else 
       return JSON.parse(JSON.stringify(result));
  
   }
   /////////////////////////////////////////////////
   static async PUT(DB,data,res)
   {
    let result;
    let query;
     let con = [];
     con['GroupID'] = data.GroupID;
     con['M_ValueID'] = data.M_ValueID;
     con['M_ValueTable'] = data.M_ValueTable;
  
    let where = []; 
    where['GroupID'] = data.GroupID;
    where['M_ValueID'] = data.M_ValueID;

     query= query_Builder.Select("*", Table_Name).Where(where).Get();
     result = JSON.stringify(await DB(query));
    
      if (result !== "[]")  //in other case return filled JSON with data
     {
       if(typeof res == 'undefined')
        return 'error'
       else
        res.send("The Memeber is already existing");

        return;
     }
     
     where =[];
     where['GroupID'] =data.GroupID   //check if group exists
     query = query_Builder.Select("*", "S_Groups").Where(where).Get();
     result = JSON.stringify(await DB(query));
      if (result == "[]")  //in other case return filled JSON with data
     {
       if(typeof res == 'undefined')
        return 'error'
       else
        res.send("The Group is not existing");

        return;
     }

    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
     result = await DB(query);
    if(typeof res !== "undefined") 
        res.send("The Member has been added");
    else 
       return JSON.parse(JSON.stringify(result));
 
   }
     /////////////////////////////////////////////////
   static async POST( DB,data,res)
   {
    let result;
    let con = [];
     con['M_ValueTabel'] = data.M_ValueTabel;
   
    let where = [];
    where['M_ValueID'] =data.M_ValueID;   //check if player exists
    where['GroupID'] =data.GroupID; 
    let query = query_Builder.Select("*", Table_Name).Where(where).Get();
    
    result = JSON.stringify(await DB(query));
    if (result === "[]")  //in other case return filled JSON with data
   {
     if(typeof res == 'undefined')
      return 'error'
     else
      res.send("The Member is not existing");

      return;
   }
    query = query_Builder.Update(con, Table_Name).Where(where).Get();
    result = await DB(query);
    if(typeof res !== "undefined") 
        res.send("The Member has been updated");
    else 
       return JSON.parse(JSON.stringify(result));
   }
   /////////////////////////////////////////////////
   static async DELETE(DB,data,res)
   {
    let where = [];
    where['M_ValueID'] = data.M_ValueID;
    where["GroupID"] = data.GroupID;
    let query = query_Builder.Delete(Table_Name).Where(where).Get();
    
    await DB(query);

    if(typeof res !== "undefined") 
       res.send("The Member has been deleted");
    else 
      return "deleted";
   
   }
   /////////////////////////////////////////////////
   static async CUSTOM(DB,query,res)
   {
    if(typeof res !== "undefined") 
       res.send(await DB(query))
    else 
      return "deleted";
   }
}
module.exports = Member;