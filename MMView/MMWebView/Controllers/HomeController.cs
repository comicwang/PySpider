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
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        [HttpGet]
        public ActionResult GetInfoPage(int pageIndex, int pageSize)
        {
            var client = new MongoClient(System.Configuration.ConfigurationManager.AppSettings["mongo"]);

            var database = client.GetDatabase("mm_database");

            var collection = database.GetCollection<BsonDocument>("mm_collect");

            var query = collection.AsQueryable<BsonDocument>();

            int total = query.Count();

            var document = query.OrderBy(t => t["scanCount"]).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            for (int i = 0; i < document.Count; i++)
            {
                string[] files = Directory.GetFiles(document[i]["dirPath"].AsString);
                if (files.Length > 0)
                {
                    string id = string.Format("{0}({1}p)", document[i]["title"].AsString, document[i]["mmCount"].AsString);
                    document[i].Add("memo", BsonValue.Create(id));
                    document[i].Add("src", BsonValue.Create(string.Format("../mmjpg/{0}/{1}", id, Path.GetFileName(files[0]))));
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
    }
}