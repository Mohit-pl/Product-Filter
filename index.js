
    function productFilter(filterVal) {

        document.getElementById("detail").innerHTML = "";

        var nameFilterVal = document.getElementById("ddl_name").value;
        var categoryFilterVal = document.getElementById("ddl_category").value;
        var priceFilterVal = document.getElementById("ddl_price").value;
        var availableFilterVal = document.getElementById("ddl_available").value;

        var counter = 0;

        //loading all product data
        let data = '[{"name": "Product 1","category": "Electronics","price": 799.99,"available": true},{"name": "Product 2","category": "Books","price": 19.99,"available": true},{"name": "Product 3","category": "Home & Kitchen","price": 49.99,"available": false},{"name": "Product 4","category": "Toys & Games","price": 29.99,"available": true},{"name": "Product 5","category": "Electronics","price": 599.99,"available": true},{"name": "Product 6","category": "Books","price": 9.99,"available": true}]';

        if (nameFilterVal != "0") {
            //Filter data on the basis of Product name
            data = JSON.parse(data).filter(element => element.name == nameFilterVal);
            counter++;
        }

        if (categoryFilterVal != "0") {
            if (counter > 0 && data.length > 0) {
                data = JSON.stringify(data);
            }
            //Filter data on the basis of Product Category 
            data = JSON.parse(data).filter(element => element.category == categoryFilterVal);
            counter++;
        }

        if (availableFilterVal != "0") {
            if (data.length > 0) {
                if (counter > 0 && data.length > 0) {
                    data = JSON.stringify(data);
                }
                //Filter data on the basis of Product Availability 
                data = JSON.parse(data).filter(element => element.available == parseBool(availableFilterVal));
                counter++;
            }
        }

        if (priceFilterVal != "0") {
            if (data.length > 0) {
                if (counter > 0 && data.length > 0) {
                    data = JSON.stringify(data);
                }
                //Filter data on the basis of Product Price
                data = JSON.parse(data).filter(element => element.price == parseFloat(priceFilterVal));
                counter++;
            }
        }

        //If the data length is greater then 0 then only load records
        if (data.length > 0) {

            for (var i = 0; i < data.length; i++) {
                var it = data[i];
                AddRecord(it, i);

            }
        }
        else {

            //if there is no data to show then set all the dropdown as "ALL" and show alert message to user
            document.getElementById("ddl_name").value = "0"
            document.getElementById("ddl_category").value = "0"
            document.getElementById("ddl_available").value = "0"
            document.getElementById("ddl_price").value = "0"

            alert("There is no data present with these combinations, Please filter again");
            LoadProductDetails();
        }
    }

    //function to parse string to bool 
    function parseBool(val) { return val === true || val === "true" }
    
    LoadProductDetails();

    function LoadProductDetails() {

        document.getElementById("detail").innerHTML = "";
        let data = '[{"data": [{"name": "Product 1","category": "Electronics","price": 799.99,"available": true},{"name": "Product 2","category": "Books","price": 19.99,"available": true},{"name": "Product 3","category": "Home & Kitchen","price": 49.99,"available": false},{"name": "Product 4","category": "Toys & Games","price": 29.99,"available": true},{"name": "Product 5","category": "Electronics","price": 599.99,"available": true},{"name": "Product 6","category": "Books","price": 9.99,"available": true}]}]';
        let mydata = JSON.parse(data);
        var header = document.getElementById("header");
        for (var i = 0; i < mydata[0].data.length; i++) {
            var it = mydata[0].data[i];
            //calling AddRecords function to dynamically create and set values in row
            AddRecord(it, i);

        }
    }

    function AddRecord(record, n) {
        var detail = document.getElementById("detail");

        if (n == 0) {
           //Set table header values
            var header = document.createElement("div");
            header.setAttribute("id", "tblHeader");
            header.innerHTML = '<div>S.No</div><div>name</div><div>Category</div><div>price</div><div>available</div>'
            detail.appendChild(header);
        }

        //set table body values
        var newdiv = document.createElement("div");
        newdiv.setAttribute("class", "tblBody");
        newdiv.innerHTML = "<div style=''>" + parseInt(n+1) + "</div>" + "<div style=''>" + record.name + "</div>" + "<div>" + record.category + "</div>" + "<div>" + record.price + "</div>" + "<div>" + record.available + "</div>";
        detail.appendChild(newdiv);
    }
