# scrolltracker

Thanks to this plugin you can measure the scroll from your user directly in AT Internet's solution. 
It requires jQuery and AT Internet's tag smarttag.js (the plugin on site-ads is necessary in the configuration)
By default, the first scroll is sent after 30%. And then every 10% an information is sent. You can change this behaviour when initialising the plugin thanks to this line of code to be put in AT Internet's code.  

tag.Scroll.init({first: 1500, interval: 700});

The first parameter is the number of pixel when you want to send the first information, the interval will give you the possibility to choose at which frequences you want to send scroll information. 

By default, the scroll value is rounded to the nearest ten. 
