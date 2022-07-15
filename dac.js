//holding local server path for re-use
var host = 'http://localhost:1337/';
$(document).ready(function () {
    //creating and setting datatable on index.html using jQuery
    var table = $('#example').DataTable({
        'ordering': true,
        rowReorder: true,
        dom: 'Bfrtip',
        buttons: [
            'csvHtml5'
        ],
        //Displaying custom messege when no record in datatable
        language: {
            "emptyTable": "Please wait while fetching the data from database."
        }
    });

    //requesting server to fetch data from database
    fetch(host + 'get_users').then(res => {
        res.json().then(body => {
            console.log(body);
            if (body.length > 0) {
                insertingRowstoDatatable(body);
            }
            else {
                fetchFromAPI();
            }
        });
    }).catch(err => { console.log(err) });

    //fetching data from external API endpoint
    let fetchFromAPI = () => {
        fetch('https://reqres.in/api/users?page=2').then(res => {
            res.json().then(body => {
                console.log(body);

                //sending fetched data to server for insertion in database
                fetch(host + 'insert_users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body.data)
                }).then(res => res.json()).then(data => {
                    //after successful data insertion into database
                    //fetched response from server and adding data to datatable
                    insertingRowstoDatatable(data.data);
                }).catch(err => console.log(err));
            });
        })
    }

    //adding rows to datatable
    let insertingRowstoDatatable = (dataList) => {
        for (let i = 0; i < dataList.length; i++) {
            let order = i + 1;
            table.row.add([
                order,
                dataList[i].id,
                dataList[i].first_name,
                dataList[i].last_name,
                dataList[i].email,
                '<img src="' + dataList[i].avatar + '"/>'
            ]).draw(false);
        }
    }
});