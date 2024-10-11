/*
 Highcharts JS v4.2.5 (2016-05-06)
 Data module

 (c) 2012-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(g){
    typeof module==="object"&&module.exports?module.exports=g:g(Highcharts)
    })(function(g){
    var u=g.win.document,j=g.each,v=g.pick,r=g.inArray,s=g.isNumber,w=g.splat,k,p=function(b,a){
        this.init(b,a)
        };

    g.extend(p.prototype,{
        init:function(b,a){
            this.options=b;
            this.chartOptions=a;
            this.columns=b.columns||this.rowsToColumns(b.rows)||[];
            this.firstRowAsNames=v(b.firstRowAsNames,!0);
            this.decimalRegex=b.decimalPoint&&RegExp("^(-?[0-9]+)"+b.decimalPoint+"([0-9]+)$");
            this.rawColumns=[];
            this.columns.length?
            this.dataFound():(this.parseCSV(),this.parseTable(),this.parseGoogleSpreadsheet())
            },
        getColumnDistribution:function(){
            var b=this.chartOptions,a=this.options,e=[],f=function(b){
                return(g.seriesTypes[b||"line"].prototype.pointArrayMap||[0]).length
                },d=b&&b.chart&&b.chart.type,c=[],h=[],q=0,i;
            j(b&&b.series||[],function(b){
                c.push(f(b.type||d))
                });
            j(a&&a.seriesMapping||[],function(b){
                e.push(b.x||0)
                });
            e.length===0&&e.push(0);
            j(a&&a.seriesMapping||[],function(a){
                var e=new k,o,n=c[q]||f(d),m=g.seriesTypes[((b&&
                    b.series||[])[q]||{}).type||d||"line"].prototype.pointArrayMap||["y"];
                e.addColumnReader(a.x,"x");
                for(o in a)a.hasOwnProperty(o)&&o!=="x"&&e.addColumnReader(a[o],o);for(i=0;i<n;i++)e.hasReader(m[i])||e.addColumnReader(void 0,m[i]);
                h.push(e);
                q++
            });
            a=g.seriesTypes[d||"line"].prototype.pointArrayMap;
            a===void 0&&(a=["y"]);
            this.valueCount={
                global:f(d),
                xColumns:e,
                individual:c,
                seriesBuilders:h,
                globalPointArrayMap:a
            }
        },
    dataFound:function(){
        if(this.options.switchRowsAndColumns)this.columns=this.rowsToColumns(this.columns);
        this.getColumnDistribution();
        this.parseTypes();
        this.parsed()!==!1&&this.complete()
        },
    parseCSV:function(){
        var b=this,a=this.options,e=a.csv,f=this.columns,d=a.startRow||0,c=a.endRow||Number.MAX_VALUE,h=a.startColumn||0,q=a.endColumn||Number.MAX_VALUE,i,g,t=0;
        e&&(g=e.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(a.lineDelimiter||"\n"),i=a.itemDelimiter||(e.indexOf("\t")!==-1?"\t":","),j(g,function(a,e){
            var g=b.trim(a),x=g.indexOf("#")===0;
            e>=d&&e<=c&&!x&&g!==""&&(g=a.split(i),j(g,function(b,a){
                a>=
                h&&a<=q&&(f[a-h]||(f[a-h]=[]),f[a-h][t]=b)
                }),t+=1)
            }),this.dataFound())
        },
    parseTable:function(){
        var b=this.options,a=b.table,e=this.columns,f=b.startRow||0,d=b.endRow||Number.MAX_VALUE,c=b.startColumn||0,h=b.endColumn||Number.MAX_VALUE;
        a&&(typeof a==="string"&&(a=u.getElementById(a)),j(a.getElementsByTagName("tr"),function(b,a){
            a>=f&&a<=d&&j(b.children,function(b,d){
                if((b.tagName==="TD"||b.tagName==="TH")&&d>=c&&d<=h)e[d-c]||(e[d-c]=[]),e[d-c][a-f]=b.innerHTML
                    })
            }),this.dataFound())
        },
    parseGoogleSpreadsheet:function(){
        var b=
        this,a=this.options,e=a.googleSpreadsheetKey,f=this.columns,d=a.startRow||0,c=a.endRow||Number.MAX_VALUE,h=a.startColumn||0,g=a.endColumn||Number.MAX_VALUE,i,j;
        e&&jQuery.ajax({
            dataType:"json",
            url:"https://spreadsheets.google.com/feeds/cells/"+e+"/"+(a.googleSpreadsheetWorksheet||"od6")+"/public/values?alt=json-in-script&callback=?",
            error:a.error,
            success:function(a){
                var a=a.feed.entry,e,n=a.length,m=0,k=0,l;
                for(l=0;l<n;l++)e=a[l],m=Math.max(m,e.gs$cell.col),k=Math.max(k,e.gs$cell.row);
                for(l=0;l<m;l++)if(l>=
                    h&&l<=g)f[l-h]=[],f[l-h].length=Math.min(k,c-d);for(l=0;l<n;l++)if(e=a[l],i=e.gs$cell.row-1,j=e.gs$cell.col-1,j>=h&&j<=g&&i>=d&&i<=c)f[j-h][i-d]=e.content.$t;b.dataFound()
                }
            })
    },
    trim:function(b,a){
        typeof b==="string"&&(b=b.replace(/^\s+|\s+$/g,""),a&&/^[0-9\s]+$/.test(b)&&(b=b.replace(/\s/g,"")),this.decimalRegex&&(b=b.replace(this.decimalRegex,"$1.$2")));
        return b
        },
    parseTypes:function(){
        for(var b=this.columns,a=b.length;a--;)this.parseColumn(b[a],a)
            },
    parseColumn:function(b,a){
        var e=this.rawColumns,
        f=this.columns,d=b.length,c,h,g,i,j=this.firstRowAsNames,k=r(a,this.valueCount.xColumns)!==-1,o=[],n=this.chartOptions,m,p=(this.options.columnTypes||[])[a],n=k&&(n&&n.xAxis&&w(n.xAxis)[0].type==="category"||p==="string");
        for(e[a]||(e[a]=[]);d--;)if(c=o[d]||b[d],g=this.trim(c),i=this.trim(c,!0),h=parseFloat(i),e[a][d]===void 0&&(e[a][d]=g),n||d===0&&j)b[d]=g;
            else if(+i===h)b[d]=h,h>31536E6&&p!=="float"?b.isDatetime=!0:b.isNumeric=!0,b[d+1]!==void 0&&(m=h>b[d+1]);
            else if(h=this.parseDate(c),k&&s(h)&&
            p!=="float"){
            if(o[d]=c,b[d]=h,b.isDatetime=!0,b[d+1]!==void 0){
                c=h>b[d+1];
                if(c!==m&&m!==void 0)this.alternativeFormat?(this.dateFormat=this.alternativeFormat,d=b.length,this.alternativeFormat=this.dateFormats[this.dateFormat].alternative):b.unsorted=!0;
                m=c
                }
            }else if(b[d]=g===""?null:g,d!==0&&(b.isDatetime||b.isNumeric))b.mixed=!0;k&&b.mixed&&(f[a]=e[a]);
    if(k&&m&&this.options.sort)for(a=0;a<f.length;a++)f[a].reverse(),j&&f[a].unshift(f[a].pop())
        },
dateFormats:{
    "YYYY-mm-dd":{
        regex:/^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/,
        parser:function(b){
            return Date.UTC(+b[1],b[2]-1,+b[3])
            }
        },
"dd/mm/YYYY":{
    regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
    parser:function(b){
        return Date.UTC(+b[3],b[2]-1,+b[1])
        },
    alternative:"mm/dd/YYYY"
},
"mm/dd/YYYY":{
    regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
    parser:function(b){
        return Date.UTC(+b[3],b[1]-1,+b[2])
        }
    },
"dd/mm/YY":{
    regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
    parser:function(b){
        return Date.UTC(+b[3]+2E3,b[2]-1,+b[1])
        },
    alternative:"mm/dd/YY"
},
"mm/dd/YY":{
    regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
    parser:function(b){
        return Date.UTC(+b[3]+2E3,b[1]-1,+b[2])
        }
    }
},
parseDate:function(b){
    var a=this.options.parseDate,e,f,d=this.options.dateFormat||this.dateFormat,c;
    if(a)e=a(b);
    else if(typeof b==="string"){
        if(d)a=this.dateFormats[d],(c=b.match(a.regex))&&(e=a.parser(c));else for(f in this.dateFormats)if(a=this.dateFormats[f],c=b.match(a.regex)){
            this.dateFormat=f;
            this.alternativeFormat=a.alternative;
            e=a.parser(c);
            break
        }
        c||(c=Date.parse(b),
            typeof c==="object"&&c!==null&&c.getTime?e=c.getTime()-c.getTimezoneOffset()*6E4:s(c)&&(e=c-(new Date(c)).getTimezoneOffset()*6E4))
        }
        return e
    },
rowsToColumns:function(b){
    var a,e,f,d,c;
    if(b){
        c=[];
        e=b.length;
        for(a=0;a<e;a++){
            d=b[a].length;
            for(f=0;f<d;f++)c[f]||(c[f]=[]),c[f][a]=b[a][f]
                }
            }
        return c
},
parsed:function(){
    if(this.options.parsed)return this.options.parsed.call(this,this.columns)
        },
getFreeIndexes:function(b,a){
    var e,f,d=[],c=[],h;
    for(f=0;f<b;f+=1)d.push(!0);
    for(e=0;e<a.length;e+=1){
        h=a[e].getReferencedColumnIndexes();
        for(f=0;f<h.length;f+=1)d[h[f]]=!1
            }
            for(f=0;f<d.length;f+=1)d[f]&&c.push(f);
    return c
    },
complete:function(){
    var b=this.columns,a,e=this.options,f,d,c,h,g=[],i;
    if(e.complete||e.afterComplete){
        for(c=0;c<b.length;c++)if(this.firstRowAsNames)b[c].name=b[c].shift();f=[];
        d=this.getFreeIndexes(b.length,this.valueCount.seriesBuilders);
        for(c=0;c<this.valueCount.seriesBuilders.length;c++)i=this.valueCount.seriesBuilders[c],i.populateColumns(d)&&g.push(i);
        for(;d.length>0;){
            i=new k;
            i.addColumnReader(0,"x");
            c=r(0,
                d);
            c!==-1&&d.splice(c,1);
            for(c=0;c<this.valueCount.global;c++)i.addColumnReader(void 0,this.valueCount.globalPointArrayMap[c]);
            i.populateColumns(d)&&g.push(i)
            }
            g.length>0&&g[0].readers.length>0&&(i=b[g[0].readers[0].columnIndex],i!==void 0&&(i.isDatetime?a="datetime":i.isNumeric||(a="category")));
        if(a==="category")for(c=0;c<g.length;c++){
            i=g[c];
            for(d=0;d<i.readers.length;d++)if(i.readers[d].configName==="x")i.readers[d].configName="name"
                }
                for(c=0;c<g.length;c++){
            i=g[c];
            d=[];
            for(h=0;h<b[0].length;h++)d[h]=
                i.read(b,h);
            f[c]={
                data:d
            };

            if(i.name)f[c].name=i.name;
            if(a==="category")f[c].turboThreshold=0
                }
                b={
            series:f
        };

        if(a)b.xAxis={
            type:a
        };

        e.complete&&e.complete(b);
        e.afterComplete&&e.afterComplete(b)
        }
    }
});
g.Data=p;
g.data=function(b,a){
    return new p(b,a)
    };

g.wrap(g.Chart.prototype,"init",function(b,a,e){
    var f=this;
    a&&a.data?g.data(g.extend(a.data,{
        afterComplete:function(d){
            var c,h;
            if(a.hasOwnProperty("series"))if(typeof a.series==="object")for(c=Math.max(a.series.length,d.series.length);c--;)h=a.series[c]||{},
                a.series[c]=g.merge(h,d.series[c]);else delete a.series;
            a=g.merge(d,a);
            b.call(f,a,e)
            }
        }),a):b.call(f,a,e)
    });
k=function(){
    this.readers=[];
    this.pointIsArray=!0
    };

k.prototype.populateColumns=function(b){
    var a=!0;
    j(this.readers,function(a){
        if(a.columnIndex===void 0)a.columnIndex=b.shift()
            });
    j(this.readers,function(b){
        b.columnIndex===void 0&&(a=!1)
        });
    return a
    };

k.prototype.read=function(b,a){
    var e=this.pointIsArray,f=e?[]:{},d;
    j(this.readers,function(c){
        var d=b[c.columnIndex][a];
        e?f.push(d):f[c.configName]=
        d
        });
    if(this.name===void 0&&this.readers.length>=2&&(d=this.getReferencedColumnIndexes(),d.length>=2))d.shift(),d.sort(),this.name=b[d.shift()].name;
    return f
    };

k.prototype.addColumnReader=function(b,a){
    this.readers.push({
        columnIndex:b,
        configName:a
    });
    if(!(a==="x"||a==="y"||a===void 0))this.pointIsArray=!1
        };

k.prototype.getReferencedColumnIndexes=function(){
    var b,a=[],e;
    for(b=0;b<this.readers.length;b+=1)e=this.readers[b],e.columnIndex!==void 0&&a.push(e.columnIndex);
    return a
    };

k.prototype.hasReader=function(b){
    var a,
    e;
    for(a=0;a<this.readers.length;a+=1)if(e=this.readers[a],e.configName===b)return!0
        }
    });