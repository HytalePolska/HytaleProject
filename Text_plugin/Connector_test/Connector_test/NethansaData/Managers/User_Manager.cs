
using Connector_test.Entitis;
using Connector_test.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;
namespace Connector_test.Managers
{
    class User_Manager : Manager, IEntity<User>
    {
        public string URL { get => base.BaseURL + "/users"; }

        public User FromJson(string json)
        {
           return JsonConvert.DeserializeObject<User>(json);
        }

        public IEnumerable<User> GET_Many(string condition)
        {
            var json = Http_Manager.Request(E_HttpMethods.GET, URL+condition, String.Empty).JsonData;
            var users = json["data"].ToString();
            return JsonConvert.DeserializeObject<IEnumerable<User>>(users.ToString());
        }

        public User GET_One(string condition)
        {
            var json = Http_Manager.Request(E_HttpMethods.GET, URL + condition, String.Empty).JsonData;
            var user = json["data"].ToString();

            return FromJson(user);
        }

        public string ToJson(User obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}