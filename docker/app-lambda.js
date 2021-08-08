var AWS = require('aws-sdk');

exports.handler = async (event, context, call) => {
    
    let S3 = new AWS.S3({ region: "ap-southeast-2" });

    console.log("Incoming request " + JSON.stringify(event));
    var bdy = JSON.parse(event.body);
    console.log("logging body" + JSON.stringify(bdy));
    var payload = {
        "id": bdy.id,
        "toppings": bdy.toppings
    }

   var params = {
         Bucket: 'manassrivastava-old',
         Key: bdy.id+'.json',
         Body: JSON.stringify(payload),
         ContentType: 'application/json',
    };
     
    try {
        let s3Response = await S3.upload(params).promise();

        let res = {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({
                "id": bdy.id,
                "path": bdy.path,
                "s3Path":s3Response.Location
            })
        }
        
        return res; 

    } catch (error){
        
        let fail = {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({
                "error":error
            })
        }

        return fail;
    }
};
