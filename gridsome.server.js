// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const SiteData = require("./src/data/site_data.json");
    const DiscographyData = require("./src/data/discography.json");
    const EventsData = require("./src/data/events.json");
    const VideosData = require("./src/data/videos.json");
    const PublicationsData = require("./src/data/publications.json");
    const BiographyData = require("./src/data/biography.json");
    const Page404Data = require("./src/data/404_page_data.json");

    const siteData = addCollection("SiteData");
    const albums = addCollection("Discography");
    const events = addCollection("Events");
    const videos = addCollection("Videos");
    const publications = addCollection("Publications");
    const biography = addCollection("Biography");
    const page404 = addCollection("Page404");

    siteData.addNode(SiteData);

    for (const album of DiscographyData) {
      albums.addNode(album);
    }

    for (const event of EventsData) {
      events.addNode(event);
    }

    for (const video of VideosData) {
      videos.addNode(video);
    }

    publications.addNode(PublicationsData);

    biography.addNode(BiographyData);

    page404.addNode(Page404Data)

  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
