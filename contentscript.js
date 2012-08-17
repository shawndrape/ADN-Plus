var addPlusOne = function(post) {
    if (post.querySelector('span.plusone')) { //if the post already has the widget, ignore it
        return;
    }
    var hrefSource = post.querySelector('a.timestamp');
    var href = 'https://alpha.app.net' + hrefSource.getAttribute('href');
    var plusOneLi = document.createElement('li');
    plusOneLi.classList.add("show-on-hover");
    plusOneLi.classList.add("pull-right");
    var plusone = document.createElement('span');
    plusone.classList.add('plusone');
    
    plusone.innerHTML = '<g:plusone size="small" count="true" href="' + href + '"></g:plusone>';
    
    var plusOneDest = post.querySelector('div.post-details ul');
    plusOneLi.appendChild(plusone);
    plusOneDest.appendChild(plusOneLi);
}

var findPosts = function(event){
	var node = event.target;
	if (node.webkitMatchesSelector && node.webkitMatchesSelector('div.post-container[data-post-id]')){
		addPlusOne(node);
	} else if (node.querySelectorAll) {
        var posts = node.querySelectorAll('div.post-container[data-post-id]');
        for (var i = 0; i < posts.length; i++) {
            addPlusOne(posts[i]);
        }
    }
}

var plusOneScript = document.createElement('script');
plusOneScript.setAttribute("src", "https://apis.google.com/js/plusone.js");
plusOneScript.textContent = '{"parsetags": "explicit"}';
plusOneScript.addEventListener("load", function() {
    var script = document.createElement("script");
    script.textContent = "var addPlusOne = function(){gapi.plusone.go();setTimeout(addPlusOne, 1000);};setTimeout(addPlusOne, 1000);";
    document.body.appendChild(script);
}, false);
document.body.appendChild(plusOneScript);
document.body.addEventListener("DOMNodeInserted", findPosts, false);
// var posts = document.body.querySelectorAll("div.post-container[data-post-id]")
// for (var i = posts.length - 1; i >= 0; i--) {
// 	addPlusOne(posts[i]);
// };