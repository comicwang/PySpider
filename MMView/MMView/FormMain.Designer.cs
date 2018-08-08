namespace MMView
{
    partial class FormMain
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FormMain));
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.title = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.netUrl = new System.Windows.Forms.DataGridViewLinkColumn();
            this.scrapyTime = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.publishTime = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.scrapyCount = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.mmCount = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.dirPath = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.scan = new System.Windows.Forms.DataGridViewImageColumn();
            this.View = new System.Windows.Forms.DataGridViewLinkColumn();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.toolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.menu_refreash = new System.Windows.Forms.ToolStripMenuItem();
            this.winFormPager1 = new Kenny.Controls.WinForm.WinFormPager();
            this.pnlView = new System.Windows.Forms.Panel();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.listView1 = new System.Windows.Forms.ListView();
            this.imageList1 = new System.Windows.Forms.ImageList(this.components);
            this.menu_view = new System.Windows.Forms.ToolStripMenuItem();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.menuStrip1.SuspendLayout();
            this.pnlView.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // dataGridView1
            // 
            this.dataGridView1.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.title,
            this.netUrl,
            this.scrapyTime,
            this.publishTime,
            this.scrapyCount,
            this.mmCount,
            this.dirPath,
            this.scan,
            this.View});
            this.dataGridView1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dataGridView1.Location = new System.Drawing.Point(0, 25);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 23;
            this.dataGridView1.Size = new System.Drawing.Size(700, 481);
            this.dataGridView1.TabIndex = 0;
            this.dataGridView1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
            // 
            // title
            // 
            this.title.HeaderText = "名称";
            this.title.Name = "title";
            // 
            // netUrl
            // 
            this.netUrl.HeaderText = "网址";
            this.netUrl.Name = "netUrl";
            this.netUrl.Resizable = System.Windows.Forms.DataGridViewTriState.True;
            this.netUrl.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
            // 
            // scrapyTime
            // 
            this.scrapyTime.HeaderText = "爬取时间";
            this.scrapyTime.Name = "scrapyTime";
            // 
            // publishTime
            // 
            this.publishTime.HeaderText = "发布时间";
            this.publishTime.Name = "publishTime";
            // 
            // scrapyCount
            // 
            this.scrapyCount.HeaderText = "查看数量";
            this.scrapyCount.Name = "scrapyCount";
            // 
            // mmCount
            // 
            this.mmCount.HeaderText = "图片数量";
            this.mmCount.Name = "mmCount";
            // 
            // dirPath
            // 
            this.dirPath.HeaderText = "图片目录";
            this.dirPath.Name = "dirPath";
            // 
            // scan
            // 
            this.scan.HeaderText = "预览图";
            this.scan.ImageLayout = System.Windows.Forms.DataGridViewImageCellLayout.Zoom;
            this.scan.Name = "scan";
            // 
            // View
            // 
            this.View.HeaderText = "查看";
            this.View.Name = "View";
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripMenuItem1,
            this.menu_refreash,
            this.menu_view});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(700, 25);
            this.menuStrip1.TabIndex = 1;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // toolStripMenuItem1
            // 
            this.toolStripMenuItem1.Name = "toolStripMenuItem1";
            this.toolStripMenuItem1.Size = new System.Drawing.Size(68, 21);
            this.toolStripMenuItem1.Text = "启动爬虫";
            // 
            // menu_refreash
            // 
            this.menu_refreash.Name = "menu_refreash";
            this.menu_refreash.Size = new System.Drawing.Size(68, 21);
            this.menu_refreash.Text = "刷新数据";
            this.menu_refreash.Click += new System.EventHandler(this.menu_refreash_Click);
            // 
            // winFormPager1
            // 
            this.winFormPager1.AutoSize = true;
            this.winFormPager1.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.winFormPager1.BackColor = System.Drawing.Color.Transparent;
            this.winFormPager1.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("winFormPager1.BackgroundImage")));
            this.winFormPager1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.winFormPager1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.winFormPager1.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.winFormPager1.Location = new System.Drawing.Point(0, 506);
            this.winFormPager1.Name = "winFormPager1";
            this.winFormPager1.PageSize = 100;
            this.winFormPager1.RecordCount = 0;
            this.winFormPager1.Size = new System.Drawing.Size(700, 27);
            this.winFormPager1.TabIndex = 2;
            this.winFormPager1.PageIndexChanged += new Kenny.Controls.WinForm.WinFormPager.EventHandler(this.winFormPager1_PageIndexChanged);
            // 
            // pnlView
            // 
            this.pnlView.Controls.Add(this.pictureBox1);
            this.pnlView.Controls.Add(this.listView1);
            this.pnlView.Dock = System.Windows.Forms.DockStyle.Right;
            this.pnlView.Location = new System.Drawing.Point(700, 0);
            this.pnlView.Name = "pnlView";
            this.pnlView.Size = new System.Drawing.Size(350, 533);
            this.pnlView.TabIndex = 3;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pictureBox1.Location = new System.Drawing.Point(0, 183);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(350, 350);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // listView1
            // 
            this.listView1.Dock = System.Windows.Forms.DockStyle.Top;
            this.listView1.Location = new System.Drawing.Point(0, 0);
            this.listView1.MultiSelect = false;
            this.listView1.Name = "listView1";
            this.listView1.Size = new System.Drawing.Size(350, 183);
            this.listView1.SmallImageList = this.imageList1;
            this.listView1.TabIndex = 0;
            this.listView1.UseCompatibleStateImageBehavior = false;
            this.listView1.View = System.Windows.Forms.View.SmallIcon;
            this.listView1.SelectedIndexChanged += new System.EventHandler(this.listView1_SelectedIndexChanged);
            // 
            // imageList1
            // 
            this.imageList1.ColorDepth = System.Windows.Forms.ColorDepth.Depth8Bit;
            this.imageList1.ImageSize = new System.Drawing.Size(16, 16);
            this.imageList1.TransparentColor = System.Drawing.Color.Transparent;
            // 
            // menu_view
            // 
            this.menu_view.Name = "menu_view";
            this.menu_view.Size = new System.Drawing.Size(68, 21);
            this.menu_view.Text = "关闭查看";
            this.menu_view.Click += new System.EventHandler(this.menu_view_Click);
            // 
            // FormMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1050, 533);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.winFormPager1);
            this.Controls.Add(this.menuStrip1);
            this.Controls.Add(this.pnlView);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "FormMain";
            this.Text = "MM查看";
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.pnlView.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn title;
        private System.Windows.Forms.DataGridViewLinkColumn netUrl;
        private System.Windows.Forms.DataGridViewTextBoxColumn scrapyTime;
        private System.Windows.Forms.DataGridViewTextBoxColumn publishTime;
        private System.Windows.Forms.DataGridViewTextBoxColumn scrapyCount;
        private System.Windows.Forms.DataGridViewTextBoxColumn mmCount;
        private System.Windows.Forms.DataGridViewTextBoxColumn dirPath;
        private System.Windows.Forms.DataGridViewImageColumn scan;
        private System.Windows.Forms.DataGridViewLinkColumn View;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem menu_refreash;
        private Kenny.Controls.WinForm.WinFormPager winFormPager1;
        private System.Windows.Forms.Panel pnlView;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.ListView listView1;
        private System.Windows.Forms.ImageList imageList1;
        private System.Windows.Forms.ToolStripMenuItem menu_view;
    }
}

