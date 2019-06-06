# Explorables / Explainables
## CMSC 239 Data Visualization - P2

In this project we will dive head first into the burgeoning world of visualization enhanced articles often called explorables or explainables (those terms have slightly different meanings but we are indifferent). Through this type of web page the user is told a story through a mixture of text and visualization in a compelling fashion. There is a lot of excitement in this area because it offers a intuitive view into complex and technical topics. It can push people to try to understand things they've never considered (or just never understood) before.

The output of this work will be a public facing web page hosted on github pages. It will tell a story about a topic that interests you, and will use visualizations to help that story go. (These webpages don't tend to get listed on search engines, so this work will not really be public unless you share the link places. It will be essentially hidden in plain sight.)

## Instructions

0. Make sure all members of your group have github account
1. One person should clone or fork this repo (https://github.com/mcnuttandrew/cmsc-239-project-2), add the other members as contributors via the settings tab. If you are uncomfortable with having this code be public you can make staff contributors as well so we can look at the code. Our github ids are: kindlmann, mcnuttandrew, lik11, and trihuynh88.
2. ¡WRITE YOUR PROJECT!
3. When you are ready to put your web page up (probably make sure you can do this right from the beginning), simply run our deploy script via npm run deploy which push everything straight onto your github pages. If you are unsure if your build will work, then you can try running npm run trial-deploy which does everything except actually push to github. We find that it is effective to run npm run trial-deploy, and then do something like live-server or simple python http server to check that you page will be read correctly.


## Requirements

- The project is a short article you write on any topic you wish. The tone of this article should be relatively light, and should be written in a manner that would be easy to understand to most of the public. It should be more than 800 words and less than 1500 words.

- Interlaced through this article should be a minimum of 5 charts. Each of these charts must have a mechanism to meaningfully interact with the data. Changing the color of every point in a scatterplot from red to blue would be an example of a NON-meaningful, while a widget that intelligently highlights particular points would be meaningful.

  - This could be a widget that controls a data parameter.
  - The could be through brushing or clicking and dragging interactions.
  - This could be an interactive map or graph.

These charts should be meaningful different and should each individually add to the story you are telling. If you have a reasonable idea for a larger or more complex visualization we would be delighted to hear it! Come chat with us and we'll see what can be done.

- We will be grading by looking at web pages, so you absolutely must have a working web page on the internet for us to look at.

- In the p2 folder on svn you will turn in a short txt file that says: the url of web page, the url of your code (again if your code is private you must add the course staff to the repo), and a short description of who did what in your project.


## Logistics

- You are allowed to install any additional packages/libraries you wish, just make sure your webpage works. We strongly encourage you to use react as the basis of your project, though this is not a hard requirement. You are welcome to use any tooling you wish, just know that the course staff will unlikely be able to help you if you stray too far from the basic setup.

- Unlike previous assignments, we will not be linting this project. That said, the course staff will have an easier time helping you if your code is written in easy to understand manner.

- You will not need to seek approval from us on your choice of topic. We are delighted to give advice on visualizations or topics of your article, but there will be no formal step in this process.

## Examples
On the simpler side
- The Barnes-Hut Approximation https://jheer.github.io/barnes-hut/
- Traveling Salesman Algorithms https://cse442-17f.github.io/Traveling-Salesman-Algorithms/
- Markov chains http://setosa.io/blog/2014/07/26/markov-chains/ (also most things on here http://setosa.io/ev/)
- Why Momentum Really Works https://distill.pub/2017/momentum/ (though this is quire a bit longer than expected)

On the fancier side
- Craft beer — so hot right now. But what city is the microbrew capital of the US? https://pudding.cool/2017/04/beer/
- The Beginner's Guide to Dimensionality Reduction https://idyll.pub/post/dimensionality-reduction-293e465c2a3443e8941b016d/

General sources
- https://idyll-lang.org/gallery
- https://pudding.cool/

You should not feel obligated to do elaborate scrolly telling interactions.

## Some cool tools

*Charts*

- React-vis (https://uber.github.io/react-vis/) We've installed react-vis as the default charting library in this project, though you are welcome to use others.
- Semiotic: this looks cool (https://semiotic.nteract.io/) though we have no experience with it.
- d3 itself: making d3 play nice with react takes a little bit of work but it can certainly be done. There will likely be a homework covering this very topic.


*Maps*

If you are considering doing a map based visualization, there are a bunch of powerful web tools that go way beyond the rudimentary svg manipulation in d3-geo. Here's a brief interview of some good tools

- Mapbox: the gold standard in industry for doing custom mapping

- leaflet: an open source version of that tool

- react-map-gl: a react wrapper on the Mapbox functionality (requires getting an API token from Mapbox, but i think they offer free ones for low volume users like yourselves) https://uber.github.io/react-map-gl/#/Examples/camera-transition

- deck.gl: a tool for doing WebGL powered visualizations either on maps or otherwise. (You don't actually have to web gl coding, you can just mash components together)

- Open street maps: OSM is kinda like a wikipedia for maps, in that it is all user constructed. You probably won't use it directly, but if you use leaflet or Mapbox you can source your tiles from OSM for free.

- Google maps: everyone uses it, it's everywhere. The API is reasonable easy to work, but there is a limited set of things you can do with it. If you do not need to customize your map too much, this is a great choice.


Note: depending on the visualization you are building you might not need fancy web map tools like these! Many visualizations you see in New York Times and other similar outlets use straight SVG maps for Choropleths and sometimes contour maps.
