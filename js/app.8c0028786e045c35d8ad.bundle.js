(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,r)=>{const s=r(89),a=r(863),{lightningChart:o,AxisScrollStrategies:n,Themes:i}=s,{createProgressiveTraceGenerator:l,createTraceGenerator:c}=a,d=o({resourcesBaseUrl:new URL(document.head.baseURI).origin+new URL(document.head.baseURI).pathname+"resources/"}).Dashboard({theme:i[new URLSearchParams(window.location.search).get("theme")||"darkGold"]||void 0,numberOfRows:3,numberOfColumns:3}),S=[{row:1,col:0},{row:2,col:1},{row:1,col:2},{row:0,col:1},{row:1,col:1}];S.map((e=>{const t=d.createChartXY({columnIndex:e.col,rowIndex:e.row,columnSpan:1,rowSpan:1}),r=(s=["PointSeries","LineSeries"])[Math.round(Math.random()*(s.length-1))];var s;if(e.row==e.col){const e=t["add"+r]();"LineSeries"===r&&e.setCursorSolveBasis("nearest"),c().setNumberOfPoints(1e5).generate().setStreamInterval(50).setStreamBatchSize(10).setStreamRepeat(!0).toStream().forEach((t=>e.add(t)))}else{const s=1==e.col,a={x:0==e.col?-1:1,y:0==e.row?1:-1};let o=t.getDefaultAxisX(),i=t.getDefaultAxisY();e.row==S.reduce(((e,t)=>Math.max(e,t.row)),0)&&(o.dispose(),o=t.addAxisX(!0)),0==e.col&&(i.dispose(),i=t.addAxisY(!0)),a.x<0?o.setInterval({start:-100,end:0,stopAxisAfter:!1}).setScrollStrategy(s?n.fitting:n.regressive):o.setInterval({start:0,end:100,stopAxisAfter:!1}).setScrollStrategy(s?n.fitting:n.progressive),a.y<0?i.setInterval({start:-100,end:0,stopAxisAfter:!1}).setScrollStrategy(s?n.regressive:n.fitting):i.setInterval({start:0,end:100,stopAxisAfter:!1}).setScrollStrategy(s?n.progressive:n.fitting);const c=t["add"+r](o,i);"LineSeries"===r&&c.setCursorSolveBasis("nearest"),l().setNumberOfPoints(1e5).generate().setStreamInterval(50).setStreamBatchSize(2).setStreamRepeat(!0).toStream().forEach((e=>c.add({x:(s?e.y:e.x)*a.x,y:(s?e.x:e.y)*a.y})))}return t.setTitle(r)}))}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);