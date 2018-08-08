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

            winFormPager1.RecordCount = Query(winFormPager1.PageIndex, winFormPager1.PageSize);
        }

        private string dir = string.Empty;

        private int Query(int pageIndex, int pageSize)
        {
            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("mm_database");

            var collection = database.GetCollection<BsonDocument>("mm_collect");

            var query = collection.AsQueryable<BsonDocument>();

            int total = query.Count();

            var document = query.OrderBy(t=>t["scanCount"]).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            dataGridView1.Rows.Clear();

            for (int i = 0; i < document.Count; i++)
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
                if (lstUrl.Length > 0)
                    ((DataGridViewImageCell)dataGridView1[7, index]).Value = Image.FromFile(lstUrl[0]);
                dataGridView1[8, index].Value = "查看源";
            }

            return total;
        }

        private void winFormPager1_PageIndexChanged(object sender, EventArgs e)
        {
            winFormPager1.RecordCount = Query(winFormPager1.PageIndex, winFormPager1.PageSize);
        }

        private void menu_refreash_Click(object sender, EventArgs e)
        {
            winFormPager1.RecordCount = Query(winFormPager1.PageIndex, winFormPager1.PageSize);
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == View.DisplayIndex)
            {
                dir = dataGridView1[6, e.RowIndex].Value.ToString();

                imageList1.Images.Clear();
                listView1.Items.Clear();

                string[] files = Directory.GetFiles(dir);

                if (files.Length > 0)
                {
                    foreach (var item in files)
                    {
                        string fileName = Path.GetFileNameWithoutExtension(item);
                        imageList1.Images.Add(fileName, Image.FromFile(item));
                        listView1.Items.Add(fileName, fileName);
                    }
                    if (pnlView.Visible == false)
                    {
                        menu_view_Click(null, null);
                    }
                    pictureBox1.Image = Image.FromFile(files[0]);

                }
            }
        }

        private void listView1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listView1.SelectedItems.Count > 0)
            {
                ListViewItem lv = listView1.SelectedItems[0];

                pictureBox1.Image = Image.FromFile(Path.Combine(dir, lv.Text + ".jpg"));
            }
        }

        private void menu_view_Click(object sender, EventArgs e)
        {
            if(menu_view.Text=="关闭查看")
            {
                pnlView.Visible = false;
                menu_view.Text = "打开查看";
            }
            else
            {
                pnlView.Visible = true;
                menu_view.Text = "关闭查看";
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            winFormPager1.PageSize = int.Parse(comboBox1.SelectedItem.ToString());
            winFormPager1.RecordCount = Query(winFormPager1.PageIndex, winFormPager1.PageSize);
        }
    }
}
