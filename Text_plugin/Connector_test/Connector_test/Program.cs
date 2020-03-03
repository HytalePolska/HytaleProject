using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;
using OAuth;
using RestSharp;
using RestSharp.Serializers;
namespace Connector_test
{
    class Program
    {
        
        static string text = "Zmiana Regulaminu.Dzień dobry!Z przyjemnością informujemy, że BlaBlaCar rozszerza zakres świadczonych usług. Z tego powodu aktualizujemy nasz Regulamin i Politykę prywatności.uż niedługo, na platformie BlaBlaCar będzie można rezerwować i kupować bilety autobusowe oferowane przez różnych przewoźników. Dzięki temu nasi Pasażerowie będą mieli do wyboru jeszcze szerszą ofertę środków transportu.Nowy Regulamin i Polityka prywatności będą obowiązyw";

        static void Main(string[] args)
        {

            Console.WriteLine(new TableBuilder(E_MessageType.Ok,E_TableSize.small).SetTitle("Witajcie na serverze").SetText(text,true).GetMessage());
            Console.Read();
        }


       static string Bar(int p1,int p2,string pattern,int color)
        {
            string result = String.Empty;
            for(int i=0;i<48;i++)
            {
              if (i >= p1 && i <= p2)
                     result += pattern;
                 else
                     result += " ";
              
            }
            return result;
        }

       static void Table(string slowo)
        {
            string result = "";
            

            string bar = string.Empty;
            List<string> words = new List<string>();


           
            if (slowo.Length>48-4)
            {
               int w = slowo.Length /44;
               for(int i=0; i<=w;i++)
                {
                    if (i == w )
                        words.Add(slowo.Substring(i * 44, slowo.Length - 1-44*i));
                    else
                        words.Add(slowo.Substring(i * 44, 44));
                }
            }



          
            if (words.Count <= 1)
            {
                int p_start = 24 - slowo.Length / 2;

                for (int i = 0; i < p_start - 1; i++)
                        result += " ";

                    result += "| " + slowo + " |";
                    bar = Bar(p_start - 1, p_start + slowo.Length + 2, "=", 0);
               
            }
            else
             foreach(var w in words)
              {
               
                int p_start = 24 - slowo.Length / 2;

                    result += "* " + w;

                    for(int i=w.Length;i<=48;i++)
                    {
                        if (i == 48-3 )
                            result += "*";
                        else
                            result += " ";
                    }
                    bar = Bar(0, 48, "*", 0);

                    if(w != words[words.Count-1])
                      result += Environment.NewLine;
            }

          
            Console.WriteLine(bar);
            Console.WriteLine(result);
            Console.WriteLine(bar);
        }

    }
}
