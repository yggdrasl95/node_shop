$(document).ready(() => {
 
    function getTime()
    {
        return (new Date()).toLocaleTimeString();
    }
    
    $('#zegar').html(getTime());
    setInterval(function() {
        $('#zegar').html(getTime());   
         }, 1000);

            var content = '';
            
            $.ajax({
                url: '/products',
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    for(var i = 0; i < data.length; i++){
                        var ind = i + 1;
                        content += '<div id="' + data[i]._id +'"><div id="prod"><p id="x">usuń</p><div id="name">' + 'Nr: ' + ind + ' ' + data[i].name + '</div><div id="price">' + data[i].price + ' zł </div></div></div>';
                        
                    }
                    $('#status').html(content);
                }
                
            });                    

        $('#sendProduct').click(() => {
            if($('#inpProdName').val() === '' || $('#inpProdPrice').val() === ''){
                $('#info').html('Zle wprowadzone dane!'); 
            }
            else{
            $.ajax({
            url : '/products',
            method : "post",
            dataType : "json",
            data : {
            name : $('#inpProdName').val(),
            price : $('#inpProdPrice').val()
            }
            }); 
            location.reload();
            }      
        });
        
        $('#tabela').click(function(){
            $('table.tabela').toggle();
            $('#ukryty_wstecz').toggle();
            $('#ukryte_sortowanie').toggle();
            var produkty = new Array();
            $('#wykaz').hide();
            var tabela = '<caption>Produkty obecnie znajdujące się w sklepie (A-Z)</caption><tr><td class="nag">Nazwa Produktu</td>'; 
            var tabelarev = '<caption>Produkty obecnie znajdujące się w sklepie (Z-A)</caption><tr><td class="nag">Nazwa Produktu</td>';
            
            $.ajax({
                url: '/products',
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    for(var i = 0; i < data.length; i++){
                        produkty.push(data[i].name);
                    }
                    produkty.sort();
                    for(var i = 0; i < produkty.length; i++){
                        tabela += '<tr><td>' + produkty[i] + '</td></tr>';
                        tabelarev += '<tr><td>' + produkty[produkty.length - i - 1] + '</td></tr>';
                    }
                    $('table.tabela').html(tabela);
                    $('table.tabela2').html(tabelarev);
                    $('#ukryte_sortowanie').click(function(){
                        $('table.tabela').toggle();
                        $('table.tabela2').toggle();
                        
                    })
                } 
            }); 
        });
        
        $('div').click(function() {

        let potwierdz = confirm('Czy napewno chcesz usunąć ten produkt?');
        
        if(potwierdz){
            $.ajax({
                url : '/products/' + $(this).children("div").attr('id'),
                method : "delete",
                dataType : "json"
                }); 
                
        }    
            location.reload();
        })
        $('#ukryty_wstecz').click(function(){
            location.reload();
        });

});
