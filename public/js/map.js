// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(116.331398, 39.897445);
map.enableScrollWheelZoom();
map.centerAndZoom(point, 16);

var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
var top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL }); //右上角

map.addControl(top_left_control);
map.addControl(top_left_navigation);

var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        var gc = new BMap.Geocoder();
        gc.getLocation(r.point, function(rs) {
            var addComp = rs.addressComponents;
            var province = addComp.province
            $.post("/content", { province: province });
        })
        var local = new BMap.LocalSearch(map, {
            onSearchComplete: function(results) {
                var totalPois = results.getNumPois()
                //console.log(totalPois);
                var totalPages = results.getNumPages();
                //console.log(totalPages);
                var currPage = results.getPageIndex();
                //console.log(currPage);
                if (currPage < totalPages - 1) {
                    //console.log(results.getCurrentNumPois());
                    local.gotoPage(currPage + 1);
                    //console.log(JSON.stringify(local.getResults().Ar));
                    var json = JSON.stringify(local.getResults().Ar);
                    var hosObj = eval(json)
                    $.post("/content", { value: json })
                } else {
                    console.log('Finish')
                }
            },
            pageCapacity: 10
        });
        local.searchNearby('医院', r.point, 1000);
    } else {
        alert('failed' + this.getStatus());
    }
});