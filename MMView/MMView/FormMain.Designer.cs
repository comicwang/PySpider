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
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
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
            this.dataGridView1.Location = new System.Drawing.Point(0, 0);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 23;
            this.dataGridView1.Size = new System.Drawing.Size(744, 422);
            this.dataGridView1.TabIndex = 0;
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
            // FormMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(744, 422);
            this.Controls.Add(this.dataGridView1);
            this.Name = "FormMain";
            this.Text = "MM查看";
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);

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
    }
}

