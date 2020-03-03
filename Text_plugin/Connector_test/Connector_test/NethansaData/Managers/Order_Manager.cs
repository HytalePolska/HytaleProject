using Connector_test.Entitis;
using Connector_test.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Connector_test.Managers
{
    class Order_Manager : Manager, IEntity<Order>
    {
        public string URL { get => base.BaseURL + "Order/"; }

        public Order FromJson(string json)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Order> GET_Many(string condition)
        {
            throw new NotImplementedException();
        }

        public Order GET_One(string condition)
        {
            throw new NotImplementedException();
        }

        public string ToJson(Order obj)
        {
            throw new NotImplementedException();
        }

        
    }       
}
