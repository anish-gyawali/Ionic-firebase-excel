function getAllData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();

  var firebaseUrl = "insert_your_url";

  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl);

  var dataSet = [base.getData()];
  

  // the following lines will depend on the structure of your data
  var rows = [],
      data;

  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    for (j = 0; j < dataSet[i].length; j++) {
      //check your data tye in firebase and update accordingly 
      //for eg : my data types are id,name,batch 
    rows.push([data[j].id,data[j].name,data[j].batch]);
    }
  }

  dataRange = sheet.getRange(2,1, rows.length,3 );
  dataRange.setValues(rows); 

}

