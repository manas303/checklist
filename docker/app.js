var AWS = require('aws-sdk');

exports.handler = async (event, context, call) => {
    console.log("Incoming request " + JSON.stringify(event));
    //console.log("Incoming request " + JSON.stringify(event));
    var bdy = JSON.parse(event.body);
    var origin = null;
    var allowedHeaders = ["https://manassrivastava.com","http://localhost:3002","https://manas303.github.io",
                        "http://localhost:3000", "http://localhost:3001"]
    if(allowedHeaders.some(substring=> event.headers.origin.includes(substring))){
        origin = event.headers.origin
    }
    if(bdy== null){
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": origin,
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
        "username": bdy.email,
        "total": bdy.total
    }

    var params = {
        Bucket: 'manassrivastava-old',
        Key: bdy.email + "/" + bdy.id + '.json',
        Body: JSON.stringify(payload),
        ContentType: 'application/json',
        originHeader : origin
    };
    
    if (bdy.method === "get") {
        return await fetchFromS3(params, bdy);
    } 
    else if(bdy.method==="saveChecklists"){
        params = {
            Bucket: 'manassrivastava-old',
            Key: bdy.email + "/" + "checklistIds" + '.json',
            Body: JSON.stringify(bdy.ids),
            ContentType: 'application/json',
            originHeader : origin
        };
        return await uploadToS3(params, bdy);
    }
    else if(bdy.method ==="fetchChecklists"){
        params = {
            Bucket: 'manassrivastava-old',
            Key: bdy.email + "/" + "checklistIds" + '.json',
            ContentType: 'application/json',
            originHeader : origin
        };
        return await fetchFromS3(params, bdy);
    }
    else {
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
                'Access-Control-Allow-Origin': params.originHeader,
                'Access-Control-Allow-Methods':'POST, PUT, DELETE, GET, OPTIONS',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            'body': JSON.stringify({
                "id": bdy.id,
                "path": bdy.path,
                "s3Path": s3Response.Location
            })
        };

        return res;

    } catch (error) {
        console.log('upload error', error);
        let fail = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': params.originHeader,
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
                'Access-Control-Allow-Origin': params.originHeader,
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
                'Access-Control-Allow-Origin': params.originHeader,
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

