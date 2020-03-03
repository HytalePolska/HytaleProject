
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Connector_test.Entitis
{
    class Order
    {
        public string TypDok { get; set; }
        public string order_id { get; set; }
        public string marketplace_id { get; set; }
        public DateTime purchase_date { get; set; }
        public DateTime update_date { get; set; }
        public DateTime ship_date { get; set; }
        public DateTime ship_deadline { get; set; }
        public string order_status { get; set; }
        public string customer_email { get; set; }
        public string customer_name { get; set; }
        public object nip { get; set; }
        public string ship_adres { get; set; }
        public string ship_city { get; set; }
        public string ship_country_code { get; set; }
        public double amount { get; set; }
        public string currency_code { get; set; }
        public string ship_code { get; set; }
        public string ship_name { get; set; }
        public int erp_send_status { get; set; }
        public string phone { get; set; }
        public object order_ext_id { get; set; }
        public string storage_name { get; set; }
        public string store_name { get; set; }
        public List<Product> orderItem { get; set; }
    }
}