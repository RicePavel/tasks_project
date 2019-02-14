
function SortedTable(id) {
    
    var table = $('#' + id);
    
    var currentIndex;
    var sortedType;
    
    table.find('th').click(function() {
        var index = $(this).index();
        
        if (currentIndex === index) {
            if (sortedType === 'asc') {
                sortedType = 'desc';
            } else {
                sortedType = 'asc';
            }
        } else {
            currentIndex = index;
            sortedType = 'asc';
        }
        
        table.find('th').removeClass('asc');
        table.find('th').removeClass('desc');
        $(this).addClass(sortedType);
        
        var arr = table.find('tr:not(:first)');
        arr.sort(function(tr1, tr2) {
            var val1 = $(tr1).find('td').eq(index).text();
            var val2 = $(tr2).find('td').eq(index).text();
            if (sortedType === 'asc') {
                if (val1 > val2) return 1;
                if (val1 < val2) return -1;
            } else {
                if (val1 < val2) return 1;
                if (val1 > val2) return -1;
            }
        });
        table.find('tr:not(:first)').remove();
        for (var i = 0; i < arr.length; i++) {
            table.append(arr[i]);
        }
    });
    
}


