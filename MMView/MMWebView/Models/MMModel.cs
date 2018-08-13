using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MMWebView.Models
{

    public class ImageModel
    {
        public string src { get; set; }

        public string name { get; set; }
    }

    public class MMModel
    {
        public string Id { get; set; }

        public string title { get; set; }

        public string netUrl { get; set; }

        public string scrapyTime { get; set; }

        public string publishTime { get; set; }

        public string scanCount { get; set; }

        public string mmCount { get; set; }

        public string dirPath { get; set; }

        public string memo { get; set; }

        public string src { get; set; }

    }
}