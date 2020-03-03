
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace Connector_test.Managers
{
    class ResponceData
    {
        public JObject JsonData;
        public HttpStatusCode StatusCode;
        public ResponceData(string JsonData, HttpStatusCode StatusCode)
        {
            this.JsonData = JObject.Parse(JsonData);
            this.StatusCode = StatusCode;
        }
    }
    enum E_HttpMethods { GET,POST,PUT,DELETE};
    class Http_Manager
    {

        public static ResponceData Request(E_HttpMethods Method, string URL, string JsonDataToSend)
        {
            try
            {
                string rt;

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);

                  request.Headers.Add("access-control-allow-headers", "*");
                  request.Headers.Add("access-control-allow-origin", "*");
                request.Method = Method.ToString();
                 HttpWebResponse response = (HttpWebResponse)request.GetResponse();


                    Stream dataStream = response.GetResponseStream();

                    StreamReader reader = new StreamReader(dataStream);

                    rt = reader.ReadToEnd();
                  
                    reader.Close();
                    response.Close();

                return new ResponceData(rt, response.StatusCode);
            }
            catch (WebException e)
            {
                return new ResponceData(String.Format("{ exception:{0} }", e.ToString()), HttpStatusCode.NotFound);
            }
        }
    }
}