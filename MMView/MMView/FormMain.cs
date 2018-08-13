using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        private Dictionary<string, string> dicUrl = new Dictionary<string, string>();

        private string Request(string url)
        {
            HttpClient httpClient = new HttpClient(new HttpClientHandler() { AutomaticDecompression = System.Net.DecompressionMethods.GZip });

            httpClient.BaseAddress = new Uri(System.Configuration.ConfigurationManager.AppSettings["mmUrl"]);

            var responce = httpClient.GetAsync(url).Result;
            responce.EnsureSuccessStatusCode();

            var result = responce.Content.ReadAsStringAsync().Result;

            return result;
        }

        private Image GetImage(string imageUrl)
        {
            imageUrl = imageUrl.Trim('\"');
            try
            {
                return Image.FromStream(WebRequest.Create(imageUrl).GetResponse().GetResponseStream());
            }
            catch(Exception e)
            {
                return null;
            }
        }

        private int Query(int pageIndex, int pageSize)
        {
            string result = Request("api/MMView/GetInfoPage?" + string.Format("keyword={0}&order={1}&pageIndex={2}&pageSize={3}", string.Empty, string.Empty, pageIndex, pageSize));

            dynamic dy = JToken.Parse(result) as dynamic;

            var document = dy.list;
            dataGridView1.Rows.Clear();

            for (int i = 0; i < document.Count; i++)
            {
                int index = dataGridView1.Rows.Add();
                dataGridView1[0, index].Value = document[i].title;
                dataGridView1[1, index].Value = document[i].netUrl;
                dataGridView1[2, index].Value = document[i].scrapyTime;
                dataGridView1[3, index].Value = document[i].publishTime;
                dataGridView1[4, index].Value = document[i].scanCount;
                dataGridView1[5, index].Value = document[i].mmCount;
                dataGridView1[6, index].Value = document[i].dirPath;
                string dirPath = document[i].dirPath;
                //获取第一张图片
                string firstImageUrl = Request("api/MMView/GetFirstImage?id=" + document[i].memo);
                if (!string.IsNullOrEmpty(firstImageUrl))
                {
                    ((DataGridViewImageCell)dataGridView1[7, index]).Value = GetImage(firstImageUrl);
                    dataGridView1[8, index].Value = "查看源";
                }
            }

            return dy.count;
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
                //dir = dataGridView1[6, e.RowIndex].Value.ToString();

                imageList1.Images.Clear();
                listView1.Items.Clear();
                dicUrl.Clear();
                string result = Request("api/MMView/GetDetailList?id=" + string.Format("{0}({1}p)", dataGridView1[0, e.RowIndex].Value, dataGridView1[5, e.RowIndex].Value));

                dynamic dy = JToken.Parse(result) as dynamic;

                if (dy.Count > 0)
                {
                    for (int i = 0; i < dy.Count; i++)
                    {
                        string imageSrc = dy[i].src;
                        string imageName = dy[i].name;
                        Image img = GetImage(imageSrc);
                        if (img != null)
                            imageList1.Images.Add(imageName, img);
                        listView1.Items.Add(imageName, imageName);
                        dicUrl.Add(imageName, imageSrc);
                    }
                    if (pnlView.Visible == false)
                    {
                        menu_view_Click(null, null);
                    }
                    string firstUrl = dy[0].src;
                    pictureBox1.Image = GetImage(firstUrl);

                }
            }
        }

        private void listView1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listView1.SelectedItems.Count > 0)
            {
                ListViewItem lv = listView1.SelectedItems[0];

                pictureBox1.Image = GetImage(dicUrl[lv.Text]);
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
