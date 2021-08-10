var AWS = require('aws-sdk');

exports.handler = async (event, context, call) => {
    console.log("Incoming request " + JSON.stringify(event));
    var bdy = JSON.parse(event.body);
    if(bdy== null){
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify('Hello from Lambda!'),
        };
        return response;
    }
    console.log("logging body" + JSON.stringify(bdy));
    var payload = {
        "method": bdy.method,
        "id": bdy.id,
        "toppings": bdy.toppings,
        "username": bdy.email
    }

    var params = {
        Bucket: 'manassrivastava-old',
        Key: bdy.email + "/" + bdy.id + '.json',
        Body: JSON.stringify(payload),
        ContentType: 'application/json',
    };
    
    if (bdy.method === "get") {
        return await fetchFromS3(params, bdy);
    } else {
        return await uploadToS3(params, bdy);
    }

};

const uploadToS3 = async (params, bdy) => {
    try {
        let S3 = new AWS.S3({ region: "ap-southeast-2" });
        let s3Response = await S3.upload(params).promise();
        console.log('fetched from S3');
        let res = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'POST, PUT, DELETE, GET, OPTIONS',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            'body': JSON.stringify({
                "id": bdy.id,
                "path": bdy.path,
                "s3Path": s3Response.Location
            })
        }

        return res;

    } catch (error) {
        console.log('upload error', error);
        let fail = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'POST, PUT, DELETE, GET, OPTIONS',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            'body': JSON.stringify({
                "error": error
            })
        }

        return fail;
    }

}

const fetchFromS3 = async (params, bdy) => {
    try {
        let S3 = new AWS.S3({ region: "ap-southeast-2" });
        let s3Response = await S3.getObject({ "Bucket": params.Bucket, "Key": params.Key }).promise();
        console.log('fetched from S3');
        let res = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'POST, PUT, DELETE, GET, OPTIONS',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            'body': s3Response.Body.toString('utf-8')
        }

        return res;

    } catch (error) {
        console.log('error is ', error);
        let fail = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'POST, PUT, DELETE, GET, OPTIONS',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            'body': JSON.stringify({
                "error": error
            })
        }

        return fail;
    }
}

