using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MMWebView.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MMWebView
{
    public class MMViewController : ApiController
    {
        [HttpGet]
        public object Test()
        {
            return true;
        }

        [HttpGet]
        public string GetFirstImage(string id)
        {
            string basePath = System.Configuration.ConfigurationManager.AppSettings["basePath"];
            if (!string.IsNullOrEmpty(id) && Directory.Exists(Path.Combine(basePath, id)))
            {
                string[] files = Directory.GetFiles(Path.Combine(basePath, id));

                if (files.Length > 0)
                    return "http://" + Request.RequestUri.Authority + "/mmjpg/" + id + "/" + Path.GetFileName(files[0]);
            }

            return string.Empty;
        }

        [HttpGet]
        public object GetInfoPage(string keyword, string order, int pageIndex, int pageSize)
        {
            var client = new MongoClient(System.Configuration.ConfigurationManager.AppSettings["mongo"]);

            var database = client.GetDatabase("mm_database");

            var collection = database.GetCollection<MMModel>("mm_collect");

            var query = collection.AsQueryable<MMModel>().OrderBy(t => t.title);
            if (order == "scanCount")
            {
                query = collection.AsQueryable<MMModel>().OrderBy(t => t.scanCount);
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
                        document[i].src = string.Format("http://" + Request.RequestUri.Authority + "/mmjpg/{0}/{1}", id, Path.GetFileName(files[0]));
                    }
                }
            }

            return new { list = document, count = total };
        }

        [HttpGet]
        public List<ImageModel> GetDetailList(string id)
        {
            List<ImageModel> result = new List<ImageModel>();

            string basePath = System.Configuration.ConfigurationManager.AppSettings["basePath"];
            if (!string.IsNullOrEmpty(id) && Directory.Exists(Path.Combine(basePath, id)))
            {
                string[] files = Directory.GetFiles(Path.Combine(basePath, id));
                for (int i = 0; i < files.Length; i++)
                {
                    result.Add(new ImageModel() { name = Path.GetFileNameWithoutExtension(files[i]), src = "http://" + Request.RequestUri.Authority + "/mmjpg/" + id + "/" + Path.GetFileName(files[i]) });
                }
            }
            return result;
        }
    }
}