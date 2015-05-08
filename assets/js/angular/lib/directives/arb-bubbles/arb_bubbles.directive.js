(function() {
	angular.module("arbolista").directive("arbBubbles", arbBubbles);

	arbBubbles.$inject = [];

	function arbBubbles() {
		return {
			templateUrl : "/templates/directives/arb-bubbles/arb_bubbles.html",
			restrict : "E",
			compile : compile,
			scope : {
				root : "=",
				arbbubblesid: "@"
			}
		};

		function compile(tElement, tAttrs, transclude) {
			return {
				pre : preLink,
				post : postLink
			};
		}

		function preLink($scope, iElement, iAttrs, controller) {
		}

		function postLink($scope, iElement, iAttrs, controller) {
			var $container = iElement.find(".arb-bubbles"), 
				bubbles = new Bubbles($scope.root, iAttrs.id, $scope, $container);
			bubbles.draw();
		}
	}

	// http://bl.ocks.org/mbostock/7607535
	function Bubbles(data, id, $scope, $container){
		this.o = {
			height: function(){ return $(window).height() - $(".navbar").height(); },
			max_title_length: 20
		};
		
		this.root = data;
		this.id = id;
		this.$scope = $scope;
		this.$container = $container;
	}
	
	Bubbles.prototype.draw = function(){
		var b = this,
			root = b.root;
		
		var margin = 20,
			height = b.o.height(),
		    diameter = Math.min(b.$container.width(), height);

		var color = d3.scale.linear()
		    .domain([-1, 5])
		    .range(["hsl(196,42%,100%)", "hsl(228,59%,48%)"])
		    .interpolate(d3.interpolateHcl);
		
		var pack = d3.layout.pack()
		    .padding(2)
		    .size([diameter - margin, diameter - margin])
		    .value(function(d) { return d.weight; });
		
		var svg = d3.select("#"+b.id+" svg")
		    .attr("width", diameter)
		    .attr("height", diameter)
		  .append("g")
		    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
		
		  var focus = root,
		      nodes = pack.nodes(root),
		      view;
		  var circle = svg.selectAll("circle")
		      .data(nodes)
		    .enter().append("circle")
		      .attr("class", function(d) { 
		      	var klass = ["node"];
		      	if (d.parent){
		      		if (!d.children) {
		      			klass.push("node--leaf");
		      			if (!d.details) klass.push("node--end");
		      		}
		      	} else {
		      		klass.push("node--root");
		      	}
		     	return klass.join(" ");
		      })
		      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
		      .on("click", function(d) {
		      	var elem = this; 
		      	if (!d.children){
			      	if (elem.__data__.details && focus === d.parent){
						b.$scope.$emit("arb_bubbles.details_click", elem.__data__);      		
			      	}
			      	zoom(d.parent), d3.event.stopPropagation();
		      	} else if (focus !== d) {
		      		zoom(d), d3.event.stopPropagation(); 
		      	}
		      });
		
		  var text = svg.selectAll("text")
		      .data(nodes)
		    .enter().append("text")
		      .attr("class", "label")
		      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
		      .style("display", function(d) { return d.parent === root ? null : "none"; })
		      .text(function(d) { 
		      	if (d.title && d.title.length > b.o.max_title_length) title = d.title.slice(0, b.o.max_title_length) + "...";
		      	else title = d.title;
		      	return title; 
		      });
		  var node = svg.selectAll("circle,text");
		
		  d3.selectAll("#"+b.id)
		      .on("click", function(d, i) { 
		      	zoom(root);
		  });
		
		  zoomTo([root.x, root.y, root.r * 2 + margin]);
		
		  function zoom(d) {
		    var focus0 = focus; focus = d;
		    var transition = d3.transition()
		        .duration(d3.event.altKey ? 7500 : 750)
		        .tween("zoom", function(d) {
		          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
		          return function(t) { zoomTo(i(t)); };
		        });
		
		    transition.selectAll("text")
		      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
		        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
		        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
		        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
		  }
		
		  function zoomTo(v) {
		    var k = diameter / v[2]; view = v;
		    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
		    circle.attr("r", function(d) { return d.r * k; });
		  }
		  
		d3.select(self.frameElement).style("height", diameter + "px");
	};

})(); 