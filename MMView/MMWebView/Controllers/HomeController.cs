using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MMWebView.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }


        [HttpGet]
        public ActionResult GetInfoPage(string keyword,string order,int pageIndex, int pageSize)
        {
            var client = new MongoClient(System.Configuration.ConfigurationManager.AppSettings["mongo"]);

            var database = client.GetDatabase("mm_database");

            var collection = database.GetCollection<MMModel>("mm_collect");

            var query = collection.AsQueryable<MMModel>().OrderBy(t => t.title);
            if(order== "scanCount")
            {
                query= collection.AsQueryable<MMModel>().OrderBy(t => t.scanCount);
            }
            int total = query.Count();

            var document = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();


            if (!string.IsNullOrEmpty(keyword))
            {
                total = query.Where(t => t.title.Contains(keyword)).Count();

                document = query.Where(t => t.title.Contains(keyword)).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            }

        
            for (int i = 0; i < document.Count; i++)
            {
                string dirPath = document[i].dirPath;
                if (Directory.Exists(dirPath))
                {
                    string[] files = Directory.GetFiles(dirPath);
                    if (files.Length > 0)
                    {
                        string id = string.Format("{0}({1}p)", document[i].title, document[i].mmCount);
                        document[i].memo = id;
                        document[i].src = string.Format("../mmjpg/{0}/{1}", id, Path.GetFileName(files[0]));
                    }
                }
            }

            return Content((new { list = document, count = total }).ToJson());
        }

        [HttpGet]
        public ActionResult GetDetailList(string id)
        {
            List<ImageModel> result = new List<ImageModel>();

            string[] files = Directory.GetFiles(@"C:\mmjpg\" + id);

            for (int i = 0; i < files.Length; i++)
            {
                result.Add(new ImageModel() { name = Path.GetFileNameWithoutExtension(files[i]), src = "../mmjpg/" + id + "/" + Path.GetFileName(files[i]) });
            }

            return Content(result.ToJson());
        }

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
}