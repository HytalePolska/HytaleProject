using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connector_test
{
    public enum E_MessageType
    {
        Ok, Error, Info, Warning
    }
    public class MessagesBuilder
    {
        protected string DarkColor = string.Empty;
        protected string LightColor = string.Empty;
        protected string Result = string.Empty;
        protected int Max_Lenght = 48;

        public string Bar(int i_start, int i_end, char pattern, string color = null)
        {
            string result = String.Empty;
            for (int i = 0; i < 48; i++)
            {
                if (i >= i_start && i <= i_end)
                    result += pattern;
                else
                    result += " ";

            }
            return result + color;
        }
        public void GetColor_MessageType(E_MessageType type)
        {
            switch (type)
            {
                case E_MessageType.Ok:
                    {
                        DarkColor = "D_green";
                        LightColor = "L_green";
                        break;
                    }
                case E_MessageType.Error:
                    {
                        DarkColor = "D_green";
                        LightColor = "L_green";
                        break;
                    }
                case E_MessageType.Info:
                    {
                        DarkColor = "D_green";
                        LightColor = "L_green";
                        break;
                    }
                case E_MessageType.Warning:
                    {
                        DarkColor = "D_green";
                        LightColor = "L_green";
                        break;
                    }
            }
        }

        public virtual string GetMessage()
        {
            return Result;
        }

    }
}
