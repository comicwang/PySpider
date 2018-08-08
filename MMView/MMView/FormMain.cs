using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MMView
{
    public partial class FormMain : Form
    {
        public FormMain()
        {
            InitializeComponent();

            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("mm_database");

            var collection = database.GetCollection<BsonDocument>("mm_collect");

            var document = collection.Find(new BsonDocument()).ToList();

            for (int i = 0; i < 30; i++)
            {
                int index = dataGridView1.Rows.Add();
                dataGridView1[0, index].Value = document[i][1];
                dataGridView1[1, index].Value = document[i][2];
                dataGridView1[2, index].Value = document[i][3];
                dataGridView1[3, index].Value = document[i][4];
                dataGridView1[4, index].Value = document[i][5];
                dataGridView1[5, index].Value = document[i][6];
                dataGridView1[6, index].Value = document[i][7];
                //获取第一张图片
                string[] lstUrl = Directory.GetFiles(document[i][7].AsString);
                ((DataGridViewImageCell)dataGridView1[7, index]).Value = Image.FromFile(lstUrl[0]);
                dataGridView1[8, index].Value = "查看源";
            }
        }
    }
}
